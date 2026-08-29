"use client";

import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    children?: ReactNode;
    /** Render as a different motion element — "a", "div", … */
    as?: string;
  };

/**
 * A quiet outlined button with a shine that sweeps across the label and the
 * border. Ported from the vengenceui registry; colours are mapped onto the
 * studio tokens so it reads on both the dark ground and the paper sections.
 */
export function AnimatedButton({
  children = "Browse Components",
  className,
  as = "button",
  ...rest
}: Props) {
  const Component = ((motion as unknown as Record<string, ElementType>)[as] ??
    motion.button) as ElementType;

  return (
    <Component
      {...rest}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "border border-line-strong bg-raised px-6 py-2 font-medium text-ink backdrop-blur-sm",
        "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400",
        "disabled:pointer-events-none disabled:opacity-50",
        // The sweep colour: light on the studio ground, dark on paper sections.
        "[--shine:rgba(255,255,255,0.66)] [[data-theme=light]_&]:[--shine:rgba(4,6,12,0.5)]",
        className,
      )}
    >
      {/* Label, revealed by a travelling mask. */}
      <motion.span
        className="relative z-10 flex h-full w-full items-center justify-center font-light tracking-wide"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
        }}
        initial={{ "--mask-x": "100%" } as MotionProps["initial"]}
        animate={{ "--mask-x": "-100%" } as MotionProps["animate"]}
        transition={{ repeat: Infinity, duration: 1, ease: "linear", repeatDelay: 1 }}
      >
        {children}
      </motion.span>

      {/* The same sweep, run along the border only. */}
      <motion.span
        aria-hidden
        className="absolute inset-0 block rounded-full p-px"
        style={{
          background:
            "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{ backgroundPosition: "100% 0", opacity: 0 }}
        animate={{ backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />
    </Component>
  );
}

export default AnimatedButton;
