import express from "express";

import { getDias, getDia, getWeek } from "../controllers/dia.js";

const router = express.Router();

router.get("/week/:week", getWeek);
router.get("/:dia", getDia);
router.get("/", getDias);

export default router;
