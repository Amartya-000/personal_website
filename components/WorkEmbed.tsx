"use client";

import LangFade from "@/components/LangFade";
import { useLang } from "@/components/SiteShell";
import type { WorkEmbedConfig } from "@/lib/work";

/**
 * Live, running example of a project.
 *
 * Renders nothing until an item defines `embed`, so it can sit on every
 * detail page ahead of the demos existing. When the embed mechanism is
 * settled, this is the only file that needs to change.
 */
export default function WorkEmbed({ embed }: { embed?: WorkEmbedConfig }) {
  const { isBengali } = useLang();

  if (!embed) return null;

  return (
    <section className="mt-12 md:mt-16">
      <h2 className="text-caption uppercase tracking-[0.18em] text-text-muted mb-4">
        <LangFade inline>{isBengali ? "লাইভ ডেমো" : "Live demo"}</LangFade>
      </h2>
      <iframe
        src={embed.src}
        title={embed.title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms"
        className={`w-full ${embed.aspect ?? "aspect-video"} rounded-2xl border border-white/[0.06] bg-surface-2`}
      />
    </section>
  );
}
