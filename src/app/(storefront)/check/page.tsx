import Link from "next/link";
import { checkMongoConnection } from "@/lib/db/health";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function CheckPage() {
  const health = await checkMongoConnection();

  return (
    <div className="container-premium py-12 sm:py-16 max-w-lg">
      <h1 className="font-serif text-2xl text-navy mb-2">Database check</h1>
      <p className="text-sm text-navy/55 mb-8">
        Open <strong>/check</strong> anytime to verify MongoDB. Machine-readable JSON at{" "}
        <Link href="/api/check" className="text-emerald hover:underline">
          /api/check
        </Link>
        .
      </p>

      <div
        className={`rounded-sm border p-6 ${
          health.connected ? "border-emerald/40 bg-emerald/5" : "border-red-200 bg-red-50/80"
        }`}
      >
        <p className="text-xs uppercase tracking-widest text-navy/45 mb-1">MongoDB</p>
        <p className={`text-lg font-semibold ${health.connected ? "text-emerald-dark" : "text-red-700"}`}>
          {health.connected ? "Connected" : "Not connected"}
        </p>
        {health.database && <p className="text-sm text-navy/60 mt-2">Database: {health.database}</p>}
        {health.error && <p className="text-sm text-red-700/90 mt-2">{health.error}</p>}
        <p className="text-[11px] text-navy/40 mt-4">Checked at {health.checkedAt}</p>
      </div>

      <p className="text-xs text-navy/45 mt-6">
        JSON:{" "}
        <Link href="/api/check" className="text-emerald underline-offset-2 hover:underline">
          /api/check
        </Link>
      </p>

      <div className="flex gap-3 mt-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/">Back to shop</Link>
        </Button>
        <Button asChild variant="emerald" size="sm">
          <Link href="/check">Refresh</Link>
        </Button>
      </div>

      <pre className="mt-8 text-[11px] bg-neutral-50 border border-neutral-200 rounded-sm p-4 overflow-x-auto text-navy/70">
        {JSON.stringify({ status: health.connected ? "ok" : "error", mongodb: health }, null, 2)}
      </pre>
    </div>
  );
}
