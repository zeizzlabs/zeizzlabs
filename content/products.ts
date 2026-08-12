import type { Product, ProcessStep, SystemNode } from "@/lib/types";

/**
 * BUILT BY ZEIZZLABS — the product ecosystem. A store, not a service list.
 * Templates, tools, software, AI products, assets, micro-SaaS. Extend freely.
 */
export const products: Product[] = [
  {
    id: "kit-os",
    name: "Kit OS",
    type: "Design System",
    status: "live",
    description:
      "A component + token kit that turns ideas into polished, consistent product UI fast.",
    icon: "Layers",
  },
  {
    id: "studio-notion",
    name: "Studio OS",
    type: "Notion System",
    status: "live",
    description:
      "An opinionated Notion workspace that runs a small studio's operations end to end.",
    icon: "Package",
  },
  {
    id: "flowforge",
    name: "FlowForge",
    type: "Automation Tool",
    status: "in-development",
    description:
      "Turn a described process into a running automation across the tools you already use.",
    icon: "Workflow",
  },
  {
    id: "agent-mesh",
    name: "Agent Mesh",
    type: "AI Framework",
    status: "in-development",
    description:
      "Wire multiple AI agents into one coordinated system with shared memory and tools.",
    icon: "BrainCircuit",
  },
  {
    id: "pulse",
    name: "Pulse",
    type: "Analytics",
    status: "experimental",
    description:
      "Lightweight product analytics that surfaces what actually moves the metric.",
    icon: "Activity",
  },
  {
    id: "atlas",
    name: "Atlas",
    type: "Knowledge Platform",
    status: "coming-soon",
    description:
      "One queryable brain across your docs, code, and data. Early access soon.",
    icon: "Boxes",
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
