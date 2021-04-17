import express from "express";

import DiaController from "../controllers/dia.js";

const router = express.Router();

router.get("/week/:week", DiaController.getWeek);
router.get("/:dia", DiaController.getDia);
router.get("/", DiaController.getDias);

export default router;
