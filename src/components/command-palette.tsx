"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-config";
import { resolveNavHref } from "./nav";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const goTo = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.startsWith("#") && pathname === "/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(resolveNavHref(href, pathname));
      }
    },
    [pathname, router]
  );

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(siteConfig.email).catch(() => {});
    setOpen(false);
  }, []);

  const downloadResume = useCallback(() => {
    setOpen(false);
    window.open(siteConfig.resumeUrl, "_blank");
  }, []);

  const hireMe = useCallback(() => {
    setOpen(false);
    goTo("#contact");
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        disableForReducedMotion: true,
      });
    });
  }, [goTo]);

  return (
    <>
      <button
        type="button"
        data-cursor="hover"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm text-muted-foreground shadow-lg backdrop-blur transition hover:border-accent hover:text-foreground sm:flex"
      >
        <span>Quick nav</span>
        <kbd className="rounded border border-border bg-surface-muted px-1.5 py-0.5 text-xs">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
            >
              <Command label="Command palette">
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search…"
                  className="w-full border-b border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigate" className="px-2 py-1 text-xs uppercase text-muted-foreground">
                    {navLinks.map((link) => (
                      <Command.Item
                        key={link.href}
                        onSelect={() => goTo(link.href)}
                        className="cursor-pointer rounded-md px-3 py-2 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                      >
                        Go to {link.label}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Actions" className="px-2 py-1 text-xs uppercase text-muted-foreground">
                    <Command.Item
                      onSelect={downloadResume}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    >
                      Download Resume
                    </Command.Item>
                    <Command.Item
                      onSelect={hireMe}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    >
                      Hire me
                    </Command.Item>
                    <Command.Item
                      onSelect={copyEmail}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    >
                      Copy Email
                    </Command.Item>
                    <Command.Item
                      onSelect={() => {
                        setTheme(resolvedTheme === "dark" ? "light" : "dark");
                        setOpen(false);
                      }}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    >
                      Toggle Dark / Light Mode
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
