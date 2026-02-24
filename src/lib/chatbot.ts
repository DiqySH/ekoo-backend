import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY environment variable is required!");
}

export const CHATBOT_CONFIG = {
  MODEL: process.env.CHATBOT_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct",
  TEMPERATURE: parseFloat(process.env.CHATBOT_TEMPERATURE || "0.7"),
  MAX_TOKENS: parseInt(process.env.CHATBOT_MAX_TOKENS || "2048"),
} as const;

export const chatbot = new Groq({ apiKey });

export type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
