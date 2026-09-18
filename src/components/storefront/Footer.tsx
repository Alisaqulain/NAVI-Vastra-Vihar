import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BUSINESS } from "@/lib/constants/business";

const shopLinks = [
  { label: "New Arrivals", href: "/shop?category=new-arrivals" },
  { label: "Sarees", href: "/shop?category=sarees" },
  { label: "Lehengas", href: "/shop?category=lehengas" },
  { label: "Suits", href: "/shop?category=suits" },
  { label: "Kurtis", href: "/shop?category=kurtis" },
  { label: "Dupattas", href: "/shop?category=dupattas" },
  { label: "Festive Wear", href: "/shop?category=festive-wear" },
  { label: "Best Sellers", href: "/shop?category=best-sellers" },
];

const helpLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return Policy", href: "/return-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative bg-navy text-cream mt-auto border-t border-gold/15 overflow-hidden">
      <div className="absolute inset-0 mandala-glow opacity-60 pointer-events-none" />
      <div className="container-premium relative py-12 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" width={52} height={52} className="rounded-full ring-2 ring-gold/40" />
              </div>
              <div>
                <span className="font-serif text-xl tracking-wide block">NAVI</span>
                <span className="text-[10px] tracking-[0.25em] text-gold/80 uppercase">Vastra Vihar</span>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-sm">
              Premium Indian ethnic fashion since 1978. Sarees, lehengas, suits and kurtis — from our Bengaluru boutique to your doorstep.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-3d-chip"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-xs hidden min-[400px]:inline">{BUSINESS.social.instagramHandle}</span>
              </a>
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-3d-chip"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-xs hidden min-[400px]:inline">Facebook</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-4 sm:mb-5">Shop</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/65 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-4 sm:mb-5">Help</h3>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/65 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-4 sm:mb-5">Visit & GST</h3>
            <ul className="space-y-4 text-sm text-cream/70">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                <address className="not-italic leading-relaxed">
                  {BUSINESS.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                <a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-gold transition-colors font-medium">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold transition-colors break-all">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 p-4 rounded-xl border border-gold/20 bg-navy-light/40 text-xs text-cream/55 leading-relaxed">
              <p>
                <span className="text-gold/90 font-medium">GSTIN/UIN:</span> {BUSINESS.gstin}
              </p>
              <p className="mt-1">
                <span className="text-gold/90 font-medium">State:</span> {BUSINESS.state}, Code: {BUSINESS.stateCode}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 sm:my-10 bg-cream/10" />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center text-xs text-cream/40 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <p className="text-cream/35">GSTIN {BUSINESS.gstin}</p>
        </div>
      </div>
    </footer>
  );
}
