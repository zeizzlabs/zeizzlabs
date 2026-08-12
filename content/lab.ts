import type { Experiment } from "@/lib/types";

/**
 * THE LAB — things ZeizzLabs is actively building or experimenting with.
 * These are honest placeholders you can swap for real experiments. Status +
 * progress drive the card visuals. Keep them truthful (no fake "live" claims).
 */
export const experiments: Experiment[] = [
  {
    id: "agent-mesh",
    name: "Agent Mesh",
    kind: "AI System",
    concept:
      "A framework for wiring multiple AI agents into one coordinated workflow with shared memory.",
    status: "in-development",
    progress: 62,
    tech: ["TypeScript", "LLM", "Vector DB"],
    icon: "BrainCircuit",
  },
  {
    id: "flowforge",
    name: "FlowForge",
    kind: "Automation",
    concept:
      "Visual builder that turns a described process into a running automation across your tools.",
    status: "experimental",
    progress: 34,
    tech: ["Node", "Webhooks", "Queues"],
    icon: "Workflow",
  },
  {
    id: "kit-os",
    name: "Kit OS",
    kind: "Micro Product",
    concept:
      "A component + token system that lets a new product go from idea to polished UI in a day.",
    status: "in-development",
    progress: 71,
    tech: ["React", "Tailwind", "Design tokens"],
    icon: "Layers",
  },
  {
    id: "pulse",
    name: "Pulse",
    kind: "Digital Tool",
    concept:
      "Lightweight analytics that instruments a product and surfaces what actually moves the needle.",
    status: "experimental",
    progress: 28,
    tech: ["Edge", "SQL", "Charts"],
    icon: "Activity",
  },
  {
    id: "notion-systems",
    name: "Notion Systems",
    kind: "Template",
    concept:
      "Opinionated Notion workspaces for studios and founders — operations that run themselves.",
    status: "live",
    progress: 100,
    tech: ["Notion", "Automation"],
    icon: "Package",
  },
  {
    id: "atlas",
    name: "Atlas",
    kind: "Concept",
    concept:
      "An internal knowledge layer that connects docs, code, and data into one queryable brain.",
    status: "coming-soon",
    progress: 12,
    tech: ["RAG", "Search", "Graph"],
    icon: "Boxes",
  },
];
