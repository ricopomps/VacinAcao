import express from "express";

import {
  getAgendamentos,
  createAgendamentos,
  updateAgendamento,
  deleteAgendamento,
} from "../controllers/agendamento.js";

const router = express.Router();

router.get("/", getAgendamentos);
router.post("/", createAgendamentos);
router.patch("/:id", updateAgendamento);
router.delete("/:id", deleteAgendamento);

export default router;
