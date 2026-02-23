import { Request, Response, NextFunction } from "express";
import { chatCompletion } from "../services/ai.service";
import { ValidationError } from "../utils/AppError";

export const chatController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { messages, temperature, maxTokens, model } = req.body;

    if (!messages) {
      return next(new ValidationError("messages is required"));
    }

    if (!Array.isArray(messages)) {
      return next(new ValidationError("messages must be an array"));
    }

    if (messages.length === 0) {
      return next(new ValidationError("messages cannot be empty"));
    }

    const options = {
      temperature: temperature ?? undefined,
      maxTokens: maxTokens ?? undefined,
      model: model ?? undefined,
    };

    const result = await chatCompletion(messages, options);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("[AI Controller Error]:", error?.message || error);
    next(error);
  }
};
