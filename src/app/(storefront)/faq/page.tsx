import { PolicyLayout } from "@/components/storefront/PolicyLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What fabrics do you use?",
    a: "We source authentic handloom fabrics including Banarasi silk, Kanjeevaram, Chanderi, cotton, linen, and georgette. Each product page lists detailed fabric specifications.",
  },
  {
    q: "What saree length do you offer?",
    a: "All our sarees are standard 5.5 meters in length with a matching blouse piece included. Refer to the size guide on each product page for blouse measurements.",
  },
  {
    q: "Do you offer blouse stitching?",
    a: "Yes, we offer blouse stitching and minor alterations for sarees. Contact our store or email us within 7 days of purchase for customisation requests.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, credit/debit cards, net banking, and cash on delivery (for orders under ₹25,000). Payment gateway integration is ready for Razorpay or Stripe.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 5–7 business days across India. Express delivery (2–3 days) is available for metro cities at an additional charge.",
  },
  {
    q: "Can I return or exchange a saree?",
    a: "Unworn sarees with original tags can be returned within 7 days of delivery. Custom-stitched blouses or sale items are non-returnable. See our Return Policy for full details.",
  },
  {
    q: "Are your products authentic handloom?",
    a: "Absolutely. We work directly with weaver cooperatives and artisan clusters. Many pieces come with handloom marks and certificates of authenticity.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within India only. International shipping will be available soon. Sign up for our newsletter to be notified.",
  },
];

export default function FAQPage() {
  return (
    <PolicyLayout title="Frequently Asked Questions">
      <Accordion type="single" collapsible className="not-prose">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-medium text-navy">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-navy/70">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PolicyLayout>
  );
}
