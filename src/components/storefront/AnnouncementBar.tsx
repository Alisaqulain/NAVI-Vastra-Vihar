"use client";

import { Truck, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-navy-dark text-cream text-center text-[10px] sm:text-xs py-2 px-3 sm:px-4 tracking-wide border-b border-gold/10">
      <div className="container-premium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-5">
        <span className="flex items-center justify-center gap-1.5 leading-snug">
          <Sparkles className="h-3 w-3 text-gold shrink-0" />
          Up to 20% off · Code <strong className="text-gold font-medium">FESTIVE20</strong>
        </span>
        <span className="hidden sm:inline text-cream/25">|</span>
        <span className="flex items-center justify-center gap-1.5 text-cream/85 leading-snug">
          <Truck className="h-3 w-3 text-emerald-light shrink-0" />
          Free shipping above ₹5,000
        </span>
      </div>
    </div>
  );
}
