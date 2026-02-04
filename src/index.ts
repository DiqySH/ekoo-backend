import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.route";
import userRoutes from "./routes/user.route";

dotenv.config();

const PORT = Number(process.env.PORT) || 3333;

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.json({
    message: "Hello from Express + TypeScript",
  });
});

app.use(
  "/api/ai",
  express.json({ limit: "20mb" }),
  express.urlencoded({ extended: true, limit: "20mb" }),
  aiRoutes
);

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
