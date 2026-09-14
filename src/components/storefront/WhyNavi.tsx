import { Sparkles, Shield, Truck, HeartHandshake } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "Curated Heritage",
    description: "Every piece is hand-selected from master weavers across Banaras, Kanchipuram and artisan clusters.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "Pure fabrics, verified craftsmanship, and transparent sourcing you can trust.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Secure packaging and free shipping on orders above ₹5,000 across India.",
  },
  {
    icon: HeartHandshake,
    title: "Personal Styling",
    description: "Our team helps you find the perfect drape for weddings, festivals and everyday elegance.",
  },
];

export function WhyNavi() {
  return (
    <section className="section-padding-sm bg-ivory-dark/50">
      <div className="container-premium">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-wine mb-3">Why NAVI</p>
          <div className="gold-line mx-auto mb-4" />
          <h2 className="editorial-heading text-charcoal mb-4">Crafted for the Modern Indian Woman</h2>
          <p className="text-charcoal/60 text-sm sm:text-base leading-relaxed">
            Since 1978, NAVI Vastra Vihar has dressed generations in sarees, lehengas and ethnic wear that honour tradition while embracing contemporary grace.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center lg:text-left">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream border border-beige/60 mb-4">
                <Icon className="h-5 w-5 text-wine" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-2">{title}</h3>
              <p className="text-sm text-charcoal/55 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
