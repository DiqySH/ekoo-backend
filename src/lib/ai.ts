import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

export const ai = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export const chat = async (
  messages: { role: "system" | "user" | "assistant"; content: string }[]
) => {
  const res = await ai.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages,
  });

  return res.choices[0]?.message.content;
};
