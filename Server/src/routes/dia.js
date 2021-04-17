import express from "express";
import { adaptRoute } from "../middleware/adaptRoute.js";
import DiaController from "../controllers/dia.js";

const router = express.Router();

router.get("/week/:week", adaptRoute(DiaController.getWeek));
router.get("/:dia", adaptRoute(DiaController.getDia));
router.get("/", adaptRoute(DiaController.getDias));

export default router;
