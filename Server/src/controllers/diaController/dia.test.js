import dotenv from "dotenv";
import mongoose from "mongoose";
import diaController from "./dia.js";
import diaModel from "../../models/dia.js";
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

describe("Teste do getWeek", () => {
  it("Retorna 7 dias", async () => {
    const res = await request(app).get(`/api/dia/week/${0}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(7);
  });
  it("Retorna erro caso o valor não seja um número", async () => {
    const res = await request(app).get(`/api/dia/week/${"not_a_number"}`);

    expect(res.status).toBe(500);
    expect(res.body).toStrictEqual({ message: "Week is not a number" });
  });
});

afterAll(async () => {
  mongoose.connection.db.dropDatabase();
  mongoose.disconnect();
});
