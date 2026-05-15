"use client";

import { GodRays } from "@paper-design/shaders-react";
import "./god-rays.css";

export default function GodRaysBackground() {
  return (
    <div className="god-rays-bg" aria-hidden="true">
      <GodRays
        width="100%"
        height="100%"
        fit="cover"
        colorBack="#050505"
        colorBloom="#ffffff"
        colors={["#ffffff40", "#ffffff80", "#ffffff55"]}
        bloom={0.28}
        intensity={0.68}
        density={0.24}
        spotty={0.38}
        midSize={0.2}
        midIntensity={0.6}
        speed={0.5}
        scale={1.25}
        offsetX={0}
        offsetY={-0.55}
        minPixelRatio={1}
        maxPixelCount={1_500_000}
      />
      <div className="god-rays-glow" />
      <div className="god-rays-depth-fade" />
      <div className="god-rays-noise" />
      <div className="god-rays-vignette" />
    </div>
  );
}
