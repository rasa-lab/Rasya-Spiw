import { GoogleGenAI } from "@google/genai";
import axios from "axios";

export const generateAIContent = async (prompt: string, systemInstruction?: string, useSearch = false) => {
  const geminiKey = (process.env as any).GEMINI_API_KEY;
  const openRouterKey = (process.env as any).OPENROUTER_API_KEY;

  // Try Gemini first
  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          systemInstruction,
          tools: useSearch ? [{ googleSearch: {} }] : undefined
        }
      });
      if (response.text) return response.text;
    } catch (err) {
      console.warn("Gemini failed, trying OpenRouter fallback...", err);
    }
  }

  // Fallback to OpenRouter
  if (openRouterKey) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemini-2.0-flash-001", // Or any other available model
          messages: [
            { role: "system", content: systemInstruction || "You are a helpful assistant." },
            { role: "user", content: prompt }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${openRouterKey}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (err) {
      console.error("OpenRouter fallback also failed:", err);
      throw new Error("AI service unavailable");
    }
  }

  throw new Error("No API keys configured for AI service");
};
