"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ComputerCanvas } from "@/components/3d/computer-canvas";
import { siteConfig } from "@/lib/site-config";
import { ScrollCue } from "./scroll-cue";
import { StatusBadge } from "./status-badge";

const typeSequence = siteConfig.roles.flatMap((line) => [line, 1800]);

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(145,94,255,0.16),transparent_58%)]"
      />

      <div className="mx-auto grid w-full max-w-[90rem] flex-1 grid-cols-1 items-center gap-6 px-6 pb-24 pt-28 md:grid-cols-[minmax(17rem,1fr)_minmax(0,1.15fr)] md:gap-4 lg:gap-8 xl:grid-cols-[minmax(17rem,1fr)_760px]">
        <div className="flex gap-5">
          <div aria-hidden className="mt-3 flex flex-col items-center">
            <span className="h-5 w-5 rounded-full bg-accent" />
            <span className="violet-line h-36 w-px sm:h-56" />
          </div>

          <div className="min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-sm uppercase tracking-[0.18em] text-accent"
            >
              Hi, I&apos;m
            </motion.p>

            <Reveal
              as="h1"
              text={siteConfig.name}
              immediate
              gradientWord="Mehto"
              className="mt-3 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-4 max-w-xl text-lg leading-snug text-muted-foreground sm:text-xl"
            >
              {siteConfig.role}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-3 min-h-8 max-w-xl text-base text-foreground/80 sm:text-lg"
            >
              <TypeAnimation sequence={typeSequence} wrapper="span" speed={50} repeat={Infinity} cursor />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.52 }}
              className="mt-6"
            >
              <StatusBadge />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.64 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Magnetic>
                <a
                  href="#projects"
                  data-cursor="hover"
                  className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
                >
                  View Work
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
                >
                  Download Resume
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <div className="relative aspect-[760/500] w-full max-w-[760px] justify-self-end overflow-hidden xl:aspect-auto xl:h-[500px] xl:w-[760px]">
          <ComputerCanvas />
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
