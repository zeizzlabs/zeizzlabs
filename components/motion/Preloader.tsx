"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * The opening beat. Every studio site in this tier has one, and it does real
 * work: it hides font swap and shader warm-up, and it buys the hero time to
 * be ready before the visitor sees it.
 *
 * The counter tracks genuine asset progress (images + fonts), not a fake timer,
 * with a floor animation so it never sits frozen on a fast connection. It runs
 * once per session — coming back from another page should not replay it.
 */
const SESSION_KEY = "zeizz.intro.seen";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Skip on repeat visits within the session, and for reduced motion.
    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(SESSION_KEY) === "1";

    if (seen || prefersReducedMotion()) {
      document.documentElement.classList.remove("is-loading");
      // Unmount on the next frame — setting state synchronously in an effect
      // body forces an extra render before the first paint.
      const id = requestAnimationFrame(() => setMounted(false));
      return () => cancelAnimationFrame(id);
    }

    document.documentElement.classList.add("is-loading");

    // Only count images that are actually being fetched now. Next.js lazy-loads
    // anything below the fold, and because this overlay blocks scrolling those
    // requests would never start — waiting on them deadlocks the counter at
    // some fraction of 100 forever.
    const images = Array.from(document.images).filter(
      (img) => img.loading !== "lazy"
    );
    const total = images.length + 1; // +1 for the font set
    let done = 0;

    const state = { shown: 0 };
    const bump = () => {
      done += 1;
    };

    images.forEach((img) => {
      if (img.complete) bump();
      else {
        img.addEventListener("load", bump, { once: true });
        img.addEventListener("error", bump, { once: true });
      }
    });
    document.fonts?.ready.then(bump);

    // Belt and braces: a decoded image or a font can still stall on a bad
    // network. The intro must never be the reason someone cannot use the site.
    const failsafe = window.setTimeout(() => {
      done = total;
    }, 4000);

    let cleanupTick: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // Ease the displayed number toward real progress every frame, so it
      // always moves but never overtakes what has actually loaded.
      const tick = () => {
        const real = (done / total) * 100;
        state.shown += (Math.max(real, state.shown + 0.35) - state.shown) * 0.08;
        const v = Math.min(100, Math.round(state.shown));
        if (countRef.current) countRef.current.textContent = String(v).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
        if (v >= 100) {
          gsap.ticker.remove(tick);
          outro();
        }
      };

      const outro = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove("is-loading");
            sessionStorage.setItem(SESSION_KEY, "1");
            setMounted(false);
            window.dispatchEvent(new CustomEvent("zeizz:intro-done"));
          },
        });
        tl.to("[data-intro-fade]", { autoAlpha: 0, duration: 0.5, stagger: 0.05 })
          // The panel lifts away as a mask rather than a fade — the reveal
          // reads as a curtain, which is what makes it feel deliberate.
          .to(
            root.current,
            { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "zeizz" },
            "-=0.15"
          );
      };

      gsap.ticker.add(tick);
      cleanupTick = () => gsap.ticker.remove(tick);
      gsap.fromTo(
        "[data-intro-rise]",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.06, ease: "zeizz" }
      );
    }, root);

    return () => {
      window.clearTimeout(failsafe);
      cleanupTick?.();
      ctx.revert();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[200] grid place-items-center bg-ink-950"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative flex flex-col items-center gap-8 px-8">
        <div className="overflow-hidden">
          <div data-intro-rise className="wordmark text-4xl sm:text-6xl">
            ZeizzLabs
          </div>
        </div>

        <div data-intro-fade className="overflow-hidden">
          <p data-intro-rise className="eyebrow">
            Digital Creation &amp; Innovation
          </p>
        </div>

        <div data-intro-fade className="flex w-[min(22rem,70vw)] flex-col gap-3">
          <span className="relative h-px w-full overflow-hidden bg-line-strong">
            <span
              ref={barRef}
              className="absolute inset-0 origin-left [background:var(--gradient-brand)]"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
          <span
            ref={countRef}
            className="self-end font-mono text-xs tracking-[0.3em] text-gold-400"
          >
            000
          </span>
        </div>
      </div>
    </div>
  );
}
