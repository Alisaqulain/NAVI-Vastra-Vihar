"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AccountNav } from "@/components/storefront/AccountNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
  const { session, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/account/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (session) {
      setForm({
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        email: session.user.email,
        phone: session.user.phone,
      });
    }
  }, [session]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Profile updated successfully");
  }

  if (isLoading || !session) return null;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-2xl">
      <h1 className="font-serif text-3xl text-navy mb-6">Profile</h1>
      <AccountNav />
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} disabled className="opacity-60" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <Button type="submit" variant="emerald">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
