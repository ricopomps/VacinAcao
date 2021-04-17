import DiaModel from "../models/dia.js";
import mongoose from "mongoose";
import moment from "moment";
import { getWeekSchedules } from "../utils/publicUtils.js";

class DiaController {
  async getDias(req, res) {
    try {
      const dias = await DiaModel.find();
      res.status(200).json(dias);
    } catch (error) {
      console.log(error);

      res.status(404).json({ message: error.message });
    }
  }

  async getWeek(req, res) {
    const { week } = req.params;
    const days = await DiaModel.find();
    const data = getWeekSchedules(week);
    res.status(200).json(data);
  }

  async getDia(req, res) {
    const { dia } = req.params;
    try {
      const diaSelecionado = await DiaModel.find({
        date: moment(dia, "DDMMyyyy").format("DD/MM/yyyy"),
      });
      res.status(200).json(diaSelecionado);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}
export default new DiaController();
