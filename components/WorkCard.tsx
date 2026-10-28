"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LangFade from "@/components/LangFade";
import { useLang } from "@/components/SiteShell";
import WorkImpact from "@/components/WorkImpact";
import { getWorkCopy, type WorkItem } from "@/lib/work";

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

function imageClass(item: WorkItem) {
  const hover =
    "transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]";
  return item.imageMode === "logo"
    ? `object-contain p-10 md:p-12 ${hover}`
    : `object-cover ${hover}`;
}

const MotionLink = motion.create(Link);

/**
 * The pinned project takes a full row. On wide screens its image spans two of
 * the grid's three columns, so its edges line up with the cards below, and
 * the text sits in the third.
 */
function FeaturedCard({ item, priority }: WorkCardProps) {
  const { isBengali } = useLang();
  const copy = getWorkCopy(item, isBengali);

  return (
    <MotionLink
      variants={variants}
      href={`/work/${item.slug}`}
      aria-label={copy.title}
      lang={isBengali ? "bn" : undefined}
      className="group block sm:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:items-center"
    >
      <div className={`${FRAME_BASE} ${FRAME_PINNED} lg:col-span-2`}>
        <Image
          src={item.image}
          alt={copy.imageAlt}
          fill
          priority={priority}
          sizes="(min-width:1024px) 66vw, 100vw"
          className={imageClass(item)}
        />
      </div>

      <LangFade className="mt-5 px-1 lg:mt-0 lg:px-0 flex flex-col gap-3">
        <span className="text-caption uppercase tracking-[0.18em] text-brand/80 transition-colors duration-300 group-hover:text-brand">
          {copy.eyebrow}
        </span>
        <h2 className="text-subhead font-normal text-text-primary leading-[1.1] flex items-start gap-2">
          <span>{copy.title}</span>
          <ArrowRight
            size={20}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mt-[0.3em] shrink-0 opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
          />
        </h2>
        <p className="text-body text-text-secondary leading-relaxed">
          {copy.subtitle}
        </p>
        <WorkImpact text={copy.impact} className="mt-3" />
      </LangFade>
    </MotionLink>
  );
}

export default function WorkCard({ item, priority }: WorkCardProps) {
  const { isBengali } = useLang();
  const copy = getWorkCopy(item, isBengali);

  if (item.pinned) return <FeaturedCard item={item} priority={priority} />;

  return (
    <MotionLink
      variants={variants}
      href={`/work/${item.slug}`}
      aria-label={copy.title}
      lang={isBengali ? "bn" : undefined}
      className="group block"
    >
      <div className={`${FRAME_BASE} ${FRAME_DEFAULT}`}>
        <Image
          src={item.image}
          alt={copy.imageAlt}
          fill
          priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className={imageClass(item)}
        />
      </div>

      <LangFade className="mt-4 px-1 flex flex-col gap-2">
        <span className="text-caption uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-hover:text-brand">
          {copy.eyebrow}
        </span>
        <h2 className="text-body font-medium text-text-primary leading-snug line-clamp-2 flex items-start gap-1.5">
          <span>{copy.title}</span>
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mt-1 shrink-0 opacity-0 -translate-x-0.5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
          />
        </h2>
        <p className="text-caption text-text-secondary leading-relaxed line-clamp-2">
          {copy.subtitle}
        </p>
      </LangFade>
    </MotionLink>
  );
}
