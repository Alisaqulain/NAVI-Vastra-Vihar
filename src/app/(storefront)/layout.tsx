import { Toaster } from "sonner";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { MobileNav } from "@/components/storefront/MobileNav";
import { StorefrontProviders } from "@/components/storefront/providers";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <StorefrontProviders>
      <div className="flex min-h-screen flex-col pb-[60px] lg:pb-0">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </div>
      <Toaster position="top-center" richColors closeButton />
    </StorefrontProviders>
  );
}
