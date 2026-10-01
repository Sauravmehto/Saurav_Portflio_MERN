"use client";

import { useMediaQuery } from "./use-media-query";

/**
 * Tracks the user's `prefers-reduced-motion` OS setting.
 * Used to gate GSAP/Framer/R3F animation work throughout the site.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
