import { z } from "zod";

/** Shared client + server validation for the "Start a Project" inquiry. */
export const contactSchema = z.object({
  name: z.string().min(2, "Please tell us your name.").max(120),
  email: z.string().email("Enter a valid email address."),
  company: z.string().max(160).optional().or(z.literal("")),
  building: z
    .string()
    .min(3, "A few words on what you're building helps.")
    .max(200),
  budget: z.string().max(60).optional().or(z.literal("")),
  timeline: z.string().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Add a little more detail so we can help.")
    .max(4000),
  // Honeypot — must stay empty. Bots fill it; humans never see it.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const budgetOptions = [
  "Not sure yet",
  "< $2k",
  "$2k – $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
];

export const timelineOptions = [
  "Flexible",
  "ASAP",
  "1–4 weeks",
  "1–3 months",
  "3+ months",
];
