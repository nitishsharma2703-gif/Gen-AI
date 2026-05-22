import { generateResult } from "../services/ai.service.js";

export const  generateAiController = async (prompt) => {
  for (let model of MODELS) {
    try {
      console.log("Trying model:", model);

      // Timeout logic wrapper
      const response = await Promise.race([
        openrouter.chat.send({
          chatGenerationParams: {
            model,
            messages: [{ role: "user", content: prompt }],
          },
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), 3500) // 3.5 seconds timeout
        )
      ]);

      return response.choices[0].message.content;
    } catch (error) {
      console.log(`❌ Failed or Timed out with ${model}`);
      // Turant agle model par jump karega bina wait kiye
    }
  }
};
// export const generateInterviewReportController = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Resume file is required" });
//     }

//     const { selfDescription, jobDescription } = req.body;

//     if (!selfDescription || !jobDescription) {
//       return res.status(400).json({
//         error: "selfDescription and jobDescription are required"
//       });
//     }

//     // ✅ Parse PDF correctly
//     const pdfData = await pdfParse(req.file.buffer);
//     const resumeText = pdfData.text;

//     // ✅ Call AI
//     const result = await generateResult(
//       resumeText,
//       selfDescription,
//       jobDescription
//     );

//     // ✅ Validate
//     if (!result || !result.matchScore) {
//       return res.status(500).json({
//         error: "Incomplete AI response",
//         data: result
//       });
//     }

//     // ✅ Save
//     const report = await InterviewReport.create({
//       resume: resumeText,
//       selfDescription,
//       jobDescription,
//       ...result
//     });

//     res.status(200).json({
//       success: true,
//       data: report
//     });

//   } catch (error) {
//     console.error("Controller Error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

