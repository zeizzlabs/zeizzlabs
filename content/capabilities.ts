import type { Capability } from "@/lib/types";

/**
 * The "What We Create" universe. These are examples of what's possible, NOT a
 * fixed service menu — the closing frontier card makes that explicit. Add a new
 * category here and it slots into the grid with zero component changes.
 */
export const capabilities: Capability[] = [
  {
    id: "digital-products",
    title: "Digital Products",
    blurb: "End-to-end products people actually use.",
    icon: "Layers",
    examples: ["Websites", "Web apps", "Mobile apps", "Software"],
  },
  {
    id: "ai-intelligence",
    title: "AI & Intelligence",
    blurb: "Systems that reason, decide, and act.",
    icon: "BrainCircuit",
    examples: ["AI agents", "Copilots", "RAG systems", "Model integration"],
  },
  {
    id: "automation",
    title: "Automation & Workflows",
    blurb: "Remove the manual work between tools.",
    icon: "Workflow",
    examples: ["Pipelines", "Integrations", "Internal ops", "Bots"],
  },
  {
    id: "design-brand",
    title: "Design & Branding",
    blurb: "Identity and interface, made coherent.",
    icon: "PenTool",
    examples: ["UI / UX", "Brand systems", "Design tokens", "Prototypes"],
  },
  {
    id: "digital-assets",
    title: "Digital Assets",
    blurb: "Reusable things that ship faster.",
    icon: "Package",
    examples: ["Templates", "Notion systems", "Component kits", "Resources"],
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    blurb: "Turn raw events into decisions.",
    icon: "BarChart3",
    examples: ["Dashboards", "Pipelines", "Instrumentation", "Reporting"],
  },
  {
    id: "cloud-infra",
    title: "Cloud & Infrastructure",
    blurb: "The systems behind the interface.",
    icon: "Server",
    examples: ["APIs", "Databases", "Deployment", "Edge & serverless"],
  },
  {
    id: "digital-experiences",
    title: "Digital Experiences",
    blurb: "Interfaces worth remembering.",
    icon: "Sparkles",
    examples: ["Interactive sites", "Tools", "Internal platforms", "Content systems"],
  },
  {
    id: "frontier",
    title: "And whatever comes next",
    blurb:
      "SaaS, plugins, browser extensions, games, 3D, developer tools — if it's digital, it's on the table.",
    icon: "Rocket",
    examples: [],
    isFrontier: true,
  },
];
