import { Toaster } from "sonner";
import { StorefrontHeader } from "@/components/storefront/StorefrontHeader";
import { Footer } from "@/components/storefront/Footer";
import { MobileNav } from "@/components/storefront/MobileNav";
import { StorefrontProviders } from "@/components/storefront/providers";
import { LoginPromoPopup } from "@/components/storefront/LoginPromoPopup";
import { CookieConsent } from "@/components/storefront/CookieConsent";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <StorefrontProviders>
      <div className="flex min-h-screen flex-col pb-mobile-nav">
        <StorefrontHeader />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </div>
      <LoginPromoPopup />
      <CookieConsent />
      <Toaster position="top-center" richColors closeButton />
    </StorefrontProviders>
  );
}
