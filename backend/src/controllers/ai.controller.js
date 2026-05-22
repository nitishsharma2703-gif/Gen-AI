import { generateResult } from "../services/ai.service.js";

export const generateAiController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await generateResult(prompt);

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: error.message });
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

