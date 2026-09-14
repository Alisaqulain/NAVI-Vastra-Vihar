import Image from "next/image";
import { Instagram } from "lucide-react";
import { SITE_IMAGES } from "@/lib/constants/images";

export function InstagramGallery() {
  return (
    <section>
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-emerald text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 flex items-center justify-center gap-2">
          <Instagram className="h-4 w-4" /> @navivastravihar
        </p>
        <div className="gold-line mx-auto mb-3" />
        <h2 className="font-serif text-2xl sm:text-3xl text-navy">Styled by You</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
        {SITE_IMAGES.instagram.map(({ src, alt }, i) => (
          <a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl group shadow-sm"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, 16vw"
            />
            <div className="absolute inset-0 bg-navy/0 group-active:bg-navy/30 sm:group-hover:bg-navy/40 transition-colors flex items-center justify-center">
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-cream opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
