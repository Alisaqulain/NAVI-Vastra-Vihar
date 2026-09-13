"use client";

import { Truck, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-navy text-cream text-center text-xs sm:text-sm py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          Festive Sale — Up to 20% off with code <strong className="text-gold mx-1">FESTIVE20</strong>
        </span>
        <span className="hidden sm:inline text-cream/40">|</span>
        <span className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5 text-gold" />
          Free shipping on orders above ₹5,000
        </span>
      </div>
    </div>
  );
}
