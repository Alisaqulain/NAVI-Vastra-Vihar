"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { authProvider, saveSession, ADMIN_CREDENTIALS } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const session = await authProvider.login(email, password, "admin");
      if (!session) {
        toast.error("Invalid credentials or insufficient permissions");
        return;
      }
      saveSession(session, true);
      toast.success("Welcome back!");
      router.push(redirect);
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative z-10 w-full max-w-md border-beige/20 bg-cream-light/95 backdrop-blur">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy">
          <Image src="/logo.jpeg" alt="NAVI" width={48} height={48} className="rounded-full" />
        </div>
        <CardTitle className="font-serif text-2xl">NAVI Admin CRM</CardTitle>
        <CardDescription>Sign in to manage your saree store</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={ADMIN_CREDENTIALS.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="emerald" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Sign In
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-navy/50">
          Demo: {ADMIN_CREDENTIALS.email} / {ADMIN_CREDENTIALS.password}
        </p>
      </CardContent>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald/20 via-navy to-navy-dark" />
      <Suspense fallback={<div className="text-cream">Loading...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
