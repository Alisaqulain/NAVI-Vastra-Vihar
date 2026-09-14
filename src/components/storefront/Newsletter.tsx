"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/constants/images";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the NAVI family!", {
      description: "You'll receive our latest saree collections and exclusive offers.",
    });
    setEmail("");
  };

  return (
    <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src={SITE_IMAGES.newsletter}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/85" />
      </div>
      <div className="sm:hidden bg-navy rounded-2xl" />

      <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center max-w-2xl mx-auto">
        <div className="mx-auto mb-4 h-14 w-14 overflow-hidden rounded-full border-2 border-gold sm:hidden">
          <Image src="/logo.jpeg" alt="NAVI" width={56} height={56} className="object-cover" />
        </div>
        <p className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Stay Connected</p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-cream mb-3">Join Our Newsletter</h2>
        <p className="text-cream/70 max-w-md mx-auto mb-6 text-sm sm:text-base">
          Be the first to know about new saree arrivals, festive collections, and member-only discounts.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-cream-light/95 border-beige/50 h-12 rounded-full px-5"
          />
          <Button type="submit" variant="gold" className="rounded-full h-12 px-8">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-cream/40 mt-4">We respect your privacy. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
