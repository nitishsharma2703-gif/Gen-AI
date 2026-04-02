import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();



const app = express();

// ✅ THIS LINE IS MISSING
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// ✅ Routes
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

// console.log("API KEY:", process.env.OPENROUTER_API_KEY); 



export default app;