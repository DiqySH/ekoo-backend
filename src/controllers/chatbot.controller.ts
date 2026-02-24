import { Request, Response, NextFunction } from "express";
import { sendChat } from "../services/chatbot.service";
import { ValidationError } from "../utils/AppError";

export const chatController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { messages, temperature, maxTokens, model } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return next(new ValidationError("messages must be a non-empty array"));
    }

    const result = await sendChat(messages, { temperature, maxTokens, model });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
