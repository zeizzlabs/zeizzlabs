"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { WaveProgress } from "./WaveProgress";

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
  // Written every frame by the counter tick and read by the canvas, so the
  // wave field follows real progress without re-rendering React sixty times a
  // second.
  /**
   * The curtain lifts when the assets are ready AND the wave has either
   * finished crossing or three seconds have passed — whichever comes first.
   * On a fast connection the assets are ready almost immediately, and without
   * the second condition the gesture would be cut off before anyone saw it;
   * the three-second cap stops it becoming a toll on a slow one.
   */
  const waveDoneRef = useRef(false);
  /** Timer handle, so the effect's teardown can clear a cap the canvas armed. */
  const waveCapRef = useRef(0);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Skip on repeat visits within the session, and for reduced motion.
    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(SESSION_KEY) === "1";

    if (seen || prefersReducedMotion()) {
      document.documentElement.classList.remove("is-loading");
      // Hide it with a direct DOM write first: this runs before the browser
      // paints, so there is no flash of the intro. React state cannot do that
      // job here — setting it synchronously in an effect body forces an extra
      // render pass, so the actual unmount is deferred by a frame.
      if (root.current) root.current.style.display = "none";
      const id = requestAnimationFrame(() => setMounted(false));
      return () => cancelAnimationFrame(id);
    }

    document.documentElement.classList.add("is-loading");
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } })
      .lenis;
    lenis?.stop();

    // Only count images that are actually being fetched now. Next.js lazy-loads
    // anything below the fold, and because this overlay blocks scrolling those
    // requests would never start — waiting on them deadlocks the counter at
    // some fraction of 100 forever.
    const images = Array.from(document.images).filter(
      (img) => img.loading !== "lazy"
    );
    const total = images.length + 1; // +1 for the font set
    let done = 0;

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

    // Three seconds is the cap, not a target: whichever of the wave finishing
    // and this timer comes first releases the curtain. It also covers the case
    // where the canvas never reports at all — no context, a hidden tab —
    // because the intro must never be the reason someone cannot reach the site.
    // 3.5s, not 6: the lead pass takes about two seconds, so this is a
    // generous backstop rather than a second delay in its own right. Six
    // seconds meant that on any run where the canvas did not report, the
    // curtain sat there long after the site was ready.
    // The cap itself is armed by the canvas on its first frame — see the
    // onStart handler below. Only the teardown lives here.

    let cleanupTick: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // Both conditions, checked every frame: everything fetched, and the
      // wave either finished or capped out.
      const tick = () => {
        if (done >= total && waveDoneRef.current) {
          gsap.ticker.remove(tick);
          outro();
        }
      };

      const outro = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove("is-loading");
            lenis?.start();
            sessionStorage.setItem(SESSION_KEY, "1");
            setMounted(false);
            window.dispatchEvent(new CustomEvent("zeizz:intro-done"));
          },
        });
        /**
         * A fade, not a curtain.
         *
         * The panel used to wipe away on a clip-path, which is a deliberate,
         * announced gesture — it makes the reveal an event in its own right.
         * The wave has already been the event by this point, so the panel
         * should simply stop being there. power2.out leaves quickly and
         * settles slowly, so the site is visible early in the transition and
         * the last of the panel drifts off rather than snapping.
         */
        tl.to("[data-intro-fade]", { autoAlpha: 0, duration: 0.35, stagger: 0.04 })
          .to(root.current, { autoAlpha: 0, duration: 0.95, ease: "power2.out" }, "-=0.2");
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
      window.clearTimeout(waveCapRef.current);
      cleanupTick?.();
      ctx.revert();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[200] grid place-items-center bg-canvas"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      {/*
        Full-bleed, and behind everything. The ribbons are pointed at both
        tips, so they have to reach the actual screen edges — boxed into a
        column under the mark they read as a widget rather than as the room the
        mark is standing in.
      */}
      <WaveProgress
        onStart={() => {
          // Three seconds measured from the wave's first frame, not from mount.
          // The canvas cannot start until hydration, and arming the cap any
          // earlier spends the budget on work the visitor never sees.
          waveCapRef.current = window.setTimeout(() => {
            waveDoneRef.current = true;
          }, 3000);
        }}
        onComplete={() => {
          waveDoneRef.current = true;
        }}
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[62vh] w-full -translate-y-1/2"
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-8">

        <div className="overflow-hidden">
          <div data-intro-rise className="relative">
            {/* No bloom behind the mark. The artwork is transparent, and any
                blurred fill behind it reads as a solid plate on a light ground
                instead of as light. The mark carries itself. */}
            <Image
              src="/brand/zeizzlabs-mark.png"
              alt=""
              width={440}
              height={440}
              priority
              className="h-32 w-32 sm:h-44 sm:w-44"
            />
          </div>
        </div>


      </div>
    </div>
  );
}
