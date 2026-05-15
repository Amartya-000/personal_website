"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Asterisk } from "lucide-react";

interface MarqueeProps {
  isBengali: boolean;
}

const BASE_SPEED = 30; // px/sec
const HOVER_SPEED = BASE_SPEED * 1.2;

const ENGLISH_ITEMS = ["Machine Learning", "DSP", "Audio", "& More"];
const BENGALI_ITEMS = ["মেশিন লার্নিং", "DSP", "অডিও", "ও আরও"];

function Separator() {
  return (
    <Asterisk
      size={28}
      strokeWidth={1.25}
      className="mx-6 md:mx-10 inline-block shrink-0"
      aria-hidden="true"
    />
  );
}

function ItemGroup({
  isBengali,
  ariaHidden,
  groupRef,
}: {
  isBengali: boolean;
  ariaHidden?: boolean;
  groupRef?: (el: HTMLSpanElement | null) => void;
}) {
  const items = isBengali ? BENGALI_ITEMS : ENGLISH_ITEMS;
  return (
    <span
      ref={groupRef}
      aria-hidden={ariaHidden}
      className="text-title font-[family-name:var(--font-libre-baskerville)] italic text-text-secondary inline-flex items-center shrink-0"
    >
      {items.map((label, i) => (
        <span key={i} className="inline-flex items-center">
          {label}
          <Separator />
        </span>
      ))}
    </span>
  );
}

export default function Marquee({ isBengali }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupElRef = useRef<HTMLSpanElement | null>(null);
  const targetSpeedRef = useRef(BASE_SPEED);
  const speedRef = useRef(BASE_SPEED);
  const translateRef = useRef(0);
  const [copyCount, setCopyCount] = useState(3);

  const setTrackRef = (el: HTMLDivElement | null) => {
    trackRef.current = el;
  };
  const setGroupRef = (el: HTMLSpanElement | null) => {
    groupElRef.current = el;
  };

  useEffect(() => {
    let raf = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;

      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.06;

      const group = groupElRef.current;
      const track = trackRef.current;
      if (group && track) {
        const groupW = group.offsetWidth;
        translateRef.current -= (speedRef.current * dt) / 1000;
        if (groupW > 0) {
          while (-translateRef.current >= groupW) {
            translateRef.current += groupW;
          }
        }
        track.style.transform = `translate3d(${translateRef.current}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const group = groupElRef.current;
    if (!container || !group) return;

    const measure = () => {
      const containerW = container.offsetWidth;
      const groupW = group.offsetWidth;
      if (groupW > 0 && containerW > 0) {
        setCopyCount(Math.ceil(containerW / groupW) + 2);
      }
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(group);

    return () => ro.disconnect();
  }, [isBengali]);

  return (
    <div
      ref={containerRef}
      className="w-full select-none py-4 mix-blend-difference overflow-hidden"
      onMouseEnter={() => {
        targetSpeedRef.current = HOVER_SPEED;
      }}
      onMouseLeave={() => {
        targetSpeedRef.current = BASE_SPEED;
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isBengali ? "bn" : "en"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            ref={setTrackRef}
            className="flex whitespace-nowrap will-change-transform"
          >
            <ItemGroup isBengali={isBengali} groupRef={setGroupRef} />
            {Array.from({ length: copyCount - 1 }, (_, i) => (
              <ItemGroup key={i} isBengali={isBengali} ariaHidden />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
