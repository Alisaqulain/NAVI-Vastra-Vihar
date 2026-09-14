import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    <footer className="bg-charcoal text-cream mt-auto">
      <div className="container-premium py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-5 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" width={52} height={52} className="rounded-full" />
              <div>
                <span className="font-serif text-xl tracking-wide block">NAVI</span>
                <span className="text-[10px] tracking-[0.25em] text-gold/80 uppercase">Vastra Vihar</span>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              Premium Indian ethnic fashion since 1978. Sarees, lehengas, suits and kurtis crafted for the modern woman who honours tradition.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 rounded-full border border-cream/10 hover:border-gold/40 transition-colors">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2.5 rounded-full border border-cream/10 hover:border-gold/40 transition-colors">
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">Shop</h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/65 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">Help</h3>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/65 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">Visit Us</h3>
            <ul className="space-y-4 text-sm text-cream/65">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>464, Veena Complex, Basaveshwar Nagar, Bengaluru 560079</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 text-gold shrink-0" strokeWidth={1.5} />
                <span>+91 80 2991 9953</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0" strokeWidth={1.5} />
                <span>info@navivastravihar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-cream/10" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} NAVI Vastra Vihar. All rights reserved.</p>
          <p>Crafted with heritage · Delivered with care</p>
        </div>
      </div>
    </footer>
  );
}
