"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PolicyLayout } from "@/components/storefront/PolicyLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll respond within 24 hours.");
    }, 800);
  }

  return (
    <PolicyLayout title="Contact Us">
        <div className="grid lg:grid-cols-2 gap-10 not-prose">
          <div className="space-y-6">
            <p className="text-navy/80 leading-relaxed">
              We&apos;d love to hear from you. Whether you have a question about a product, need styling advice, or want to
              visit our store — our team is here to help.
            </p>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "42, MG Road, Connaught Place, New Delhi — 110001" },
                { icon: Phone, text: "+91 11 2456 7890" },
                { icon: Mail, text: "hello@navivastravihar.com" },
                { icon: Clock, text: "Mon–Sat: 10 AM – 8 PM | Sun: 11 AM – 6 PM" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex gap-3 text-navy/80">
                  <Icon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} required />
                </div>
                <Button type="submit" variant="emerald" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
    </PolicyLayout>
  );
}
