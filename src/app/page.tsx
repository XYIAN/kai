"use client";

import { Chat } from "@/components/Chat";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { PortfolioHeader } from "@/components/PortfolioHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      <PortfolioHeader />

      {/* Main Content */}
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          <Chat />
        </div>
      </div>
    </main>
  );
}
