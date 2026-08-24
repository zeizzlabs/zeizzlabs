"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import type { Faq } from "@/lib/types";

/**
 * FAQ accordion. Native <button> + aria-expanded for keyboard and screen
 * readers; the panel animates with grid-template-rows so it works at any
 * content height without measuring anything in JS.
 */
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="group">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-gold-300"
            >
              <span className="h-card text-lg text-ink transition-colors group-hover:text-gold-200 sm:text-xl">
                {item.q}
              </span>
              <span
                className={cn(
                  "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-400",
                  isOpen
                    ? "rotate-45 border-gold-500/60 bg-gold-500/10 text-gold-300"
                    : "text-muted group-hover:border-white/30"
                )}
              >
                <Icon name="Plus" className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </button>

            <div
              id={`faq-panel-${i}`}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pr-10 text-[15px] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
