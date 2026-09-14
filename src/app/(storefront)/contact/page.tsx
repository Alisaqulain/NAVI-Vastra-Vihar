"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE_IMAGES } from "@/lib/constants/images";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll respond within 24 hours.");
    }, 800);
  }

  return (
    <div>
      {/* Hero with image */}
      <div className="relative h-48 sm:h-64 bg-navy overflow-hidden">
        <Image
          src={SITE_IMAGES.contact.hero}
          alt="NAVI store"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
        <div className="container-premium relative z-10 h-full flex flex-col justify-end pb-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <h1 className="font-serif text-3xl sm:text-4xl text-cream mt-4">Contact Us</h1>
          <p className="text-cream/70 text-sm sm:text-base mt-2">We&apos;re here to help you find your perfect saree</p>
        </div>
      </div>

      <div className="container-premium py-10 sm:py-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Store images */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md col-span-2 sm:col-span-1">
                <Image
                  src={SITE_IMAGES.contact.gallery1}
                  alt="NAVI saree collection"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
                <Image src="/logo.jpeg" alt="NAVI logo" fill className="object-cover" sizes="200px" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={SITE_IMAGES.contact.gallery2}
                  alt="Saree draping"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>

            <p className="text-navy/70 leading-relaxed text-sm sm:text-base">
              Whether you need styling advice, blouse stitching guidance, or want to visit our boutique —
              our saree specialists are happy to assist.
            </p>

            <div className="premium-card p-5 sm:p-6 space-y-4">
              {[
                { icon: MapPin, label: "Visit Us", text: "42, MG Road, Connaught Place, New Delhi — 110001" },
                { icon: Phone, label: "Call", text: "+91 11 2456 7890" },
                { icon: Mail, label: "Email", text: "hello@navivastravihar.com" },
                { icon: Clock, label: "Hours", text: "Mon–Sat: 10 AM – 8 PM | Sun: 11 AM – 6 PM" },
              ].map(({ icon: Icon, label, text }) => (
                <div key={label} className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-emerald" />
                  </div>
                  <div>
                    <p className="text-xs text-navy/50 uppercase tracking-wide">{label}</p>
                    <p className="text-sm text-navy/80">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="premium-card p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl text-navy mb-1">Send a Message</h2>
            <p className="text-navy/50 text-sm mb-6">We typically respond within 24 hours</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" required className="mt-1.5 h-11 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-1.5 h-11 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" className="mt-1.5 h-11 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required placeholder="Saree enquiry, order help..." className="mt-1.5 h-11 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} required className="mt-1.5 rounded-lg" />
              </div>
              <Button type="submit" variant="emerald" className="w-full rounded-full h-12" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
