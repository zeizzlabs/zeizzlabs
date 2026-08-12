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
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const fieldCls =
  "w-full rounded-xl border border-line-strong bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-white/30 focus:bg-white/[0.04]";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const errCls = "mt-1 text-xs text-[#ff6b6b]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { budget: "Not sure yet", timeline: "Flexible" },
  });

  async function onSubmit(data: ContactInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-line-strong bg-surface/60 p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full [background:var(--gradient-brand-135)] text-white">
          <Icon name="Check" className="h-7 w-7" strokeWidth={2.2} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
          Message received.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks for reaching out. We&apos;ll get back to you shortly to figure
          out what to build.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-lg border border-line-strong bg-surface/60 p-6 sm:p-8"
    >
      {/* Honeypot — visually hidden, not tab-reachable */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input id="name" className={fieldCls} placeholder="Your name" {...register("name")} />
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={fieldCls}
            placeholder="you@company.com"
            {...register("email")}
          />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelCls}>
            Company / Brand <span className="text-faint">(optional)</span>
          </label>
          <input id="company" className={fieldCls} placeholder="ZeizzLabs" {...register("company")} />
        </div>
        <div>
          <label htmlFor="building" className={labelCls}>
            What are you building?
          </label>
          <input
            id="building"
            className={fieldCls}
            placeholder="An AI agent, a web app, an automation…"
            {...register("building")}
          />
          {errors.building && <p className={errCls}>{errors.building.message}</p>}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelCls}>
            Budget range
          </label>
          <select id="budget" className={cn(fieldCls, "appearance-none")} {...register("budget")}>
            {budgetOptions.map((o) => (
              <option key={o} value={o} className="bg-bg-900">
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelCls}>
            Timeline
          </label>
          <select id="timeline" className={cn(fieldCls, "appearance-none")} {...register("timeline")}>
            {timelineOptions.map((o) => (
              <option key={o} value={o} className="bg-bg-900">
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={cn(fieldCls, "resize-y")}
          placeholder="Tell us about the idea, the problem, or where you're stuck."
          {...register("message")}
        />
        {errors.message && <p className={errCls}>{errors.message.message}</p>}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" arrow disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Start a Project"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-[#ff6b6b]">
            Something went wrong. Email us at the address on the left instead.
          </p>
        )}
      </div>
    </form>
  );
}
