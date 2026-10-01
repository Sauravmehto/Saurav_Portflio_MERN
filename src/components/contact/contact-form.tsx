"use client";

import { useActionState } from "react";
import { sendMessage, type ActionResult } from "@/server/submissions";
import { siteConfig } from "@/lib/site-config";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-accent";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, null as ActionResult | null);

  return (
    <form action={action} className="mt-8 space-y-3 text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Name
          </span>
          <input name="name" required maxLength={80} autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Email
          </span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Message
        </span>
        <textarea name="message" required maxLength={2000} rows={4} className={fieldClass} />
      </label>
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <button
        type="submit"
        disabled={pending}
        data-cursor="hover"
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
      {state && (
        <p className={`text-sm ${state.ok ? "text-foreground" : "text-muted-foreground"}`} role="status">
          {state.ok ? state.message : state.error}{" "}
          {!state.ok && (
            <a className="text-accent underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          )}
        </p>
      )}
    </form>
  );
}
