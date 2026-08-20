import type { Capability } from "@/lib/types";

/**
 * "Services" — what ZeizzLabs does for a business. These are the broad
 * categories; concrete packaged offerings live in content/products.ts. The
 * closing frontier card keeps it open-ended. Add a category here and it slots
 * into the grid with zero component changes.
 */
export const capabilities: Capability[] = [
  {
    id: "web-development",
    title: "Website & Web App Development",
    blurb: "Fast, modern sites and web apps built to perform.",
    icon: "Code2",
    examples: ["Business websites", "Web apps", "Landing pages", "E-commerce"],
  },
  {
    id: "whatsapp",
    title: "WhatsApp Integration & Automation",
    blurb: "Meet customers where they already are.",
    icon: "MessageCircle",
    examples: ["WhatsApp API", "Auto-replies", "Broadcasts", "Chatbots"],
  },
  {
    id: "ai-agents",
    title: "AI Agents & Assistants",
    blurb: "AI that works inside your business.",
    icon: "BrainCircuit",
    examples: ["Custom AI agents", "Support bots", "RAG systems", "AI integrations"],
  },
  {
    id: "ai-calling",
    title: "AI Calling Agents",
    blurb: "Voice AI that talks to your customers, 24/7.",
    icon: "Phone",
    examples: ["Inbound calls", "Outbound calls", "Appointment booking", "Lead qualification"],
  },
  {
    id: "automation",
    title: "Business Automation",
    blurb: "Remove the manual work between your tools.",
    icon: "Workflow",
    examples: ["Workflow automation", "CRM automation", "Integrations", "Internal tools"],
  },
  {
    id: "custom-software",
    title: "Custom Software & Integrations",
    blurb: "Bespoke systems for how your business actually works.",
    icon: "Server",
    examples: ["APIs", "Dashboards", "SaaS", "Mobile apps"],
  },
  {
    id: "design-brand",
    title: "Design & Branding",
    blurb: "Identity and interfaces that build trust.",
    icon: "PenTool",
    examples: ["UI / UX", "Brand identity", "Design systems", "Prototypes"],
  },
  {
    id: "digital-growth",
    title: "Digital Growth",
    blurb: "Get found, get leads, and grow.",
    icon: "TrendingUp",
    examples: ["SEO", "Analytics", "Marketing automation", "Lead generation"],
  },
  {
    id: "frontier",
    title: "And whatever your business needs",
    blurb:
      "SaaS, plugins, integrations, dashboards, bots — if it's digital and it moves your business forward, we can build it.",
    icon: "Rocket",
    examples: [],
    isFrontier: true,
  },
];
