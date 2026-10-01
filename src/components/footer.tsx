"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { navLinks, siteConfig } from "@/lib/site-config";
import { resolveNavHref } from "./nav";

// Baked in at build time by next.config.ts, so server and client agree.
const buildSha = process.env.NEXT_PUBLIC_BUILD_SHA ?? "local";
const buildTime = new Date(process.env.NEXT_PUBLIC_BUILD_TIME ?? Date.now());
const buildDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
}).format(buildTime);

const socials = [
  { label: "GitHub", href: siteConfig.socials.github, external: true, Icon: SiGithub },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, external: true, Icon: FaLinkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, external: false, Icon: Mail },
];

const linkClass =
  "group relative text-sm text-muted-foreground transition hover:text-foreground";
const underline =
  "absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full";

let greeted = false;

export function Footer() {
  const pathname = usePathname();

  // Easter egg for anyone who opens devtools.
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      `%c👋 Hey, fellow dev.%c\nPoking around? Build ${buildSha}, ${buildDate}.\nSay hi: ${siteConfig.email}`,
      "font-size:14px;font-weight:bold;color:#915EFF",
      "font-size:12px"
    );
  }, []);

  return (
    <footer className="border-t border-border">
      {/* extra bottom padding keeps the fixed ⌘K button off the last row */}
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Link
              href={resolveNavHref("#hero", pathname)}
              data-cursor="hover"
              className="font-mono text-sm font-semibold tracking-tight"
            >
              {siteConfig.name.toUpperCase()}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.name} · {siteConfig.role}
            </p>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-5 inline-flex rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              Download resume ↓
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Navigate
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={resolveNavHref(link.href, pathname)} data-cursor="hover" className={linkClass}>
                    {link.label}
                    <span className={underline} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    data-cursor="hover"
                    className={`${linkClass} inline-flex items-center gap-2`}
                    {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <s.Icon aria-hidden className="h-4 w-4" />
                    {s.label}
                    <span className={underline} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {buildTime.getUTCFullYear()} {siteConfig.name}
          </p>
          <p className="max-w-md text-[11px] leading-relaxed">
            Desktop model by Yolala1232. Planet model by cmzw. Both CC-BY-4.0.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>
              build <span className="text-accent">{buildSha}</span> · {buildDate}
            </span>
            <span className="hidden sm:inline">
              press{" "}
              <kbd className="rounded border border-border bg-surface-muted px-1.5 py-0.5">⌘K</kbd>{" "}
              /{" "}
              <kbd className="rounded border border-border bg-surface-muted px-1.5 py-0.5">Ctrl K</kbd>{" "}
              to jump anywhere
            </span>
            <button
              type="button"
              data-cursor="hover"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="transition hover:text-accent"
            >
              Back to top ↑
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
