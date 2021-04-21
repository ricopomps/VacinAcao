import dotenv from "dotenv";
import mongoose from "mongoose";
import AgendamentoController from "./agendamento.js";
import AgendamentoModel from "../../models/agendamento.js";
import moment from "moment";
import request from "supertest";
import app from "../../index.js";
dotenv.config();

describe("Teste do banco de dados", () => {
  it("Agendamento pode ser criado, atualizado e deletado", async () => {
    const res = await request(app).get("/api/agendamento/");

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(77);
  });
});
