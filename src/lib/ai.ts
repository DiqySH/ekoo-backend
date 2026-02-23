import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

export const AI_CONFIG = {
  MODEL: process.env.AI_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct",
  TEMPERATURE: parseFloat(process.env.AI_TEMPERATURE || "0.7"),
  MAX_TOKENS: parseInt(process.env.AI_MAX_TOKENS || "2048"),
} as const;

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is required!");
}

export const ai = new Groq({
  apiKey: GROQ_API_KEY,
});

export type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
