import dotenv from "dotenv";
dotenv.config();

import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

console.log("API KEY:", process.env.OPENROUTER_API_KEY); // should print your key

export const generateResult = async (prompt) => {
  try {
    const response = await openrouter.chat.send({
      chatGenerationParams: {
        model: "stepfun/step-3.5-flash:free",
        messages: [{ role: "user", content: prompt }]
      }
    });

    return response.output_text || response.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("Service Error:", error.message);
    throw error;
  }
};