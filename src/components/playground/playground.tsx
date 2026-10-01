"use client";

import { motion } from "framer-motion";
import { ParallaxGlow } from "@/components/motion/parallax-glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import type { GithubRepo } from "@/lib/github";
import { FallbackWaterfall } from "./fallback-waterfall";

// fixed UTC so server and client render the same string (no hydration mismatch)
const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function RepoCard({ repo, index }: { repo: GithubRepo; index: number }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
      className="group block rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur transition hover:border-accent hover:shadow-[0_0_32px_-10px_var(--color-accent)]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="truncate font-mono text-sm font-semibold text-foreground transition group-hover:text-accent">
          {repo.name}
        </h4>
        <span aria-hidden className="text-muted-foreground transition group-hover:text-accent">
          ↗
        </span>
      </div>
      {repo.description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{repo.description}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && <span>★ {repo.stars}</span>}
        <span>Updated {monthYear.format(new Date(repo.pushedAt))}</span>
      </div>
    </motion.a>
  );
}

export function Playground({ repos }: { repos: GithubRepo[] }) {
  return (
    <section id="playground" className="relative overflow-x-clip py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <ParallaxGlow className="absolute right-0 top-1/3 h-96 w-96 translate-x-1/3 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Playground" title="Things I tinker with" />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FallbackWaterfall />
          </motion.div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-wide text-muted-foreground">
              On GitHub
            </h3>
            <div className="mt-4 space-y-4">
              {repos.map((repo, i) => (
                <RepoCard key={repo.name} repo={repo} index={i} />
              ))}
            </div>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              {repos.length > 0 ? "All repos on GitHub" : "See my work on GitHub"}
              <span aria-hidden className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
