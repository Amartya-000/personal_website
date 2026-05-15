"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import AudioProvider from "@/components/AudioProvider";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import AudioToggle from "@/components/AudioToggle";
import StickyCursor from "@/components/StickyCursor";

const GodRaysBackground = dynamic(
  () => import("@/components/GodRaysBackground"),
  { ssr: false }
);

export default function Home() {
  const [isBengali, setIsBengali] = useState(false);
  const audioButtonRef = useRef<HTMLButtonElement>(null);
  const navItemRefs = useRef<(HTMLElement | null)[]>([]);

  return (
    <AudioProvider>
      <div className="fixed inset-0 -z-10">
        <GodRaysBackground />
      </div>

      <main className="relative z-10">
        <div className="relative min-h-screen">
          <Hero isBengali={isBengali} />

          {/* Marquee — sits low on the page; no z-index so mix-blend can reach Hero/portrait behind it */}
          <div className="absolute bottom-[8%] md:bottom-[10%] left-0 right-0">
            <Marquee isBengali={isBengali} />
          </div>
        </div>
      </main>

      <Navbar
        isBengali={isBengali}
        onToggleBengali={() => setIsBengali((v) => !v)}
        stickyRefs={navItemRefs}
      />
      <AudioToggle ref={audioButtonRef} />
      <StickyCursor navRefs={navItemRefs} audioRef={audioButtonRef} />
    </AudioProvider>
  );
}
