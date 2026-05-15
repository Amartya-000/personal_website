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
      <div className="hidden md:block absolute right-[6%] lg:right-[10%] top-[58%] -translate-y-1/2 z-0">
        <div className="relative w-[34vw] max-w-[500px] min-w-[320px] aspect-[5/6] rounded-2xl overflow-hidden">
          <Image
            src="/amartya.jpg"
            alt="Amartya Bhattacharya"
            fill
            priority
            className="object-cover"
            sizes="34vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-0 via-transparent to-transparent opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-0 opacity-20" />
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
            <span className="text-subhead font-[family-name:var(--font-geist)] font-normal text-text-muted">
              {isBengali ? "আমি" : "Hi, I’m"}
            </span>
            <span className="relative inline-block text-display font-[family-name:var(--font-libre-baskerville)] italic leading-[0.95]">
              <span className="relative text-text-primary">
                {isBengali ? "অমৃত্য" : "Amartya"}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 amartya-shine select-none"
              >
                {isBengali ? "অমৃত্য" : "Amartya"}
              </span>
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* Subheader */}
        <AnimatePresence mode="wait">
          <motion.p
            key={isBengali ? "sub-bn" : "sub-en"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-body text-text-muted max-w-xl leading-relaxed font-normal -mt-2 text-balance"
          >
            {isBengali ? (
              <>
                <span className="text-text-primary">
                  কম্পিউটার সায়েন্স ও কম্পিউটার ইঞ্জিনিয়ারিং
                </span>{" "}
                ছাত্র, নর্থইস্টার্ন ইউনিভার্সিটি।
              </>
            ) : (
              <>
                <span className="text-text-secondary">
                  Computer science & computer engineering
                </span>{" "}
                student at Northeastern University.
              </>
            )}
          </motion.p>
        </AnimatePresence>

        {/* Featured On */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={isBengali ? "label-bn" : "label-en"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-caption uppercase tracking-[0.2em] text-text-muted font-normal"
            >
              {isBengali
                ? "যেখানে ফিচার্ড"
                : "Featured on"}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-8">
            <div className="opacity-0 animate-[fadeSlideIn_0.6s_ease_0.3s_forwards]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-npr.png"
                alt="NPR"
                className="h-10 w-auto"
              />
            </div>
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
            <a
              href="https://www.npr.org/podcasts/510351/short-wave"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 animate-[fadeSlideIn_0.6s_ease_0.7s_forwards]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-shortwave.png"
                alt="NPR Short Wave"
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
