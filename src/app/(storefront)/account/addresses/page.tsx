"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { AccountNav } from "@/components/storefront/AccountNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { customerRepository } from "@/lib/repositories";
import { Address } from "@/lib/models";

export default function AddressesPage() {
  const { session, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/account/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (session?.user.id) {
      customerRepository.findById(session.user.id).then((customer) => {
        if (customer) setAddresses(customer.addresses);
      });
    }
  }, [session?.user.id]);

  if (isLoading || !session) return null;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl text-navy">Addresses</h1>
        <Button variant="emerald" size="sm" onClick={() => toast.info("Address form ready for database integration")}>
          <Plus className="h-4 w-4 mr-2" /> Add Address
        </Button>
      </div>
      <AccountNav />

      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <MapPin className="h-12 w-12 mx-auto text-navy/20 mb-4" />
          <p className="text-navy/60">No saved addresses yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <Card key={addr.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-navy">{addr.label}</h3>
                  {addr.isDefault && <Badge variant="emerald">Default</Badge>}
                </div>
                <p className="text-sm text-navy/80">{addr.fullName}</p>
                <p className="text-sm text-navy/60 mt-2">
                  {addr.addressLine1}
                  {addr.addressLine2 && `, ${addr.addressLine2}`}
                  <br />
                  {addr.state} — {addr.pincode}
                  <br />
                  {addr.phone}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
