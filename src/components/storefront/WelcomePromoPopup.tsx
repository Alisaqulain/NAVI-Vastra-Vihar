"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "navi_welcome_popup_v1";

export function WelcomePromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && dismiss()}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden border-gold/30 bg-cream-light gap-0 [&>button.right-4]:hidden">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-20 h-8 w-8 rounded-full bg-navy/10 hover:bg-navy/20 flex items-center justify-center text-navy transition-colors"
          aria-label="Close offer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative mandala-glow bg-navy px-6 pt-10 pb-8 text-center">
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_center,_#c9a962_1px,_transparent_1px)] bg-[length:24px_24px]" />
          <div className="relative mx-auto mb-4 h-24 w-24 logo-ring overflow-hidden bg-cream">
            <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" fill className="object-cover" sizes="96px" />
          </div>
          <p className="relative text-gold text-[10px] tracking-[0.35em] uppercase mb-2">Since 1978</p>
          <h2 className="relative font-serif text-2xl sm:text-3xl text-cream mb-1">Welcome to NAVI</h2>
          <p className="relative text-cream/70 text-sm">Handloom elegance · Sarees & ethnic wear</p>
        </div>

        <div className="px-6 sm:px-8 py-7 sm:py-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-emerald text-sm font-medium">
            <Sparkles className="h-4 w-4 text-gold" />
            Festive Season Offer
          </div>
          <p className="text-navy/70 text-sm leading-relaxed">
            Enjoy <strong className="text-navy">up to 20% off</strong> on your first order above ₹10,000. Complimentary shipping on orders above ₹5,000.
          </p>
          <div className="inline-block px-5 py-2.5 rounded-full border-2 border-dashed border-gold/50 bg-cream-dark/50">
            <span className="text-xs text-navy/50 uppercase tracking-wider mr-2">Use code</span>
            <span className="font-serif text-lg text-navy tracking-wide">FESTIVE20</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Button asChild variant="emerald" size="lg" className="rounded-full flex-1" onClick={dismiss}>
              <Link href="/shop?category=new-arrivals">Shop New Arrivals</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full flex-1 border-beige" onClick={dismiss}>
              Continue Browsing
            </Button>
          </div>
          <button type="button" onClick={dismiss} className="text-xs text-navy/40 hover:text-emerald transition-colors">
            Don&apos;t show again
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
