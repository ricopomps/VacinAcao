import express from "express";

import {
  getAgendamentos,
  createAgendamentos,
  updateAgendamento,
} from "../controllers/agendamento.js";

const router = express.Router();

router.get("/", getAgendamentos);
router.post("/", createAgendamentos);
router.patch("/:id", updateAgendamento);

export default router;
