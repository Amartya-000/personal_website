"use client";

import LangFade from "@/components/LangFade";
import { useLang } from "@/components/SiteShell";

/** A string that follows the site language, for use inside server components. */
export default function LangText({ en, bn }: { en: string; bn: string }) {
  const { isBengali } = useLang();
  return <LangFade inline>{isBengali ? bn : en}</LangFade>;
}
