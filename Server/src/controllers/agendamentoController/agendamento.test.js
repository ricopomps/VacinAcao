import dotenv from "dotenv";
import mongoose from "mongoose";
import AgendamentoController from "./agendamento.js";
import AgendamentoModel from "../../models/agendamento.js";
import moment from "moment";
import request from "supertest";
import app from "../../index.js";
dotenv.config();

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  const CONNECTION_URL_TEST = process.env.CONNECTION_URL_TEST;
  await mongoose.connect(CONNECTION_URL_TEST, { useNewUrlParser: true });

  await mongoose.connection.db.dropDatabase();
});

describe("Teste do getAgendamentos", () => {
  it("Recebe status 200 e 0 agendamentos", async () => {
    const res = await request(app).get("/api/agendamento/");

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(0);
  });

  it("Retorna o agendamento presente", async () => {
    const newAgendamento = new AgendamentoModel({
      name: "usuario_teste",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(10, "days").format("DD/MM/yyyy"),
      schedule: "08:00 - 08:30",
    });

    const created = await newAgendamento.save();
    const res = await request(app).get("/api/agendamento/");
    expect(res.status).toBe(200);
    expect(res.body.agendamentos[0].name).toBe("usuario_teste");
    expect(res.body.count).toBe(1);
  });

  it("Retorna o agendamento de acordo com o filtro name", async () => {
    const newAgendamento = new AgendamentoModel({
      name: "usuario_filtro",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(10, "days").format("DD/MM/yyyy"),
      schedule: "08:00 - 08:30",
    });

    const created = await newAgendamento.save();
    const res = await request(app).get("/api/agendamento?name=usuario_filtro");
    expect(res.status).toBe(200);
    expect(res.body.agendamentos[0].name).toBe("usuario_filtro");
    expect(res.body.count).toBe(1);
  });
});

describe("Teste do createAgendamento", () => {
  it("Criando um agendamento", async () => {
    const newAgendamento = {
      name: "usuario_teste",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(10, "days").format("DD/MM/yyyy"),
      schedule: "08:00 - 08:30",
    };
    const res = await request(app)
      .post("/api/agendamento")
      .send(newAgendamento);
    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual(newAgendamento);
  });
  it("Criando um agendamento sem um dos fields", async () => {
    const newAgendamento = {
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(10, "days").format("DD/MM/yyyy"),
      schedule: "08:00 - 08:30",
    };
    const res = await request(app)
      .post("/api/agendamento")
      .send(newAgendamento);
    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({ message: "Campo obrigatório" });
  });
});

describe("Teste do updateAgendamento", () => {
  it("Atualiza um agendamento", async () => {
    const agendamento = await AgendamentoModel.findOne();
    const { _id: id, ...rest } = agendamento;
    const res = await request(app)
      .patch(`/api/agendamento/${id}`)
      .send({ ...rest._doc, realized: true, description: "description" });

    expect(res.status).toBe(200);
    expect(res.body.realized).toBe(true);
    expect(res.body.description).toBe("description");
  });
  it("Não permite atualizar um agendamento que falte informação", async () => {
    const agendamento = await AgendamentoModel.findOne();
    const { _id: id } = agendamento;
    const { realized, ...rest } = agendamento._doc;
    const res = await request(app)
      .patch(`/api/agendamento/${id}`)
      .send({ ...rest, description: "description" });

    expect(res.status).toBe(400);
  });
  it("ObjectId não é válido", async () => {
    const agendamento = await AgendamentoModel.findOne();
    const { _id: id } = agendamento;
    const { realized, ...rest } = agendamento._doc;
    const res = await request(app)
      .patch(`/api/agendamento/id_na0_valido`)
      .send({ ...rest, description: "description" });

    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({ message: "Agendamento não encontrado" });
  });
});

describe("Teste do deleteAgendamento", () => {
  it("Deleta um agendamento", async () => {
    const agendamento = await AgendamentoModel.findOne();
    const res = await request(app).delete(
      `/api/agendamento/${agendamento._id}`
    );
    const agendamentoDeletado = await AgendamentoModel.findOne({
      _id: agendamento._id,
    });
    expect(agendamentoDeletado).toBe(null);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ message: "Deleted" });
  });
  it("ObjectId não é válido", async () => {
    const agendamento = await AgendamentoModel.findOne();
    const res = await request(app).delete(
      `/api/agendamento/${agendamento.name}`
    );
    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({ message: "Agendamento não encontrado" });
  });
});

afterAll(async () => {
  mongoose.connection.db.dropDatabase();
  mongoose.disconnect();
});
