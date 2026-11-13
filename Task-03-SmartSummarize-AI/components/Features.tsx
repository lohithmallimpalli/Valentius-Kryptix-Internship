"use client";

import React from "react";
import {
  Brain,
  Zap,
  Sliders,
  Gauge,
  Share2,
  Lock,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Summarization",
      description:
        "Harnesses Google Gemini's advanced large language model to comprehend context, extract vital facts, and generate natural, faithful summaries.",
      gradient: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 dark:bg-blue-950/40",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Zap,
      title: "Real-Time Streaming",
      description:
        "No waiting for batch processing. Watch tokens stream progressively to your screen via HTTP ReadableStreams as the AI reasons.",
      gradient: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 dark:bg-amber-950/40",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Sliders,
      title: "Multiple Summary Lengths",
      description:
        "Tailor summaries to your immediate needs: 3-5 sentence quick summaries, 1-2 paragraph overviews, or structured bulleted breakdowns.",
      gradient: "from-brand-500 to-cyan-600",
      bgLight: "bg-cyan-50 dark:bg-cyan-950/40",
      textColor: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: Gauge,
      title: "Fast Processing",
      description:
        "Optimized prompt structures and edge-compatible API routes deliver first-token latency in sub-seconds with smooth chunk rendering.",
      gradient: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/40",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Share2,
      title: "Easy Copy & Share",
      description:
        "One-click clipboard export with instant visual feedback lets you seamlessly paste clean markdown summaries into Slack, Notion, or Docs.",
      gradient: "from-purple-500 to-violet-600",
      bgLight: "bg-purple-50 dark:bg-purple-950/40",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Lock,
      title: "Secure API Integration",
      description:
        "Zero API credentials in client bundles. All communications are securely routed through server-side Next.js route handlers with input validation.",
      gradient: "from-rose-500 to-pink-600",
      bgLight: "bg-rose-50 dark:bg-rose-950/40",
      textColor: "text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-slate-50/60 dark:bg-navy-950/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Cutting-Edge Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            Engineered for Precision & Speed
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-3">
            Everything you need to digest dense content, reports, and articles in a fraction
            of the time.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 dark:hover:border-brand-400/40 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feat.bgLight} ${feat.textColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

