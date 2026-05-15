"use client";

import { useLang, useNavRefs } from "@/components/SiteShell";

export default function Logo() {
  const { isBengali, toggle } = useLang();
  const { logoRef } = useNavRefs();

  return (
    <button
      ref={logoRef}
      onClick={toggle}
      aria-label={isBengali ? "Switch to English" : "Switch to Bengali"}
      aria-pressed={isBengali}
      className={`fixed top-6 left-6 z-50 glass rounded-full w-9 h-9 grid place-items-center transition-colors duration-200 ${
        isBengali ? "text-brand" : "text-text-primary hover:text-brand"
      }`}
    >
      {/* Bengali letters have a top headline that pushes optical weight up;
          a small downward nudge keeps the mark true to the pill's center. */}
      <span
        className="block"
        style={{
          fontFamily: "var(--font-noto-sans-bengali)",
          fontSize: "1.25rem",
          fontWeight: 500,
          lineHeight: 1,
          transform: "translateY(1px)",
        }}
      >
        অ
      </span>
    </button>
  );
}
