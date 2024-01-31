import OpenAI from "openai";

export function getOpenAIClient() {
  const baseUrl = process.env.OPENAI_BASE_URL;
  const apiKey = process.env.OPENAI_API_KEY;

  const openai = new OpenAI({
    baseURL: baseUrl,
    apiKey: apiKey,
  });

  return openai;
}
