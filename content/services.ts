import type { Service } from "@/lib/types";

/**
 * THE EIGHT PILLARS — taken verbatim from the ZeizzLabs brand banner.
 * Order matters: it drives the bento grid rhythm. `span` shapes the tile.
 */
export const services: Service[] = [
  {
    id: "software-development",
    title: "Software & Development",
    short: "Software & Development",
    icon: "Code2",
    blurb:
      "Websites, web apps and mobile apps engineered to be fast, secure and built to last.",
    deliverables: [
      "Business websites",
      "Web applications",
      "Mobile apps",
      "E-commerce",
      "APIs & backends",
    ],
    span: "hero",
    accent: "blue",
  },
  {
    id: "ai-intelligence",
    title: "AI & Intelligence",
    short: "AI & Intelligence",
    icon: "BrainCircuit",
    blurb:
      "AI agents, AI calling agents and assistants that actually work inside your business.",
    deliverables: [
      "AI calling agents",
      "Custom AI agents",
      "Chat assistants",
      "RAG on your data",
      "LLM integrations",
    ],
    span: "wide",
    accent: "gold",
  },
  {
    id: "automation-workflows",
    title: "Automation & Workflows",
    short: "Automation & Workflows",
    icon: "Workflow",
    blurb: "Remove the manual work sitting between your tools and your team.",
    deliverables: [
      "WhatsApp automation",
      "CRM & lead flows",
      "Integrations",
      "Internal tools",
      "Lead routing",
    ],
    span: "wide",
    accent: "blue",
  },
  {
    id: "design-branding",
    title: "Design & Branding",
    short: "Design & Branding",
    icon: "PenTool",
    blurb: "Logos, identity and interfaces that make a business look worth trusting.",
    deliverables: [
      "Logo design",
      "Brand identity",
      "UI / UX design",
      "Design systems",
      "Social kits",
    ],
    accent: "gold",
  },
  {
    id: "digital-products",
    title: "Digital Products",
    short: "Digital Products",
    icon: "Boxes",
    blurb: "Your idea, taken from a sentence to a shipped, usable product.",
    deliverables: ["SaaS platforms", "MVPs", "Dashboards", "Portals", "Micro-tools"],
    accent: "steel",
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    short: "Cloud & Infrastructure",
    icon: "Cloud",
    blurb: "Hosting, domains, pipelines and uptime — handled, so you never think about it.",
    deliverables: ["Cloud hosting", "CI/CD", "Domains & email", "Security", "Monitoring"],
    accent: "blue",
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    short: "Data & Analytics",
    icon: "BarChart3",
    blurb: "Know what's actually working — dashboards and tracking you can act on.",
    deliverables: [
      "Analytics setup",
      "Dashboards",
      "Reporting",
      "Data pipelines",
      "Conversion tracking",
    ],
    span: "wide",
    accent: "steel",
  },
  {
    id: "digital-experiences",
    title: "Digital Experiences",
    short: "Digital Experiences",
    icon: "Rocket",
    blurb:
      "Motion, 3D and interaction design that makes people stop scrolling and remember you.",
    deliverables: ["Immersive sites", "Animation", "3D & WebGL", "Interactive campaigns"],
    span: "wide",
    accent: "gold",
  },
];

/** Marquee strip — the vocabulary of the studio. */
export const marqueeWords = [
  "Websites",
  "Web Apps",
  "Mobile Apps",
  "AI Agents",
  "AI Calling Agents",
  "WhatsApp Automation",
  "Logo Design",
  "Brand Identity",
  "UI / UX",
  "E-commerce",
  "Dashboards",
  "SaaS MVPs",
  "Cloud Hosting",
  "Integrations",
  "Analytics",
  "Motion & 3D",
];

/** Tech we build on — shown as a second, reversed marquee. */
export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Tailwind",
  "PostgreSQL",
  "Supabase",
  "OpenAI",
  "Anthropic",
  "Twilio",
  "WhatsApp Cloud API",
  "Stripe",
  "Razorpay",
  "Vercel",
  "AWS",
  "Figma",
  "n8n",
];
