"use client";

import { Truck, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-navy-dark text-cream text-center text-[11px] sm:text-xs py-2.5 px-4 tracking-wide border-b border-gold/10">
      <div className="container-premium flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-gold shrink-0" />
          Festive Sale — Up to 20% off with code <strong className="text-gold font-medium mx-1">FESTIVE20</strong>
        </span>
        <span className="hidden sm:inline text-cream/25">|</span>
        <span className="flex items-center gap-1.5 text-cream/85">
          <Truck className="h-3 w-3 text-emerald-light shrink-0" />
          Free shipping on orders above ₹5,000
        </span>
      </div>
    </div>
  );
}
