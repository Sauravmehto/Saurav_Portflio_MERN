import { z } from "zod";

const optionalString = z
  .string()
  .optional()
  .transform((value) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
  });

const envSchema = z.object({
  DATABASE_URL: optionalString,
  RESEND_API_KEY: optionalString,
  RESEND_FROM: optionalString,
});

export type AppEnv = z.infer<typeof envSchema>;

/** Reads public runtime env. A missing database URL is allowed; the forms fall back to email. */
export function readEnv(): AppEnv {
  const parsed = envSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
  });

  if (!parsed.success) {
    const detail = parsed.error.issues.map((issue) => issue.message).join(" ");
    throw new Error(`Invalid environment: ${detail}`);
  }

  return parsed.data;
}
