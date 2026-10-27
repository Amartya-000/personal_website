import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetail from "@/components/WorkDetail";
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

  return <WorkDetail item={item} />;
}
