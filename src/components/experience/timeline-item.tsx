"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/lib/site-config";

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
  "data-cursor": "hover",
} as const;

const linkClass =
  "underline decoration-border underline-offset-4 transition hover:text-accent hover:decoration-accent";

export function TimelineItem({
  item,
  index,
}: {
  item: Experience;
  index: number;
}) {
  const companyUrls =
    item.companyUrl === undefined
      ? []
      : Array.isArray(item.companyUrl)
        ? item.companyUrl
        : [item.companyUrl];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
      className="relative pl-10 sm:pl-12"
    >
      {/* dot marker sitting on the rail */}
      <span
        aria-hidden
        className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-accent bg-background sm:h-6 sm:w-6"
      >
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>

      <div className="group rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition hover:border-accent hover:shadow-[0_0_32px_-10px_var(--color-accent)] sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">
            {item.role}
          </h3>
          <span className="font-mono text-xs uppercase tracking-wide text-accent">
            {item.start} — {item.end}
          </span>
        </div>

        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-muted-foreground">
          {companyUrls.length === 1 ? (
            <a href={companyUrls[0]} {...externalLinkProps} className={linkClass}>
              {item.company}
            </a>
          ) : (
            <span>{item.company}</span>
          )}
          {/* multiple domains: show each by hostname after the company name */}
          {companyUrls.length > 1 &&
            companyUrls.map((url) => (
              <a key={url} href={url} {...externalLinkProps} className={`font-mono text-xs ${linkClass}`}>
                {new URL(url).hostname}
              </a>
            ))}
        </p>

        <ul className="mt-4 space-y-2">
          {item.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {bullet}
            </li>
          ))}
        </ul>

        {item.linkedSection && (
          <a
            href={item.linkedSection.href}
            data-cursor="hover"
            className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            {item.linkedSection.label}
            <span aria-hidden className="transition-transform duration-200 group-hover/link:translate-y-0.5">
              ↓
            </span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
