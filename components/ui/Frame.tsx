"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * An image in a masked frame, with the three motions the reference studios use
 * on every picture they publish:
 *
 *   1. the frame wipes open on a clip-path as it enters
 *   2. the picture inside starts overscaled and settles to 1.0, so the reveal
 *      has depth rather than being a fade
 *   3. the picture drifts against the scroll inside its own frame (parallax)
 *
 * Parallax is why the image is rendered at 120% height and offset — it needs
 * headroom to travel through, otherwise the edges would tear away from the
 * frame at the extremes.
 */
export function Frame({
  src,
  alt = "",
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 1024px) 92vw, 46rem",
  parallax = 12,
  rounded = "rounded-[1.5rem]",
  children,
}: {
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Travel in percent of frame height. 0 disables. */
  parallax?: number;
  rounded?: string;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = root.current;
      if (!el) return;
      const img = el.querySelector("[data-frame-img]");
      if (!img) return;

      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "zeizz",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );

      gsap.fromTo(
        img,
        { scale: 1.22 },
        {
          scale: 1,
          duration: 1.5,
          ease: "zeizz",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );

      if (parallax > 0) {
        gsap.fromTo(
          img,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: root, dependencies: [parallax] }
  );

  return (
    <div
      ref={root}
      className={cn("relative overflow-hidden bg-ink-900", rounded, className)}
    >
      <div data-frame-img className="absolute inset-x-0 -inset-y-[10%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </div>
      {/* Ground tint so type laid over the picture always has contrast. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
      {children}
    </div>
  );
}
