import express from "express";

import AgendamentoController from "../controllers/agendamento.js";

const router = express.Router();

router.get("/:name", AgendamentoController.getAgendamentos);
router.get("/", AgendamentoController.getAgendamentos);
router.post("/", AgendamentoController.createAgendamentos);
router.patch("/:id", AgendamentoController.updateAgendamento);
router.delete("/:id", AgendamentoController.deleteAgendamento);

export default router;
