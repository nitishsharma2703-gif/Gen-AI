import { generateResult } from "../services/ai.service.js";

export const generateAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const result = await generateResult(prompt);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};