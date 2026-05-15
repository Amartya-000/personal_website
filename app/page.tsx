"use client";

import { useRef } from "react";
import AudioProvider from "@/components/AudioProvider";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AudioToggle from "@/components/AudioToggle";
import StickyCursor from "@/components/StickyCursor";
import { useNavRefs } from "@/components/SiteShell";

export default function Home() {
  const audioButtonRef = useRef<HTMLButtonElement>(null);
  const { navRefs, logoRef } = useNavRefs();

  return (
    <AudioProvider>
      <main className="relative z-10">
        <div className="relative min-h-screen">
          <Hero />

          {/* Marquee — sits low on the page; no z-index so mix-blend can reach Hero/portrait behind it */}
          <div className="absolute bottom-[8%] md:bottom-[10%] left-0 right-0">
            <Marquee />
          </div>
        </div>
      </main>

      <AudioToggle ref={audioButtonRef} />
      <StickyCursor navRefs={navRefs} audioRef={audioButtonRef} logoRef={logoRef} />
    </AudioProvider>
  );
}
