import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  showText?: boolean;
  centered?: boolean;
};

const sizes = {
  xs: { img: 36, ring: "h-9 w-9", title: "text-sm", sub: "text-[6px]" },
  sm: { img: 40, ring: "h-10 w-10", title: "text-base", sub: "text-[7px]" },
  md: { img: 48, ring: "h-12 w-12", title: "text-lg", sub: "text-[8px]" },
  lg: { img: 72, ring: "h-[72px] w-[72px]", title: "text-xl", sub: "text-[9px]" },
} as const;

export function BrandLogo({ className, size = "md", showText = true, centered = false }: BrandLogoProps) {
  const s = sizes[size];

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 min-w-0 shrink-0 transition-transform duration-300",
        centered && "flex-col text-center gap-1.5",
        className
      )}
    >
      <div
        className={cn(
          "relative shrink-0 rounded-full overflow-hidden ring-2 ring-gold/50 ring-offset-1 ring-offset-white transition-all duration-300 group-hover:scale-[1.02]",
          s.ring
        )}
      >
        <Image
          src="/logo.jpeg"
          alt="NAVI Vastra Vihar"
          width={s.img}
          height={s.img}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      {showText && (
        <div className={cn("min-w-0 brand-text leading-none", centered && "items-center")}>
          <span className={cn("font-serif text-navy tracking-wide block", s.title)}>NAVI</span>
          <span className={cn("tracking-[0.2em] text-navy/45 uppercase mt-0.5 block", s.sub)}>Vastra Vihar</span>
        </div>
      )}
    </Link>
  );
}
