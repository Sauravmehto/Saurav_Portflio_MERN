"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { techLogos } from "@/components/skills/tech-logos";
import { SceneErrorBoundary } from "./scene-error-boundary";

const TechFieldCanvas = dynamic(
  () => import("./tech-field-scene").then((mod) => mod.TechFieldCanvas),
  { ssr: false }
);

function StaticLogos() {
  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {techLogos.map(({ name, Icon }) => (
        <li
          key={name}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface/80 px-3 py-4 text-center text-muted-foreground transition hover:border-accent hover:text-foreground"
        >
          <Icon aria-hidden className="h-7 w-7" />
          <span className="text-xs">{name}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * One canvas for every logo on desktop. Phones and reduced-motion get the
 * static icon grid, so there is never a canvas per technology.
 */
export function TechField() {
  const desktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useReducedMotion();
  const showCanvas = desktop && !reducedMotion;
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || !showCanvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [showCanvas]);

  return (
    <div className="mt-12">
      {showCanvas ? (
        <SceneErrorBoundary fallback={<StaticLogos />}>
          <div ref={frameRef} className="h-[420px] w-full overflow-hidden">
            <TechFieldCanvas spin={inView} />
          </div>
          <ul className="sr-only">
            {techLogos.map(({ name }) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </SceneErrorBoundary>
      ) : (
        <StaticLogos />
      )}
    </div>
  );
}
