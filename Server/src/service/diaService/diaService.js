import DiaModel from "../../models/dia.js";
import { getWeekSchedules } from "../../utils/publicUtils.js";

class DiaService {
  async getWeek(week) {
    const days = await DiaModel.find();
    const data = getWeekSchedules(week, days);
    return {
      statusCode: 200,
      body: data,
    };
  }
}

export default new DiaService();
