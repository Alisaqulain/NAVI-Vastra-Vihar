import Image from "next/image";
import { Instagram, ArrowRight } from "lucide-react";
import { SITE_IMAGES } from "@/lib/constants/images";
import { BUSINESS } from "@/lib/constants/business";
import { Button } from "@/components/ui/button";

export function InstagramGallery() {
  return (
    <section>
      <div className="text-center mb-6 sm:mb-10">
        <p className="text-emerald text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 flex items-center justify-center gap-2">
          <Instagram className="h-4 w-4" /> {BUSINESS.social.instagramHandle}
        </p>
        <div className="gold-line mx-auto mb-3" />
        <h2 className="font-serif text-2xl sm:text-3xl text-navy">Styled by You</h2>
        <p className="text-navy/50 text-sm mt-3 max-w-md mx-auto px-2">
          Follow us for new drops, draping ideas & festive edits
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
        {SITE_IMAGES.instagram.map(({ src, alt }, i) => (
          <a
            key={i}
            href={BUSINESS.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl group shadow-sm card-elevate"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 16vw"
            />
            <div className="absolute inset-0 bg-navy/0 group-active:bg-navy/35 sm:group-hover:bg-navy/40 transition-colors flex items-center justify-center">
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-cream opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 px-2">
        <Button asChild variant="outline" className="rounded-full w-full sm:w-auto border-emerald/30 text-emerald hover:bg-emerald/5">
          <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer">
            Follow on Instagram
            <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </Button>
        <Button asChild variant="ghost" className="rounded-full w-full sm:w-auto text-navy/60">
          <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer">
            Like us on Facebook
          </a>
        </Button>
      </div>
    </section>
  );
}
