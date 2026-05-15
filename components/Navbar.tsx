"use client";

import { useRef, useEffect, type RefObject } from "react";
import { Home, Code, Tv, Music, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavItem {
  label: string;
  labelBn: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", labelBn: "\u09B9\u09CB\u09AE", href: "#", icon: Home },
  { label: "Work", labelBn: "\u0995\u09BE\u099C", href: "#work", icon: Code },
  { label: "Media", labelBn: "\u09AE\u09BF\u09A1\u09BF\u09AF\u09BC\u09BE", href: "#media", icon: Tv },
  { label: "Music", labelBn: "\u09B8\u0999\u09CD\u0997\u09C0\u09A4", href: "#music", icon: Music },
];

const LinkedInIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amartya-bhattacharya007/",
    icon: LinkedInIcon,
  },
  {
    label: "X",
    href: "https://x.com/Amar7ya",
    icon: XIcon,
  },
];

interface NavbarProps {
  isBengali: boolean;
  onToggleBengali: () => void;
  stickyRefs?: RefObject<(HTMLElement | null)[]>;
}

export default function Navbar({
  isBengali,
  onToggleBengali,
  stickyRefs,
}: NavbarProps) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (stickyRefs?.current) {
      stickyRefs.current = itemRefs.current;
    }
  });

  const setRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
    if (stickyRefs?.current) {
      stickyRefs.current[index] = el;
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass rounded-full px-2 py-1.5 flex items-center gap-0.5">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.label}
            ref={setRef(i)}
            href={item.href}
            className="px-3 md:px-4 py-1.5 text-xs md:text-sm font-normal text-[#a3a5a3] rounded-full transition-colors duration-200 flex items-center gap-1.5"
          >
            <item.icon size={13} strokeWidth={1.5} className="opacity-50" />
            <AnimatePresence mode="wait">
              <motion.span
                key={isBengali ? item.labelBn : item.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {isBengali ? item.labelBn : item.label}
              </motion.span>
            </AnimatePresence>
          </a>
        ))}

        <div className="w-px h-5 bg-[#262826] mx-0.5" />

        {SOCIALS.map((social, i) => (
          <a
            key={social.label}
            ref={setRef(NAV_ITEMS.length + i)}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="p-2 text-[#a3a5a3] rounded-full transition-colors duration-200"
          >
            {social.icon}
          </a>
        ))}

        <div className="w-px h-5 bg-[#262826] mx-0.5" />

        <button
          ref={setRef(NAV_ITEMS.length + SOCIALS.length)}
          onClick={onToggleBengali}
          aria-label={isBengali ? "Switch to English" : "Switch to Bengali"}
          className={`p-2 rounded-full transition-colors duration-200 text-base leading-none ${
            isBengali ? "text-[#4CAF50]" : "text-[#a3a5a3]"
          }`}
        >
          <span className="font-[family-name:var(--font-libre-baskerville)]">
            {"\u09AC"}
          </span>
        </button>
      </div>
    </nav>
  );
}
