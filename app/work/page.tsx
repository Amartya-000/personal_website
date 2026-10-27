import type { Metadata } from "next";
import LangText from "@/components/LangText";
import WorkGrid from "@/components/WorkGrid";
import { WORK_ITEMS } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work — Amartya Bhattacharya",
  description: "Selected projects and engineering work.",
};

export default function WorkPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 pt-[14vh] md:pt-[22vh] pb-32">
        <header className="mb-10 md:mb-20">
          <h1
            className="text-title font-normal text-text-primary leading-[1.05] opacity-0 animate-[fadeSlideIn_0.6s_ease_0.1s_forwards]"
          >
            <LangText en="Work" bn="কাজ" />
          </h1>
          <p
            className="mt-4 text-body text-text-secondary max-w-xl leading-relaxed opacity-0 animate-[fadeSlideIn_0.6s_ease_0.25s_forwards]"
          >
            <LangText
              en="Selected projects and engineering work."
              bn="বাছাই করা কিছু প্রজেক্ট আর ইঞ্জিনিয়ারিংয়ের কাজ।"
            />
          </p>
        </header>

        <WorkGrid items={WORK_ITEMS} />
      </div>
    </main>
  );
}
