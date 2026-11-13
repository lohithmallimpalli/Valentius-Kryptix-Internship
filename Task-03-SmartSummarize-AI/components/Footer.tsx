"use client";

import React from "react";
import { Sparkles, Heart, Github, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-950/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-brand-500/25">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                SmartSummarize AI
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              SmartSummarize AI is a production-grade, AI-powered text summarization platform.
              Built for students, researchers, engineers, and professionals to extract concise,
              meaningful insights from dense text using Google Gemini LLM.
            </p>
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
              Developed by{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">
                Lohith Mallimpalli
              </strong>{" "}
              for the AI-4 Assignment.
            </div>
          </div>

          {/* Col 2: Technology Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Technology Stack
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Next.js 14 App Router</li>
              <li>Google Gemini LLM (@google/genai)</li>
              <li>TypeScript & React 18</li>
              <li>Tailwind CSS & Lucide Icons</li>
              <li>Streaming ReadableStreams</li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#home" className="hover:text-brand-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#summarizer" className="hover:text-brand-500 transition-colors">
                  Summarizer Workspace
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-brand-500 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-brand-500 transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {currentYear} SmartSummarize AI. All rights reserved. Built with precision &amp; care.
          </p>
          <div className="flex items-center gap-1">
            <span>Crafted by</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Lohith Mallimpalli
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

