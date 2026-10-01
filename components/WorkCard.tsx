"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { WorkItem } from "@/lib/work";

interface WorkCardProps {
  item: WorkItem;
  priority?: boolean;
}

const variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
} as const;

const FRAME_BASE =
  "relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-2 border transition-[border-color,box-shadow] duration-300 ease-out";

/** Mild green glow marking the pinned project. */
const FRAME_PINNED =
  "border-[rgba(76,175,80,0.25)] shadow-[0_0_24px_-6px_rgba(76,175,80,0.28)] group-hover:border-[rgba(76,175,80,0.45)] group-hover:shadow-[0_0_34px_-4px_rgba(76,175,80,0.42)]";

const FRAME_DEFAULT =
  "border-white/[0.06] group-hover:border-[rgba(76,175,80,0.18)]";

const MotionLink = motion.create(Link);

export default function WorkCard({ item, priority }: WorkCardProps) {
  return (
    <MotionLink
      variants={variants}
      href={`/work/${item.slug}`}
      aria-label={item.title}
      className="group block"
    >
      <div
        className={`${FRAME_BASE} ${item.pinned ? FRAME_PINNED : FRAME_DEFAULT}`}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className={
            item.imageMode === "logo"
              ? "object-contain p-10 md:p-12 transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
              : "object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
          }
        />
      </div>

      <div className="mt-4 px-1 flex flex-col gap-2">
        <span
          className={`text-caption uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-brand ${
            item.pinned ? "text-brand/80" : "text-text-muted"
          }`}
        >
          {item.eyebrow}
        </span>
        <h2 className="text-body font-medium text-text-primary leading-snug line-clamp-2 flex items-start gap-1.5">
          <span>{item.title}</span>
          <ArrowRight
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
    </MotionLink>
  );
}
