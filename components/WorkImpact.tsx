"use client";

import { useLang } from "@/components/SiteShell";

/** A project's one key result, set apart from the text around it. */
export default function WorkImpact({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { isBengali } = useLang();

  return (
    <div
      className={`rounded-2xl border border-brand/25 bg-brand/[0.06] px-5 py-4 md:px-6 md:py-5 ${className}`}
    >
      {/* Letter spacing would break the line along the top of Bengali letters. */}
      <span
        className={`block text-caption text-brand ${
          isBengali ? "" : "uppercase tracking-[0.18em]"
        }`}
      >
        {isBengali ? "প্রভাব" : "Impact"}
      </span>
      <p className="mt-2 text-body text-text-primary leading-relaxed">{text}</p>
    </div>
  );
}
