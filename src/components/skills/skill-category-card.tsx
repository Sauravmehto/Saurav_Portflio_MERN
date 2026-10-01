"use client";

import {
  Code2,
  Container,
  Database,
  LayoutTemplate,
  Server,
  Sparkles,
  TestTube,
  type LucideIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import { type ComponentType, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { SkillCategory } from "@/lib/site-config";

const categoryIcons: Record<string, LucideIcon> = {
  Languages: Code2,
  Frontend: LayoutTemplate,
  "Backend & APIs": Server,
  "AI / GenAI": Sparkles,
  Databases: Database,
  "DevOps & Infra": Container,
  "Testing & Automation": TestTube,
};

const Tilt = dynamic(() => import("react-tilt").then((mod) => mod.Tilt), { ssr: false }) as ComponentType<{
  options: {
    max: number;
    scale: number;
    speed: number;
    perspective: number;
    glare: boolean;
  };
  className?: string;
  children: ReactNode;
}>;

const tiltOptions = {
  max: 8,
  scale: 1.02,
  speed: 400,
  perspective: 900,
  glare: false,
};

export function SkillCategoryCard({
  category,
  index,
  className,
}: {
  category: SkillCategory;
  index: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const Icon = categoryIcons[category.name];

  const card = (
    <div
      data-cursor="hover"
      className="group h-full rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_32px_-10px_var(--color-accent)] motion-reduce:hover:translate-y-0"
    >
      <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-accent">
        {Icon && <Icon aria-hidden className="h-4 w-4" />}
        {category.name}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-muted-foreground transition-all duration-200 group-hover:border-accent/40 hover:!border-accent hover:!bg-accent/10 hover:!text-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
      className={`h-full ${className ?? ""}`}
    >
      {reducedMotion || !finePointer ? (
        card
      ) : (
        <Tilt options={tiltOptions} className="h-full">
          {card}
        </Tilt>
      )}
    </motion.div>
  );
}
