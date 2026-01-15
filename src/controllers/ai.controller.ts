import { Request, Response } from "express";
import { chatCompletion } from "../services/ai.service";

export const chatController = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    console.log("INCOMING MESSAGES:", JSON.stringify(messages, null, 2));

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        message: "messages must be an array",
      });
    }

    const result = await chatCompletion(messages);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("AI Controller Error:");
    console.error(error?.response?.data || error?.message || error);

    res.status(500).json({
      success: false,
      message: "AI processing failed",
      error: error?.message,
    });
  }
};
