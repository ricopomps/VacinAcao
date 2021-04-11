import express from "express";

import { getDias } from "../controllers/dia.js";

const router = express.Router();

router.get("/", getDias);

export default router;
