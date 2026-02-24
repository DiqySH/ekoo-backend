import { Router } from "express";
import { chatController } from "../controllers/chatbot.controller";
import { validate, commonValidators } from "../middlewares/validateInput";

const router = Router();

router.post("/chat", validate([commonValidators.messages]), chatController);

export default router;
