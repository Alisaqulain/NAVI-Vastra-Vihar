"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE_IMAGES } from "@/lib/constants/images";
import { BUSINESS } from "@/lib/constants/business";

const whatsappUrl = `https://wa.me/${BUSINESS.phoneTel.replace(/\D/g, "")}`;

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
    <div className="pb-4">
      <div className="relative min-h-[200px] sm:min-h-[240px] bg-navy overflow-hidden">
        <Image src={SITE_IMAGES.contact.hero} alt="" fill className="object-cover opacity-35" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />
        <div className="container-premium relative z-10 flex flex-col justify-end min-h-[200px] sm:min-h-[240px] pb-8 pt-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <h1 className="font-serif text-3xl sm:text-4xl text-cream mt-3">Contact Us</h1>
          <p className="text-cream/75 text-sm sm:text-base mt-2 max-w-lg">
            Visit our Sahakarnagar boutique or reach us on phone & social — we&apos;re happy to help with sizing, styling & orders.
          </p>
        </div>
      </div>

      <div className="container-premium py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          <a href={`tel:${BUSINESS.phoneTel}`} className="contact-action-chip col-span-1">
            <Phone className="h-5 w-5 text-emerald" />
            <span className="text-[11px] sm:text-xs font-medium">Call</span>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-action-chip col-span-1">
            <MessageCircle className="h-5 w-5 text-emerald" />
            <span className="text-[11px] sm:text-xs font-medium">WhatsApp</span>
          </a>
          <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="contact-action-chip col-span-1">
            <Instagram className="h-5 w-5 text-emerald" />
            <span className="text-[11px] sm:text-xs font-medium">Instagram</span>
          </a>
          <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" className="contact-action-chip col-span-1">
            <Facebook className="h-5 w-5 text-emerald" />
            <span className="text-[11px] sm:text-xs font-medium">Facebook</span>
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md col-span-2 sm:col-span-1 card-elevate">
                <Image src={SITE_IMAGES.contact.gallery1} alt="NAVI collection" fill className="object-cover" sizes="400px" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md card-elevate">
                <Image src="/logo.jpeg" alt="NAVI" fill className="object-cover" sizes="200px" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md card-elevate">
                <Image src={SITE_IMAGES.contact.gallery2} alt="Saree detail" fill className="object-cover" sizes="200px" />
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-emerald" />
                </div>
                <div>
                  <p className="text-xs text-navy/50 uppercase tracking-wide mb-1">Visit Us</p>
                  <address className="not-italic text-sm text-navy/85 leading-relaxed">
                    {BUSINESS.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-emerald" />
                </div>
                <div>
                  <p className="text-xs text-navy/50 uppercase tracking-wide mb-1">Phone</p>
                  <a href={`tel:${BUSINESS.phoneTel}`} className="text-sm font-medium text-emerald hover:underline">
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-emerald" />
                </div>
                <div>
                  <p className="text-xs text-navy/50 uppercase tracking-wide mb-1">Email</p>
                  <a href={`mailto:${BUSINESS.email}`} className="text-sm text-navy/85 hover:text-emerald break-all">
                    {BUSINESS.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-emerald" />
                </div>
                <div>
                  <p className="text-xs text-navy/50 uppercase tracking-wide mb-1">Store Hours</p>
                  <p className="text-sm text-navy/85">{BUSINESS.hours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-cream to-cream-dark/80 p-5 sm:p-6 text-sm text-navy/75 leading-relaxed">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">Registered business</p>
              <p>
                <span className="font-medium text-navy">GSTIN/UIN:</span> {BUSINESS.gstin}
              </p>
              <p className="mt-2">
                <span className="font-medium text-navy">State Name:</span> {BUSINESS.state}, Code: {BUSINESS.stateCode}
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl text-navy mb-1">Send a Message</h2>
            <p className="text-navy/50 text-sm mb-6">We typically respond within 24 hours</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" required className="mt-1.5 h-11 rounded-xl bg-cream/80" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-1.5 h-11 rounded-xl bg-cream/80" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder={BUSINESS.phoneDisplay} className="mt-1.5 h-11 rounded-xl bg-cream/80" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required placeholder="Saree enquiry, order help..." className="mt-1.5 h-11 rounded-xl bg-cream/80" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} required className="mt-1.5 rounded-xl bg-cream/80" />
              </div>
              <Button type="submit" variant="emerald" className="w-full rounded-full h-12 shadow-md" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
            <p className="text-center text-xs text-navy/45 mt-4">
              Prefer chat?{" "}
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald font-medium hover:underline">
                Message on WhatsApp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
