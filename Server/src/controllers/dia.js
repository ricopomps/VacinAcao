import DiaModel from "../models/dia.js";
import mongoose from "mongoose";
import moment from "moment";
import { getWeekSchedules } from "../utils/publicUtils.js";

class DiaController {
  async getDias(req) {
    try {
      const dias = await DiaModel.find();
      return {
        statusCode: 200,
        body: dias,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 404,
        body: { message: error.message },
      };
    }
  }

  async getWeek(req) {
    const { week } = req.params;
    const days = await DiaModel.find();
    const data = getWeekSchedules(week, days);
    return {
      statusCode: 200,
      body: data,
    };
  }

  async getDia(req) {
    const { dia } = req.params;
    try {
      const diaSelecionado = await DiaModel.find({
        date: moment(dia, "DDMMyyyy").format("DD/MM/yyyy"),
      });
      return {
        statusCode: 200,
        body: diaSelecionado,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 200,
        body: { message: error.message },
      };
    }
  }
}
export default new DiaController();
