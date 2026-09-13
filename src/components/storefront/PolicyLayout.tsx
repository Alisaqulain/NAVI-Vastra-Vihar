import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";

interface PolicyLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <h1 className="font-serif text-3xl lg:text-4xl text-navy mt-6 mb-8">{title}</h1>
      <div className="prose prose-navy max-w-none space-y-4 text-navy/80 leading-relaxed">{children}</div>
    </div>
  );
}
