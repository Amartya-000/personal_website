"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MediaItem } from "@/lib/media";

interface MediaCardProps {
  item: MediaItem;
  priority?: boolean;
}

const variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
} as const;

export default function MediaCard({ item, priority }: MediaCardProps) {
  const isExternal = item.href.startsWith("http");

  return (
    <motion.a
      variants={variants}
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={item.title}
      className="group block"
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-2 border border-white/[0.06] transition-colors duration-300 ease-out group-hover:border-[rgba(76,175,80,0.18)]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-4 px-1 flex flex-col gap-2">
        <span className="text-caption uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-hover:text-brand">
          {item.eyebrow}
        </span>
        <h2 className="text-body font-medium text-text-primary leading-snug line-clamp-2 flex items-start gap-1.5">
          <span>{item.title}</span>
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mt-1 shrink-0 opacity-0 -translate-x-0.5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
          />
        </h2>
        <p className="text-caption text-text-secondary leading-relaxed line-clamp-2">
          {item.subtitle}
        </p>
      </div>
    </motion.a>
  );
}
