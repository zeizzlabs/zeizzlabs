"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * A simulated AI-calling-agent conversation.
 *
 * This is an illustration of the product, not a live call — the script below is
 * fixed. It plays once when scrolled into view, types line by line, and can be
 * replayed. Reduced-motion users get the full transcript immediately.
 */
const script: { who: "caller" | "agent"; text: string }[] = [
  { who: "caller", text: "Hi, do you have anything free this Saturday?" },
  { who: "agent", text: "We do — 11:30am or 4:00pm. Which suits you better?" },
  { who: "caller", text: "11:30 works." },
  { who: "agent", text: "Booked. I've texted you the confirmation. Anything else?" },
];

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full bg-gradient-to-t from-blue-600 to-gold-300 transition-opacity duration-300",
            active ? "wave-bar opacity-100" : "opacity-25"
          )}
          style={{
            height: `${18 + ((i * 7) % 14)}px`,
            ["--i" as string]: i % 8,
            animationPlayState: active ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}

export function CallDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  const start = () => {
    setDone(false);
    setTyped("");
    setStep(0);
  };

  // Kick off once the card is in view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setStep(script.length);
        setDone(true);
      });
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          setTimeout(start, 400);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Type the current line, then advance.
  useEffect(() => {
    if (step < 0 || step >= script.length) {
      if (step >= script.length) {
        const id = requestAnimationFrame(() => setDone(true));
        return () => cancelAnimationFrame(id);
      }
      return;
    }
    const full = script[step].text;
    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(typer);
        setTimeout(() => {
          setTyped("");
          setStep((s) => s + 1);
        }, 900);
      }
    }, 28);
    return () => clearInterval(typer);
  }, [step]);

  const speaking = step >= 0 && step < script.length && script[step].who === "agent";

  return (
    <div
      ref={ref}
      className="conic-ring plate relative overflow-hidden rounded-xl2 p-5 sm:p-7"
    >
      {/* Call header */}
      <div className="relative flex items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300">
            <span className="absolute inset-0 rounded-full border border-blue-500/40 animate-ring" />
            <Icon name="PhoneCall" className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <div>
            <p className="text-sm font-medium text-ink">ZeizzLabs Voice Agent</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-status-live">
              {done ? "Call complete" : "On a call"}
            </p>
          </div>
        </div>
        <Waveform active={speaking} />
      </div>

      {/* Transcript */}
      <div className="relative mt-5 min-h-[15rem] space-y-3 sm:min-h-[14rem]">
        {script.map((line, i) => {
          const shown = i < step || (i === step && typed.length > 0) || done;
          if (!shown) return null;
          const text = done || i < step ? line.text : typed;
          const isAgent = line.who === "agent";
          return (
            <div
              key={i}
              className={cn("flex", isAgent ? "justify-start" : "justify-end")}
              style={{ animation: "none" }}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed transition-all duration-300",
                  isAgent
                    ? "rounded-tl-sm border border-blue-500/25 bg-blue-500/[0.09] text-ink"
                    : "rounded-tr-sm border border-line bg-white/[0.03] text-steel-300"
                )}
              >
                <span className={cn(i === step && !done && "caret")}>{text}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outcome + replay */}
      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <div className="flex flex-wrap items-center gap-2">
          {["Slot booked", "SMS sent", "CRM updated"].map((t) => (
            <span
              key={t}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] transition-all duration-500",
                done
                  ? "border-status-live/40 bg-status-live/10 text-status-live"
                  : "border-line text-faint"
              )}
            >
              <Icon name="Check" className="h-3 w-3" strokeWidth={2.4} />
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={start}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-[12.5px] text-muted transition-colors hover:text-ink"
        >
          <Icon name="Activity" className="h-3.5 w-3.5" />
          Replay
        </button>
      </div>

      <p className="relative mt-3 text-[11px] text-faint">
        Illustrative example of a booking call — not a live recording.
      </p>
    </div>
  );
}
