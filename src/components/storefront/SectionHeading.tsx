import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function SectionHeading({ subtitle, title, viewAllHref, viewAllLabel = "View All" }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {subtitle && (
          <p className="text-emerald text-sm tracking-[0.2em] uppercase mb-1">{subtitle}</p>
        )}
        <h2 className="font-serif text-3xl sm:text-4xl text-navy">{title}</h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="hidden sm:flex items-center gap-1 text-sm text-emerald hover:text-emerald-light transition-colors"
        >
          {viewAllLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
