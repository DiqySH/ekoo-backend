import { Content } from "../@types/ai.type";
import { ai } from "../lib/ai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionUserMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionAssistantMessageParam,
} from "groq-sdk/resources/chat/completions";

export type ChatMessage =
  | ({
      role: "system";
      content: string;
    } & ChatCompletionSystemMessageParam)
  | ({
      role: "user";
      content: Content;
    } & ChatCompletionUserMessageParam)
  | ({
      role: "assistant";
      content: string;
    } & ChatCompletionAssistantMessageParam);

export const chatCompletion = async (messages: ChatMessage[]) => {
  const completion = await ai.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages,
    temperature: 0.7,
  });

  return completion.choices[0]?.message.content;
};
