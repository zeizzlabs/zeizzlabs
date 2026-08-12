import type { Project } from "@/lib/types";

/**
 * WORK — case-study cards. Every entry is labelled honestly (concept /
 * prototype / experiment / live). NO fabricated clients, revenue, or
 * testimonials. `accent` picks two brand-spectrum stops for the card preview.
 */
export const projects: Project[] = [
  {
    slug: "helios-dashboard",
    name: "Helios",
    category: "Web App · Data",
    label: "prototype",
    summary:
      "An analytics dashboard concept that turns raw product events into a single decision view.",
    tech: ["Next.js", "Edge Functions", "SQL", "Charts"],
    outcome: "Prototype: sub-second queries over 1M synthetic events.",
    accent: ["#149bff", "#6c35ff"],
  },
  {
    slug: "aria-agent",
    name: "Aria",
    category: "AI · Agent",
    label: "experiment",
    summary:
      "A support agent that reads your docs and drafts grounded, cited answers for a human to send.",
    tech: ["LLM", "RAG", "Vector DB", "TypeScript"],
    outcome: "Experiment: retrieval-grounded drafts with source citations.",
    accent: ["#6c35ff", "#d52bff"],
  },
  {
    slug: "loom-automation",
    name: "Loom",
    category: "Automation · Ops",
    label: "concept",
    summary:
      "Describe a back-office process in plain language; Loom wires the integrations that run it.",
    tech: ["Node", "Webhooks", "Queues", "APIs"],
    outcome: "Concept: a described workflow compiled into runnable steps.",
    accent: ["#d52bff", "#ff7a18"],
  },
  {
    slug: "kit-os-studio",
    name: "Kit OS",
    category: "Design System · Product",
    label: "live",
    summary:
      "A component and token system that took our own products from idea to polished UI in a day.",
    tech: ["React", "Tailwind", "Tokens", "Storybook"],
    outcome: "Live: powers ZeizzLabs' own product interfaces.",
    accent: ["#149bff", "#ff7a18"],
  },
  {
    slug: "signal-site",
    name: "Signal",
    category: "Digital Experience · Web",
    label: "prototype",
    summary:
      "A cinematic marketing site framework with restrained motion and a lean performance budget.",
    tech: ["Next.js", "CSS Motion", "SVG", "A11y"],
    outcome: "Prototype: 100 Lighthouse accessibility on template pages.",
    accent: ["#6c35ff", "#149bff"],
  },
  {
    slug: "atlas-knowledge",
    name: "Atlas",
    category: "AI · Internal Platform",
    label: "concept",
    summary:
      "An internal brain that connects docs, code, and data into one queryable knowledge layer.",
    tech: ["RAG", "Search", "Graph", "Embeddings"],
    outcome: "Concept: unified retrieval across mixed internal sources.",
    accent: ["#d52bff", "#6c35ff"],
  },
];
