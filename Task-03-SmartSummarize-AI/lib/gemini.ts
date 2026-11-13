import { GoogleGenAI } from "@google/genai";

/**
 * Returns an instance of GoogleGenAI initialized with the server-side API key.
 * Throws a descriptive error if the API key is missing or invalid placeholder.
 */
export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error(
      "GEMINI_API_KEY is missing or unconfigured. Please configure a valid Google Gemini API key in your server environment or .env.local file."
    );
  }

  return new GoogleGenAI({ apiKey });
}

/**
 * Returns the configured Gemini model name with a reliable default.
 */
export function getGeminiModel(): string {
  return process.env.GEMINI_MODEL?.trim() || "gemini-3.1-flash-lite";
}
