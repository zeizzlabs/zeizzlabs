import type { NavItem, SiteConfig } from "@/lib/types";

/**
 * Global brand configuration.
 * Contact values prefer env vars; fallbacks are the real business defaults.
 * Social links render only when set (the footer filters empties).
 */
export const site: SiteConfig = {
  brandName: "ZeizzLabs",
  positioning: "Digital Creation & Innovation",
  tagline: "Everything digital. Endless possibilities.",
  subline: "Digital Creation & Innovation",
  description:
    "ZeizzLabs is a digital creation and innovation studio. Websites, apps and digital products, design and branding, AI agents and AI calling agents, automation, cloud, analytics and immersive digital experiences — everything a business needs to grow online.",

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "enquire@zeizzlabs.com",
  emailAlt: process.env.NEXT_PUBLIC_CONTACT_EMAIL_ALT || "zeizzlabs@gmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 70175 96468",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917017596468",

  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zeizzlabs.com",

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

/** Ready-to-use WhatsApp chat link with a prefilled message. */
export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hi ZeizzLabs — I'd like to discuss a project."
)}`;

export const telLink = `tel:${site.phone.replace(/[^\d+]/g, "")}`;
export const mailLink = `mailto:${site.email}`;
export const mailAltLink = `mailto:${site.emailAlt}`;

/**
 * Primary navigation — real routes, not in-page anchors. Each entry carries an
 * index and a one-line descriptor because the overlay menu renders them as an
 * editorial index rather than a list of links.
 */
export const nav: NavItem[] = [
  { label: "Home", href: "/", desc: "Everything digital" },
  { label: "Services", href: "/services", desc: "Eight pillars, one studio" },
  { label: "Work", href: "/work", desc: "What we've built" },
  { label: "Process", href: "/process", desc: "How a build runs" },
  { label: "Packages", href: "/packages", desc: "What we build, end to end" },
  { label: "About", href: "/about", desc: "Who you'd be working with" },
  { label: "Contact", href: "/contact", desc: "Start a project" },
];
