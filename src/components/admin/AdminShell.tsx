"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { AdminAuthGuard } from "./AdminAuthGuard";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminBreadcrumbs } from "./AdminBreadcrumbs";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoginPage) {
    return (
      <>
        {children}
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-cream">
        <AdminSidebar />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <AdminSidebar mobile onClose={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <AdminBreadcrumbs className="mb-4" />
            {children}
          </main>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </AdminAuthGuard>
  );
}
