import { PolicyLayout } from "@/components/storefront/PolicyLayout";

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p><strong>Last updated:</strong> September 2025</p>
      <p>NAVI Vastra Vihar (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when you use our website and services.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Name, email address, phone number, and delivery address when you create an account or place an order</li>
        <li>Payment information processed securely through our payment gateway partners</li>
        <li>Browsing behaviour, wishlist items, and cart contents to improve your shopping experience</li>
        <li>Communications when you contact our customer support team</li>
      </ul>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">How We Use Your Information</h2>
      <p>We use your data to process orders, send order updates, personalise recommendations, improve our website, and communicate promotional offers (with your consent). We never sell your personal information to third parties.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Data Security</h2>
      <p>We implement industry-standard security measures including SSL encryption for data transmission. Payment details are handled exclusively by certified payment processors and are never stored on our servers.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Your Rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data at any time by emailing hello@navivastravihar.com. You may also opt out of marketing communications via the unsubscribe link in our emails.</p>
    </PolicyLayout>
  );
}
