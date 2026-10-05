"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LOOP_SECONDS = 7.5;
const STILL_FRAME = 0.7;
const FLIGHT_PATH = "M 34 128 C 90 30, 200 22, 246 76 S 248 146, 200 154";

const chips = [
  { label: siteConfig.openToWork ? "Open to roles" : "Say hello", x: 268, y: 58, dot: true, bob: 4.2 },
  { label: siteConfig.location, x: 4, y: 318, dot: false, bob: 5.1 },
  { label: "Email · LinkedIn · GitHub", x: 200, y: 340, dot: false, bob: 4.6 },
];

function chipWidth(label: string) {
  return Math.round(label.length * 6.4 + 26);
}

export function ContactVisual() {
  const reducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const inView = useInView(svgRef, { amount: 0.25 });

  // One looping timeline drives every part, so the plane, flap and card stay in sync.
  const t = useMotionValue(STILL_FRAME);
  const planeProgress = useTransform(t, [0.02, 0.36], [0, 1], { clamp: true });
  const planeOpacity = useTransform(t, [0, 0.03, 0.34, 0.39], [0, 1, 1, 0]);
  const trailOpacity = useTransform(t, [0, 0.03, 0.4, 0.52], [0, 0.55, 0.55, 0]);
  const envelopeScale = useTransform(t, [0, 0.37, 0.4, 0.46], [1, 1, 1.05, 1]);
  const frontFlap = useTransform(t, [0, 0.4, 0.45, 0.9, 0.95, 1], [1, 1, 0, 0, 1, 1]);
  const backFlap = useTransform(t, [0, 0.45, 0.5, 0.85, 0.9, 1], [0, 0, -1, -1, 0, 0]);
  const cardY = useTransform(t, [0, 0.48, 0.58, 0.8, 0.88, 1], [0, 0, -74, -74, 0, 0]);
  const glowOpacity = useTransform(t, [0, 0.5, 0.6, 0.82, 0.92], [0.35, 0.35, 0.7, 0.7, 0.35]);

  useEffect(() => {
    if (reducedMotion || !inView) return;
    const controls = animate(t, [0, 1], { duration: LOOP_SECONDS, ease: "linear", repeat: Infinity });
    return () => controls.stop();
  }, [inView, reducedMotion, t]);

  useEffect(() => {
    if (reducedMotion) t.set(STILL_FRAME);
  }, [reducedMotion, t]);

  useMotionValueEvent(planeProgress, "change", (p) => {
    const path = pathRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;
    const length = path.getTotalLength();
    const at = Math.min(p * length, length - 1);
    const a = path.getPointAtLength(at);
    const b = path.getPointAtLength(at + 1);
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    plane.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${angle}) translate(-13 -9)`);
  });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full overflow-visible"
      fill="none"
    >
      <defs>
        <radialGradient id="contact-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.45 }} />
          <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      <motion.circle cx="200" cy="215" r="170" fill="url(#contact-glow)" style={{ opacity: glowOpacity }} />

      <motion.g
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
      >
        <circle cx="200" cy="215" r="160" className="stroke-border" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx="200" cy="55" r="3.5" className="fill-accent" />
        <circle cx="360" cy="215" r="2.5" className="fill-accent/60" />
      </motion.g>
      <motion.g
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 55, ease: "linear", repeat: Infinity }}
      >
        <circle cx="200" cy="215" r="118" className="stroke-border" strokeWidth="1" />
        <circle cx="82" cy="215" r="3" className="fill-accent/80" />
      </motion.g>

      <motion.path
        d={FLIGHT_PATH}
        className="stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength: planeProgress, opacity: trailOpacity }}
      />
      <path ref={pathRef} d={FLIGHT_PATH} stroke="none" />

      <motion.g style={{ scale: envelopeScale }}>
        <g transform="translate(200 232) scale(1.35) translate(-200 -232)">
        <rect x="120" y="175" width="160" height="110" rx="12" className="fill-surface-muted stroke-border" strokeWidth="1.5" />

        <motion.path
          d="M 120 175 L 200 232 L 280 175 Z"
          className="fill-surface-muted stroke-border"
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{ scaleY: backFlap, originY: 0 }}
        />

        <motion.g style={{ y: cardY }}>
          <rect x="132" y="186" width="136" height="94" rx="9" className="fill-surface stroke-border" strokeWidth="1.2" />
          <text x="146" y="211" className="fill-foreground" fontSize="15" fontWeight="700">
            Let&apos;s connect
          </text>
          <text x="146" y="227" className="fill-muted-foreground font-mono" fontSize="7">
            {siteConfig.email}
          </text>
          <rect x="146" y="237" width="96" height="4" rx="2" className="fill-border" />
          <rect x="146" y="246" width="70" height="4" rx="2" className="fill-border" />
          <rect x="146" y="257" width="58" height="14" rx="7" className="fill-accent/15" />
          <circle cx="155" cy="264" r="2.5" className="fill-emerald-500" />
          <text x="161" y="267" className="fill-accent font-mono" fontSize="7.5">
            say hi
          </text>
        </motion.g>

        <path
          d="M 120 175 L 200 232 L 280 175 L 280 273 Q 280 285 268 285 L 132 285 Q 120 285 120 273 Z"
          className="fill-surface stroke-border"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 120 285 L 186 236 M 280 285 L 214 236" className="stroke-border" strokeWidth="1.2" />

        <motion.path
          d="M 120 175 L 200 232 L 280 175 Z"
          className="fill-surface stroke-border"
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{ scaleY: frontFlap, originY: 0 }}
        />
        <motion.circle cx="200" cy="222" r="5" className="fill-accent" style={{ opacity: frontFlap }} />
        </g>
      </motion.g>

      <motion.g ref={planeRef} style={{ opacity: planeOpacity }} transform="translate(21 109)">
        <path d="M 0 0 L 26 9 L 0 18 L 6 9 Z" className="fill-accent" />
        <path d="M 6 9 L 26 9" className="stroke-accent-foreground/70" strokeWidth="1" />
      </motion.g>

      {chips.map((chip) => {
        const width = chipWidth(chip.label);
        return (
          <motion.g
            key={chip.label}
            animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: chip.bob, ease: "easeInOut", repeat: Infinity }}
          >
            <rect
              x={chip.x}
              y={chip.y}
              width={width}
              height="26"
              rx="13"
              className="fill-surface stroke-border"
              strokeWidth="1.2"
            />
            {chip.dot && <circle cx={chip.x + 14} cy={chip.y + 13} r="3" className="fill-emerald-500" />}
            <text
              x={chip.dot ? chip.x + 23 : chip.x + 13}
              y={chip.y + 17}
              className="fill-muted-foreground font-mono"
              fontSize="10.5"
            >
              {chip.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
