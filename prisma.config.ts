import { defineConfig } from "prisma/config";

/**
 * Connection URL lives here in Prisma 7, not in schema.prisma.
 * DATABASE_URL should be the Neon pooled string. Migrate commands need it;
 * `prisma generate` does not.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
