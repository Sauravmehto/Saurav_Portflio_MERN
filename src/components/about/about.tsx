"use client";

import { motion } from "framer-motion";
import { Container, LayoutTemplate, Server, Sparkles, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedAvatar } from "./animated-avatar";
import { QuickFacts } from "./quick-facts";

const focus = [
  { name: "Frontend", Icon: LayoutTemplate },
  { name: "Backend & APIs", Icon: Server },
  { name: "AI / GenAI", Icon: Sparkles },
  { name: "DevOps & Infra", Icon: Container },
] as const satisfies readonly { name: string; Icon: LucideIcon }[];

export function About() {
  return (
    <section id="about" className="relative overflow-x-clip py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Introduction" title="Overview." />

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="space-y-4">
            {siteConfig.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
                className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[17px]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center rounded-2xl border border-border bg-surface/80 p-8"
          >
            <AnimatedAvatar />
          </motion.div>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focus.map(({ name, Icon }, index) => {
            const category = siteConfig.skillCategories.find((item) => item.name === name);
            if (!category) return null;
            return (
              <motion.li
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.06 * index, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-surface/80 p-5 transition hover:-translate-y-0.5 hover:border-accent motion-reduce:hover:translate-y-0"
              >
                <Icon aria-hidden className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {category.skills.slice(0, 4).join(" · ")}
                </p>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-10">
          <QuickFacts />
        </div>
      </div>
    </section>
  );
}
