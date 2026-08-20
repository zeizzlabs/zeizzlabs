import type { NavItem, SiteConfig } from "@/lib/types";

/**
 * Global brand configuration for ZeizzLabs.
 *
 * Contact values prefer environment variables so they aren't hard-committed;
 * the fallbacks are the real business defaults. Social URLs are only shown when
 * set (the footer filters out empties).
 */
export const site: SiteConfig = {
  brandName: "ZeizzLabs",
  positioning: "Digital Services & AI Automation",
  tagline: "We build the digital that grows your business.",
  description:
    "ZeizzLabs is a digital services studio. We build websites and web apps, WhatsApp and business automation, AI agents, and AI calling agents — everything a business needs to run and grow online.",

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "zeizzlabs@gmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 70175 96468",
  // Digits only (with country code) for wa.me / tel links.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917017596468",

  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zeizzlabs.com",

  // Only profiles with a real URL are shown. WhatsApp defaults to a wa.me link
  // built from the number above so it works out of the box.
  social: {
    whatsapp:
      process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/917017596468",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    x: process.env.NEXT_PUBLIC_X_URL || "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  },
};

/** Convenience: a ready-to-use WhatsApp chat link with a prefilled message. */
export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hi ZeizzLabs, I'd like to know more about your services."
)}`;

/** Primary navigation. Add/remove items freely. */
export const nav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "What We Offer", href: "/#offerings" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
