"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the NAVI family!", {
      description: "You'll receive our latest collections and exclusive offers.",
    });
    setEmail("");
  };

  return (
    <section className="bg-cream-dark rounded-2xl p-8 sm:p-12 text-center">
      <p className="text-gold text-sm tracking-[0.2em] uppercase mb-2">Stay Connected</p>
      <h2 className="font-serif text-3xl text-navy mb-3">Join Our Newsletter</h2>
      <p className="text-navy/60 max-w-md mx-auto mb-6">
        Be the first to know about new arrivals, festive collections, and exclusive member-only discounts.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" variant="emerald">
          Subscribe
        </Button>
      </form>
      <p className="text-xs text-navy/40 mt-4">We respect your privacy. Unsubscribe anytime.</p>
    </section>
  );
}
