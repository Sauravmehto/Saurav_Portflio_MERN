"use server";

import { z } from "zod";
import { siteConfig } from "@/lib/site-config";
import { getPrisma } from "@/lib/db";
import { readEnv } from "@/lib/env";
import { clientIpHash, isRateLimited, markSubmission } from "@/server/rate-limit";

export type ActionResult = { ok: true; message: string } | { ok: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

function unavailable() {
  return {
    ok: false as const,
    error: `The form is unavailable right now. Email ${siteConfig.email} instead.`,
  };
}

async function notifyByEmail(name: string, email: string, message: string) {
  const { RESEND_API_KEY, RESEND_FROM } = readEnv();
  if (!RESEND_API_KEY) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [siteConfig.email],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    }),
  });
}

const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().max(120).refine((value) => emailPattern.test(value), "Enter a valid email"),
  message: z.string().trim().min(1, "Message is required").max(2000),
  company: z.string().optional(),
});

export async function sendMessage(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = messageSchema.safeParse({
    name: stripHtml(String(formData.get("name") ?? "")),
    email: stripHtml(String(formData.get("email") ?? "")),
    message: stripHtml(String(formData.get("message") ?? "")),
    company: String(formData.get("company") ?? ""),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  if (parsed.data.company) return { ok: true, message: "Thanks. Your message is in." };

  const prisma = getPrisma();
  if (!prisma) return unavailable();

  try {
    const ipHash = await clientIpHash();
    if (await isRateLimited(prisma, ipHash, "message")) {
      return { ok: false, error: "Please wait a minute before sending another message." };
    }

    await prisma.message.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      },
    });
    await markSubmission(prisma, ipHash, "message");
    await notifyByEmail(parsed.data.name, parsed.data.email, parsed.data.message).catch(() => {});

    return { ok: true, message: "Message received. I'll reply by email." };
  } catch {
    return unavailable();
  }
}

const noteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  message: z.string().trim().min(1, "Note is required").max(300),
  company: z.string().optional(),
});

export async function leaveNote(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = noteSchema.safeParse({
    name: stripHtml(String(formData.get("name") ?? "")),
    message: stripHtml(String(formData.get("message") ?? "")),
    company: String(formData.get("company") ?? ""),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the note and try again." };
  }

  if (parsed.data.company) {
    return { ok: true, message: "Thanks. Your note will show up after it's reviewed." };
  }

  const prisma = getPrisma();
  if (!prisma) return unavailable();

  try {
    const ipHash = await clientIpHash();
    if (await isRateLimited(prisma, ipHash, "note")) {
      return { ok: false, error: "Please wait a minute before leaving another note." };
    }

    await prisma.note.create({
      data: {
        name: parsed.data.name,
        message: parsed.data.message,
        approved: false,
      },
    });
    await markSubmission(prisma, ipHash, "note");

    return { ok: true, message: "Thanks. Your note will show up after it's reviewed." };
  } catch {
    return unavailable();
  }
}

