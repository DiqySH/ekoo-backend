import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.route";
import userRoutes from "./routes/user.route";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const PORT = Number(process.env.PORT) || 3333;

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
