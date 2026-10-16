"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
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

function FlipIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8a5.5 5.5 0 0 1 9.6-3.7M13.5 8a5.5 5.5 0 0 1-9.6 3.7" />
      <path d="M12.6 1.8v2.8H9.8M3.4 14.2v-2.8h2.8" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3 shrink-0 fill-current">
      <path d="M4 7V5a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm1.5 0h5V5a2.5 2.5 0 0 0-5 0v2Z" />
    </svg>
  );
}

function McpEndpoint({ url }: { url: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <div className="mt-5 rounded-xl border border-border bg-surface-muted/60 px-3 py-2.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <p className="shrink-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-accent">MCP server</p>
        <p className="text-[11px] text-muted-foreground">Connect from Claude or any MCP client</p>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground" title={url}>
          {url}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy MCP server URL"
          className="shrink-0 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:border-accent hover:text-accent"
        >
          {state === "copied" ? "Copied ✓" : state === "failed" ? "Copy failed" : "Copy"}
        </button>
      </div>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "MCP server URL copied" : state === "failed" ? "Could not copy the URL" : ""}
      </span>
    </div>
  );
}

/** Screenshot shown inside a themed browser window that rises out of the card's top edge. */
function BrowserPreview({ image, title, liveUrl }: { image: string; title: string; liveUrl?: string }) {
  const address = liveUrl ? new URL(liveUrl).hostname : title;
  const windowClass =
    "relative block overflow-hidden rounded-t-xl border border-b-0 border-border bg-surface shadow-[0_-16px_40px_-24px_var(--color-accent)] transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0";

  const browser = (
    <>
      <div className="flex items-center gap-3 border-b border-border bg-surface-muted px-3 py-2">
        <div aria-hidden className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
          <LockIcon />
          <span className="truncate">{address}</span>
        </div>
      </div>
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized local WebP; next/image adds nothing here */}
        <img
          src={image}
          alt={`${title} homepage`}
          width={1280}
          height={624}
          loading="lazy"
          decoding="async"
          className="aspect-[1280/624] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
    </>
  );

  return (
    <div className="relative shrink-0 overflow-hidden border-b border-border bg-gradient-to-br from-accent/25 via-surface-muted to-surface px-5 pt-5 sm:px-7 sm:pt-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 top-8 h-28 rounded-full bg-accent/30 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      {liveUrl ? (
        // duplicate of the "Live demo" button, so it stays out of the tab order and the accessibility tree
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden className={windowClass}>
          {browser}
        </a>
      ) : (
        <div className={windowClass}>{browser}</div>
      )}
    </div>
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
  /** When set, a "How it works" button flips the card to show these steps. */
  flow?: readonly { step: string; detail: string }[];
  /** MCP endpoint for MCP clients; shown with a copy button rather than as a link. */
  mcpUrl?: string;
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
  flow,
  mcpUrl,
  index,
  className = "",
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [flipped, setFlipped] = useState(false);
  const flipButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const hasFlipped = useRef(false);

  useEffect(() => {
    if (!hasFlipped.current) return;
    (flipped ? backButton : flipButton).current?.focus({ preventScroll: true });
  }, [flipped]);

  function flip(next: boolean) {
    hasFlipped.current = true;
    setFlipped(next);
  }

  const linkButtons = (
    <>
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
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
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
        >
          {/* repo-only cards get a static icon, never the pulse */}
          {!liveUrl && <GithubIcon />}
          GitHub ↗
        </a>
      )}
    </>
  );

  const flipToggle = (back: boolean) => (
    <button
      ref={back ? backButton : flipButton}
      type="button"
      onClick={() => flip(!back)}
      aria-label={back ? `Back to ${title} overview` : `How ${title} works`}
      className="inline-flex items-center gap-2 rounded-full border border-dashed border-accent/50 px-5 py-2 text-sm font-medium text-accent transition hover:border-solid hover:border-accent hover:bg-accent/10"
    >
      <FlipIcon />
      {back ? "Back" : "How it works"}
    </button>
  );

  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/80 backdrop-blur transition hover:border-accent hover:shadow-[0_0_28px_-16px_var(--color-accent)]">
      {image && <BrowserPreview image={image} title={title} liveUrl={liveUrl} />}

      {video && (
        <div className="relative">
          <video src={video} controls className="aspect-video w-full" preload="metadata">
            <track kind="captions" />
          </video>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} on GitHub`}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#050816]/80 text-white transition hover:text-accent"
            >
              <GithubIcon />
            </a>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
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

      {mcpUrl && <McpEndpoint url={mcpUrl} />}

      {(liveUrl || repoUrl || flow) && (
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {linkButtons}
          {flow && flipToggle(false)}
        </div>
      )}
      </div>
    </article>
  );

  if (flow) {
    const back = (
      <article className="flex h-full flex-col rounded-2xl border border-accent/60 bg-surface p-6 shadow-[0_0_40px_-18px_var(--color-accent)] sm:p-8">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">How it works</p>
        <h3 className="mt-1 text-xl font-semibold text-foreground">{title}</h3>

        <ol className="mt-6 flex-1">
          {flow.map((item, i) => (
            <li key={item.step} className="relative flex gap-4 pb-5 last:pb-0">
              {i < flow.length - 1 && (
                <span aria-hidden className="absolute left-[13px] top-8 bottom-1 w-px bg-gradient-to-b from-accent/60 to-border" />
              )}
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-xs font-semibold text-accent">
                {i + 1}
              </span>
              <div className="pt-0.5">
                <p className="text-sm font-semibold text-foreground">{item.step}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
          {linkButtons}
          {flipToggle(true)}
        </div>
      </article>
    );

    // both faces share one grid cell, so the card is as tall as whichever face has more content
    const flipper = (
      <div
        className={`grid h-full grid-cols-[minmax(0,1fr)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="[grid-area:1/1] [backface-visibility:hidden]" inert={flipped}>
          {card}
        </div>
        <div className="[grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]" inert={!flipped}>
          {back}
        </div>
      </div>
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
        className={`h-full [perspective:2000px] ${className}`}
      >
        {reducedMotion || !finePointer ? (
          flipper
        ) : (
          <Tilt options={tiltOptions} className="h-full">
            {flipper}
          </Tilt>
        )}
      </motion.div>
    );
  }

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
