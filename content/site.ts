import type { NavItem, SiteConfig } from "@/lib/types";
import { services } from "./services";

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

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "zeizzlabs@gmail.com",
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

/**
 * Primary navigation. "Services" carries a mega-menu built straight from the
 * eight pillars, so adding a pillar updates the nav automatically.
 */
export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/#services",
    children: services.map((s) => ({
      label: s.short,
      href: `/#services`,
      desc: s.blurb,
      icon: s.icon,
    })),
  },
  { label: "How we work", href: "/#process" },
  { label: "AI Systems", href: "/#ai" },
  { label: "Packages", href: "/#packages" },
  { label: "FAQ", href: "/#faq" },
];
