"use client";

import React from "react";
import {
  FileText,
  RotateCcw,
  Sparkles,
  AlertCircle,
  BookOpen,
  Loader2,
  StopCircle,
} from "lucide-react";
import { SummaryLength, MAX_INPUT_CHARACTERS } from "@/lib/prompts";

interface InputPanelProps {
  text: string;
  setText: (text: string) => void;
  length: SummaryLength;
  setLength: (length: SummaryLength) => void;
  onGenerate: () => void;
  onClear: () => void;
  onInsertExample: () => void;
  onStop: () => void;
  isStreaming: boolean;
  validationError: string | null;
}

export function InputPanel({
  text,
  setText,
  length,
  setLength,
  onGenerate,
  onClear,
  onInsertExample,
  onStop,
  isStreaming,
  validationError,
}: InputPanelProps) {
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isOverLimit = charCount > MAX_INPUT_CHARACTERS;
  const progressPercent = Math.min(100, (charCount / MAX_INPUT_CHARACTERS) * 100);

  const lengthDescriptions: Record<SummaryLength, { label: string; desc: string }> = {
    short: {
      label: "Short",
      desc: "3–5 concise sentences",
    },
    medium: {
      label: "Medium",
      desc: "1–2 balanced paragraphs",
    },
    detailed: {
      label: "Detailed",
      desc: "Structured key points & takeaways",
    },
  };

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-5 sm:p-6 transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/40">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">
              Enter Your Text
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste long articles, reports, or research notes
            </p>
          </div>
        </div>

        {/* Quick Actions: Example & Clear */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onInsertExample}
            disabled={isStreaming}
            title="Load sample text"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 disabled:opacity-50 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sample Text</span>
          </button>

          {text.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              disabled={isStreaming}
              title="Clear input text"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 disabled:opacity-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Text Area */}
      <div className="relative flex-1 mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article, document or content here (up to 20,000 characters)..."
          disabled={isStreaming}
          rows={12}
          className={`w-full h-full min-h-[260px] sm:min-h-[300px] p-4 text-sm sm:text-base rounded-xl bg-slate-50/70 dark:bg-navy-950/60 border ${
            isOverLimit
              ? "border-rose-500 focus:ring-rose-500"
              : "border-slate-200 dark:border-slate-800 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-brand-500/20"
          } text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none focus:outline-none focus:ring-2 transition-all leading-relaxed`}
        />
      </div>

      {/* Live Progress & Counter Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-600 dark:text-slate-400">
            Words: <strong className="text-slate-900 dark:text-white">{wordCount.toLocaleString()}</strong>
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span
            className={`font-medium ${
              isOverLimit
                ? "text-rose-600 dark:text-rose-400 font-semibold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Characters:{" "}
            <strong className={isOverLimit ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"}>
              {charCount.toLocaleString()}
            </strong>{" "}
            / {MAX_INPUT_CHARACTERS.toLocaleString()}
          </span>
        </div>

        {/* Small Visual Progress Bar */}
        <div className="w-28 sm:w-36 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isOverLimit
                ? "bg-rose-500"
                : progressPercent > 85
                ? "bg-amber-500"
                : "bg-brand-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Validation Message if any */}
      {validationError && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Summary Length Selector */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Select Summary Length:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["short", "medium", "detailed"] as SummaryLength[]).map((len) => {
            const isSelected = length === len;
            const info = lengthDescriptions[len];
            return (
              <button
                key={len}
                type="button"
                onClick={() => setLength(len)}
                disabled={isStreaming}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-brand-500/10 dark:bg-brand-500/20 border-brand-500 text-brand-700 dark:text-brand-300 shadow-sm"
                    : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                } disabled:opacity-50`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs sm:text-sm capitalize">
                    {info.label}
                  </span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-brand-600 bg-brand-600 dark:border-brand-400 dark:bg-brand-400"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <p className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 line-clamp-1">
                  {info.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generate / Stop Button */}
      <div className="mt-5">
        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/25 transition-all"
          >
            <StopCircle className="w-4 h-4" />
            <span>Stop Generating</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onGenerate}
            disabled={!text.trim() || isOverLimit}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-600 hover:from-brand-500 hover:via-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Summary</span>
          </button>
        )}
      </div>
    </div>
  );
}

