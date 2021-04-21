import express from "express";
import { adaptRoute } from "../middleware/adaptRoute.js";
import AgendamentoController from "../controllers/agendamentoController/agendamento.js";

const router = express.Router();

router.get("/", adaptRoute(AgendamentoController.getAgendamentos));
router.post("/", adaptRoute(AgendamentoController.createAgendamentos));
router.patch("/:id", adaptRoute(AgendamentoController.updateAgendamento));
router.delete("/:id", adaptRoute(AgendamentoController.deleteAgendamento));

export default router;
