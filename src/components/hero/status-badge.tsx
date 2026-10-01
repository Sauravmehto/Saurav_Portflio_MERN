"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function StatusBadge() {
  const reduced = useReducedMotion();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            siteConfig.openToWork
              ? `bg-emerald-500 ${reduced ? "" : "animate-live-pulse"}`
              : "bg-zinc-500"
          }`}
        />
        {siteConfig.openToWork ? "Open to work" : "Not currently available"}
      </span>
      {time && (
        <span className="rounded-full border border-border bg-surface px-3 py-1">
          {time} local time
        </span>
      )}
      <span className="rounded-full border border-border bg-surface px-3 py-1">
        {siteConfig.currentFocus}
      </span>
    </div>
  );
}
