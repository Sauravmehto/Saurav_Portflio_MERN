import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { readEnv } from "./env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Returns a client when DATABASE_URL is set, otherwise null.
 * Uses the Neon pooled URL through the pg adapter (Prisma 7 has no schema url).
 */
export function getPrisma(): PrismaClient | null {
  const { DATABASE_URL } = readEnv();
  if (!DATABASE_URL) return null;
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const adapter = new PrismaPg({ connectionString: DATABASE_URL, max: 1 });
  const prisma = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
  return prisma;
}
