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

describe("Teste do Controller", () => {
  it("Recebe status 200 e 0 agendamentos", async () => {
    const res = await request(app).get("/api/agendamento/");

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(0);
  });
});
