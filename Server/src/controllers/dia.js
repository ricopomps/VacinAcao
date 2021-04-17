import DiaModel from "../models/dia.js";
import mongoose from "mongoose";
import moment from "moment";
import { getWeekSchedules } from "../utils/publicUtils.js";
import DiaService from "../service/diaService/diaService.js";

class DiaController {
  async getDias() {
    return await DiaService.getDias();
  }

  async getWeek(filtro) {
    const { week = 0 } = filtro.params;
    if (isNaN(week)) {
      return {
        statusCode: 500,
        body: { message: "Week is not a number" },
      };
    }
    return await DiaService.getWeek(week);
  }

  async getDia(filtro) {
    const { dia } = filtro.params;
    return await DiaService.getDia(dia);
  }
}
export default new DiaController();
