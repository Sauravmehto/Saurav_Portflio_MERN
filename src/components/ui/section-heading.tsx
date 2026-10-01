"use client";

import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={alignClass}>
      <p className="font-mono text-sm uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <Reveal
        as="h2"
        text={title}
        className={`mt-3 max-w-3xl text-4xl font-black tracking-tight text-foreground sm:text-5xl ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}
