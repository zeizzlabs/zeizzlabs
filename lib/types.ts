/**
 * Shared domain types for the ZeizzLabs website.
 *
 * Everything the site renders comes from /content. Add an object to an array
 * there and it appears — no component edits. Types here are the contract.
 */

/** lucide-react icon name (resolved centrally in components/ui/Icon.tsx). */
export type IconName = string;

export interface NavItem {
  label: string;
  href: string;
  /** One-line descriptor shown beside the label in the overlay menu. */
  desc?: string;
}

/** One of the eight ZeizzLabs service pillars (from the brand banner). */
export interface Service {
  id: string;
  /** Line 1 of the pillar name, e.g. "Software &". */
  title: string;
  /** Short label used in nav/chips, e.g. "Software & Development". */
  short: string;
  icon: IconName;
  /** The promise, one sentence. */
  blurb: string;
  /** Concrete deliverables — rendered as chips. */
  deliverables: string[];
  /** Two or three sentences for the service's own page. */
  overview: string;
  /** What the client actually ends up with. */
  outcomes: string[];
  /** Artwork in /public/media. Replace the file to change the image. */
  image: string;
  /** Bento span, kept for any grid presentation of the pillars. */
  span?: "wide" | "tall" | "hero";
  /** Accent family for the tile's glow. */
  accent: "blue" | "gold" | "steel";
}

/** A packaged, buyable offering. */
export interface Offering {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: IconName;
  /** Bullet outcomes. */
  points: string[];
  /** Optional "from" price line, e.g. "from ₹24,999". */
  from?: string;
  featured?: boolean;
}

export interface ProcessStep {
  no: string;
  title: string;
  body: string;
  icon: IconName;
  /** What the client actually receives at the end of this step. */
  deliverable: string;
}

export interface Stat {
  value: number;
  /** Rendered after the animated number, e.g. "+", "%", "x". */
  suffix?: string;
  prefix?: string;
  label: string;
  /** Optional clarifier so no number is ever misread as a claim. */
  note?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Tier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

/**
 * Where a piece of work actually is. None of these mean "shipped for a client" —
 * this is the studio's own R&D shelf, and the labels say so plainly.
 */
export type WorkLabel = "concept" | "in-development" | "prototype" | "research";

export interface Project {
  slug: string;
  name: string;
  /** Short discipline line, e.g. "AI Calling Agent · Voice". */
  category: string;
  label: WorkLabel;
  /** One line: what it is meant to become. */
  summary: string;
  /** Why it should exist — the problem, in plain terms. */
  vision: string;
  /** What is being built, concretely. */
  building: string[];
  /** How it is being approached technically. */
  approach: string;
  /** Honest statement of what exists today versus what does not. */
  stage: string;
  /** What comes next, in order. */
  next: string[];
  tech: string[];
  /** Two brand stops for the card's preview gradient. */
  accent: [string, string];
  /** Artwork in /public/media. Replace the file to change the image. */
  image: string;
}

/** A node in the AI + automation system diagram. */
export interface SystemNode {
  id: string;
  label: string;
  icon: IconName;
}

export interface SiteConfig {
  brandName: string;
  positioning: string;
  /** The banner line: "Everything digital. Endless possibilities." */
  tagline: string;
  /** The logo sub-line: "Digital Creation & Innovation". */
  subline: string;
  description: string;
  email: string;
  phone: string;
  /** WhatsApp number, digits only with country code. */
  whatsappNumber: string;
  url: string;
  social: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    linkedin?: string;
    x?: string;
    github?: string;
  };
}
