// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "@env/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: env.ENVIRONMENT === "development" ? ["error", "warn"] : ["error"],
  });

if (env.ENVIRONMENT !== "production") {
  global.prisma = prisma;
}
