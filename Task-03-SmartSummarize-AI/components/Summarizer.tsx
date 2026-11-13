"use client";

import React, { useState, useRef } from "react";
import { InputPanel } from "./InputPanel";
import { OutputPanel } from "./OutputPanel";
import { SummaryLength, MAX_INPUT_CHARACTERS, EXAMPLE_TEXTS } from "@/lib/prompts";

export function Summarizer() {
  const [text, setText] = useState<string>("");
  const [length, setLength] = useState<SummaryLength>("medium");
  const [summary, setSummary] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [exampleIndex, setExampleIndex] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Clear validation when text changes
  const handleTextChange = (newText: string) => {
    setText(newText);
    if (validationError) {
      if (newText.trim().length > 0 && newText.length <= MAX_INPUT_CHARACTERS) {
        setValidationError(null);
      }
    }
  };

  // Cycle through sample texts
  const handleInsertExample = () => {
    const selected = EXAMPLE_TEXTS[exampleIndex % EXAMPLE_TEXTS.length];
    setText(selected.text);
    setValidationError(null);
    setExampleIndex((prev) => prev + 1);
  };

  const handleClearInput = () => {
    setText("");
    setValidationError(null);
  };

  const handleClearSummary = () => {
    setSummary("");
    setError(null);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  const handleGenerate = async () => {
    // 1. Validation checks
    const trimmed = text.trim();
    if (!trimmed) {
      setValidationError("Please enter or paste text before generating a summary.");
      return;
    }

    if (trimmed.length > MAX_INPUT_CHARACTERS) {
      setValidationError(
        `Character limit exceeded! Your text contains ${trimmed.length.toLocaleString()} characters (max: ${MAX_INPUT_CHARACTERS.toLocaleString()}).`
      );
      return;
    }

    setValidationError(null);
    setError(null);
    setSummary("");
    setIsStreaming(true);

    // Cancel existing request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: trimmed,
          length,
        }),
        signal: controller.signal,
      });

      // Handle non-200 responses
      if (!response.ok) {
        let errMessage = "Failed to generate summary.";
        try {
          const errData = await response.json();
          errMessage = errData.error || errMessage;
        } catch {
          const textErr = await response.text();
          if (textErr) errMessage = textErr;
        }
        setError(errMessage);
        setIsStreaming(false);
        return;
      }

      // Handle streaming body
      if (!response.body) {
        setError("Readable stream not supported or empty response from server.");
        setIsStreaming(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          setSummary((prev) => prev + chunk);
        }
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Summarization request aborted by user.");
      } else {
        console.error("Fetch summarization error:", err);
        setError(
          err.message ||
            "A network error occurred. Please check your internet connection and try again."
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <section id="summarizer" className="relative py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Workspace
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Summarize Any Content in Seconds
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Paste your raw text on the left, pick your preferred summary format, and watch
            Google Gemini distill the key takeaways in real time.
          </p>
        </div>

        {/* Two-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* LEFT PANEL: Input */}
          <InputPanel
            text={text}
            setText={handleTextChange}
            length={length}
            setLength={setLength}
            onGenerate={handleGenerate}
            onClear={handleClearInput}
            onInsertExample={handleInsertExample}
            onStop={handleStop}
            isStreaming={isStreaming}
            validationError={validationError}
          />

          {/* RIGHT PANEL: Output */}
          <OutputPanel
            summary={summary}
            isStreaming={isStreaming}
            error={error}
            onRegenerate={handleGenerate}
            onClear={handleClearSummary}
            originalTextLength={text.length}
          />
        </div>
      </div>
    </section>
  );
}

