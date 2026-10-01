"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

/**
 * Masonry of quote cards. Rendered only when
 * `siteConfig.testimonialsEnabled` is true (see page.tsx).
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-x-clip py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/3 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-3 font-mono text-sm text-accent"
        >
          Testimonials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl"
        >
          What people say
        </motion.h2>

        <div className="mt-12 gap-5 sm:columns-2 lg:columns-3">
          {siteConfig.testimonials.map((t, i) => {
            const avatarUrl = "avatarUrl" in t ? (t.avatarUrl as string | undefined) : undefined;
            const initials = t.name
              .split(" ")
              .map((part) => part[0])
              .join("");

            return (
              <motion.figure
                key={`${t.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
                className="mb-5 break-inside-avoid rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition hover:border-accent hover:shadow-[0_0_32px_-10px_var(--color-accent)] sm:p-8"
              >
                <span aria-hidden className="font-mono text-3xl leading-none text-accent">
                  &ldquo;
                </span>
                <blockquote className="mt-2 leading-relaxed text-foreground">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-muted font-mono text-xs text-accent">
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="" fill sizes="40px" className="object-cover" />
                    ) : (
                      initials
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
