import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import type { PrismaClient } from "@prisma/client";

function hashIp(ip: string) {
  return createHash("sha256").update(`portfolio:${ip}`).digest("hex");
}

export async function clientIpHash() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
  return hashIp(ip);
}

/** True when this hash already submitted `kind` in the last minute. */
export async function isRateLimited(prisma: PrismaClient, ipHash: string, kind: string) {
  const since = new Date(Date.now() - 60_000);
  const recent = await prisma.rateLimit.findFirst({
    where: { ipHash, kind, createdAt: { gt: since } },
    select: { id: true },
  });
  return recent !== null;
}

export async function markSubmission(prisma: PrismaClient, ipHash: string, kind: string) {
  await prisma.rateLimit.create({ data: { ipHash, kind } });
}
