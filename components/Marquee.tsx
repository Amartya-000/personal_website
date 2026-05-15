"use client";

import FastMarquee from "react-fast-marquee";
import { motion, AnimatePresence } from "framer-motion";

interface MarqueeProps {
  isBengali: boolean;
}

function EnglishText() {
  const secondary = "text-white";
  const highlight =
    "text-white font-[family-name:var(--font-libre-baskerville)] italic";

  return (
    <span className={`text-3xl md:text-5xl lg:text-7xl font-[family-name:var(--font-geist)] font-normal tracking-[0.02em] mx-20 md:mx-32 whitespace-nowrap ${secondary}`}>
      I&apos;m a{" "}
      <span className={highlight}>computer science</span> and{" "}
      <span className={highlight}>computer engineering</span> student at
      Northeastern interested in the intersection of{" "}
      <span className={highlight}>Machine Learning</span>,{" "}
      <span className={highlight}>DSP</span>, and{" "}
      <span className={highlight}>Audio</span>.
    </span>
  );
}

function BengaliText() {
  const secondary = "text-white";
  const highlight =
    "text-white font-[family-name:var(--font-libre-baskerville)] italic";

  return (
    <span className={`text-3xl md:text-5xl lg:text-7xl font-[family-name:var(--font-geist)] font-normal tracking-[0.02em] mx-20 md:mx-32 whitespace-nowrap ${secondary}`}>
      {"\u0986\u09AE\u09BF \u09A8\u09B0\u09CD\u09A5\u0987\u09B8\u09CD\u099F\u09BE\u09B0\u09CD\u09A8\u09C7 "}
      <span className={highlight}>
        {"\u0995\u09AE\u09CD\u09AA\u09BF\u0989\u099F\u09BE\u09B0 \u09B8\u09BE\u09AF\u09BC\u09C7\u09A8\u09CD\u09B8"}
      </span>
      {" \u0993 "}
      <span className={highlight}>
        {"\u0995\u09AE\u09CD\u09AA\u09BF\u0989\u099F\u09BE\u09B0 \u0987\u099E\u09CD\u099C\u09BF\u09A8\u09BF\u09AF\u09BC\u09BE\u09B0\u09BF\u0982"}
      </span>
      {"\u09AF\u09BC\u09C7\u09B0 \u099B\u09BE\u09A4\u09CD\u09B0 \u2014 "}
      <span className={highlight}>
        {"\u09AE\u09C7\u09B6\u09BF\u09A8 \u09B2\u09BE\u09B0\u09CD\u09A8\u09BF\u0982"}
      </span>
      {", "}
      <span className={highlight}>DSP</span>
      {", \u098F\u09AC\u0982 "}
      <span className={highlight}>
        {"\u0985\u09A1\u09BF\u0993"}
      </span>
      {"\u09B0 \u09B8\u0982\u09AF\u09CB\u0997\u09B8\u09CD\u09A5\u09B2\u09C7 \u0986\u0997\u09CD\u09B0\u09B9\u09C0\u0964"}
    </span>
  );
}

export default function Marquee({ isBengali }: MarqueeProps) {
  return (
    <div className="w-full select-none pointer-events-none py-4 [&_.rfm-overlay]:hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={isBengali ? "bn" : "en"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FastMarquee speed={30} gradient={false} autoFill>
            {isBengali ? <BengaliText /> : <EnglishText />}
          </FastMarquee>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
