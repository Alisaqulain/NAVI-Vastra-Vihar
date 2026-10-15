import { NextResponse } from "next/server";
import { checkMongoConnection } from "@/lib/db/health";

export const dynamic = "force-dynamic";

/** Same health payload as the /check page — use for scripts & monitoring. */
export async function GET() {
  const health = await checkMongoConnection();
  const status = health.connected ? 200 : 503;
  return NextResponse.json(
    {
      status: health.connected ? "ok" : "error",
      mongodb: health,
    },
    { status }
  );
}
