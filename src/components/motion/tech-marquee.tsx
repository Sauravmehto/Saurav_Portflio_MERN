"use client";

import { techLogos } from "@/components/skills/tech-logos";

function Row({ reverse, hidden }: { reverse?: boolean; hidden?: boolean }) {
  return (
    <div
      className={`flex overflow-hidden ${hidden ? "select-none" : ""}`}
      aria-hidden={hidden || undefined}
    >
      <div className={`flex w-max shrink-0 ${reverse ? "marquee-right" : "marquee-left"}`}>
        <span className="flex">
          {techLogos.map(({ name, Icon }) => (
            <span key={name} className="inline-flex items-center gap-2 px-6 text-sm text-muted-foreground">
              <Icon aria-hidden className="h-4 w-4" />
              {name}
            </span>
          ))}
        </span>
        <span className="flex select-none" aria-hidden>
          {techLogos.map(({ name, Icon }) => (
            <span key={`${name}-copy`} className="inline-flex items-center gap-2 px-6 text-sm text-muted-foreground">
              <Icon aria-hidden className="h-4 w-4" />
              {name}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div aria-label="Technologies" className="space-y-3">
      <Row />
      <Row reverse hidden />
    </div>
  );
}
