"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Buttery inertia smooth scroll via Lenis. Disabled entirely when the user
 * prefers reduced motion, falling back to native scroll behavior.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (reducedMotion || !desktop) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });

    // html used to be height: 100%, so Lenis never saw the page grow
    // (fonts, repo cards) and clamped scroll around Playground.
    const resize = () => lenis.resize();
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    window.addEventListener("load", resize);
    void document.fonts?.ready.then(resize);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("load", resize);
      lenis.destroy();
    };
  }, [reducedMotion, desktop]);

  return <>{children}</>;
}
