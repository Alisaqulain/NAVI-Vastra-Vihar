import { CreditCard, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, label: "Free shipping", detail: "Orders above ₹5,000" },
  { icon: RotateCcw, label: "Easy returns", detail: "7-day exchange policy" },
  { icon: ShieldCheck, label: "Authentic weave", detail: "Quality guaranteed" },
  { icon: CreditCard, label: "Secure checkout", detail: "UPI · Cards · COD" },
] as const;

export function StoreTrustBar() {
  return (
    <section className="border-b border-beige/60 bg-cream-light">
      <div className="container-premium py-3 sm:py-3.5">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map(({ icon: Icon, label, detail }) => (
            <li key={label} className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-navy truncate">{label}</p>
                <p className="text-[10px] sm:text-xs text-navy/50 truncate">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
