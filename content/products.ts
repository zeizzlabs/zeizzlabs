import type { Product, ProcessStep, SystemNode } from "@/lib/types";

/**
 * WHAT WE OFFER — productised service packages a business can start with.
 * `type` is shown as a small category tag on the card; `description` is the
 * pitch. These are offerings (things we do for you), not products we sell.
 * Extend freely.
 */
export const products: Product[] = [
  {
    id: "business-website",
    name: "Business Website & Web Apps",
    type: "Web",
    status: "live",
    description:
      "Fast, modern websites and web apps that turn visitors into customers — designed, built, and launched for you.",
    icon: "Code2",
  },
  {
    id: "whatsapp-automation",
    name: "WhatsApp Automation",
    type: "WhatsApp",
    status: "live",
    description:
      "Auto-replies, broadcasts, catalogues, and chatbots on the WhatsApp Business API — so no lead goes cold.",
    icon: "MessageCircle",
  },
  {
    id: "ai-calling-agent",
    name: "AI Calling Agent",
    type: "Voice AI",
    status: "live",
    description:
      "A voice AI that answers and makes calls — booking appointments and qualifying leads around the clock.",
    icon: "Phone",
  },
  {
    id: "custom-ai-agent",
    name: "Custom AI Agent",
    type: "AI",
    status: "live",
    description:
      "An AI assistant trained on your own data and docs to support customers and your team.",
    icon: "BrainCircuit",
  },
  {
    id: "business-automation",
    name: "Business Automation",
    type: "Automation",
    status: "live",
    description:
      "Connect your tools and remove the manual work between them — CRM, sheets, email, and more.",
    icon: "Workflow",
  },
  {
    id: "ecommerce-store",
    name: "E-commerce Store",
    type: "Commerce",
    status: "live",
    description:
      "An online store with payments, inventory, and automated order flows — ready to sell.",
    icon: "ShoppingCart",
  },
];

/** The seven-step ZeizzLabs process. */
export const processSteps: ProcessStep[] = [
  { no: "01", title: "Discover", body: "Understand the idea, the problem, and who it's for." },
  { no: "02", title: "Define", body: "Turn the idea into a clear, buildable digital direction." },
  { no: "03", title: "Design", body: "Create the experience and the system behind it." },
  { no: "04", title: "Build", body: "Develop the actual digital product, properly." },
  { no: "05", title: "Connect", body: "Integrate APIs, AI, automation, and databases." },
  { no: "06", title: "Launch", body: "Ship it — measured, accessible, and fast." },
  { no: "07", title: "Evolve", body: "Improve and expand it as it meets the real world." },
];

/** Nodes around the central "digital brain" in the AI + Automation section. */
export const systemNodes: SystemNode[] = [
  { id: "ai", label: "AI", icon: "Sparkles" },
  { id: "data", label: "Data", icon: "Database" },
  { id: "apis", label: "APIs", icon: "Plug" },
  { id: "automation", label: "Automation", icon: "Workflow" },
  { id: "apps", label: "Apps", icon: "AppWindow" },
  { id: "users", label: "Users", icon: "Users" },
];
