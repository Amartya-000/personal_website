import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Amartya Bhattacharya",
  description:
    "Computer science & computer engineering student at Northeastern University.",
};

const PARAGRAPHS = [
  "I'm a computer science and computer engineering student at Northeastern University.",
  "More coming soon.",
];

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 pt-[14vh] md:pt-[22vh] pb-32">
        <header className="mb-10 md:mb-20">
          <h1 className="text-title font-normal text-text-primary leading-[1.05] opacity-0 animate-[fadeSlideIn_0.6s_ease_0.1s_forwards]">
            About
          </h1>
          <p className="mt-4 text-body text-text-secondary max-w-xl leading-relaxed opacity-0 animate-[fadeSlideIn_0.6s_ease_0.25s_forwards]">
            A little more on who I am and what I build.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-10 md:gap-14 items-start">
          <div className="flex flex-col gap-5 opacity-0 animate-[fadeSlideIn_0.6s_ease_0.4s_forwards]">
            {PARAGRAPHS.map((paragraph, i) => (
              <p
                key={i}
                className="text-body text-text-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="order-first md:order-last w-full max-w-[240px] md:max-w-none opacity-0 animate-[fadeSlideIn_0.6s_ease_0.35s_forwards]">
            <div className="relative aspect-[5/6] rounded-2xl overflow-hidden bg-surface-2 border border-white/[0.06]">
              <Image
                src="/amartya.png"
                alt="Amartya Bhattacharya"
                fill
                priority
                sizes="(min-width:768px) 280px, 240px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
