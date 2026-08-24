"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
  video,
  alt = "",
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 1024px) 92vw, 46rem",
  parallax = 12,
  rounded = "rounded-[1.5rem]",
  children,
}: {
  /** Still image. Also used as the video poster when `video` is set. */
  src: string;
  /**
   * Optional looping clip in /public/media. When present it plays over the
   * still, which is how the reference studios carry most of their motion —
   * Ramotion runs 22 of these on its home page alone.
   */
  video?: string;
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only play while the frame is on screen, and never for reduced motion — an
  // autoplaying loop that is scrolled past is pure battery and bandwidth.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

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
      className={cn("relative overflow-hidden bg-panel", rounded, className)}
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
        {video && (
          /* The still stays underneath as the poster, so the frame is never
             empty while the clip buffers — and if the clip is blocked (data
             saver, autoplay policy) the image simply remains. */
          <video
            ref={videoRef}
            src={video}
            poster={src}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
          />
        )}
      </div>
      {/*
        Ground tint so type laid over the picture always has contrast. Fixed to
        ink rather than the canvas token: the artwork is saturated and dark in
        both themes, so a light scrim would wash it out and leave overlay text
        unreadable on the light theme.
      */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
      {children}
    </div>
  );
}
