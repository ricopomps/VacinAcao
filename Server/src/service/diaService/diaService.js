import DiaModel from "../../models/dia.js";
import { getWeekSchedules } from "../../utils/publicUtils.js";

class DiaService {
  async getDias() {
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
  async getWeek(week) {
    const days = await DiaModel.find();
    const data = getWeekSchedules(week, days);
    return {
      statusCode: 200,
      body: data,
    };
  }
  async getDia(dia) {
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

export default new DiaService();
