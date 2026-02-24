import { chatbot, CHATBOT_CONFIG, ChatCompletionMessageParam } from "../lib/chatbot";

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export const sendChat = async (
  messages: ChatCompletionMessageParam[],
  options?: ChatOptions,
): Promise<string> => {
  const completion = await chatbot.chat.completions.create({
    model: options?.model ?? CHATBOT_CONFIG.MODEL,
    messages,
    temperature: options?.temperature ?? CHATBOT_CONFIG.TEMPERATURE,
    max_tokens: options?.maxTokens ?? CHATBOT_CONFIG.MAX_TOKENS,
  });

  return completion.choices[0]?.message.content ?? "";
};
