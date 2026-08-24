import { z } from "zod";

/** Shared client + server validation for the project enquiry form. */
export const contactSchema = z.object({
  name: z.string().min(2, "Please tell us your name.").max(120),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  /** Which of the eight pillars this is about. */
  service: z.string().max(80).optional().or(z.literal("")),
  budget: z.string().max(60).optional().or(z.literal("")),
  timeline: z.string().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "A couple of sentences helps us give you a useful answer.")
    .max(4000),
  /** Honeypot — must stay empty. Bots fill it; humans never see it. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const budgetOptions = [
  "Not sure yet",
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000+",
];

export const timelineOptions = [
  "As soon as possible",
  "In 2–4 weeks",
  "In 1–3 months",
  "Just exploring",
];
