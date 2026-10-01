"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Site favicon via Google's favicon service. When a site has no favicon,
 * Google still answers (HTTP 404 + a 16×16 generic globe), which browsers
 * render without firing onError. So we also treat a ≤16px result as
 * "no favicon" and render nothing, same as a failed load.
 */
function Favicon({ url }: { url: string }) {
  const [status, setStatus] = useState<"loading" | "ok" | "none">("loading");
  if (status === "none") return null;

  const hostname = new URL(url).hostname;
  const judge = (img: HTMLImageElement) =>
    setStatus(img.naturalWidth > 16 ? "ok" : "none");

  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny third-party icon; next/image would need remote config and adds nothing here
    <img
      src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`}
      alt=""
      aria-hidden
      width={20}
      height={20}
      loading="lazy"
      referrerPolicy="no-referrer"
      // the image can finish loading before hydration attaches onLoad
      ref={(img) => {
        if (img?.complete && status === "loading") {
          if (img.naturalWidth === 0) setStatus("none");
          else judge(img);
        }
      }}
      onLoad={(e) => judge(e.currentTarget)}
      onError={() => setStatus("none")}
      className={`h-5 w-5 shrink-0 rounded ${status === "ok" ? "" : "hidden"}`}
    />
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 fill-current">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

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

export type ProjectCardProps = {
  title: string;
  tagline?: string;
  description: string;
  stack: readonly string[];
  liveUrl?: string;
  /** Overrides "Live demo" when liveUrl isn't a demo (e.g. a login page). */
  liveLabel?: string;
  repoUrl?: string;
  image?: string;
  video?: string;
  index: number;
  /** Grid placement for the wrapper, e.g. "md:col-span-2". */
  className?: string;
};

/**
 * Shared project card — used by the /freelance page and the homepage
 * Projects grid. Same glass surface, accent glow, and react-tilt settings
 * as the Skills cards.
 */
export function ProjectCard({
  title,
  tagline,
  description,
  stack,
  liveUrl,
  liveLabel = "Live demo",
  repoUrl,
  image,
  video,
  index,
  className = "",
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/80 backdrop-blur transition hover:border-accent hover:shadow-[0_0_28px_-16px_var(--color-accent)]">
      {(image || video) && (
        <div className="relative">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element -- local optional screenshot; path comes from config
            <img src={image} alt="" className="aspect-video w-full object-cover" />
          )}
          {video && (
            <video src={video} controls className="aspect-video w-full" preload="metadata">
              <track kind="captions" />
            </video>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              aria-label={`${title} on GitHub`}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#050816]/80 text-white transition hover:text-accent"
            >
              <GithubIcon />
            </a>
          )}
        </div>
      )}

      <div className="flex h-full flex-col p-6 sm:p-8">
      {tagline && (
        <p className="font-mono text-xs uppercase tracking-wide text-accent">{tagline}</p>
      )}
      <h3 className="mt-1 flex items-center gap-2.5 text-xl font-semibold text-foreground">
        {liveUrl && <Favicon url={liveUrl} />}
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        <span className="mb-1 block font-mono text-[10px] uppercase tracking-wide text-accent">
          What was built
        </span>
        {description}
      </p>

      {stack.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-muted-foreground transition-colors duration-200 group-hover:border-accent/40"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      {(liveUrl || repoUrl) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
            >
              {/* pulse = "live and running"; contrast color because an accent dot would vanish on the accent button */}
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent-foreground animate-live-pulse motion-reduce:animate-none"
              />
              {liveLabel} ↗
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              {/* repo-only cards get a static icon, never the pulse */}
              {!liveUrl && <GithubIcon />}
              GitHub ↗
            </a>
          )}
        </div>
      )}
      </div>
    </article>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
      className={`h-full ${className}`}
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
