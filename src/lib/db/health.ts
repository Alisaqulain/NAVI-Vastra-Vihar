import "server-only";

import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";

export type DbHealthResult = {
  connected: boolean;
  configured: boolean;
  database?: string;
  error?: string;
  checkedAt: string;
};

export async function checkMongoConnection(): Promise<DbHealthResult> {
  const checkedAt = new Date().toISOString();
  const configured = isMongoConfigured();

  if (!configured) {
    return {
      connected: false,
      configured: false,
      error: "MONGODB_URI is not set in environment variables",
      checkedAt,
    };
  }

  try {
    const db = await getMongoDb();
    await db.command({ ping: 1 });
    return {
      connected: true,
      configured: true,
      database: db.databaseName,
      checkedAt,
    };
  } catch (err) {
    return {
      connected: false,
      configured: true,
      error: err instanceof Error ? err.message : "Connection failed",
      checkedAt,
    };
  }
}
