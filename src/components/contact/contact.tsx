"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxGlow } from "@/components/motion/parallax-glow";
import { ContactForm } from "./contact-form";
import { ContactCanvas } from "@/components/3d/contact-canvas";
import { siteConfig } from "@/lib/site-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const signOffWords = ["Let's", "build", "something."];

const socials = [
  { label: "GitHub", href: siteConfig.socials.github, Icon: SiGithub },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: FaLinkedin },
];

async function burstConfetti(origin: HTMLElement) {
  // loaded on demand so it never touches the initial bundle
  const confetti = (await import("canvas-confetti")).default;
  const rect = origin.getBoundingClientRect();
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  confetti({
    particleCount: 70,
    spread: 65,
    startVelocity: 32,
    scalar: 0.8,
    ticks: 140,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
    colors: [accent || "#915EFF", "#ffffff", "#c4b5fd"],
    disableForReducedMotion: true,
  });
}

export function Contact() {
  const reducedMotion = useReducedMotion();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copyEmail(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget;
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopyState("copied");
      if (!reducedMotion) burstConfetti(button);
    } catch {
      setCopyState("failed");
    }
    setTimeout(() => setCopyState("idle"), 2500);
  }

  return (
    <section id="contact" className="relative isolate overflow-x-clip py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 lg:hidden">
        <ParallaxGlow className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,34rem)_minmax(0,22rem)] lg:justify-between xl:grid-cols-[minmax(0,34rem)_minmax(0,26rem)]">
        <div className="text-center lg:text-left">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-3 font-mono text-sm text-accent"
        >
          Contact
        </motion.p>

        {/* kinetic sign-off: words rise in one after another */}
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {signOffWords.map((word, i) => (
            <span key={word}>
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.12, ease: "easeOut" }}
                className={`inline-block ${i === signOffWords.length - 1 ? "text-accent" : ""}`}
              >
                {word}
              </motion.span>
              {i < signOffWords.length - 1 ? " " : null}
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground lg:mx-0"
        >
          Whether it&apos;s an AI product that needs to get from idea to working demo fast, or a
          full-stack build that has to hold up in production, I&apos;d love to hear about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="mt-10 rounded-2xl border border-border bg-surface/90 p-6 text-center backdrop-blur sm:p-8 lg:text-left"
        >
          {siteConfig.openToWork && (
            <p className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Open to new roles · {siteConfig.location}
            </p>
          )}

          <p className="font-mono text-lg text-foreground sm:text-xl">{siteConfig.email}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Magnetic>
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
              >
                <Mail aria-hidden className="h-4 w-4" />
                Email me
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              data-cursor="hover"
              className="min-w-[8.5rem] rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              {copyState === "copied" ? "Copied ✓" : copyState === "failed" ? "Copy failed" : "Copy email"}
            </button>
            {siteConfig.bookingUrl && (
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                Book a call ↗
              </a>
            )}
          </div>
          <span aria-live="polite" className="sr-only">
            {copyState === "copied" ? "Email address copied" : copyState === "failed" ? "Could not copy email address" : ""}
          </span>

          <ul className="mt-8 flex justify-center gap-6 border-t border-border pt-6 lg:justify-start">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-foreground motion-reduce:hover:translate-y-0"
                >
                  <s.Icon aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

          <ContactForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-10 font-mono text-sm text-muted-foreground"
        >
          Talk soon,{" "}
          <span className="text-foreground">{siteConfig.name.split(" ")[0]}</span>{" "}
          <motion.span
            aria-hidden
            className="inline-block origin-[70%_70%]"
            initial={{ rotate: 0 }}
            whileInView={reducedMotion ? undefined : { rotate: [0, 18, -8, 18, -4, 10, 0] }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1.4, delay: 1.1, ease: "easeInOut" }}
          >
            👋
          </motion.span>
          </motion.p>
        </div>
        <div className="relative mx-auto hidden aspect-square w-full max-w-xl max-h-xl lg:block" aria-hidden>
          <ContactCanvas />
        </div>
      </div>
    </section>
  );
}
