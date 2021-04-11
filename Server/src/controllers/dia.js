import Dia from "../models/dia.js";
import mongoose from "mongoose";

export const getDias = async (req, res) => {
  try {
    const dias = await Dia.find();
    res.status(200).json(dias);
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: error.message });
  }
};
