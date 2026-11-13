import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Summarizer } from "@/components/Summarizer";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <Summarizer />
        <Features />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}

