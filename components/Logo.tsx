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
      className={`fixed top-6 left-6 z-50 glass rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 ${
        isBengali ? "text-brand" : "text-text-primary hover:text-brand"
      }`}
      style={{
        fontFamily: "var(--font-noto-sans-bengali)",
        fontSize: "1.125rem",
        lineHeight: 1,
        fontWeight: 500,
      }}
    >
      অ
    </button>
  );
}
