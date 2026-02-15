
import { GoogleGenAI, Type } from "@google/genai";

export const getAnimeRecommendation = async (mood: string) => {
  // Always use process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on a mood described as "${mood}", suggest 3 anime series and 3 types of merchandise (e.g., Figures, Hoodies, Keychains) that would match. Return the result in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  series: { type: Type.STRING },
                  merchType: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["series", "merchType", "reason"]
              }
            }
          },
          required: ["suggestions"]
        }
      }
    });

    // Access .text property directly as per guidelines
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { suggestions: [] };
  }
};
