import Dia from "../models/dia.js";
import mongoose from "mongoose";
import moment from "moment";
import { getWeekSchedules } from "../utils/publicUtils.js";

export const getDias = async (req, res) => {
  try {
    const dias = await Dia.find();
    res.status(200).json(dias);
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: error.message });
  }
};

export const getWeek = async (req, res) => {
  const data = await getWeekSchedules();
  res.status(200).json(data);
};

export const getDia = async (req, res) => {
  const { dia } = req.params;
  try {
    const diaSelecionado = await Dia.find({
      date: moment(dia, "DDMMyyyy").format("DD/MM/yyyy"),
    });
    res.status(200).json(diaSelecionado);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
