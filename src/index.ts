import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.route";

dotenv.config();

const PORT = Number(process.env.PORT) || 3333;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.json({
    message: "Hello from Express + TypeScript",
  });
});

app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
