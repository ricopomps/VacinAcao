import express from "express";
import { adaptRoute } from "../middleware/adaptRoute.js";
import AgendamentoController from "../controllers/agendamento.js";

const router = express.Router();

router.get("/", adaptRoute(AgendamentoController.getAgendamentos));
router.post("/", AgendamentoController.createAgendamentos);
router.patch("/:id", AgendamentoController.updateAgendamento);
router.delete("/:id", AgendamentoController.deleteAgendamento);

export default router;
