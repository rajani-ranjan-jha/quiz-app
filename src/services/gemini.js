import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem("GEMINI_API_KEY");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const setApiKey = (key) => {
    localStorage.setItem("GEMINI_API_KEY", key);
};

export const generateQuiz = async (topic, count = 5, difficulty = "Medium", apiKey = null) => {
    const keyToUse = apiKey || GEMINI_API_KEY;
    if (!keyToUse) {
        throw new Error("API Key is missing. Please provide a Google Gemini API Key.");
    }

    const ai = new GoogleGenerativeAI(keyToUse);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate ${count} multiple-choice quiz questions about "${topic}" with a difficulty level of "${difficulty}". 
    
    Return the response strictly as a valid JSON array of objects. Do not include markdown formatting like \`\`\`json.
    
    Each object must strictly follow this schema:
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "The distinct correct option string from the options array",
      "category": "${topic}",
      "explanation": "A short explanation of why the answer is correct"
    }
    
    Ensure the "correct_answer" is EXACTLY one of the strings in "options".
    And make sure the correct_answer is not repeated in the options. It should vary among questions.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        const questions = JSON.parse(cleanedText);
        
        
        if (!Array.isArray(questions)) throw new Error("Invalid format received from AI");
            
        return questions;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error(error.message || "Failed to generate quiz. Please try again or check your API key.");
    }
};
