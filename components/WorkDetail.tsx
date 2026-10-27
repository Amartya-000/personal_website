"use client";

import { Fragment } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LangFade from "@/components/LangFade";
import { useLang } from "@/components/SiteShell";
import WorkEmbed from "@/components/WorkEmbed";
import { getWorkCopy, type WorkItem, type WorkParagraph } from "@/lib/work";

const FIGURE_SIZES = "(min-width:768px) 768px, 100vw";

/**
 * An image shown uncropped at its own aspect ratio. Width is capped so a
 * portrait photo never runs taller than most of the viewport.
 */
function WorkFigure({
  src,
  alt,
  priority,
  className = "",
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const ratio = src.width / src.height;

  return (
    <div
      className={`relative w-full mx-auto rounded-2xl overflow-hidden bg-surface-2 border border-white/[0.06] ${className}`}
      style={{
        aspectRatio: `${src.width} / ${src.height}`,
        maxWidth: `min(100%, calc(75vh * ${ratio}))`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={FIGURE_SIZES}
        className="object-cover"
      />
    </div>
  );
}

function Paragraph({ paragraph }: { paragraph: WorkParagraph }) {
  if (typeof paragraph === "string") return paragraph;

  return paragraph.map((run, i) =>
    typeof run === "string" ? (
      <Fragment key={i}>{run}</Fragment>
    ) : (
      <a
        key={i}
        href={run.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-primary underline decoration-brand/50 underline-offset-4 hover:text-brand transition-colors duration-200"
      >
        {run.text}
      </a>
    ),
  );
}

/** Everything on a project page that follows the site language. */
export default function WorkDetail({ item }: { item: WorkItem }) {
  const { isBengali } = useLang();
  const copy = getWorkCopy(item, isBengali);

  return (
    <main
      lang={isBengali ? "bn" : undefined}
      className="relative z-10 min-h-screen"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-16 lg:px-24 pt-[14vh] md:pt-[22vh] pb-32">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-caption text-text-secondary hover:text-brand transition-colors duration-200 opacity-0 animate-[fadeSlideIn_0.6s_ease_0.05s_forwards]"
        >
          <ArrowLeft size={13} strokeWidth={1.5} aria-hidden="true" />
          <LangFade inline>{isBengali ? "কাজ" : "Work"}</LangFade>
        </Link>

        <header className="mt-8 mb-10 md:mb-14">
          <span className="block text-caption uppercase tracking-[0.18em] text-text-muted opacity-0 animate-[fadeSlideIn_0.6s_ease_0.1s_forwards]">
            <LangFade inline>{copy.eyebrow}</LangFade>
          </span>
          <h1 className="mt-3 text-title font-normal text-text-primary leading-[1.05] opacity-0 animate-[fadeSlideIn_0.6s_ease_0.2s_forwards]">
            <LangFade inline>{copy.title}</LangFade>
          </h1>
        </header>

        {item.imageMode === "logo" ? (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface-2 border border-white/[0.06] opacity-0 animate-[fadeSlideIn_0.6s_ease_0.3s_forwards]">
            <Image
              src={item.image}
              alt={copy.imageAlt}
              fill
              priority
              sizes={FIGURE_SIZES}
              className="object-contain p-12 md:p-16"
            />
          </div>
        ) : (
          <WorkFigure
            src={item.image}
            alt={copy.imageAlt}
            priority
            className="opacity-0 animate-[fadeSlideIn_0.6s_ease_0.3s_forwards]"
          />
        )}

        <div className="mt-10 md:mt-12 opacity-0 animate-[fadeSlideIn_0.6s_ease_0.4s_forwards]">
          <LangFade className="flex flex-col gap-5">
            {copy.body.map((paragraph, i) => (
              <p key={i} className="text-body text-text-secondary leading-relaxed">
                <Paragraph paragraph={paragraph} />
              </p>
            ))}
          </LangFade>
        </div>

        {item.extraImages && (
          <div className="mt-10 md:mt-12 flex flex-col gap-6 opacity-0 animate-[fadeSlideIn_0.6s_ease_0.5s_forwards]">
            {item.extraImages.map((image) => (
              <WorkFigure
                key={image.src.src}
                src={image.src}
                alt={isBengali ? image.altBn : image.alt}
              />
            ))}
          </div>
        )}

        <WorkEmbed embed={item.embed} />
      </div>
    </main>
  );
}
