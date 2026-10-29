import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  if (!url) throw new Error("Database url is not defined!!");

  const adapter = new PrismaPg({
    connectionString: url,
  });

  const prisma = new PrismaClient({
    adapter,
  });

  return prisma;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}