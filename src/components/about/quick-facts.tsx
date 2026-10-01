"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { CountUp } from "@/components/motion/count-up";

const topStack = ["Frontend", "Backend & APIs"]
  .flatMap(
    (categoryName) =>
      siteConfig.skillCategories.find((c) => c.name === categoryName)?.skills.slice(0, 2) ?? []
  )
  .join(", ");

const featuredCount = siteConfig.projects.filter((project) => project.featured).length;

const facts: { label: string; text?: string; count?: number; suffix?: string }[] = [
  { label: "Experience", count: siteConfig.yearsExperience, suffix: "+" },
  { label: "Featured projects", count: featuredCount },
  { label: "Stack", text: topStack },
  { label: "Location", text: siteConfig.location },
  { label: "Current focus", text: siteConfig.currentFocus },
];

export function QuickFacts() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((fact, i) => (
        <motion.li
          key={fact.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
          className="group rounded-2xl border border-border bg-surface/60 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_24px_-8px_var(--color-accent)] motion-reduce:hover:translate-y-0"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {fact.label}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {fact.count !== undefined ? (
              <span className="text-2xl font-semibold tracking-tight">
                <CountUp to={fact.count} suffix={fact.suffix} />
                {fact.suffix === "+" ? <span className="sr-only"> years</span> : null}
              </span>
            ) : (
              fact.text
            )}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}
