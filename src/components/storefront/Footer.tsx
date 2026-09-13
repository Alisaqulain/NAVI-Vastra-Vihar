import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const shopLinks = [
  { label: "All Sarees", href: "/shop?category=sarees" },
  { label: "Silk Sarees", href: "/shop?category=silk-sarees" },
  { label: "Banarasi Sarees", href: "/shop?category=banarasi-sarees" },
  { label: "Kanjeevaram Sarees", href: "/shop?category=kanjeevaram-sarees" },
  { label: "Wedding Sarees", href: "/shop?category=wedding-sarees" },
  { label: "Festive Sarees", href: "/shop?category=festive-sarees" },
  { label: "New Arrivals", href: "/shop?category=new-arrivals" },
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
    <footer className="bg-navy text-cream mt-auto">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" width={56} height={56} className="rounded-full" />
              <div>
                <span className="font-serif text-2xl font-semibold block">NAVI</span>
                <span className="text-xs tracking-[0.2em] text-gold uppercase">Vastra Vihar</span>
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Premium saree boutique since 1978. From Banarasi silks to Kanjeevaram weaves, every saree is a story of heritage handloom artistry.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-navy-light hover:bg-emerald transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-navy-light hover:bg-emerald transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4 text-gold">Shop Sarees</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/70 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4 text-gold">Customer Care</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/70 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4 text-gold">Visit Us</h3>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>42, MG Road, Connaught Place, New Delhi — 110001</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <a href="tel:+911124567890" className="hover:text-cream">+91 11 2456 7890</a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <a href="mailto:hello@navivastravihar.com" className="hover:text-cream">hello@navivastravihar.com</a>
              </li>
            </ul>
            <p className="text-xs text-cream/50 mt-4">Mon–Sat: 10 AM – 8 PM | Sun: 11 AM – 6 PM</p>
          </div>
        </div>

        <Separator className="my-8 bg-navy-light" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>&copy; {new Date().getFullYear()} NAVI Vastra Vihar. All rights reserved.</p>
          <p>Saree Shop • Handloom Elegance • Since 1978</p>
        </div>
      </div>
    </footer>
  );
}
