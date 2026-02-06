
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const genAI = new GoogleGenAI({ apiKey });

export async function getLabAssistantHint(puzzleId: string, progress: string): Promise<string> {
  if (!apiKey) return "The lab assistant seems to be offline (Missing API Key).";

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Lab Assistant in "The Microscopy Escape Room". 
      The player is at puzzle: ${puzzleId}. 
      Their current progress/status is: ${progress}. 
      Give a subtle, helpful, and scientific hint in 2 sentences maximum. 
      Keep the tone encouraging and mysterious.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "I'm not sure how to help right now, keep exploring!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The radio crackles... I can't hear you clearly. Keep trying!";
  }
}
