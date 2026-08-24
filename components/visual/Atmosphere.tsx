import { cn } from "@/lib/cn";

/**
 * The hero's moving background on devices that cannot afford the shader.
 *
 * Every layer animates `transform` and nothing else. The blurs are large but
 * static, so each layer is rasterised once and then moved by the compositor —
 * which is why this runs at full frame rate on a phone where a per-pixel fbm
 * shader does not. There is no JavaScript involved at all.
 *
 * Shown only where the shader is not: any device with a fine pointer hides it
 * in CSS (see .atmosphere in globals.css), so the rule matches the shader's own
 * pointer-based gate rather than a width breakpoint.
 */
export function Atmosphere({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "atmosphere pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className="animate-drift absolute -left-[30%] -top-[25%] h-[34rem] w-[34rem] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-blue-500) 40%, transparent), transparent 68%)",
          opacity: 0.5,
        }}
      />
      <div
        className="animate-drift-slow absolute -right-[26%] top-[18%] h-[28rem] w-[28rem] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-gold-400) 38%, transparent), transparent 70%)",
          opacity: 0.42,
        }}
      />
      <div
        className="animate-sway absolute left-[10%] top-[45%] h-[26rem] w-[30rem] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in oklab, var(--color-blue-300) 34%, transparent), transparent 72%)",
          opacity: 0.4,
        }}
      />
      {/* A slow sheen crossing the whole field, so the movement is readable
          even when the blobs happen to be near the edges. */}
      <div
        className="animate-sheen absolute -inset-x-1/2 top-0 h-full"
        style={{
          background:
            "linear-gradient(105deg, transparent 38%, color-mix(in oklab, var(--color-blue-400) 12%, transparent) 50%, transparent 62%)",
        }}
      />
    </div>
  );
}
