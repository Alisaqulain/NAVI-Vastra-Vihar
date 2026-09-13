import Image from "next/image";
import { Instagram } from "lucide-react";

const images = [
  "photo-1610037129814-458c63926063",
  "photo-1599737367085-492f80f7807b",
  "photo-1583391733981-9a17e7a5661d",
  "photo-1596870230752-f7cc744e274a",
  "photo-1601925260368-ae2f83cf8b7f",
  "photo-1617137968427-85924c800a22",
];

export function InstagramGallery() {
  return (
    <section>
      <div className="text-center mb-8">
        <p className="text-emerald text-sm tracking-[0.2em] uppercase mb-2 flex items-center justify-center gap-2">
          <Instagram className="h-4 w-4" /> @navivastravihar
        </p>
        <h2 className="font-serif text-3xl text-navy">Styled by You</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {images.map((id, i) => (
          <a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden rounded-lg group"
          >
            <Image
              src={`https://images.unsplash.com/${id}?w=400&q=80`}
              alt={`NAVI style ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
              <Instagram className="h-6 w-6 text-cream opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
