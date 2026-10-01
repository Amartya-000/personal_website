import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import WorkEmbed from "@/components/WorkEmbed";
import { WORK_ITEMS, getWorkItem } from "@/lib/work";

export const dynamicParams = false;

type WorkDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return WORK_ITEMS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) return {};

  return {
    title: `${item.title} — Amartya Bhattacharya`,
    description: item.subtitle,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailProps) {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) notFound();

  return (
    <main className="relative z-10 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-16 lg:px-24 pt-[14vh] md:pt-[22vh] pb-32">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-caption text-text-secondary hover:text-brand transition-colors duration-200 opacity-0 animate-[fadeSlideIn_0.6s_ease_0.05s_forwards]"
        >
          <ArrowLeft size={13} strokeWidth={1.5} aria-hidden="true" />
          Work
        </Link>

        <header className="mt-8 mb-10 md:mb-14">
          <span className="block text-caption uppercase tracking-[0.18em] text-text-muted opacity-0 animate-[fadeSlideIn_0.6s_ease_0.1s_forwards]">
            {item.eyebrow}
          </span>
          <h1 className="mt-3 text-title font-normal text-text-primary leading-[1.05] opacity-0 animate-[fadeSlideIn_0.6s_ease_0.2s_forwards]">
            {item.title}
          </h1>
        </header>

        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface-2 border border-white/[0.06] opacity-0 animate-[fadeSlideIn_0.6s_ease_0.3s_forwards]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            priority
            sizes="(min-width:768px) 768px, 100vw"
            className={
              item.imageMode === "logo"
                ? "object-contain p-12 md:p-16"
                : "object-cover"
            }
          />
        </div>

        <div className="mt-10 md:mt-12 flex flex-col gap-5 opacity-0 animate-[fadeSlideIn_0.6s_ease_0.4s_forwards]">
          {item.body.map((paragraph, i) => (
            <p key={i} className="text-body text-text-secondary leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <WorkEmbed embed={item.embed} />
      </div>
    </main>
  );
}
