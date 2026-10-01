"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SceneErrorBoundary } from "./scene-error-boundary";

const ContactScene = dynamic(
  () => import("./contact-scene").then((mod) => mod.ContactScene),
  { ssr: false }
);

export function ContactCanvas() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || !desktop) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [desktop]);

  if (!desktop) return null;

  return (
    <SceneErrorBoundary fallback={null}>
      <div ref={frameRef} className="pointer-events-none absolute inset-0 overflow-hidden">
        <ContactScene spin={inView && !reducedMotion} />
      </div>
    </SceneErrorBoundary>
  );
}
