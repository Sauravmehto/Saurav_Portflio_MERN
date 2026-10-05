"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Renders the real headshot when `siteConfig.avatarUrl` is set. Until then,
 * falls back to an animated glow-ring placeholder with initials so the
 * section never ships a broken <img>.
 */
export function AnimatedAvatar() {
  const reducedMotion = useReducedMotion();
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[13rem] sm:max-w-[16rem] lg:max-w-xs">
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/50 via-accent/10 to-transparent blur-2xl"
        animate={
          reducedMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-border bg-surface/80 backdrop-blur">
        {siteConfig.avatarUrl ? (
          <Image
            src={reducedMotion && siteConfig.avatarPosterUrl ? siteConfig.avatarPosterUrl : siteConfig.avatarUrl}
            alt={siteConfig.name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 208px"
            className="object-cover object-top"
          />
        ) : (
          <span className="font-mono text-5xl font-semibold text-accent">
            {initials}
          </span>
        )}
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border border-accent/30"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ borderStyle: "dashed" }}
      />
    </div>
  );
}
