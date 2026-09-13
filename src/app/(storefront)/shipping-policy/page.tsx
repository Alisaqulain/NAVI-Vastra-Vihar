import { PolicyLayout } from "@/components/storefront/PolicyLayout";

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy">
      <p><strong>Last updated:</strong> September 2025</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Delivery Areas</h2>
      <p>NAVI Vastra Vihar currently ships to all serviceable pin codes across India. We use trusted courier partners including BlueDart, Delhivery, and India Post for reliable delivery.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Shipping Charges</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Free standard shipping on orders above ₹5,000</li>
        <li>Flat ₹99 shipping fee on orders below ₹5,000</li>
        <li>Express delivery (2–3 business days): ₹199 additional</li>
      </ul>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Processing Time</h2>
      <p>Orders are processed within 1–2 business days. Handloom and made-to-order pieces may require an additional 3–5 days. You will receive a confirmation email with tracking details once your order is dispatched.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Delivery Timeline</h2>
      <p>Standard delivery: 5–7 business days after dispatch. Metro cities typically receive orders within 3–5 business days. Remote areas may take up to 10 business days.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Order Tracking</h2>
      <p>Track your order anytime from My Account → Orders. A tracking link will also be sent to your registered email and phone via SMS.</p>
    </PolicyLayout>
  );
}
