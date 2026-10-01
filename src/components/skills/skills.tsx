"use client";

import { siteConfig } from "@/lib/site-config";
import { TechField } from "@/components/3d/tech-field";
import { TechMarquee } from "@/components/motion/tech-marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillCategoryCard } from "./skill-category-card";

const spans: Record<string, string> = {
  Languages: "lg:col-span-1",
  Frontend: "lg:col-span-2",
  "Backend & APIs": "lg:col-span-1",
  "AI / GenAI": "lg:col-span-2",
  Databases: "lg:col-span-1",
  "DevOps & Infra": "lg:col-span-1",
  "Testing & Automation": "lg:col-span-2",
};

/**
 * NOTE: the guide calls for "hover-reveal proficiency" bars, but the resume
 * doesn't include real proficiency scores per skill — inventing numbers
 * (e.g. "React 90%") would look precise but be fabricated. Instead, hover
 * interactivity comes from the tilt + glow + chip-highlight treatment,
 * which is the differentiator from a static logo grid without claiming
 * numbers Saurav didn't provide. Add per-skill levels to SkillCategory
 * later if real self-assessed ratings are wanted.
 */
export function Skills() {
  return (
    <section id="skills" className="relative overflow-x-clip py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Skills" title="Stack I build with" />
        <TechField />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.skillCategories.map((category, i) => (
            <SkillCategoryCard
              key={category.name}
              category={category}
              index={i}
              className={spans[category.name]}
            />
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-surface/40 py-5">
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
