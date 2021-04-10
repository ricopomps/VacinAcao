import Agendamento from "../models/agendamento.js";
import mongoose from "mongoose";

export const getAgendamentos = async (req, res) => {
  try {
    const agendamento = await Agendamento.find();
    res.status(200).json(agendamento);
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: error.message });
  }
};

export const createAgendamentos = async (req, res) => {
  const agendamento = req.body;
  const newAgendamento = new Agendamento(agendamento);
  try {
    await newAgendamento.save();
    res.status(201).json(agendamento);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateAgendamento = async (req, res) => {
  const { id: _id } = req.params;
  const agendamento = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Agendamento não encontrado");

    const updatedAgendamento = await Agendamento.findByIdAndUpdate(
      _id,
      agendamento,
      {
        new: true,
      }
    );

    res.status(200).json(updatedAgendamento);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteAgendamento = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Agendamento não encontrado");

    await Agendamento.findByIdAndRemove(_id);

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
