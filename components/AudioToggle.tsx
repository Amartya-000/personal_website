"use client";

import { forwardRef } from "react";
import { Music2 } from "lucide-react";
import { useAudio } from "./AudioProvider";

const AudioToggle = forwardRef<HTMLButtonElement>(function AudioToggle(_, ref) {
  const { isMuted, toggleMute, isPlaying } = useAudio();

  return (
    <div className="fixed z-50 flex items-center gap-3 top-[max(1.5rem,env(safe-area-inset-top))] right-[4.5rem] md:top-auto md:right-6 md:bottom-[max(1.5rem,env(safe-area-inset-bottom))]">
      {/* "Played by me" label */}
      <span
        className={`text-xs text-[#a3a5a3] font-normal tracking-wide transition-all duration-500 ${
          isPlaying
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Played by me
      </span>

      <button
        ref={ref}
        onClick={toggleMute}
        aria-label={isMuted ? "Play audio" : "Stop audio"}
        className="glass rounded-full p-2 md:p-3 relative group transition-colors duration-200 hover:bg-white/5"
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#4CAF50]/20 animate-ping" />
        )}

        <Music2
          size={18}
          strokeWidth={1.5}
          className={
            isPlaying
              ? "text-[#4CAF50] transition-colors"
              : "text-[#a3a5a3] group-hover:text-[#e5e6e5] transition-colors"
          }
        />
      </button>
    </div>
  );
});

export default AudioToggle;
