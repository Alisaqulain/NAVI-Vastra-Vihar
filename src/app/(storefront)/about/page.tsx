import Image from "next/image";
import { PolicyLayout } from "@/components/storefront/PolicyLayout";

export default function AboutPage() {
  return (
    <PolicyLayout title="About Us">
      <div className="relative h-64 rounded-lg overflow-hidden mb-8">
        <Image
          src="https://images.unsplash.com/photo-1610037129814-458c63926063?w=1200&q=80"
          alt="NAVI Vastra Vihar saree heritage"
          fill
          className="object-cover"
        />
      </div>
      <p>
        Founded in 1978, <strong>NAVI Vastra Vihar</strong> began as a dedicated saree shop in the heart of Old Delhi.
        What started with a passion for Banarasi silks and Kanjeevaram weaves has grown into one of India&apos;s most trusted
        names in premium sarees.
      </p>
      <p>
        For over four decades, we have worked directly with master weavers across Varanasi, Kanchipuram, Bhagalpur, and Rajasthan —
        ensuring every saree carries the authenticity of its origin. Our collections span silk, cotton, handloom, wedding,
        and festive sarees, each selected with the same dedication to quality that defined our first shop.
      </p>
      <h2 className="font-serif text-xl text-navy mt-8 mb-4">Our Philosophy</h2>
      <p>
        We believe a saree is not just clothing — it is heritage woven into six yards of fabric. Every NAVI saree is chosen
        for its craftsmanship, drape, and timeless elegance. We reject fast fashion in favour of pieces that become heirlooms
        passed down through generations.
      </p>
      <h2 className="font-serif text-xl text-navy mt-8 mb-4">Saree Shop • Handloom Elegance • Since 1978</h2>
      <p>
        From our flagship store in Connaught Place, New Delhi, to our online boutique, NAVI Vastra Vihar continues to celebrate
        the art of Indian saree weaving. We invite you to discover sarees that honour tradition while embracing contemporary grace.
      </p>
    </PolicyLayout>
  );
}
