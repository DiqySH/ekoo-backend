import { Router } from "express";
import { chatController } from "../controllers/ai.controller";
import { validate, commonValidators } from "../middlewares/validateInput";

const router = Router();

const chatValidation = validate([commonValidators.messages]);

router.post("/chat", chatValidation, chatController);

export default router;
