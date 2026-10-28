"use client";

import type { ReactNode } from "react";
import LangFade from "@/components/LangFade";
import { useLang } from "@/components/SiteShell";

/** The opening line, set above the bio like the home page hero's "Hi, I’m Amartya". */
const GREETING = {
  en: { lead: "My name is", name: "Amartya" },
  bn: { lead: "আমার নাম", name: "অমর্ত্য" },
};

/** Three paragraphs, closing line. */
const ENGLISH: ReactNode[] = [
  "I’m a second-year at Northeastern studying computer engineering and computer science. I grew up around technology thanks to my two older brothers, who work in software and design, so taking things apart and building things came early. I picked the combined major because I couldn’t choose between hardware and software, and the longer I go, the less I want to. Most of what I build sits where the two meet, usually around audio and signals: a waveform generator you play by tilting it, an analog EKG, and a jazz backing-track generator that uses Claude to procedurally generate the band.",
  "A lot of that started with music. I’ve played percussion since high school, with a special love for concert snare drum and vibraphone, and now dhol. Seeing what a rosewood marimba costs turned into my first research project, a study of cheaper bar materials. I presented it at the Acoustical Society of America, and it’s now accepted for publication in POMA.",
  "When I’m not building, I like to cook, mostly Bengali food, though I’ll happily make just about anything. I also listen to everything from jazz to metal to city pop.",
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

/**
 * Its own text rather than a translation of ENGLISH. Keep it exactly as
 * written; its opening "আমার নাম অমর্ত্য।" lives in GREETING.
 */
const BENGALI: ReactNode[] = [
  "আমি বাঙালি, কিন্তু আমি একটুও লিখতে আর পড়তে পারি না।",
  "যদি তুই অবাঙালি হোস আর এটা গুগল ট্রান্সলেট করছিস, হ্যাঁ, এই পেজের ইংরেজি আর বাংলা ভার্সনে আলাদা আলাদা জিনিস লেখা আছে। বাংলা আমি শুধু বাবা-মার কাছ থেকে শিখেছি, আর ওরা আমাকে তুই বলে, তাই আমিও তোকে তুই বলছি। এখন বস্টনের নর্থইস্টার্নে আমার দ্বিতীয় বছর চলছে, আর আমি CE/CS পড়ছি (এটা নিয়ে আমার বাবা-মা খুব খুশি)। ওদের ভাগ্য ভালো, ছোটবেলা থেকেই আমার বিজ্ঞান আর টেকনোলজি ভালো লাগে। প্রথম কেমিস্ট্রি ক্লাস করার আগে পর্যন্ত আমি কেমিক্যাল ইঞ্জিনিয়ার হতে চাইতাম। প্রবাসী হয়ে বড় হওয়ায় আমেরিকান আর বাঙালি দুটোই হওয়া মানে কী, সেটা বোঝা বেশ ইন্টারেস্টিং, কিন্তু বাঙালি হিসেবে আমি খুব গর্বিত। আমি এখনও বাংলা লিখতে-পড়তে পারি না, তাই পড়া প্র্যাকটিস করার জন্য এই পেজটা বানিয়েছি।",
  "আমি গান-বাজনা খুব ভালোবাসি। ইদানীং আমি দেশি মিউজিক নিয়ে আরও শিখছি আর আরও জড়িয়ে পড়ছি। বাড়িতে যা শুনে বড় হয়েছি, তার জন্য এর তালগুলো চেনা চেনা লাগে, আর যত বাজাই, তত আরও ভালো হতে ইচ্ছে করে। আমি ঢোল বাজাই, আর বাঙালি ঢাকের বোলগুলো শিখে ঢোলে বাজানোর কথা ভাবছি।",
  "যখন কিছু বানাচ্ছি না, তখন রান্না করতে ভালোবাসি। ইদানীং বাবা-মার কাছে বাঙালি রান্না শিখতে শুরু করেছি, যদিও আমি সব রকম খাবার বানাতেই ভালোবাসি।",
  "যদি তুই চাকরির জন্য লোক খুঁজছিস আর বাঙালি হোস, আমাকে একটা মেসেজ কর!",
];

/** The About page heading, which follows the language toggle like the bio. */
export function AboutTitle() {
  const { isBengali } = useLang();

  return (
    <LangFade inline>
      {isBengali ? (
        <span lang="bn" className="font-bengali">
          পরিচয়
        </span>
      ) : (
        "About"
      )}
    </LangFade>
  );
}

/** The About page bio, swapped by the logo language toggle. */
export default function AboutBio() {
  const { isBengali } = useLang();
  const greeting = isBengali ? GREETING.bn : GREETING.en;

  return (
    <LangFade>
      <div
        lang={isBengali ? "bn" : undefined}
        className={`flex flex-col gap-5 ${isBengali ? "font-bengali" : ""}`}
      >
        {/* A container, so the name can size itself to span the bio column
            and reach toward the portrait, but never past the home page
            hero's size (the clamp is --text-display from globals.css). */}
        <h2 className="@container flex flex-col items-start gap-3 md:gap-4 mb-2">
          <span className="text-body font-normal text-text-muted">
            {greeting.lead}
          </span>
          <span className="relative inline-block text-[length:min(24cqi,clamp(2.5rem,1.5rem_+_15vw,6rem))] font-[family-name:var(--font-libre-baskerville)] italic leading-[0.95]">
            <span className="relative text-text-primary">{greeting.name}</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 amartya-shine select-none"
            >
              {greeting.name}
            </span>
          </span>
        </h2>

        {(isBengali ? BENGALI : ENGLISH).map((paragraph, i) => (
          <p key={i} className="text-body text-text-secondary leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </LangFade>
  );
}
