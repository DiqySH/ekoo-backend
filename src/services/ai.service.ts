import { ai } from "../lib/ai";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const chatCompletion = async (messages: ChatMessage[]) => {
  const completion = await ai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    temperature: 0.7,
  });

  return completion.choices[0]?.message.content;
};
