import Groq from "groq-sdk";
import dotenv from "dotenv";
import { Content } from "../@types/ai.type";

dotenv.config();

export const ai = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: Content;
};

function normalizeContent(content: any): string {
  if (!content) return "";

  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((c) => {
        if (typeof c === "string") return c;
        if (typeof c === "object" && "text" in c) return c.text;
        return "";
      })
      .join("");
  }

  if (typeof content === "object" && "text" in content) {
    return content.text;
  }

  return "";
}

export const chat = async (messages: ChatMessage[]) => {
  const res = await ai.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: messages.map((m) => ({
      role: m.role,
      content: normalizeContent(m.content),
    })),
  });

  return normalizeContent(res.choices[0]?.message?.content);
};
