import { ai } from "../lib/ai";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

export const chatCompletion = async (
  messages: ChatCompletionMessageParam[]
) => {
  const completion = await ai.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages,
    temperature: 0.7,
  });

  return completion.choices[0]?.message.content ?? "";
};
