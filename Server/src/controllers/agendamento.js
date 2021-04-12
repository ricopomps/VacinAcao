import Agendamento from "../models/agendamento.js";
import Dia from "../models/dia.js";
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
  const newDay = new Dia({
    date: newAgendamento.date,
    schedules: {
      schedule: newAgendamento.schedule,
      pacientId: newAgendamento._id,
      pacientAge: newAgendamento.age,
    },
  });
  try {
    await newAgendamento.save();
    Dia.findOneAndUpdate(
      { date: newDay.date },
      { date: newDay.date, $push: { schedules: newDay.schedules } },
      { new: true, upsert: true },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      }
    );
    await res.status(201).json(agendamento);
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
