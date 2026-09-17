import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  light?: boolean;
}

export function SectionHeading({ subtitle, title, viewAllHref, viewAllLabel = "View All", light }: SectionHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
      <div>
        {subtitle && (
          <p className={`text-sm tracking-[0.2em] uppercase mb-2 ${light ? "text-gold" : "text-emerald"}`}>
            {subtitle}
          </p>
        )}
        <div className="gold-line mb-3" />
        <h2 className={`font-serif text-2xl sm:text-3xl lg:text-4xl ${light ? "text-cream" : "text-navy"}`}>
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors shrink-0 ${
            light ? "text-gold hover:text-gold-light" : "text-emerald hover:text-emerald-light"
          }`}
        >
          {viewAllLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
