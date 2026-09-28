import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { DEFAULT_OG_IMAGE, CATALOG_IMAGES } from "@/lib/constants/images";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://navivastravihar.com"),
  title: {
    default: "NAVI Vastra Vihar | Premium Sarees & Lehengas in Bengaluru Since 1978",
    template: "%s | NAVI Vastra Vihar",
  },
  description:
    "Shop premium silk sarees, lehengas, suits and festive wear at NAVI Vastra Vihar, Bengaluru. Handloom heritage since 1978. Free shipping above ₹5,000.",
  keywords: [
    "sarees Bengaluru",
    "silk sarees online",
    "NAVI Vastra Vihar",
    "Banarasi saree",
    "wedding saree",
    "lehenga shop Bangalore",
    "festive wear saree",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "NAVI Vastra Vihar",
    title: "NAVI Vastra Vihar | Premium Indian Ethnic Wear",
    description:
      "Premium sarees, lehengas and festive collections from Bengaluru — curated since 1978.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: CATALOG_IMAGES[3].alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAVI Vastra Vihar",
    description: "Premium sarees & lehengas — Bengaluru since 1978.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b2a4a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
