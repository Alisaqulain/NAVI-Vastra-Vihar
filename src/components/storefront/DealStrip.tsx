import Link from "next/link";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DealStrip() {
  return (
    <section className="container-premium py-4 sm:py-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-gold/30 bg-gradient-to-r from-wine/8 via-cream to-emerald/5 px-4 py-4 sm:px-6">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-wine">
            <Tag className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm sm:text-base font-semibold text-navy">Festive offer · Up to 20% off</p>
            <p className="text-xs sm:text-sm text-navy/60 mt-0.5">
              Use code <span className="font-mono font-bold text-wine">FESTIVE20</span> at checkout
            </p>
          </div>
        </div>
        <Button asChild variant="gold" className="rounded-full w-full sm:w-auto shrink-0 h-11 px-8">
          <Link href="/shop?category=festive-wear">Shop sale</Link>
        </Button>
      </div>
    </section>
  );
}
