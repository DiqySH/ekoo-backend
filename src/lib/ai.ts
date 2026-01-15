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
    model: "llama-3.1-8b-instant",
    messages,
  });

  return res.choices[0]?.message.content;
};
