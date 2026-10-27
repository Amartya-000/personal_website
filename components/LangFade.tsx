"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/components/SiteShell";

/**
 * Swaps its children with the same rise-and-fade the home page hero uses when
 * the site language changes. Place it inside any element that has its own
 * entrance animation, so a language switch doesn't replay the entrance.
 */
export default function LangFade({
  children,
  inline = false,
  className = "",
}: {
  children: ReactNode;
  /** Render a span (made inline-block so the rise applies) instead of a div. */
  inline?: boolean;
  className?: string;
}) {
  const { isBengali } = useLang();
  const Tag = inline ? motion.span : motion.div;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Tag
        key={isBengali ? "bn" : "en"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={inline ? `inline-block ${className}` : className}
      >
        {children}
      </Tag>
    </AnimatePresence>
  );
}
