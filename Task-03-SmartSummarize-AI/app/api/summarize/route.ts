import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, getGeminiModel } from "@/lib/gemini";
import {
  buildSummarizationPrompt,
  MAX_INPUT_CHARACTERS,
  SYSTEM_INSTRUCTION,
  SummaryLength,
} from "@/lib/prompts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Helper to delay for backoff retry
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function parseGeminiErrorMessage(rawMsg: string): string {
  try {
    const parsed = JSON.parse(rawMsg);
    if (parsed.error?.message) {
      try {
        const nested = JSON.parse(parsed.error.message);
        if (nested.error?.message) return nested.error.message;
      } catch {
        return parsed.error.message;
      }
    }
  } catch {
    // raw text
  }
  return rawMsg;
}

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const { text, length = "medium" } = body || {};

    // 1. Validate text presence and non-emptiness
    if (typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        {
          error:
            "Please provide text to summarize. The input cannot be empty or contain only whitespace.",
        },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();

    // 2. Validate maximum character limit (20,000 characters)
    if (trimmedText.length > MAX_INPUT_CHARACTERS) {
      return NextResponse.json(
        {
          error: `Input text exceeds the maximum character limit of ${MAX_INPUT_CHARACTERS.toLocaleString()} characters (your text has ${trimmedText.length.toLocaleString()} characters). Please shorten your input and try again.`,
        },
        { status: 400 }
      );
    }

    // 3. Validate summary length option
    const validLengths: SummaryLength[] = ["short", "medium", "detailed"];
    const selectedLength: SummaryLength = validLengths.includes(length)
      ? length
      : "medium";

    // 4. Initialize Gemini client
    let ai;
    try {
      ai = getGeminiClient();
    } catch (clientErr: any) {
      return NextResponse.json(
        {
          error:
            clientErr?.message ||
            "Gemini API key is not configured on the server. Please check .env.local.",
        },
        { status: 500 }
      );
    }

    const modelName = getGeminiModel();
    const prompt = buildSummarizationPrompt(trimmedText, selectedLength);

    // 5. Initiate streaming response from Gemini with backoff retry for transient spikes
    let responseStream: any;
    let lastError: any = null;
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        responseStream = await ai.models.generateContentStream({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2, // Low temperature for high factual accuracy
          },
        });
        break; // Success!
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || "";
        const isTransient =
          msg.includes("503") ||
          msg.includes("UNAVAILABLE") ||
          msg.includes("high demand") ||
          msg.includes("429") ||
          msg.includes("RESOURCE_EXHAUSTED");

        if (isTransient && attempt < maxAttempts) {
          console.warn(`Transient Gemini error on attempt ${attempt}. Retrying in ${attempt * 800}ms...`);
          await sleep(attempt * 800);
          continue;
        }
        break;
      }
    }

    if (!responseStream && lastError) {
      console.error("Gemini API call error after retries:", lastError);
      const rawMsg = lastError?.message || "";
      const cleanMsg = parseGeminiErrorMessage(rawMsg);

      if (
        rawMsg.includes("API_KEY_INVALID") ||
        rawMsg.includes("API key not valid") ||
        rawMsg.includes("401")
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid Gemini API key provided. Please verify your GEMINI_API_KEY in .env.local or Google AI Studio.",
          },
          { status: 401 }
        );
      }

      if (
        rawMsg.includes("RESOURCE_EXHAUSTED") ||
        rawMsg.includes("quota") ||
        rawMsg.includes("429")
      ) {
        return NextResponse.json(
          {
            error:
              "Gemini API rate limit or quota exceeded. Please wait a few moments and try again.",
          },
          { status: 429 }
        );
      }

      if (rawMsg.includes("503") || rawMsg.includes("UNAVAILABLE")) {
        return NextResponse.json(
          {
            error:
              "Gemini service is temporarily experiencing high traffic spikes. Please click Regenerate in a few moments.",
          },
          { status: 503 }
        );
      }

      if (rawMsg.includes("NOT_FOUND") || rawMsg.includes("404")) {
        return NextResponse.json(
          {
            error: `The specified Gemini model '${modelName}' was not found or is deprecated. Try setting GEMINI_MODEL=gemini-3.1-flash-lite in .env.local.`,
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          error:
            cleanMsg ||
            "An unexpected error occurred while communicating with the Gemini API.",
        },
        { status: 502 }
      );
    }

    // 6. Convert the async iterable into a ReadableStream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const chunkText = chunk.text;
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (streamErr: any) {
          console.error("Stream reading error:", streamErr);
          const errorMsg = `\n\n[Stream Error: ${
            streamErr?.message || "Generation interrupted"
          }]`;
          controller.enqueue(encoder.encode(errorMsg));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: any) {
    console.error("Unhandled error in /api/summarize:", err);
    return NextResponse.json(
      {
        error:
          err?.message ||
          "An internal server error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
