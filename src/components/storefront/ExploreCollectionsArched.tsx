import Image from "next/image";
import Link from "next/link";

const COLLECTIONS = [
  {
    title: "Festive wear",
    subtitle: "FESTIVE EDIT",
    off: "Up to 20% off",
    href: "/shop?category=festive-wear",
    image: "/14000-18000/NPD_7098.jpg",
  },
  {
    title: "Party collection",
    subtitle: "PARTY WEAR",
    off: "10% OFF",
    href: "/shop?minPrice=5000&maxPrice=14000",
    image: "/7599/NPD_7309.jpg",
  },
  {
    title: "Wedding silks",
    subtitle: "MUHURTHAM",
    off: "10% OFF",
    href: "/shop?minPrice=10000",
    image: "/16990/NPD_7192.jpg",
  },
  {
    title: "Everyday cotton",
    subtitle: "DAILY WEAR",
    off: "10% OFF",
    href: "/shop?maxPrice=5000",
    image: "/1750/NPD_7272.jpg",
  },
] as const;

export function ExploreCollectionsArched() {
  return (
    <section className="relative bg-white py-12 sm:py-16 overflow-hidden">
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-24 sm:w-32 h-64 opacity-[0.12] hidden md:block"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 200'%3E%3Cpath fill='%231f6b5c' d='M40 0c-20 40-35 80-35 120 0 30 15 55 35 80 20-25 35-50 35-80C75 80 60 40 40 0z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-24 sm:w-32 h-64 opacity-[0.12] hidden md:block scale-x-[-1]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 200'%3E%3Cpath fill='%231f6b5c' d='M40 0c-20 40-35 80-35 120 0 30 15 55 35 80 20-25 35-50 35-80C75 80 60 40 40 0z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      <div className="container-premium relative">
        <header className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-navy tracking-tight">
            Explore other collections
          </h2>
          <p className="text-sm sm:text-base text-navy/55 mt-3 font-serif italic">
            Celebrate tradition with our exquisite range of sarees.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {COLLECTIONS.map((col) => (
            <Link key={col.href} href={col.href} className="group block">
              <div className="relative mx-auto max-w-[280px]">
                <div
                  className="relative overflow-hidden bg-neutral-200 aspect-[3/4.2] rounded-t-[999px] rounded-b-sm shadow-sm"
                  style={{ borderTopLeftRadius: "50% 18%", borderTopRightRadius: "50% 18%" }}
                >
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 45vw, 280px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent pt-16 pb-4 px-3 text-center text-white">
                    <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-90">{col.subtitle}</p>
                    <p className="text-xl sm:text-2xl font-semibold mt-1">{col.off}</p>
                    <p className="text-[11px] sm:text-xs mt-2 opacity-90">{col.title}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
