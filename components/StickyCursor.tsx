"use client";

import { useEffect, useRef, useCallback, type RefObject } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface StickyCursorProps {
  navRefs: RefObject<(HTMLElement | null)[]>;
  audioRef: RefObject<HTMLElement | null>;
  logoRef?: RefObject<HTMLElement | null>;
}

const CURSOR_SIZE = 20;
const PADDING = 6;

// Position tracks the pointer, so it runs near-critically damped (ζ ≈ 0.96) and
// stiff — overshoot here reads as lag. Size morphs less often and keeps a
// softer spring so the hover expansion still feels smooth rather than snapping.
const POSITION_SPRING = { damping: 36, stiffness: 1400, mass: 0.25 };
const SIZE_SPRING = { damping: 24, stiffness: 450, mass: 0.4 };

export default function StickyCursor({ navRefs, audioRef, logoRef }: StickyCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const hoveredEl = useRef<HTMLElement | null>(null);
  // Cached so the mousemove handler never forces a synchronous layout.
  const hoveredRect = useRef<DOMRect | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorW = useMotionValue(CURSOR_SIZE);
  const cursorH = useMotionValue(CURSOR_SIZE);
  const borderRadius = useMotionValue(CURSOR_SIZE / 2);

  const smoothX = useSpring(mouseX, POSITION_SPRING);
  const smoothY = useSpring(mouseY, POSITION_SPRING);
  const smoothW = useSpring(cursorW, SIZE_SPRING);
  const smoothH = useSpring(cursorH, SIZE_SPRING);
  const smoothRadius = useSpring(borderRadius, SIZE_SPRING);

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
    if (logoRef?.current) {
      els.push(logoRef.current);
    }
    return els;
  }, [navRefs, audioRef, logoRef]);

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
      const rect = hoveredRect.current;

      if (isHovering.current && rect) {
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

      // Measure once on enter; reused for every move while hovering.
      const rect = el.getBoundingClientRect();
      hoveredRect.current = rect;
      const w = rect.width + PADDING * 2;
      const h = rect.height + PADDING * 2;
      cursorW.set(w);
      cursorH.set(h);
      borderRadius.set(h / 2);
    };

    const onLeave = () => {
      isHovering.current = false;
      hoveredEl.current = null;
      hoveredRect.current = null;
      cursorW.set(CURSOR_SIZE);
      cursorH.set(CURSOR_SIZE);
      borderRadius.set(CURSOR_SIZE / 2);
    };

    // The cached rect is only stale if the page reflows under a held hover.
    const remeasure = () => {
      if (hoveredEl.current) {
        hoveredRect.current = hoveredEl.current.getBoundingClientRect();
      }
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

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", remeasure);
    window.addEventListener("scroll", remeasure, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("scroll", remeasure);
    });

    return () => {
      for (const fn of cleanups) fn();
    };
  }, [getAllElements, mouseX, mouseY, cursorW, cursorH, borderRadius]);

  return (
    <motion.div
      ref={cursorRef}
      style={{
        // x/y compile to a transform, which the compositor can handle without
        // a layout pass. left/top would reflow the page on every frame.
        left: 0,
        top: 0,
        x: smoothX,
        y: smoothY,
        width: smoothW,
        height: smoothH,
        borderRadius: smoothRadius,
        willChange: "transform",
      }}
      className="fixed bg-[#4CAF50]/40 pointer-events-none z-[60] hidden md:block mix-blend-screen"
    />
  );
}
