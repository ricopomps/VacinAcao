import mongoose from "mongoose";
import AgendamentoModel from "../../models/agendamento.js";
import AgendamentoService from "./AgendamentoService";
import DiaModel from "../../models/dia.js";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();

beforeAll(async () => {
  // Connect to a Mongo DB
  const CONNECTION_URL_TEST = process.env.CONNECTION_URL_TEST;
  await mongoose.connect(CONNECTION_URL_TEST, { useNewUrlParser: true });
});
describe("Teste do banco de dados", () => {
  it("Agendamento pode ser criado, atualizado e deletado", async () => {
    const newAgendamento = new AgendamentoModel({
      name: "nome_valido",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
      realized: false,
    });

    const res = await newAgendamento.save();
    const agendamento = await AgendamentoModel.findOne({ name: "nome_valido" });
    expect(mongoose.Types.ObjectId.isValid(agendamento._id)).toBe(true);
    const { _id } = agendamento;
    agendamento.realized = true;
    const updatedAgendamento = await AgendamentoModel.findByIdAndUpdate(
      _id,
      agendamento,
      {
        new: true,
      }
    );
    expect(mongoose.Types.ObjectId.isValid(updatedAgendamento._id)).toBe(true);
    expect(updatedAgendamento.realized).toBe(true);
    const deleted = await AgendamentoModel.findByIdAndRemove(agendamento._id);
    expect(mongoose.Types.ObjectId.isValid(deleted._id)).toBe(true);
    const agendamentoDeletado = await AgendamentoModel.findOne({
      _id: deleted._id,
    });
    expect(agendamentoDeletado).toBe(null);
  });
});

describe("Teste do getAgendamentos", () => {
  it("Retorna um objeto quando não for passado filtros", async () => {
    const response = await AgendamentoService.getAgendamentos({});
    expect(response).toStrictEqual({
      body: { agendamentos: [], count: 0 },
      statusCode: 200,
    });
  });
  it("Retorna o objeto correto de acordo com os parametros", async () => {
    const newAgendamento = new AgendamentoModel({
      name: "usuario_teste",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
      realized: false,
    });

    const res = await newAgendamento.save();
    const response = await AgendamentoService.getAgendamentos({
      name: "usuario_teste",
    });
    expect(response.body.agendamentos[0]._id).toStrictEqual(res._id);
    expect(response.body.agendamentos[0].name).toBe(newAgendamento.name);
    expect(response.body.agendamentos[0].age).toBe(newAgendamento.age);
    expect(response.body.agendamentos[0].date).toBe(newAgendamento.date);
    expect(response.body.agendamentos[0].description).toBe(
      newAgendamento.description
    );
    expect(response.body.agendamentos[0].schedule).toBe(
      newAgendamento.schedule
    );
    expect(response.body.agendamentos[0].realized).toBe(
      newAgendamento.realized
    );
  });
});
describe("Teste do createAgendamentos", () => {
  it("Cria um agendamento e o encontra", async () => {
    const newAgendamento = {
      name: "usuario_teste",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
    };
    const response = await AgendamentoService.createAgendamentos(
      newAgendamento
    );
    expect(response.body).toBe(newAgendamento);
  });

  it("Não permite a criação de agendamentos com datas passadas", async () => {
    const newAgendamento = {
      name: "usuario_teste",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().subtract(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
    };

    const response = await AgendamentoService.createAgendamentos(
      newAgendamento
    );

    expect(response.body).toStrictEqual({
      message: "Não é possível escolher uma data passada",
    });
  });

  it("Não permite cadastro de cidadão se já houver dois outros cidadões no mesmo horário, todos com menos de 60 anos", async () => {
    const newAgendamento = {
      name: "usuario_teste",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
    };

    await AgendamentoService.createAgendamentos(newAgendamento);
    await AgendamentoService.createAgendamentos(newAgendamento);
    const response = await AgendamentoService.createAgendamentos(
      newAgendamento
    );

    expect(response.body).toStrictEqual({
      message: "Vaga exclusiva para pessoas acimas de 60 anos",
    });
  });

  it("Permite cadastrar idoso quando exitem duas pessoas que não sejam idosas no mesmo horário", async () => {
    const newAgendamento = {
      name: "usuario_teste",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
    };

    await AgendamentoService.createAgendamentos(newAgendamento);
    await AgendamentoService.createAgendamentos(newAgendamento);

    const newAgendamentoIdoso = {
      name: "usuario_teste",
      age: moment().subtract(60, "years").format("DD/MM/yyyy"),
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
    };

    const response = await AgendamentoService.createAgendamentos(
      newAgendamentoIdoso
    );

    expect(response.body).toBe(newAgendamentoIdoso);
  });

  it("Remove o cidadão mais novo quando um idoso se cadastra numa vaga que já possui duas pessoas", async () => {
    const newAgendamento = {
      name: "usuario_teste",
      age: moment().subtract(30, "years").format("DD/MM/yyyy"),
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
    };

    await AgendamentoService.createAgendamentos(newAgendamento);
    newAgendamento.age = moment().subtract(15, "years").format("DD/MM/yyyy");
    await AgendamentoService.createAgendamentos(newAgendamento);

    const newAgendamentoIdoso = {
      name: "usuario_teste",
      age: moment().subtract(60, "years").format("DD/MM/yyyy"),
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
    };

    const response = await AgendamentoService.createAgendamentos(
      newAgendamentoIdoso
    );
    const agendamento = await AgendamentoModel.findOne({
      age: moment().subtract(15, "years").format("DD/MM/yyyy"),
    });

    expect(agendamento).toBe(null);
  });
});

afterAll(async () => {
  mongoose.connection.db.dropDatabase();
  mongoose.disconnect();
});
