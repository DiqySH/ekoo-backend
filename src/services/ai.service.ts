import { ai, AI_CONFIG, ChatCompletionMessageParam } from "../lib/ai";

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export const chatCompletion = async (
  messages: ChatCompletionMessageParam[],
  options?: ChatCompletionOptions,
): Promise<string> => {
  const completion = await ai.chat.completions.create({
    model: options?.model || AI_CONFIG.MODEL,
    messages,
    temperature: options?.temperature || AI_CONFIG.TEMPERATURE,
    max_tokens: options?.maxTokens || AI_CONFIG.MAX_TOKENS,
  });

  return completion.choices[0]?.message.content ?? "";
};
