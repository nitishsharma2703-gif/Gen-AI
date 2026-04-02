import express from "express";
import { generateAI } from "../controllers/ai.controller.js";

const router = express.Router();

// ✅ correct (NO brackets)
router.get("/generate", generateAI);

export default router;

