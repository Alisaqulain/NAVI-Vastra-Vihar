import { CreditCard, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, label: "Free shipping", detail: "Orders above ₹5,000" },
  { icon: RotateCcw, label: "Easy returns", detail: "See return policy" },
  { icon: ShieldCheck, label: "Authentic quality", detail: "Inspected before dispatch" },
  { icon: CreditCard, label: "Secure payments", detail: "UPI · Cards · COD" },
] as const;

export function StoreTrustBar() {
  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <div className="container-premium py-3 sm:py-4">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map(({ icon: Icon, label, detail }) => (
            <li key={label} className="flex items-center gap-3 min-w-0">
              <Icon className="h-5 w-5 text-navy/70 shrink-0" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-navy truncate">{label}</p>
                <p className="text-[10px] sm:text-xs text-navy/45 truncate">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
