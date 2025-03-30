import { OpenAI } from 'openai';

let openaiClient: OpenAI | null = null;

export const getOpenAIClient = async () => {
	if (openaiClient) return openaiClient;
	openaiClient = new OpenAI({
		baseURL: process.env.EXPO_PUBLIC_DEEPSEEK_BASE_URL,
		apiKey: process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY,
	});
	return openaiClient;
};
