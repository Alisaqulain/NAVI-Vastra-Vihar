"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

type ProductPincodeCheckerProps = {
  className?: string;
};

export function ProductPincodeChecker({ className }: ProductPincodeCheckerProps) {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const check = () => {
    const pin = pincode.replace(/\D/g, "").slice(0, 6);
    setPincode(pin);
    if (pin.length !== 6) {
      setMessage("Enter a valid 6-digit pincode.");
      return;
    }
    const karnataka = pin.startsWith("56") || pin.startsWith("57") || pin.startsWith("58") || pin.startsWith("59");
    setMessage(
      karnataka
        ? `Delivery available · Usually 3–5 business days in Karnataka. Free shipping on orders above ₹${FREE_SHIPPING_THRESHOLD.toLocaleString("en-IN")}.`
        : "Delivery available across India · Usually 5–7 business days. COD may apply in select areas."
    );
  };

  return (
    <div className={className}>
      <p className="text-xs font-medium text-navy/70 mb-2 flex items-center gap-1.5">
        <MapPin className="h-3.5 w-3.5" /> Check delivery
      </p>
      <div className="flex gap-2">
        <Input
          inputMode="numeric"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="h-10 max-w-[140px] rounded-sm border-neutral-200"
          aria-label="Delivery pincode"
        />
        <Button type="button" variant="outline" className="h-10 rounded-sm shrink-0" onClick={check}>
          Check
        </Button>
      </div>
      {message && <p className="text-xs text-navy/60 mt-2 leading-relaxed">{message}</p>}
    </div>
  );
}
