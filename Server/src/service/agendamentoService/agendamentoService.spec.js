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
      age: "01/01/2001",
      date: "01/01/2001",
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
      age: "01/01/2001",
      date: "01/01/2001",
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
      age: "01/01/2001",
      date: moment().add(1, "days").format("DD/MM/yyyy"),
      description: "",
      schedule: "08:00 - 08:30",
    };
    const response = await AgendamentoService.createAgendamentos(
      newAgendamento
    );
    expect(response.body).toBe(newAgendamento);
  });
});
// expect(response.body.agendamentos).toStrictEqual([]);

afterAll(async () => {
  mongoose.connection.db.dropDatabase();
  mongoose.disconnect();
});
