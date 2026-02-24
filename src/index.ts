import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import chatbotRoutes from "./routes/chatbot.routes";
import userRoutes from "./routes/user.routes";
import walletRoutes from "./routes/wallet.routes";
import { errorHandler } from "./middlewares/errorHandler";
import helmet from "helmet";

dotenv.config();

const PORT = Number(process.env.PORT) || 3333;

const app = express();

app.use(helmet());

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

app.use("/api/chatbot", chatbotRoutes);
app.use("/api/user", userRoutes);
app.use("/api/wallets", walletRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
