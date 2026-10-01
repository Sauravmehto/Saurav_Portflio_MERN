"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Lazy-loaded wrapper around the R3F canvas so the (relatively heavy)
 * three.js bundle never ships on initial load. When the user prefers
 * reduced motion, we skip the 3D canvas entirely and render a static
 * gradient in its place (see HeroSceneFallback below, used by the parent).
 */
const HeroSceneInner = dynamic(
  () => import("./hero-scene-inner").then((mod) => mod.HeroSceneInner),
  { ssr: false, loading: () => null }
);

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");

  if (reducedMotion || !desktop) {
    return (
      <div
        aria-hidden
        className="h-full w-full rounded-full bg-gradient-to-br from-accent/40 via-accent/10 to-transparent blur-2xl"
      />
    );
  }

  return <HeroSceneInner />;
}
