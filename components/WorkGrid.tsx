"use client";

import { motion } from "framer-motion";
import WorkCard from "@/components/WorkCard";
import type { WorkItem } from "@/lib/work";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
} as const;

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-14"
    >
      {items.map((item, i) => (
        <WorkCard key={item.slug} item={item} priority={i === 0} />
      ))}
    </motion.div>
  );
}
