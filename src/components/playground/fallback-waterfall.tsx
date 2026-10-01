"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Interactive illustration of the provider-fallback pattern used across
 * Nexus AI v2 (Event Registry → Finnhub → mock), Local Stock Analyst, and
 * the GTM pipeline. Visitors toggle providers down, fire a request, and
 * watch it fall through — with the matching line of a simplified code
 * snippet highlighted in step. Illustrative only, not production code.
 */

const PROVIDERS = ["Event Registry", "Finnhub", "Mock data"];

type Status = "idle" | "trying" | "failed" | "served" | "skipped";

const CODE = [
  "for provider in providers:",
  "    try:",
  "        return provider.fetch(query)",
  "    except ProviderDown:",
  "        continue  # fall through",
  "raise AllProvidersFailed()",
];

// which snippet line is "executing" for each step of the run
const LINE_FOR: Record<"trying" | "failed" | "served" | "exhausted", number> = {
  trying: 2,
  failed: 4,
  served: 2,
  exhausted: 5,
};

const statusLabel: Record<Status, string> = {
  idle: "",
  trying: "trying…",
  failed: "down → next",
  served: "served ✓",
  skipped: "not needed",
};

export function FallbackWaterfall() {
  const reducedMotion = useReducedMotion();
  // start with the primary down so the first run shows a fallback
  const [up, setUp] = useState([false, true, true]);
  const [status, setStatus] = useState<Status[]>(PROVIDERS.map(() => "idle"));
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const runId = useRef(0);

  function setOne(i: number, s: Status) {
    setStatus((prev) => prev.map((old, j) => (j === i ? s : old)));
  }

  async function run() {
    const id = ++runId.current;
    const step = reducedMotion ? 0 : 550;
    const wait = () => new Promise((r) => setTimeout(r, step));

    setRunning(true);
    setResult(null);
    setStatus(PROVIDERS.map(() => "idle"));

    for (let i = 0; i < PROVIDERS.length; i++) {
      setOne(i, "trying");
      setActiveLine(LINE_FOR.trying);
      await wait();
      if (id !== runId.current) return;

      if (up[i]) {
        setStatus((prev) =>
          prev.map((old, j) => (j === i ? "served" : j > i ? "skipped" : old))
        );
        setActiveLine(LINE_FOR.served);
        setResult(
          i === 0
            ? `Served by ${PROVIDERS[i]} on the first try.`
            : `Served by ${PROVIDERS[i]} after ${i} fallback${i > 1 ? "s" : ""}.`
        );
        setRunning(false);
        return;
      }

      setOne(i, "failed");
      setActiveLine(LINE_FOR.failed);
      await wait();
      if (id !== runId.current) return;
    }

    setActiveLine(LINE_FOR.exhausted);
    setResult("Every provider is down — fail loudly with a clear error, never a blank screen.");
    setRunning(false);
  }

  function toggle(i: number) {
    setUp((prev) => prev.map((v, j) => (j === i ? !v : v)));
    setStatus(PROVIDERS.map(() => "idle"));
    setActiveLine(null);
    setResult(null);
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition hover:border-accent hover:shadow-[0_0_32px_-10px_var(--color-accent)] sm:p-8">
      <p className="font-mono text-xs uppercase tracking-wide text-accent">
        Interactive · pattern from Nexus AI v2
      </p>
      <h3 className="mt-1 text-xl font-semibold text-foreground">Fallback waterfall</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        External data APIs go down. Take a provider offline, send a request, and watch it
        fall through to the next one.
      </p>

      <ol className="mt-6 space-y-2">
        {PROVIDERS.map((name, i) => {
          const s = status[i];
          return (
            <li key={name}>
              <motion.div
                animate={s === "trying" && !reducedMotion ? { scale: [1, 1.015, 1] } : { scale: 1 }}
                transition={{ duration: 0.5, repeat: s === "trying" ? Infinity : 0 }}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors duration-200 ${
                  s === "served"
                    ? "border-accent bg-accent/10 shadow-[0_0_24px_-8px_var(--color-accent)]"
                    : s === "trying"
                      ? "border-accent/60"
                      : s === "failed"
                        ? "border-rose-500/50 bg-rose-500/5"
                        : "border-border bg-surface-muted/60"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{i + 1}</span>
                  <span
                    className={`truncate text-sm font-medium ${
                      up[i] ? "text-foreground" : "text-muted-foreground line-through"
                    }`}
                  >
                    {name}
                  </span>
                  {statusLabel[s] && (
                    <span
                      className={`font-mono text-xs ${
                        s === "failed"
                          ? "text-rose-500"
                          : s === "served" || s === "trying"
                            ? "text-accent"
                            : "text-muted-foreground"
                      }`}
                    >
                      {statusLabel[s]}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={up[i]}
                  aria-label={`${name} is ${up[i] ? "up" : "down"}`}
                  disabled={running}
                  onClick={() => toggle(i)}
                  data-cursor="hover"
                  className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors disabled:opacity-50 ${
                    up[i] ? "border-accent bg-accent" : "border-border bg-surface-muted"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-background transition-all duration-200 ${
                      up[i] ? "left-[18px]" : "left-0.5"
                    }`}
                  />
                </button>
              </motion.div>
            </li>
          );
        })}
      </ol>

      <pre
        aria-label="Simplified fallback loop"
        className="mt-5 overflow-x-auto rounded-xl border border-border bg-background/60 p-4 font-mono text-xs leading-6"
      >
        {CODE.map((line, i) => (
          <div
            key={i}
            className={`-mx-2 rounded px-2 transition-colors duration-200 ${
              activeLine === i ? "bg-accent/15 text-foreground" : "text-muted-foreground"
            }`}
          >
            {line}
          </div>
        ))}
      </pre>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={run}
          disabled={running}
          data-cursor="hover"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {running ? "Running…" : "Send request"}
        </button>
        <p aria-live="polite" className="min-h-5 flex-1 text-sm text-muted-foreground">
          {result}
        </p>
      </div>
    </div>
  );
}
