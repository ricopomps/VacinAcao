import express from "express";

import {
  getAgendamentos,
  createAgendamentos,
} from "../controllers/agendamento.js";

const router = express.Router();

router.get("/", getAgendamentos);
router.post("/", createAgendamentos);

export default router;
