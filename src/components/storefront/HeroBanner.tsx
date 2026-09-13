import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1610037129814-458c63926063?w=1920&q=80"
        alt="NAVI Vastra Vihar - Premium Saree Collection"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <p className="text-gold text-sm sm:text-base tracking-[0.3em] uppercase mb-4">
            Saree Shop • Handloom Elegance • Since 1978
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream leading-tight mb-6">
            Drape Yourself in
            <span className="block text-gold">Timeless Heritage</span>
          </h1>
          <p className="text-cream/80 text-base sm:text-lg mb-8 max-w-lg">
            Discover handwoven Banarasi, Kanjeevaram, cotton and designer sarees crafted by master artisans across India.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="gold">
              <Link href="/shop">Shop Sarees</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10">
              <Link href="/shop?category=new-arrivals">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
