import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  light?: boolean;
}

export function SectionHeading({ subtitle, title, viewAllHref, viewAllLabel = "View all", light }: SectionHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div>
        {subtitle && (
          <p
            className={`text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-1.5 font-medium ${
              light ? "text-cream/70" : "text-navy/45"
            }`}
          >
            {subtitle}
          </p>
        )}
        <h2 className={`font-serif text-xl sm:text-2xl lg:text-3xl tracking-tight ${light ? "text-cream" : "text-navy"}`}>
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={`inline-flex items-center gap-1 text-sm font-medium transition-colors shrink-0 border-b border-transparent hover:border-current pb-0.5 ${
            light ? "text-cream/90 hover:text-cream" : "text-navy/70 hover:text-navy"
          }`}
        >
          {viewAllLabel} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
