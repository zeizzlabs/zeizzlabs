import type { ProcessStep, SystemNode } from "@/lib/types";

/** How a ZeizzLabs project actually runs, end to end. */
export const processSteps: ProcessStep[] = [
  {
    no: "01",
    title: "Discover",
    icon: "Search",
    body: "A free call to understand the business, the goal and the people it's for. No jargon, no pitch deck.",
    deliverable: "Scope, timeline and a fixed quote",
  },
  {
    no: "02",
    title: "Design",
    icon: "PenTool",
    body: "We design the experience before a line of code — structure, screens, brand and the feeling it should leave.",
    deliverable: "Figma designs you approve",
  },
  {
    no: "03",
    title: "Build",
    icon: "Code2",
    body: "Engineered properly: fast, responsive, accessible and search-ready from day one.",
    deliverable: "A live staging link, updated daily",
  },
  {
    no: "04",
    title: "Connect",
    icon: "Plug",
    body: "AI, WhatsApp, payments, CRM, analytics — wired in so the system runs itself.",
    deliverable: "Integrations tested end to end",
  },
  {
    no: "05",
    title: "Launch",
    icon: "Rocket",
    body: "Domain, hosting, SEO, speed and tracking. We handle the whole launch, then hand you the keys.",
    deliverable: "Live site + a walkthrough recording",
  },
  {
    no: "06",
    title: "Evolve",
    icon: "TrendingUp",
    body: "We stay on. Monthly improvements based on what the data says real users are doing.",
    deliverable: "Ongoing support & reporting",
  },
];

/** Nodes orbiting the central intelligence core. */
export const systemNodes: SystemNode[] = [
  { id: "voice", label: "Voice", icon: "Phone" },
  { id: "whatsapp", label: "WhatsApp", icon: "MessageCircle" },
  { id: "data", label: "Your Data", icon: "Database" },
  { id: "crm", label: "CRM", icon: "Users" },
  { id: "apis", label: "APIs", icon: "Plug" },
  { id: "apps", label: "Apps", icon: "AppWindow" },
];
