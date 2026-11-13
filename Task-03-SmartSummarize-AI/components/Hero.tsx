"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap, ShieldCheck, FileText, Cpu } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-brand-500/20 via-blue-500/15 to-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/25 text-brand-600 dark:text-brand-300 text-xs font-semibold tracking-wide uppercase mb-6 animate-fade-in shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation AI Summarizer</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          Turn Long Text Into{" "}
          <span className="bg-gradient-to-r from-brand-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Clear Insights
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Transform lengthy documents, articles and notes into concise, meaningful
          summaries with the power of AI.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#summarizer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-600 hover:from-brand-500 hover:via-blue-500 hover:to-cyan-500 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 transition-colors"
          >
            <span>How It Works</span>
          </a>
        </div>

        {/* Value Highlights */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Model</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Google Gemini</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Latency</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Real-Time Stream</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Capacity</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">20,000 Chars</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Security</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Private Server Key</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

