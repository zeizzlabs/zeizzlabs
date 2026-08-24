"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  budgetOptions,
  timelineOptions,
  type ContactInput,
} from "@/lib/contact-schema";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const field =
  "w-full min-h-[48px] rounded-xl border border-line bg-raised px-4 py-3 text-[15px] text-ink " +
  "placeholder:text-faint transition-colors duration-200 " +
  "focus:border-blue-500/60 focus:bg-raised-strong focus:outline-none";

const labelCls = "mb-2 block text-[13px] font-medium text-steel-300";

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-red-400">
      <Icon name="X" className="h-3.5 w-3.5" strokeWidth={2.4} />
      {msg}
    </p>
  );
}

/**
 * Project enquiry form.
 *
 * Deliberately low-friction: only name, email and a message are required. The
 * qualifying fields (service, budget, timeline) are optional selects so nobody
 * bounces on a long form. Validation runs on blur, errors sit under their own
 * field, and the submit button reports its own state.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ContactInput) {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      reset();
    } catch (e) {
      setStatus("error");
      setServerError(
        e instanceof Error ? e.message : "Could not send. Please email us directly."
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="plate flex flex-col items-center rounded-xl2 p-10 text-center"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full border border-status-live/40 bg-status-live/10 text-status-live">
          <Icon name="Check" className="h-8 w-8" strokeWidth={2} />
        </span>
        <h3 className="h-card mt-6 text-2xl text-ink">Message received.</h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
          Thanks — we&apos;ll get back to you within one working day, usually much
          sooner. If it&apos;s urgent, WhatsApp is the fastest way to reach us.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-blue-400 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="plate rounded-xl2 p-6 sm:p-8">
      {/* Honeypot — visually and semantically hidden from humans. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Your name <span className="text-gold-400">*</span>
          </label>
          <input
            id="name"
            className={cn(field, errors.name && "border-red-500/60")}
            placeholder="Priya Sharma"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <Err msg={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email <span className="text-gold-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            className={cn(field, errors.email && "border-red-500/60")}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <Err msg={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            className={field}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="company" className={labelCls}>
            Business name
          </label>
          <input
            id="company"
            className={field}
            placeholder="Optional"
            autoComplete="organization"
            {...register("company")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelCls}>
            What do you need?
          </label>
          <select id="service" className={field} defaultValue="" {...register("service")}>
            <option value="">Not sure yet — help me decide</option>
            {services.map((s) => (
              <option key={s.id} value={s.short}>
                {s.short}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={labelCls}>
            Budget range
          </label>
          <select id="budget" className={field} defaultValue="" {...register("budget")}>
            <option value="">Select a range</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className={labelCls}>
            Timeline
          </label>
          <select id="timeline" className={field} defaultValue="" {...register("timeline")}>
            <option value="">Select a timeline</option>
            {timelineOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Tell us about the project <span className="text-gold-400">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            className={cn(field, "resize-y", errors.message && "border-red-500/60")}
            placeholder="What are you trying to achieve? Even a couple of sentences is enough to start."
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          <Err msg={errors.message?.message} />
        </div>
      </div>

      {serverError && (
        <p role="alert" className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13.5px] text-red-300">
          {serverError}
        </p>
      )}

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
          arrow={status !== "sending"}
          className="w-full sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-[12.5px] leading-relaxed text-faint">
          We reply within one working day.
          <br className="hidden sm:block" /> No spam, no sales sequences.
        </p>
      </div>
    </form>
  );
}
