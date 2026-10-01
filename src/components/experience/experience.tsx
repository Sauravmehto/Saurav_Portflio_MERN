"use client";

import { useRef } from "react";
import { ParallaxGlow } from "@/components/motion/parallax-glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { TimelineLine } from "./timeline-line";
import { TimelineItem } from "./timeline-item";

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="relative overflow-x-clip py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxGlow className="absolute right-0 top-1/2 h-96 w-96 translate-x-1/3 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        <div ref={containerRef} className="relative mt-14 space-y-10">
          <TimelineLine containerRef={containerRef} />
          {siteConfig.experience.map((item, i) => (
            <TimelineItem key={`${item.company}-${item.start}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
