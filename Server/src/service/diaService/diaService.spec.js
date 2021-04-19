import mongoose from "mongoose";
import DiaService from "./DiaService";
import DiaModel from "../../models/dia.js";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();

beforeAll(async () => {
  const CONNECTION_URL_TEST = process.env.CONNECTION_URL_TEST;
  await mongoose.connect(CONNECTION_URL_TEST, { useNewUrlParser: true });
});

describe("Teste do service do dia", () => {
  it("Semana de ter 7 dias", async () => {
    for (let i = 0; i < 7; i++) {
      const response = await DiaService.getWeek(i);
      expect(response.body.length).toBe(7);
    }
  });
});
