"use client";

import { motion } from "framer-motion";
import { ParallaxGlow } from "@/components/motion/parallax-glow";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";
import { ProjectCard } from "@/components/projects/project-card";

export function FreelanceSection() {
  return (
    <section className="relative min-h-screen overflow-x-clip pb-28 pt-36 sm:pb-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxGlow className="absolute left-1/2 top-24 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mb-3 font-mono text-sm text-accent"
        >
          Freelance
        </motion.p>

        <Reveal
          as="h1"
          text="Client work, shipped"
          immediate
          className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-4 max-w-xl text-muted-foreground"
        >
          Sites I&apos;ve built independently for clients, outside my full-time roles.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {siteConfig.freelanceProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              tagline={"tagline" in project ? project.tagline : undefined}
              description={project.blurb}
              stack={project.stack}
              liveUrl={project.liveUrl}
              repoUrl={project.repoUrl}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
