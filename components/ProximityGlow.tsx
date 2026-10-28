"use client";

import { useEffect, type RefObject } from "react";

interface ProximityGlowProps {
  audioRef: RefObject<HTMLElement | null>;
  logoRef: RefObject<HTMLElement | null>;
}

/** How far from an icon, in px, the mouse starts to light it up. */
const RADIUS = 180;

/**
 * How much the icon the mouse is closest to outshines the rest. Each icon's
 * glow is scaled by ((d_nearest + SOFTEN) / (d + SOFTEN)) ^ EMPHASIS, where d
 * is the distance to the icon's center. The closest icon keeps its full glow
 * and the others drop off fast; two icons equally close glow equally, so
 * nothing jumps as the closest one changes. SOFTEN keeps neighbors from
 * cutting out completely when the mouse sits dead on an icon's center.
 */
const EMPHASIS = 2;
const SOFTEN = 16;

/**
 * Sets --glow on the logo and audio button by how close the mouse is: 1 over
 * the icon, falling to 0 at RADIUS, with the closest icon emphasized. The
 * .proximity-glow rule in globals.css turns it into a green glow.
 */
export default function ProximityGlow({ audioRef, logoRef }: ProximityGlowProps) {
  useEffect(() => {
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const update = () => {
      frame = 0;
      const els = [audioRef.current, logoRef.current].filter(
        (el): el is HTMLElement => el !== null,
      );

      // Read every box before writing any style, so the loop never forces a
      // layout between writes.
      const boxes = els.map((el) => el.getBoundingClientRect());
      let glows = boxes.map(() => 0);

      if (pointer) {
        const { x, y } = pointer;
        const centers = boxes.map((r) =>
          Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2)),
        );
        const nearest = Math.min(...centers);

        glows = boxes.map((r, i) => {
          // Distance to the nearest edge of the icon's box, zero inside it,
          // sets how bright the icon can get.
          const dx = Math.max(r.left - x, 0, x - r.right);
          const dy = Math.max(r.top - y, 0, y - r.bottom);
          const reach = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
          const emphasis = ((nearest + SOFTEN) / (centers[i] + SOFTEN)) ** EMPHASIS;
          return reach * emphasis;
        });
      }

      els.forEach((el, i) => el.style.setProperty("--glow", glows[i].toFixed(3)));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onPointerMove = (e: PointerEvent) => {
      // Touch and pen have no hover, so a tap shouldn't leave icons lit.
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };

    const onLeave = () => {
      pointer = null;
      schedule();
    };

    const root = document.documentElement;
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [audioRef, logoRef]);

  return null;
}
