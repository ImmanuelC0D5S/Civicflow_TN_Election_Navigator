import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export const getGeminiResponse = async (userPrompt: string, history: ChatMessage[]) => {
  try {
    const getCivicGuideResponse = httpsCallable(functions, 'getCivicGuideResponse');
    
    const result = await getCivicGuideResponse({
      message: userPrompt,
      history: history,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = result.data as any;
    return data.text;
  } catch (error: any) {
    console.error("Firebase Function Error:", error);
    
    // Handle specific Firebase errors
    if (error.code === 'unauthenticated') {
      throw new Error("Please sign in to use the chatbot.");
    }
    
    throw new Error(error.message || "Failed to connect to the AI service.");
  }
};
