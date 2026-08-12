import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards/ProductCard";
import { products } from "@/content/products";

export function Products() {
  return (
    <Section id="products">
      <SectionHeading
        eyebrow="Built by ZeizzLabs"
        title={
          <>
            Our own <span className="text-gradient">product ecosystem.</span>
          </>
        }
        intro="Templates, tools, systems, and micro-products we build and ship — a growing catalogue, not a service list."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={(i % 3) * 70}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
