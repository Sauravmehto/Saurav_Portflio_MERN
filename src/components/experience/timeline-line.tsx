"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The connecting rail behind the timeline. Uses GSAP + ScrollTrigger
 * (the guide's pick for scroll-driven sequences) to scrub the line's fill
 * from 0 to 1 as the timeline scrolls through view — a real scroll-linked
 * animation rather than a one-shot reveal. Renders fully filled and static
 * under prefers-reduced-motion.
 */
export function TimelineLine({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (!containerRef.current || !lineRef.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    void import("gsap").then(async ({ default: gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !containerRef.current || !lineRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [containerRef, reducedMotion]);

  return (
    <div
      aria-hidden
      className="absolute left-[7px] top-1 h-full w-px bg-border sm:left-[9px]"
    >
      <div
        ref={lineRef}
        className="h-full w-full origin-top bg-accent"
        style={reducedMotion ? undefined : { transform: "scaleY(0)" }}
      />
    </div>
  );
}
