import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Amartya Bhattacharya",
  description:
    "Computer science & computer engineering student at Northeastern University.",
};

const PARAGRAPHS: ReactNode[] = [
  "My name is Amartya.",
  "I’m a second-year at Northeastern studying computer engineering and computer science. I grew up around technology thanks to my two older brothers, who work in software and design, so taking things apart and building things came early. I picked the combined major because I couldn’t choose between hardware and software, and the longer I go, the less I want to. Most of what I build sits where the two meet, usually around audio and signals: a waveform generator you control by tilting it, an analog EKG, and a jazz backing-track generator that has Claude write the band.",
  "A lot of that started with music. I’ve played percussion since high school, with a special love for concert snare drum and vibraphone, and now dhol. Seeing what a rosewood marimba costs turned into my first research project, a study of cheaper bar materials. I presented it at the Acoustical Society of America, and it’s now accepted for publication in POMA.",
  "When I’m not building, I like to cook, especially Bengali food at the moment, though I’ll happily make just about anything. I also listen to everything from jazz to metal to city pop.",
  <>
    I’m looking for a 2027 co-op in audio, DSP, embedded systems, or general
    software engineering. If that sounds like your team, reach out on{" "}
    <a
      href="https://www.linkedin.com/in/amartya-bhattacharya007/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-text-primary underline decoration-brand/50 underline-offset-4 hover:text-brand transition-colors duration-200"
    >
      LinkedIn
    </a>
    .
  </>,
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
