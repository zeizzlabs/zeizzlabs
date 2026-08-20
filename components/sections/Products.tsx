import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards/ProductCard";
import { products } from "@/content/products";

export function Products() {
  return (
    <Section id="offerings">
      <SectionHeading
        eyebrow="What We Offer"
        title={
          <>
            Ready-to-build <span className="text-gradient">solutions.</span>
          </>
        }
        intro="Popular, productised offerings you can start with today — each one tailored to your business. Not sure which fits? Tell us the goal and we'll advise."
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
