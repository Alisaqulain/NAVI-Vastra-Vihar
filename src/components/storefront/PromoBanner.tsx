import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  variant?: "navy" | "emerald";
}

export function PromoBanner({ title, subtitle, ctaLabel, ctaHref, variant = "navy" }: PromoBannerProps) {
  const bg = variant === "navy" ? "bg-navy" : "bg-emerald";
  return (
    <section className={`${bg} rounded-2xl overflow-hidden`}>
      <div className="container mx-auto px-6 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-2">{title}</h2>
          <p className="text-cream/70 max-w-md">{subtitle}</p>
        </div>
        <Button asChild variant="gold" size="lg">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
