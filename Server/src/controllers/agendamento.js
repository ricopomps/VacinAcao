import AgendamentoModel from "../models/agendamento.js";
import DiaModel from "../models/dia.js";
import moment from "moment";
import mongoose from "mongoose";
import AgendamentoService from "../service/agendamentoService/agendamentoService.js";

const requiredAgendamentoFields = ["name", "age", "schedule", "date"];

class AgendamentoController {
  async getAgendamentos(filtros) {
    const {
      name = "",
      page = 1,
      limit = 15,
      isHistorico = false,
    } = filtros.query;

    const validFiltros = {
      name,
      page,
      limit: parseInt(limit),
      isHistorico,
    };

    return await AgendamentoService.getAgendamentos(validFiltros);
  }

  async createAgendamentos(req) {
    const agendamento = req.body;
    for (const field of requiredAgendamentoFields) {
      if (!agendamento[field]) {
        return {
          statusCode: 400,
          body: { message: "Campo obrigatório" },
        };
      }
    }

    return await AgendamentoService.createAgendamentos(agendamento);
  }

  async updateAgendamento({ params: { id: _id }, body: agendamento }) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return {
        statusCode: 404,
        body: { message: "Agendamento não encontrado" },
      };
    }
    for (const field of requiredAgendamentoFields) {
      if (!agendamento[field]) {
        return {
          statusCode: 400,
          body: { message: "Campo obrigatório" },
        };
      }
    }
    return await AgendamentoService.updateAgendamento(_id, agendamento);
  }

  async deleteAgendamento(req) {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return {
        statusCode: 404,
        body: { message: "Agendamento não encontrado" },
      };
    }

    return await AgendamentoService.deleteAgendamento(_id);
  }
}

export default new AgendamentoController();
