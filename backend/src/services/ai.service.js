import dotenv from "dotenv";
dotenv.config();

import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MODELS = [
  // "openai/gpt-5.2",
  // "mistralai/mistral-7b-instruct",
  // "stepfun/step-3.5-flash:free", 
  "nvidia/nemotron-3-super-120b-a12b:free",
  "arcee-ai/trinity-large-preview:free",
  "z-ai/glm-4.5-air:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "minimax/minimax-m2.5:free",
  "openai/gpt-oss-120b:free",
  "arcee-ai/trinity-mini:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "nvidia/llama-nemotron-embed-vl-1b-v2:free",
  "openai/gpt-oss-20b:free",
  "qwen/qwen3-coder:free",
  "google/gemma-4-31b-it:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "liquid/lfm-2.5-1.2b-thinking:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
  "google/gemma-3-27b-it:free",
  "google/gemma-3-27b-it:free",
  


];

export const generateResult = async (prompt) => {
  for (let model of MODELS) {
    try {
      console.log("Trying model:", model);

      const completion = await openrouter.chat.send({
        chatGenerationParams: {
          model,
          messages: [{ role: "user", content: prompt }],
        },
      });

      return completion.choices[0].message.content;

    } catch (error) {
      console.log(`❌ Failed with ${model}`);
    }
  }

  
};