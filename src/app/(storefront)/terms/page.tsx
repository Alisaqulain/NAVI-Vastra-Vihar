import { PolicyLayout } from "@/components/storefront/PolicyLayout";

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <p><strong>Last updated:</strong> September 2025</p>
      <p>By accessing and using the NAVI Vastra Vihar website, you agree to be bound by these Terms and Conditions. Please read them carefully before making a purchase.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Products & Pricing</h2>
      <p>All product images are representative. Slight variations in colour and weave are natural characteristics of handloom fabrics. Prices are listed in Indian Rupees (INR) and include applicable taxes. We reserve the right to modify prices without prior notice.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Orders & Payment</h2>
      <p>An order confirmation email constitutes acceptance of your order. We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspected fraud. Payment must be completed at checkout unless Cash on Delivery is selected.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Intellectual Property</h2>
      <p>All content on this website — including text, images, logos, and designs — is the property of NAVI Vastra Vihar and protected by copyright law. Unauthorised reproduction is prohibited.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Limitation of Liability</h2>
      <p>NAVI Vastra Vihar shall not be liable for indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the purchase price of the product in question.</p>
      <h2 className="font-serif text-xl text-navy mt-6 mb-3">Governing Law</h2>
      <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi.</p>
    </PolicyLayout>
  );
}
