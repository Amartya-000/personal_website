"use client";

import { forwardRef } from "react";
import { Play, Square } from "lucide-react";
import { useAudio } from "./AudioProvider";

const AudioToggle = forwardRef<HTMLButtonElement>(function AudioToggle(_, ref) {
  const { isMuted, toggleMute, isPlaying } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
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
        className="glass rounded-full p-3 relative group transition-colors duration-200 hover:bg-white/5"
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#4CAF50]/20 animate-ping" />
        )}

        {isMuted ? (
          <Play
            size={18}
            strokeWidth={1.5}
            className="text-[#a3a5a3] group-hover:text-[#e5e6e5] transition-colors"
          />
        ) : (
          <Square
            size={18}
            strokeWidth={1.5}
            className="text-[#4CAF50] transition-colors"
          />
        )}
      </button>
    </div>
  );
});

export default AudioToggle;
