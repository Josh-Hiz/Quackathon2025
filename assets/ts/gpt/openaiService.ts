import { OpenAI } from "openai"
import * as SecureStore from "expo-secure-store"

let openaiClient: OpenAI | null = null;

export const getOpenAIClient = async () => {
    if(openaiClient) return openaiClient
    let apiKey = await SecureStore.getItemAsync("KEY")
    if(!apiKey){
        apiKey = "MYKEY"
        await SecureStore.setItemAsync("KEY", apiKey)
    }
}
