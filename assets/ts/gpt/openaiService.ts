import { OpenAI } from "openai"
import * as SecureStore from "expo-secure-store"

const openaiApiKey: string = process.env.OPENAI_API_KEY

let openaiClient: OpenAI | null = null;

export const getOpenAIClient = async () => {
    if(openaiClient) return openaiClient
    let apiKey = await SecureStore.getItemAsync("KEY")
    if(!apiKey){
        apiKey = openaiApiKey
        await SecureStore.setItemAsync("KEY", apiKey)
    }
    openaiClient = new OpenAI()
    return openaiClient
}
