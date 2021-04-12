import express from "express";

import { getDias, getDia } from "../controllers/dia.js";

const router = express.Router();

router.get("/:dia", getDia);
router.get("/", getDias);

export default router;
