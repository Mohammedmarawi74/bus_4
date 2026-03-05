
import { GoogleGenAI, Type } from "@google/genai";
import { Slide } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMapImage(region: string): Promise<string> {
  const prompt = `A professional 3D isometric map of ${region}, exactly in the style of the provided reference image: teal and green gradient colors, 3D depth, clean minimalist lines, shadows, soft professional lighting, on a pure white background. High resolution, high quality, corporate design.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("Failed to generate image");
}

export async function generateCarouselContent(topic: string): Promise<Partial<Slide>[]> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `أنشئ محتوى كاروسيل احترافي باللغة العربية حول الموضوع: ${topic}. أريد 5 شرائح. لكل شريحة عنوان قصير وجذاب ووصف بسيط (حد أقصى 15 كلمة). رد بصيغة JSON فقط.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title", "description"]
        }
      }
    }
  });

  return JSON.parse(response.text);
}
