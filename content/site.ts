import type { NavItem, SiteConfig } from "@/lib/types";

/**
 * Global brand configuration for ZeizzLabs.
 *
 * Contact + social values prefer environment variables so real handles aren't
 * hard-committed; the fallbacks are safe brand defaults. Swap the placeholder
 * social URLs for the real profiles when available.
 */
export const site: SiteConfig = {
  brandName: "ZeizzLabs",
  positioning: "Digital Creation & Innovation",
  tagline: "Everything digital. Endless possibilities.",
  description:
    "ZeizzLabs creates digital products, software, AI systems, automation, experiences, assets, and everything in between.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@zeizzlabs.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zeizzlabs.com",
  // Only profiles with a real URL are shown (the footer filters out empties).
  // Fill these in directly, or set the matching NEXT_PUBLIC_*_URL env vars.
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    x: process.env.NEXT_PUBLIC_X_URL || "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  },
};

/** Primary navigation. Add/remove items freely. */
export const nav: NavItem[] = [
  { label: "What We Create", href: "/#create" },
  { label: "Labs", href: "/#lab" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
