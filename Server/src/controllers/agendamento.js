import Agendamento from "../models/agendamento.js";
export const getAgendamentos = async (req, res) => {
  console.log("get");

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
