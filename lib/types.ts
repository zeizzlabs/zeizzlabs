/**
 * Shared domain types for the ZeizzLabs website.
 *
 * These are the single source of truth for the shape of all content in
 * /content. The brand rule is that ZeizzLabs is NOT a fixed menu of services —
 * so every collection here is an open array you can extend without touching a
 * single component. Add a capability, a lab experiment, a product, a project:
 * push an object into the relevant array in /content and it renders.
 */

/** lucide-react icon name (resolved centrally in components/ui/Icon.tsx). */
export type IconName = string;

export interface NavItem {
  label: string;
  href: string;
}

/** A broad category of digital work in the "What We Create" universe. */
export interface Capability {
  id: string;
  title: string;
  /** One-line description of the category. */
  blurb: string;
  icon: IconName;
  /** Example concrete things inside this category (chips). */
  examples: string[];
  /** The final "AND WHATEVER COMES NEXT" card gets this flag. */
  isFrontier?: boolean;
}

export type ExperimentStatus =
  | "live"
  | "in-development"
  | "experimental"
  | "coming-soon";

/** A card inside THE LAB — things ZeizzLabs is building/experimenting with. */
export interface Experiment {
  id: string;
  name: string;
  /** Short kind, e.g. "AI System", "Automation", "Micro Product". */
  kind: string;
  concept: string;
  status: ExperimentStatus;
  /** 0–100. Rendered as a progress bar on hover/reveal. */
  progress: number;
  tech: string[];
  icon: IconName;
}

export type WorkLabel = "concept" | "prototype" | "experiment" | "live";

/** A case-study project card. Expandable portfolio — labelled honestly. */
export interface Project {
  slug: string;
  name: string;
  category: string;
  label: WorkLabel;
  summary: string;
  tech: string[];
  /** Honest outcome statement. Never a fabricated client metric. */
  outcome: string;
  /** Two brand-spectrum stops for the card's visual preview gradient. */
  accent: [string, string];
}

/** A ZeizzLabs-built digital product in the product ecosystem. */
export interface Product {
  id: string;
  name: string;
  type: string;
  status: ExperimentStatus;
  description: string;
  icon: IconName;
}

/** A step in the ZeizzLabs process. */
export interface ProcessStep {
  no: string;
  title: string;
  body: string;
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
  tagline: string;
  description: string;
  email: string;
  /** Canonical production URL (also used for metadata + sitemap). */
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
