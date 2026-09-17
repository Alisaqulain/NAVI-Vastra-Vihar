"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_IMAGES } from "@/lib/constants/images";
import { toast } from "sonner";

const KEY = "navi_login_promo_v1";

export function LoginPromoPopup() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    localStorage.setItem(KEY, "1");
    setOpen(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    close();
    toast.success("Welcome to NAVI!", { description: "Use code WELCOME for 10% off above ₹5,000" });
    router.push("/account/register");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && close()}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-sm sm:max-w-md p-0 overflow-hidden gap-0 border-gold/25 [&>button.right-4]:hidden max-h-[90dvh] overflow-y-auto">
        <div className="relative h-36 sm:h-40">
          <Image src={SITE_IMAGES.hero.secondary} alt="" fill className="object-cover" sizes="400px" />
          <div className="absolute inset-0 bg-navy/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold flex items-center gap-2 mb-1">
              <Sparkles className="h-3 w-3" /> Welcome to
            </p>
            <p className="font-serif text-2xl text-cream">NAVI Vastra Vihar</p>
            <p className="text-cream/80 text-xs mt-2 max-w-[280px]">
              Flat <strong>10% OFF</strong> on first order above ₹5,000 · Code <strong className="text-gold">WELCOME</strong>
            </p>
          </div>
        </div>
        <form onSubmit={submit} className="p-6 sm:p-8 space-y-4 bg-cream-light">
          <div className="flex gap-2">
            <div className="flex items-center px-3 rounded-lg border border-beige bg-cream text-sm text-navy shrink-0">+91</div>
            <Input
              type="tel"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-lg border-beige bg-cream h-11"
            />
          </div>
          <Button type="submit" className="w-full rounded-full h-11 bg-emerald/90 hover:bg-emerald text-cream tracking-wide uppercase text-xs">
            Sign Up / Login
          </Button>
          <p className="text-[10px] text-center text-navy/45 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-emerald underline" onClick={close}>
              Terms
            </Link>{" "}
            &{" "}
            <Link href="/privacy-policy" className="text-emerald underline" onClick={close}>
              Privacy Notice
            </Link>
          </p>
          <button type="button" onClick={close} className="w-full text-xs text-navy/40 hover:text-emerald">
            Continue without signing in
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
