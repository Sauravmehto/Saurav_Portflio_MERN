"use client";

import { motion } from "framer-motion";
import { ParallaxGlow } from "@/components/motion/parallax-glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, type Project } from "@/lib/site-config";
import { ProjectCard } from "./project-card";

const featured = siteConfig.projects.filter((p) => p.featured) as readonly Project[];
const more = siteConfig.projects.filter((p) => !p.featured) as readonly Project[];

export function Projects() {
  return (
    <section id="projects" className="relative overflow-x-clip py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxGlow className="absolute left-1/2 top-1/4 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Projects" title="Selected work" />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              tagline={project.tagline}
              description={project.description}
              stack={project.stack}
              liveUrl={project.liveUrl}
              liveLabel={project.liveLabel}
              repoUrl={project.repoUrl}
              image={project.image}
              video={project.video}
              index={i}
              // odd count: lead project spans the full row so the grid has no gap
              className={i === 0 && featured.length % 2 === 1 ? "md:col-span-2" : ""}
            />
          ))}
        </div>

        {more.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-20 font-mono text-sm uppercase tracking-wide text-muted-foreground"
            >
              More work
            </motion.h3>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {more.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  tagline={project.tagline}
                  description={project.description}
                  stack={project.stack}
                  liveUrl={project.liveUrl}
                  liveLabel={project.liveLabel}
                  repoUrl={project.repoUrl}
                  image={project.image}
                  video={project.video}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
