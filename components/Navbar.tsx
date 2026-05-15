"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, Code, Tv, Music, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang, useNavRefs } from "@/components/SiteShell";

interface NavItem {
  label: string;
  labelBn: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", labelBn: "হোম", href: "/", icon: Home },
  { label: "Work", labelBn: "কাজ", href: "#work", icon: Code },
  { label: "Media", labelBn: "মিডিয়া", href: "/media", icon: Tv },
  { label: "Music", labelBn: "সঙ্গীত", href: "#music", icon: Music },
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

const NAV_ITEM_CLASS =
  "px-3 md:px-4 py-1.5 text-caption font-normal text-text-secondary hover:text-brand rounded-full transition-colors duration-200 flex items-center gap-1.5";

export default function Navbar() {
  const { isBengali, toggle } = useLang();
  const { navRefs } = useNavRefs();

  useEffect(() => {
    // Keep refs array sized to current item count
    navRefs.current.length = NAV_ITEMS.length + SOCIALS.length;
  });

  const setRef = (index: number) => (el: HTMLElement | null) => {
    navRefs.current[index] = el;
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass rounded-full px-2 py-1.5 flex items-center gap-0.5">
        {NAV_ITEMS.map((item, i) => {
          const isInternal = item.href.startsWith("/");
          const label = (
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
          );
          const icon = <item.icon size={13} strokeWidth={1.5} className="opacity-50" />;

          return isInternal ? (
            <Link
              key={item.label}
              ref={setRef(i)}
              href={item.href}
              className={NAV_ITEM_CLASS}
            >
              {icon}
              {label}
            </Link>
          ) : (
            <a
              key={item.label}
              ref={setRef(i)}
              href={item.href}
              className={NAV_ITEM_CLASS}
            >
              {icon}
              {label}
            </a>
          );
        })}

        <div className="w-px h-5 bg-surface-3 mx-0.5" />

        {SOCIALS.map((social, i) => (
          <a
            key={social.label}
            ref={setRef(NAV_ITEMS.length + i)}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="p-2 text-text-secondary hover:text-brand rounded-full transition-colors duration-200"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </nav>
  );
}
