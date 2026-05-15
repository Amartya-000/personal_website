"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  isBengali: boolean;
}

export default function Hero({ isBengali }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-start pt-[26vh] md:pt-[22vh] px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Portrait image — right side, shifted lower */}
      <div className="hidden md:block absolute right-[6%] lg:right-[10%] top-[55%] -translate-y-1/2 z-0">
        <div className="relative w-[32vw] max-w-[460px] min-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden">
          <Image
            src="/amartya.jpg"
            alt="Amartya Bhattacharya"
            fill
            priority
            className="object-cover"
            sizes="32vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0b0a] opacity-40" />
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-10">
        <AnimatePresence mode="wait">
          <motion.h1
            key={isBengali ? "bn" : "en"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <span className="text-2xl sm:text-3xl lg:text-5xl font-[family-name:var(--font-geist)] font-normal text-[#3a3c3a]">
              {isBengali ? "\u0986\u09AE\u09BF" : "Hi, I\u2019m"}
            </span>
            <span className="relative text-5xl sm:text-7xl lg:text-9xl font-[family-name:var(--font-libre-baskerville)] italic">
              <span
                aria-hidden="true"
                className="absolute top-[3px] left-[2px] lg:top-[5px] lg:left-[4px] text-[#4CAF50]/70 select-none"
              >
                {isBengali ? "\u0985\u09AE\u09C3\u09A4\u09CD\u09AF" : "Amartya"}
              </span>
              <span className="relative text-white">
                {isBengali ? "\u0985\u09AE\u09C3\u09A4\u09CD\u09AF" : "Amartya"}
              </span>
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* NPR Appearances */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={isBengali ? "label-bn" : "label-en"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs uppercase tracking-[0.2em] text-[#525452] font-normal"
            >
              {isBengali
                ? "\u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09AB\u09BF\u099A\u09BE\u09B0\u09CD\u09A1"
                : "As featured on"}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-8">
            <a
              href="https://www.npr.org/podcasts/510351/short-wave"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 animate-[fadeSlideIn_0.6s_ease_0.3s_forwards]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-shortwave.png"
                alt="NPR Short Wave"
                className="h-10 w-auto"
              />
            </a>
            <a
              href="https://www.npr.org/programs/all-things-considered"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 animate-[fadeSlideIn_0.6s_ease_0.5s_forwards]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-atc.png"
                alt="NPR All Things Considered"
                className="h-10 w-auto"
              />
            </a>
            <div className="opacity-0 animate-[fadeSlideIn_0.6s_ease_0.7s_forwards]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-npr.png"
                alt="NPR"
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
