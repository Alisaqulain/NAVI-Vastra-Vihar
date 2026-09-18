import { PolicyLayout } from "@/components/storefront/PolicyLayout";

export default function ReturnPolicyPage() {
  return (
    <PolicyLayout title="Return & Refund Policy">
      <p><strong>Last updated:</strong> September 2025</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Return Eligibility</h2>
      <p>We accept returns within 7 days of delivery for unworn, unwashed items with original tags and packaging intact. Items must be in the same condition as received.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Non-Returnable Items</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Custom-stitched blouses and altered garments</li>
        <li>Items marked as final sale or clearance</li>
        <li>Products with removed or damaged tags</li>
        <li>Innerwear and intimate apparel</li>
      </ul>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">How to Initiate a Return</h2>
      <p>Email info@navivastravihar.com with your order number and reason for return. Our team will arrange a pickup within 2–3 business days. Alternatively, you may drop off the item at our Sahakarnagar, Bengaluru store.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Refunds</h2>
      <p>Refunds are processed within 5–7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method. COD orders receive refunds via bank transfer.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Exchanges</h2>
      <p>We offer free size exchanges within 7 days, subject to availability. Contact us to arrange an exchange. If the desired size is unavailable, a full refund will be issued.</p>
    </PolicyLayout>
  );
}
