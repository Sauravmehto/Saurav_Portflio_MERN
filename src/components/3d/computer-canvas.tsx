"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SceneErrorBoundary } from "./scene-error-boundary";

const ComputerScene = dynamic(
  () => import("./computer-scene").then((mod) => mod.ComputerScene),
  { ssr: false, loading: () => <HeroModelFallback /> }
);

export function HeroModelFallback() {
  return (
    <div
      aria-hidden
      className="flex h-full w-full items-end justify-center"
    >
      <div className="relative w-[min(92%,520px)]">
        <div className="aspect-[16/10] rounded-xl border border-border bg-gradient-to-br from-accent/30 via-surface to-surface-muted shadow-[0_24px_60px_-28px_var(--color-accent)]">
          <div className="absolute inset-3 rounded-lg border border-white/10 bg-[#050816]/80" />
        </div>
        <div className="mx-auto h-3 w-16 bg-surface-muted" />
        <div className="mx-auto h-2 w-28 rounded-b-md bg-border" />
      </div>
    </div>
  );
}

export function ComputerCanvas() {
  // Drag-to-rotate captures touches (OrbitControls sets touch-action: none), which would block page scrolling on phones.
  const finePointer = useMediaQuery("(pointer: fine)");

  return (
    <SceneErrorBoundary fallback={<HeroModelFallback />}>
      <div className="h-full w-full">
        <ComputerScene interactive={finePointer} />
      </div>
    </SceneErrorBoundary>
  );
}
