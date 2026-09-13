"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-cream-light group-[.toaster]:text-navy group-[.toaster]:border-beige group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-navy/60",
          actionButton: "group-[.toast]:bg-emerald group-[.toast]:text-cream",
          cancelButton: "group-[.toast]:bg-cream-dark group-[.toast]:text-navy",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
