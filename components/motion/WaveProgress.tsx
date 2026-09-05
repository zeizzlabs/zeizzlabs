"use client";

import { useEffect, useRef } from "react";

/**
 * The loading progress, drawn as a field of glowing sine waves.
 *
 * Progress is read from a ref every frame rather than passed as a prop. The
 * counter updates sixty times a second, and re-rendering React that often to
 * move a wave would be absurd — the canvas simply reads the number the
 * Preloader is already maintaining.
 *
 * The waves are energised only up to the progress point: behind the leading
 * edge they run at full amplitude, ahead of it they flatten to a line. So the
 * field fills from left to right as the site loads, and the bright head is a
 * real position rather than decoration. Amplitude also grows with progress, so
 * the whole thing gathers force as it completes.
 *
 * Riding the waves are travellers: points of light that run the full width,
 * extreme left to extreme right, following the curve of whichever wave they
 * were given. Each one picks a new wave, speed, amplitude and tail every time
 * it completes a pass, so no two crossings are alike and the field never falls
 * into a loop. They sweep the whole width regardless of progress — they are
 * the flow, not the measurement.
 *
 * Canvas, not SVG. A glow on a moving stroke is a repaint whichever way it is
 * drawn, and a canvas is one composited layer rather than several filtered
 * paths — and this is the one moment on the site where a continuous repaint is
 * unambiguously worth it, since nothing else is on screen and the whole point
 * is to hold attention while assets arrive.
 */

/** Blue, ordered back to front. The theme's own blues. */
const WAVES = [
  { hue: "30,123,255", freq: 1.35, speed: 0.55, amp: 1.0, width: 2.4, alpha: 0.9 },
  { hue: "77,163,255", freq: 2.1, speed: -0.82, amp: 0.72, width: 1.7, alpha: 0.75 },
  { hue: "140,196,255", freq: 3.05, speed: 1.15, amp: 0.5, width: 1.3, alpha: 0.6 },
  { hue: "30,123,255", freq: 4.4, speed: -1.5, amp: 0.34, width: 1.0, alpha: 0.45 },
  { hue: "180,215,255", freq: 6.2, speed: 2.0, amp: 0.22, width: 0.8, alpha: 0.32 },
];

export function WaveProgress({
  progress,
  onFirstSweep,
  className,
}: {
  /** 0..1, updated externally each frame. */
  progress: React.RefObject<number>;
  /** Fired once, when the lead traveller has crossed the full width. */
  onFirstSweep?: () => void;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  // Held in a ref rather than listed as a dependency: the caller passes an
  // inline arrow, so depending on it would tear down and restart the canvas
  // loop on every render of the Preloader.
  const sweepCb = useRef(onFirstSweep);
  useEffect(() => {
    sweepCb.current = onFirstSweep;
  }, [onFirstSweep]);

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

    const start = performance.now();

    /**
     * The exact y of a wave at x — shared by the stroke and by the travellers,
     * so a traveller sits precisely on the curve it is riding rather than
     * near it.
     */
    const waveY = (i: number, x: number, t: number, p: number) => {
      const wave = WAVES[i];
      const lead = w * p;
      const ends = Math.pow(Math.sin((Math.PI * x) / w), 0.55);
      const energy = x <= lead ? 1 : Math.max(0, 1 - (x - lead) / 90);
      const gather = 0.4 + 0.6 * p;
      const amp = (h / 2) * 0.72 * wave.amp * ends * energy * gather;
      const phase = (x / w) * Math.PI * 2 * wave.freq + t * wave.speed * Math.PI;
      return h / 2 + Math.sin(phase) * amp;
    };

    type Traveller = {
      x: number;
      wave: number;
      speed: number;
      tail: number;
      size: number;
    };

    // Fresh parameters on every pass, so a crossing is never a repeat of the
    // one before it.
    const respawn = (tr: Traveller, atStart: boolean) => {
      tr.x = atStart ? -Math.random() * w * 0.8 : -30;
      tr.wave = Math.floor(Math.random() * WAVES.length);
      tr.speed = 0.22 + Math.random() * 0.5; // fraction of the width per second
      tr.tail = 14 + Math.floor(Math.random() * 22);
      tr.size = 1.6 + Math.random() * 1.6;
    };

    const travellers: Traveller[] = Array.from({ length: 4 }, () => {
      const tr = { x: 0, wave: 0, speed: 0, tail: 0, size: 0 };
      respawn(tr, true);
      return tr;
    });

    // The lead: pinned to the left edge and given a fixed pace, so the pass
    // the Preloader waits on takes a known ~2.4s rather than whatever a random
    // speed happened to produce.
    travellers[0].x = -30;
    travellers[0].speed = 0.5; // ~2s for the full pass
    travellers[0].wave = 0;
    let swept = false;

    let prevT = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const t = (now - start) / 1000;
      const p = Math.max(0, Math.min(1, progress.current ?? 0));

      ctx.clearRect(0, 0, w, h);
      if (w === 0) return;

      const mid = h / 2;
      const lead = w * p;
      // Step in pixels. Two is smooth enough at this size and a third of the
      // work of one.
      const step = 2;

      for (const wave of WAVES) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += step) {
          /**
           * Three envelopes multiply together:
           *   ends   — fades the wave into nothing at both edges, so it never
           *            terminates on a hard vertical cut;
           *   energy — full behind the leading edge, tapering to flat ahead of
           *            it, which is what makes the field read as filling;
           *   gather — the whole field grows as loading completes.
           */
          const ends = Math.pow(Math.sin((Math.PI * x) / w), 0.55);
          const energy = x <= lead ? 1 : Math.max(0, 1 - (x - lead) / 90);
          const gather = 0.4 + 0.6 * p;

          const amp = (h / 2) * 0.72 * wave.amp * ends * energy * gather;
          const phase = (x / w) * Math.PI * 2 * wave.freq + t * wave.speed * Math.PI;
          const y = mid + Math.sin(phase) * amp;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // The glow is the shadow of the stroke itself, so there is one path to
        // rasterise rather than a blurred copy underneath it.
        ctx.strokeStyle = `rgba(${wave.hue},${wave.alpha})`;
        ctx.lineWidth = wave.width;
        ctx.lineCap = "round";
        ctx.shadowColor = `rgba(${wave.hue},0.85)`;
        ctx.shadowBlur = 14;
        ctx.stroke();
      }

      // Travellers, drawn on top of the field.
      const dt = prevT ? Math.min(0.05, t - prevT) : 0;
      prevT = t;

      for (const tr of travellers) {
        tr.x += tr.speed * w * dt;
        if (tr.x > w + 40) {
          if (tr === travellers[0] && !swept) {
            swept = true;
            sweepCb.current?.();
          }
          respawn(tr, false);
        }

        // The tail is the same curve sampled backwards, so it lies along the
        // wave rather than trailing behind in a straight line.
        for (let k = tr.tail; k >= 0; k--) {
          const x = tr.x - k * 3.5;
          if (x < 0 || x > w) continue;
          const y = waveY(tr.wave, x, t, p);
          const fade = 1 - k / (tr.tail + 1);
          ctx.beginPath();
          ctx.arc(x, y, tr.size * (0.35 + 0.65 * fade), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190,224,255,${(0.5 * fade * fade).toFixed(3)})`;
          ctx.shadowColor = "rgba(77,163,255,0.9)";
          ctx.shadowBlur = 10 * fade;
          ctx.fill();
        }
      }

      // The leading edge: a bright head sitting exactly at the progress point,
      // so the number and the picture always agree.
      ctx.shadowBlur = 26;
      ctx.shadowColor = "rgba(140,196,255,0.95)";
      ctx.beginPath();
      ctx.arc(lead, mid, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(220,238,255,0.95)";
      ctx.fill();

      // A faint rule ahead of the head, so the remaining distance is legible.
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(lead, mid);
      ctx.lineTo(w, mid);
      ctx.strokeStyle = "rgba(140,196,255,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [progress]);

  return <canvas ref={canvas} aria-hidden className={className} />;
}
