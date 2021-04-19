import AgendamentoModel from "../../models/agendamento.js";
import DiaModel from "../../models/dia.js";

import moment from "moment";

class AgendamentoService {
  async getAgendamentos(filtros) {
    try {
      const { name = "", page = 1, limit = 15, isHistorico = false } = filtros;
      const agendamento = await AgendamentoModel.find({
        name: new RegExp(name, "i"),
        realized: isHistorico,
      })
        .sort("date")
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      const count = await AgendamentoModel.count({
        name: new RegExp(name, "i"),
        realized: isHistorico,
      });
      return {
        statusCode: 200,
        body: { agendamentos: agendamento, count: count },
      };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, body: { message: error.message } };
    }
  }

  async createAgendamentos(agendamento) {
    try {
      const newAgendamento = new AgendamentoModel(agendamento);

      if (
        moment(agendamento.date, "DD/MM/yyyy").isSameOrBefore(
          moment(moment(), "DD/MM/yyyy"),
          "day"
        ) &&
        moment().isAfter(moment(newAgendamento.schedule, "HH:mm"))
      ) {
        return {
          statusCode: 200,
          body: { message: "Não é possível escolher uma data passada" },
        };
      }

      const dia = await DiaModel.findOne({ date: newAgendamento.date });

      if (dia) {
        if (dia.schedules ? dia.schedules.length > 19 : false) {
          return {
            statusCode: 200,
            body: { message: "Não há mais vagas para esse dia" },
          };
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
                  ) >= 60
              );
              if (idosos.length > 1) {
                return {
                  statusCode: 200,
                  body: { message: "Não há mais vagas para esse horário" },
                };
              }
              if (age >= 60) {
                const schedulesOrdenado = dia.schedules.sort(
                  (a, b) => (a, b) => {
                    moment(moment(a.age, "DD/MM/yyyy")).diff(
                      moment(b.age, "DD/MM/yyyy")
                    );
                  }
                );
                await AgendamentoModel.findByIdAndRemove(
                  schedulesOrdenado[0].pacientId
                );
              } else {
                return {
                  statusCode: 200,
                  body: {
                    message: "Vaga exclusiva para pessoas acimas de 60 anos",
                  },
                };
              }
            }
          }
        }
      }
      const newDay = new DiaModel({
        date: newAgendamento.date,
        schedules: {
          schedule: newAgendamento.schedule,
          pacientId: newAgendamento._id,
          pacientAge: newAgendamento.age,
        },
      });

      await newAgendamento.save();
      DiaModel.findOneAndUpdate(
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
      return {
        statusCode: 201,
        body: agendamento,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 404,
        body: { message: error.message },
      };
    }
  }
  async updateAgendamento(_id, agendamento) {
    try {
      const updatedAgendamento = await AgendamentoModel.findByIdAndUpdate(
        _id,
        agendamento,
        {
          new: true,
        }
      );
      return {
        statusCode: 200,
        body: updatedAgendamento,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        body: { message: error.message },
      };
    }
  }
  async deleteAgendamento(_id) {
    try {
      const agendamento = await AgendamentoModel.findOne({ _id: _id });
      await AgendamentoModel.findByIdAndRemove(_id);
      await DiaModel.update(
        { date: agendamento.date },
        { $pull: { schedules: { pacientId: _id } } },
        { safe: true, multi: true }
      );
      return {
        statusCode: 200,
        body: { message: "Deleted" },
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        body: { message: error.message },
      };
    }
  }
}

export default new AgendamentoService();
