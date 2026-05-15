"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "#work" },
  { label: "Media", href: "/media" },
  { label: "Music", href: "#music" },
];

const LinkedInIcon = (
  <svg
    width="18"
    height="18"
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

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed top-[max(1.5rem,env(safe-area-inset-top))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 glass rounded-full w-9 h-9 grid place-items-center text-text-primary transition-colors duration-200"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "menu"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.18 }}
            className="grid place-items-center"
          >
            {open ? (
              <X size={16} strokeWidth={1.5} />
            ) : (
              <Menu size={16} strokeWidth={1.5} />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-surface-0/70 backdrop-blur-xl"
            onClick={close}
          >
            <nav
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col px-8 pt-28 pb-10 h-full"
            >
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, i) => {
                  const isInternal = item.href.startsWith("/");
                  const inner = (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.05 + i * 0.04,
                      }}
                      className="block py-3 text-[2rem] leading-[1.15] font-[family-name:var(--font-libre-baskerville)] italic text-text-primary"
                    >
                      {item.label}
                    </motion.span>
                  );
                  return (
                    <li key={item.label}>
                      {isInternal ? (
                        <Link href={item.href} onClick={close}>
                          {inner}
                        </Link>
                      ) : (
                        <a href={item.href} onClick={close}>
                          {inner}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="h-px w-12 bg-surface-3 my-8" />

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.05 + NAV_ITEMS.length * 0.04,
                }}
                className="flex gap-5"
              >
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      onClick={close}
                      className="p-2 -m-2 block text-text-secondary hover:text-brand transition-colors duration-200"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
