"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollCue() {
  const reducedMotion = useReducedMotion();

  return (
    <a
      href="#about"
      data-cursor="hover"
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      aria-label="Scroll to about"
    >
      <span className="flex h-14 w-8 items-start justify-center rounded-full border-2 border-muted-foreground/50 p-2">
        <motion.span
          aria-hidden
          className="h-2 w-2 rounded-full bg-accent"
          animate={reducedMotion ? undefined : { y: [0, 14, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </span>
    </a>
  );
}
