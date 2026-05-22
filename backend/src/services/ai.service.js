export const generateResult = async (prompt) => {
  // Pehle 4-5 active aur fast free models ka subset bana lein
  const fastModels = [
     "openai/gpt-5.2",
  "stepfun/step-3.5-flash:free", 
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

  // Sabhi models ko ek saath fire karein (Racing)
  const promises = fastModels.map(async (model) => {
    try {
      const completion = await openrouter.chat.send({
        chatGenerationParams: {
          model,
          messages: [{ role: "user", content: prompt }],
        },
      });
      
      if (completion?.choices?.[0]?.message?.content) {
        return { model, content: completion.choices[0].message.content };
      }
      throw new Error("Empty response");
    } catch (err) {
      throw new Error(`Model ${model} failed`);
    }
  });

  try {
    // Jo sabse pehle resolve hoga, wo jeet jayega
    const fastestResponse = await Promise.any(promises);
    console.log(`⚡ Winner Model: ${fastestResponse.model}`);
    return fastestResponse.content;
  } catch (error) {
    console.error("❌ Saare fast models fail ho gaye");
    
    // Fallback: Agar upar ke saare fail ho gaye, to bache hue models par normal loop chala lein
    return "Error: Unable to get response from any model.";
  }
};