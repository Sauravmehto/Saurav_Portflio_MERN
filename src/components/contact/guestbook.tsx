"use client";

import { useActionState } from "react";
import { leaveNote, type ActionResult } from "@/server/submissions";
import { siteConfig } from "@/lib/site-config";
import type { PublicNote } from "@/lib/guestbook";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-accent";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function Guestbook({ available, notes }: { available: boolean; notes: PublicNote[] }) {
  const [state, action, pending] = useActionState(leaveNote, null as ActionResult | null);

  return (
    <section id="guestbook" className="relative overflow-x-clip pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur sm:p-8">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent">Guestbook</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Leave a note</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Short notes are reviewed before they appear here.
          </p>

          {available ? (
            <form action={action} className="mt-6 space-y-3">
              <label className="block text-sm">
                <span className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  Name
                </span>
                <input name="name" required maxLength={50} autoComplete="name" className={fieldClass} />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  Note
                </span>
                <textarea name="message" required maxLength={300} rows={3} className={fieldClass} />
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
                className="rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-accent hover:text-accent disabled:opacity-60"
              >
                {pending ? "Sending…" : "Leave a note"}
              </button>
              {state && (
                <p className="text-sm text-muted-foreground" role="status">
                  {state.ok ? state.message : state.error}{" "}
                  {!state.ok && (
                    <a className="text-accent underline" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  )}
                </p>
              )}
            </form>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              Notes are offline right now. Email{" "}
              <a className="text-accent underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>{" "}
              instead.
            </p>
          )}

          {notes.length > 0 && (
            <ul className="mt-8 space-y-4 border-t border-border pt-6">
              {notes.map((note) => (
                <li key={note.id}>
                  <p className="text-sm leading-relaxed text-foreground">{note.message}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {note.name} · {dateFormat.format(new Date(note.createdAt))}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
