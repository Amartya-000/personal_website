import type { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import { MEDIA_ITEMS } from "@/lib/media";

export const metadata: Metadata = {
  title: "Media — Amartya Bhattacharya",
  description: "Talks, interviews, and writing.",
};

export default function MediaPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 pt-[22vh] pb-32">
        <header className="mb-16 md:mb-20">
          <h1
            className="text-title font-normal text-text-primary leading-[1.05] opacity-0 animate-[fadeSlideIn_0.6s_ease_0.1s_forwards]"
          >
            Media
          </h1>
          <p
            className="mt-4 text-body text-text-secondary max-w-xl leading-relaxed opacity-0 animate-[fadeSlideIn_0.6s_ease_0.25s_forwards]"
          >
            Talks, interviews, and writing.
          </p>
        </header>

        <MediaGrid items={MEDIA_ITEMS} />
      </div>
    </main>
  );
}
