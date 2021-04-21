import express from "express";
import { adaptRoute } from "../middleware/adaptRoute.js";
import DiaController from "../controllers/diaController/dia.js";

const router = express.Router();

router.get("/week/:week", adaptRoute(DiaController.getWeek));

export default router;
