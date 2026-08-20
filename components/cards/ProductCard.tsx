import type { Product } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

/**
 * An "offering" card. The whole card is an enquiry link — these are services
 * we build for you, so the call to action is "Enquire", not "buy".
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href="/#contact"
      className="border-glow group relative flex flex-col rounded-card border border-line bg-surface/60 p-6 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05] text-magenta">
          <Icon name={product.icon} className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-line-strong bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted">
          {product.type}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
        {product.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{product.description}</p>

      <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-blue">
        Enquire
        <Icon
          name="ArrowRight"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </a>
  );
}
