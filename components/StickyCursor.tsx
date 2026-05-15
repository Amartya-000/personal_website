"use client";

import { useEffect, useRef, useCallback, type RefObject } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface StickyCursorProps {
  navRefs: RefObject<(HTMLElement | null)[]>;
  audioRef: RefObject<HTMLElement | null>;
}

const CURSOR_SIZE = 20;
const PADDING = 6;

export default function StickyCursor({ navRefs, audioRef }: StickyCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const hoveredEl = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorW = useMotionValue(CURSOR_SIZE);
  const cursorH = useMotionValue(CURSOR_SIZE);
  const borderRadius = useMotionValue(CURSOR_SIZE / 2);

  const spring = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);
  const smoothW = useSpring(cursorW, spring);
  const smoothH = useSpring(cursorH, spring);
  const smoothRadius = useSpring(borderRadius, spring);

  const getAllElements = useCallback((): HTMLElement[] => {
    const els: HTMLElement[] = [];
    if (navRefs.current) {
      for (const el of navRefs.current) {
        if (el) els.push(el);
      }
    }
    if (audioRef.current) {
      els.push(audioRef.current);
    }
    return els;
  }, [navRefs, audioRef]);

  useEffect(() => {
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "sticky-cursor-hide";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = "";
      const el = document.getElementById("sticky-cursor-hide");
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isHovering.current && hoveredEl.current) {
        const rect = hoveredEl.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Sticky: pull toward element center
        const stickyX = centerX + (e.clientX - centerX) * 0.4;
        const stickyY = centerY + (e.clientY - centerY) * 0.4;

        // Position is top-left corner of the cursor rect
        const w = rect.width + PADDING * 2;
        const h = rect.height + PADDING * 2;
        mouseX.set(stickyX - w / 2);
        mouseY.set(stickyY - h / 2);
        cursorW.set(w);
        cursorH.set(h);
        borderRadius.set(h / 2);
      } else {
        mouseX.set(e.clientX - CURSOR_SIZE / 2);
        mouseY.set(e.clientY - CURSOR_SIZE / 2);
        cursorW.set(CURSOR_SIZE);
        cursorH.set(CURSOR_SIZE);
        borderRadius.set(CURSOR_SIZE / 2);
      }
    };

    const onEnter = (el: HTMLElement) => () => {
      isHovering.current = true;
      hoveredEl.current = el;

      // Immediately set dimensions on enter
      const rect = el.getBoundingClientRect();
      const w = rect.width + PADDING * 2;
      const h = rect.height + PADDING * 2;
      cursorW.set(w);
      cursorH.set(h);
      borderRadius.set(h / 2);
    };

    const onLeave = () => {
      isHovering.current = false;
      hoveredEl.current = null;
      cursorW.set(CURSOR_SIZE);
      cursorH.set(CURSOR_SIZE);
      borderRadius.set(CURSOR_SIZE / 2);
    };

    const elements = getAllElements();
    const cleanups: (() => void)[] = [];

    for (const el of elements) {
      const enter = onEnter(el);
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", onLeave);
      });
    }

    window.addEventListener("mousemove", onMouseMove);
    cleanups.push(() => window.removeEventListener("mousemove", onMouseMove));

    return () => {
      for (const fn of cleanups) fn();
    };
  }, [getAllElements, mouseX, mouseY, cursorW, cursorH, borderRadius]);

  return (
    <motion.div
      ref={cursorRef}
      style={{
        left: smoothX,
        top: smoothY,
        width: smoothW,
        height: smoothH,
        borderRadius: smoothRadius,
      }}
      className="fixed bg-[#4CAF50]/40 pointer-events-none z-[60] hidden md:block mix-blend-screen"
    />
  );
}
