"use client";

import React from "react";
import { ClipboardPaste, SlidersHorizontal, Sparkles, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: ClipboardPaste,
      title: "Paste Your Text",
      description:
        "Input any article, research report, lecture transcript, or meeting notes up to 20,000 characters into the workspace.",
    },
    {
      step: "02",
      icon: SlidersHorizontal,
      title: "Select Summary Length",
      description:
        "Choose between Short (3-5 sentences), Medium (1-2 paragraphs), or Detailed (structured key takeaways and bullet points).",
    },
    {
      step: "03",
      icon: Sparkles,
      title: "Generate & Read",
      description:
        "Watch your summary stream in real time powered by Google Gemini. Copy or regenerate with a single click.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            How SmartSummarize AI Works
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-3">
            Go from unreadable walls of text to structured, actionable intelligence in seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                {/* Step badge */}
                <div className="absolute -top-4 px-3 py-1 rounded-full bg-brand-600 text-white font-mono text-xs font-bold shadow-md shadow-brand-500/25">
                  Step {st.step}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/40 flex items-center justify-center my-4">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {st.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to action anchor */}
        <div className="mt-12 text-center">
          <a
            href="#summarizer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 hover:underline"
          >
            <span>Try it out in the workspace now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

