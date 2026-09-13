"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store, Bell, Shield, Palette } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const handleSave = () => toast.success("Settings saved (placeholder)");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">Settings</h1>
        <p className="text-sm text-navy/60">Configure your store preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-beige bg-cream-light">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Store className="h-5 w-5" />
              Store Information
            </CardTitle>
            <CardDescription>Basic details about your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="NAVI Vastra Vihar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" defaultValue="Handloom Excellence Since 1978" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" type="email" defaultValue="info@navivastravihar.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input id="phone" defaultValue="+91 9876543210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Store Address</Label>
              <Textarea id="address" defaultValue="123 Heritage Lane, Varanasi, Uttar Pradesh 221001" rows={2} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-beige bg-cream-light">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Email and alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "newOrder", label: "New order notifications", default: true },
              { id: "lowStock", label: "Low stock alerts", default: true },
              { id: "newCustomer", label: "New customer registrations", default: false },
              { id: "dailyReport", label: "Daily sales report", default: true },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <Label htmlFor={item.id}>{item.label}</Label>
                <Switch id={item.id} defaultChecked={item.default} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-beige bg-cream-light">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Account and access settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactor">Two-factor authentication</Label>
              <Switch id="twoFactor" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-beige bg-cream-light">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="h-5 w-5" />
              Display Preferences
            </CardTitle>
            <CardDescription>Admin panel appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="compactMode">Compact sidebar</Label>
              <Switch id="compactMode" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">Dark mode (coming soon)</Label>
              <Switch id="darkMode" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="Asia/Kolkata (IST)" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue="INR (₹)" disabled />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="emerald" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}
