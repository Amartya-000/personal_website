"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.0 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Rays stream from top-right corner downward-left at ~25 deg from vertical
    float angle = -0.44;
    vec2 rayDir = vec2(sin(angle), -cos(angle));
    vec2 perpDir = vec2(-rayDir.y, rayDir.x);

    vec2 source = vec2(1.0, 1.0);
    float perpCoord = dot(uv - source, perpDir);
    float alongCoord = dot(uv - source, rayDir);

    // Animated time offset — visible movement
    float t = uTime * 0.06;

    // Layer 1: broad beams
    float r1 = fbm(vec2(perpCoord * 3.0 + t * 0.3, alongCoord * 0.8 + t));
    r1 = smoothstep(0.3, 0.7, r1);

    // Layer 2: medium beams
    float r2 = fbm(vec2(perpCoord * 5.5 + 50.0 + t * 0.2, alongCoord * 1.2 + t * 0.8));
    r2 = smoothstep(0.35, 0.7, r2);

    // Layer 3: fine dappling
    float r3 = fbm(vec2(perpCoord * 10.0 + 100.0 + t * 0.15, alongCoord * 2.0 + t * 0.6));
    r3 = smoothstep(0.4, 0.7, r3);

    float rays = r1 * 0.55 + r2 * 0.3 + r3 * 0.15;

    // Fade from source (top-right) across the screen
    float distFromSource = length(uv - source);
    float sourceFade = smoothstep(2.2, 0.0, distFromSource);

    // Stronger at top, gentle falloff downward
    float topFade = smoothstep(-0.1, 0.9, uv.y);

    rays *= sourceFade * topFade;

    // Color: warm off-white
    vec3 color = vec3(0.85, 0.88, 0.86) * rays;

    gl_FragColor = vec4(color, rays * 0.5);
  }
`;

function GodRays() {
  const timeRef = useRef(0);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function GodRayBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 90 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <GodRays />
    </Canvas>
  );
}
