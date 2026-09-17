"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "navi_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const accept = (value: string) => {
    localStorage.setItem(KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-50 p-3 sm:p-4 lg:bottom-4 lg:left-4 lg:right-4 lg:max-w-none pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-6xl bg-cream-light border border-beige shadow-[0_-4px_40px_rgba(27,42,74,0.12)] rounded-none lg:rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <p className="text-xs sm:text-sm text-navy/70 leading-relaxed flex-1">
          We use cookies to personalize your experience and improve our site. By continuing, you agree to our{" "}
          <Link href="/privacy-policy" className="text-emerald font-medium hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-navy/20 text-navy text-[10px] sm:text-xs tracking-wide uppercase"
            onClick={() => accept("preferences")}
          >
            Preferences
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-emerald text-emerald text-[10px] sm:text-xs tracking-wide uppercase"
            onClick={() => accept("rejected")}
          >
            Reject All
          </Button>
          <Button
            size="sm"
            variant="emerald"
            className="rounded-full text-[10px] sm:text-xs tracking-wide uppercase px-5"
            onClick={() => accept("accepted")}
          >
            Accept All
          </Button>
          <button type="button" onClick={() => accept("dismissed")} className="p-2 text-navy/40 hover:text-navy lg:ml-1" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
