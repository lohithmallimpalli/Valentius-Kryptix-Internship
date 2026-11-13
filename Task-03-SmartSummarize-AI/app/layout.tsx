import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const viewport: Viewport = {
  themeColor: "#050c18",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SmartSummarize AI — AI-Powered Text Summarizer",
  description:
    "Transform lengthy documents, articles and notes into concise, meaningful summaries with the power of Google Gemini AI. Real-time streaming, multiple summary lengths, and instant clipboard export.",
  keywords: [
    "AI summarizer",
    "text summarizer",
    "Google Gemini",
    "SmartSummarize AI",
    "streaming AI",
    "article summarizer",
  ],
  authors: [{ name: "Lohith Mallimpalli" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
