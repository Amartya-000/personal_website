"use client";

import { Fragment } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LangFade from "@/components/LangFade";
import { useLang } from "@/components/SiteShell";
import WorkEmbed from "@/components/WorkEmbed";
import WorkImpact from "@/components/WorkImpact";
import {
  getWorkCopy,
  type WorkItem,
  type WorkParagraph,
  type WorkVideo,
} from "@/lib/work";

const FIGURE_SIZES = "(min-width:768px) 768px, 100vw";

/** The tallest a figure gets, as width / height. */
const MIN_FIGURE_RATIO = 4 / 5;

/**
 * An image shown at its own aspect ratio, spanning the text column so its
 * edges line up with the text. A portrait photo taller than 4:5 is cropped
 * top and bottom so it doesn't run far past the viewport.
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
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-surface-2 border border-white/[0.06] ${className}`}
      style={{
        aspectRatio: Math.max(src.width / src.height, MIN_FIGURE_RATIO),
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

/**
 * Demo clips, two to a row from small screens up so portrait phone video
 * doesn't run past the viewport. Nothing plays or downloads until pressed.
 */
function WorkDemos({ videos }: { videos: WorkVideo[] }) {
  const { isBengali } = useLang();

  return (
    <section className="mt-12 md:mt-16 opacity-0 animate-[fadeSlideIn_0.6s_ease_0.5s_forwards]">
      {/* Letter spacing would break the line along the top of Bengali letters. */}
      <h2
        className={`mb-4 text-caption text-text-muted ${
          isBengali ? "" : "uppercase tracking-[0.18em]"
        }`}
      >
        <LangFade inline>{isBengali ? "ডেমো" : "Demos"}</LangFade>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((video) => (
          <figure key={video.src}>
            <video
              src={video.src}
              poster={video.poster.src}
              controls
              playsInline
              preload="none"
              className="w-full rounded-2xl bg-surface-2 border border-white/[0.06]"
              style={{
                aspectRatio: `${video.poster.width} / ${video.poster.height}`,
              }}
            />
            <figcaption className="mt-3 px-1 text-caption text-text-secondary leading-relaxed">
              <LangFade>{isBengali ? video.captionBn : video.caption}</LangFade>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/**
 * A paragraph's first sentence and the rest. A sentence ends at ., !, ? or
 * the Bengali dari (।) followed by a space, so "1.6 kHz" doesn't end one.
 */
const FIRST_SENTENCE = /^(.+?[.!?।])\s+([\s\S]+)$/;

/** The opening paragraph, with its first sentence brought up to white. */
function Lede({ paragraph }: { paragraph: WorkParagraph }) {
  // Paragraphs with links aren't split; none open a case study so far.
  if (typeof paragraph !== "string") return <Paragraph paragraph={paragraph} />;

  const match = paragraph.match(FIRST_SENTENCE);
  const [first, rest] = match ? [match[1], match[2]] : [paragraph, ""];

  return (
    <>
      <span className="text-text-primary">{first}</span>
      {rest && ` ${rest}`}
    </>
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
              <Fragment key={i}>
                <p className="text-body text-text-secondary leading-relaxed">
                  {i === 0 ? (
                    <Lede paragraph={paragraph} />
                  ) : (
                    <Paragraph paragraph={paragraph} />
                  )}
                </p>
                {i === 0 && <WorkImpact text={copy.impact} className="my-2" />}
              </Fragment>
            ))}
          </LangFade>
        </div>

        {item.videos && <WorkDemos videos={item.videos} />}

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
