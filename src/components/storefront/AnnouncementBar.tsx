"use client";

import { Truck, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-navy text-cream/95 text-center text-[10px] sm:text-xs py-1.5 px-3 border-b border-gold/20">
      <div className="container-premium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6">
        <span className="inline-flex items-center gap-1.5 leading-snug">
          <Sparkles className="h-3 w-3 text-gold shrink-0" />
          Handloom elegance since 1978
        </span>
        <span className="hidden sm:inline text-cream/25">|</span>
        <span className="inline-flex items-center gap-1.5 leading-snug text-cream/85">
          <Truck className="h-3 w-3 text-gold shrink-0" />
          Free shipping above <strong className="text-gold font-medium">₹5,000</strong>
        </span>
      </div>
    </div>
  );
}
