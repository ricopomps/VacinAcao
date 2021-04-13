import Agendamento from "../models/agendamento.js";
import Dia from "../models/dia.js";
import moment from "moment";
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
    const dia = await Dia.findOne({ date: newAgendamento.date });
    if (
      moment(dia.date, "DD/MM/yyyy").isSameOrBefore(
        moment(moment(), "DD/MM/yyyy"),
        "day"
      ) &&
      moment().isAfter(moment(newAgendamento.schedule, "HH:mm"))
    ) {
      return res.json({ message: "Não é possível escolher uma data passada" });
    }
    if (dia.schedules ? dia.schedules.length > 19 : false) {
      return res.json({ message: "Não há mais vagas para esse dia" });
    }
    if (dia.schedules) {
      if (
        dia.schedules.find(
          (schedule) => schedule.schedule === newAgendamento.schedule
        )
      ) {
        const schedules = dia.schedules.filter(
          (schedule) => schedule.schedule === newAgendamento.schedule
        );
        if (schedules.length > 1) {
          const age = moment().diff(
            moment(newAgendamento.age, "DD/MM/yyyy"),
            "years"
          );

          const idosos = schedules.filter(
            (schedule) =>
              moment().diff(
                moment(schedule.pacientAge, "DD/MM/yyyy"),
                "years"
              ) > 60
          );
          if (idosos.length > 1) {
            return res.json({ message: "Não há mais vagas para esse horário" });
            return;
          }
          if (age > 60) {
            const schedulesOrdenado = dia.schedules.sort((a, b) => (a, b) => {
              moment(moment(a.age, "DD/MM/yyyy")).diff(
                moment(b.age, "DD/MM/yyyy")
              );
            });
            await Agendamento.findByIdAndRemove(schedulesOrdenado[0].pacientId);
          } else {
            return res.json({
              message: "Vaga exclusiva para pessoas acimas de 60 anos",
            });
          }
        }
      }
    }
    const newDay = new Dia({
      date: newAgendamento.date,
      schedules: {
        schedule: newAgendamento.schedule,
        pacientId: newAgendamento._id,
        pacientAge: newAgendamento.age,
      },
    });

    await newAgendamento.save();
    Dia.findOneAndUpdate(
      { date: newDay.date },
      { date: newDay.date, $push: { schedules: newDay.schedules } },
      { new: true, upsert: true },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(data);
        }
      }
    );
    res.status(201).json(agendamento);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAgendamento = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Agendamento não encontrado");

    await Agendamento.findByIdAndRemove(_id);

    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
