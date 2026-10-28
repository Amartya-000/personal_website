import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import AboutBio, { AboutTitle } from "@/components/AboutBio";
import LangText from "@/components/LangText";

export const metadata: Metadata = {
  title: "About — Amartya Bhattacharya",
  description:
    "Computer science & computer engineering student at Northeastern University.",
};

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 pt-[14vh] md:pt-[22vh] pb-32">
        <header className="mb-10 md:mb-20">
          <h1 className="text-title font-normal text-text-primary leading-[1.05] opacity-0 animate-[fadeSlideIn_0.6s_ease_0.1s_forwards]">
            <AboutTitle />
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-10 md:gap-14 items-start">
          <div className="opacity-0 animate-[fadeSlideIn_0.6s_ease_0.4s_forwards]">
            <AboutBio />

            <a
              href="/Amartya_Bhattacharya_Resume.pdf"
              download
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-surface-1 px-5 py-2.5 text-body text-text-secondary hover:text-brand hover:border-brand/40 transition-colors duration-200"
            >
              <Download size={15} strokeWidth={1.5} aria-hidden="true" />
              <LangText en="Download resume" bn="রেজ্যুমে ডাউনলোড" />
            </a>
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
