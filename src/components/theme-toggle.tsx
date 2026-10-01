"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useIsClient } from "@/hooks/use-media-query";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // resolvedTheme is unknown on the server — render a neutral shell until hydrated
  const mounted = useIsClient();

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full border border-border" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      data-cursor="hover"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark and light mode"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition hover:border-accent"
    >
      <motion.span
        key={isDark ? "dark" : "light"}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.25 }}
        className="text-sm"
      >
        {isDark ? "🌙" : "☀️"}
      </motion.span>
    </button>
  );
}
