"use client";

import { useEffect, useRef } from "react";

/**
 * The opening animation: a wave that draws itself across the screen.
 *
 * THE IDEA. The ribbon is never a fragment of a longer shape — at every moment
 * it is a *complete* spindle, pointed at both ends and fullest in the middle,
 * whose right-hand tip happens to be travelling. So the stroke grows from the
 * left edge to the right one, thickening as it goes, and arrives whole. That is
 * what gives it an ending: when the tip reaches the right edge the gesture is
 * finished, and the curtain can lift on a completed thought rather than on a
 * loop cut mid-cycle.
 *
 * TWO LINES, NOTHING ELSE. Earlier versions piled on bands and hairlines,
 * then a heavy blue ribbon that dominated everything around it. Both were the
 * same mistake at different volumes. What is left is one gold thread and one
 * blue, on different frequencies and opposite drifts so they cross rather than
 * run in parallel, each carrying a travelling highlight. Two strokes, fully
 * committed, on an empty ground — solid enough to read as structure rather
 * than as a wisp, and still coming to a point at both tips.
 *
 * SHAPE. `sin(pi * u)` raised to 0.62 — the sine gives the taper to a point at
 * both tips, the exponent below one fills the body out so the middle is a broad
 * stroke rather than a lens. Thickness also scales with how far the ribbon has
 * travelled, so it gathers weight as it crosses rather than arriving at full
 * mass immediately.
 *
 * COST. One canvas, one rAF loop, no filters. The light is stacked translucent
 * strokes rather than shadowBlur, which is far cheaper per frame and keeps its
 * edge at any size. Reduced motion is handled upstream: the Preloader does not
 * mount at all.
 */

type Band = {
  /** Vertical placement, as a fraction of height from the middle. */
  offset: number;
  /** Sine components: amplitude (fraction of height), cycles, drift. */
  parts: [number, number, number][];
  /** Fullest thickness at the centre, in px, at full extension. */
  thick: number;
  /** Colour stops along the length. */
  stops: [string, string, string];
  /** Glow colour, as an rgba prefix awaiting its alpha. */
  glow: string;
  /** Fraction of the draw elapsed before this thread starts. */
  delay: number;
};

const BANDS: Band[] = [
  {
    // Gold, riding high through the middle.
    offset: -0.02,
    parts: [
      [0.125, 1.15, 0.18],
      [0.03, 2.35, -0.3],
    ],
    thick: 40,
    stops: ["#dcb877", "#f2d9a4", "#c9a15c"],
    glow: "rgba(220,184,119,",
    delay: 0,
  },
  {
    // Blue, on its own path — a different frequency and the opposite drift, so
    // the two cross rather than run in parallel.
    offset: 0.06,
    parts: [
      [0.105, 1.55, -0.24],
      [0.034, 2.9, 0.36],
    ],
    thick: 34,
    stops: ["#1e7bff", "#7ab8ff", "#1e7bff"],
    glow: "rgba(60,150,255,",
    delay: 0.12,
  },
];

/** Pointed at both ends, fullest in the middle. */
const spindle = (u: number) => Math.pow(Math.sin(Math.PI * u), 0.62);

/** Decelerating: the stroke arrives rather than stops. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function WaveProgress({
  onStart,
  onComplete,
  className,
}: {
  /**
   * Fired on the first painted frame. The canvas cannot begin until React has
   * hydrated, which on a cold load is a second or two after the page appears —
   * so the caller's timeout has to be armed from here, not from its own mount,
   * or the cap expires before the gesture has drawn.
   */
  onStart?: () => void;
  /** Fired once, when the wave has finished crossing. */
  onComplete?: () => void;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  // Held in a ref rather than a dependency: the caller passes an inline arrow,
  // and depending on it would restart the canvas loop on every render.
  const doneCb = useRef(onComplete);
  const startCb = useRef(onStart);
  useEffect(() => {
    doneCb.current = onComplete;
    startCb.current = onStart;
  }, [onComplete, onStart]);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    /** How long the stroke takes to cross, in seconds. */
    const DRAW = 1.8;
    const start = performance.now();
    let announced = false;
    let began = false;

    /** Centreline of a band at x. */
    const centre = (b: Band, x: number, t: number) => {
      let y = h / 2 + b.offset * h;
      for (const [amp, cycles, drift] of b.parts) {
        y += amp * h * Math.sin((x / w) * Math.PI * 2 * cycles + t * drift * Math.PI);
      }
      return y;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const t = (now - start) / 1000;

      ctx.clearRect(0, 0, w, h);
      if (w === 0 || h === 0) return;

      if (!began) {
        began = true;
        startCb.current?.();
      }
      if (!announced && t >= DRAW) {
        announced = true;
        doneCb.current?.();
      }

      for (const b of BANDS) {
        // Each thread starts a beat after the last, so they arrive in
        // sequence rather than together.
        const local = easeOut(Math.max(0, Math.min(1, (t / DRAW - b.delay) / (1 - b.delay))));
        if (local <= 0.001) continue;

        // The thread's right-hand tip. Everything is drawn as a complete
        // spindle from 0 to here, so the leading edge is always a point.
        const reach = local * w;
        // Mass in proportion to length: a thread a fifth of the width across
        // is a fifth as thick, or the opening frames are a stub rather than
        // the beginning of a stroke.
        const mass = b.thick * local;
        const step = Math.max(2, Math.round(reach / 320));

        const grad = ctx.createLinearGradient(0, 0, reach, 0);
        grad.addColorStop(0, b.stops[0]);
        grad.addColorStop(0.5, b.stops[1]);
        grad.addColorStop(1, b.stops[2]);

        const path = (scale: number) => {
          ctx.beginPath();
          for (let x = 0; x <= reach; x += step) {
            ctx.lineTo(x, centre(b, x, t) - (mass * scale * spindle(x / reach)) / 2);
          }
          for (let x = reach; x >= 0; x -= step) {
            ctx.lineTo(x, centre(b, x, t) + (mass * scale * spindle(x / reach)) / 2);
          }
          ctx.closePath();
        };

        /**
         * The glow is three widening passes at falling alpha rather than a
         * shadowBlur. It costs a fraction as much per frame, and — unlike a
         * blur, which softens uniformly — it keeps the spindle's points sharp
         * while the body blooms, which is the whole character of the shape.
         */
        // Tighter multipliers than a thread needed: a firm line wants its glow
        // held close, or the body reads as soft rather than solid.
        for (const [scale, alpha] of [
          [3.4, 0.08],
          [2.2, 0.13],
          [1.45, 0.2],
        ] as const) {
          path(scale);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = b.glow + "1)";
          ctx.fill();
        }

        // The thread itself.
        path(1);
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.fill();

        /**
         * A highlight travelling the length. It moves faster than the tip, so
         * it overtakes and runs off the end, then returns — the thread reads
         * as carrying something rather than merely existing.
         */
        const hx = ((t * 0.62 + b.delay) % 1) * reach;
        const span = Math.max(60, reach * 0.13);
        for (let k = 0; k < 3; k++) {
          const f = 1 - k / 3;
          ctx.beginPath();
          for (let x = Math.max(0, hx - span); x <= Math.min(reach, hx + span); x += step) {
            const fall = 1 - Math.abs(x - hx) / span;
            ctx.lineTo(x, centre(b, x, t) - (mass * (1 + k * 1.6) * fall * spindle(x / reach)) / 2);
          }
          for (let x = Math.min(reach, hx + span); x >= Math.max(0, hx - span); x -= step) {
            const fall = 1 - Math.abs(x - hx) / span;
            ctx.lineTo(x, centre(b, x, t) + (mass * (1 + k * 1.6) * fall * spindle(x / reach)) / 2);
          }
          ctx.closePath();
          ctx.globalAlpha = 0.5 * f * f;
          ctx.fillStyle = k === 0 ? "#ffffff" : b.glow + "1)";
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvas} aria-hidden className={className} />;
}
