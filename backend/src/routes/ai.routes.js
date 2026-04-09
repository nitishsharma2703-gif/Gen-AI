import express from "express";
import * as aiController from "../controllers/ai.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { generateResult } from "../services/ai.service.js";
const router = express.Router();

// ✅ Use POST (correct for sending data)
router.post("/generate", authMiddleware.authUser, aiController.generateAiController);

export default router;

