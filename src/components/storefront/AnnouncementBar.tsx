"use client";

import { Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-cream text-center text-[11px] sm:text-xs py-2.5 px-4 tracking-wide">
      <div className="container-premium flex items-center justify-center gap-4 flex-wrap">
        <span>Festive Edit — Up to 20% off with code <strong className="text-gold font-medium mx-1">FESTIVE20</strong></span>
        <span className="hidden sm:inline text-cream/30">|</span>
        <span className="flex items-center gap-1.5 text-cream/80">
          <Truck className="h-3 w-3 text-gold" strokeWidth={1.5} />
          Complimentary shipping on orders above ₹5,000
        </span>
      </div>
    </div>
  );
}
