"use client";

import { motion } from "framer-motion";
import MediaCard from "@/components/MediaCard";
import type { MediaItem } from "@/lib/media";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
} as const;

export default function MediaGrid({ items }: { items: MediaItem[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-14"
    >
      {items.map((item, i) => (
        <MediaCard key={item.id} item={item} priority={i === 0} />
      ))}
    </motion.div>
  );
}
