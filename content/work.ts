import type { Project } from "@/lib/types";

/**
 * WORK — capability demonstrations. Every card is labelled honestly
 * (concept / prototype / experiment / live). No invented clients, revenue or
 * testimonials. Replace these with real client projects as they ship; the
 * component reads whatever is in this array.
 */
export const projects: Project[] = [
  {
    slug: "voice-reception",
    name: "Vox",
    category: "AI Calling Agent · Voice",
    label: "prototype",
    summary:
      "A voice agent that answers a clinic's phone, books slots into the calendar and texts the confirmation.",
    tech: ["Twilio", "Realtime Voice", "Calendar API", "Node"],
    outcome: "Prototype: sub-second turn-taking on a live phone number.",
    accent: ["#1e7bff", "#4da3ff"],
    image: "/media/work-voice-reception.jpg",
  },
  {
    slug: "whatsapp-desk",
    name: "Relay",
    category: "Automation · WhatsApp",
    label: "prototype",
    summary:
      "Every enquiry from the site, Instagram and WhatsApp lands in one queue and gets an instant reply.",
    tech: ["WhatsApp Cloud API", "Queues", "CRM sync", "Webhooks"],
    outcome: "Prototype: first reply in under 5 seconds, any channel.",
    accent: ["#4da3ff", "#dcb877"],
    image: "/media/work-whatsapp-desk.jpg",
  },
  {
    slug: "helios-dashboard",
    name: "Helios",
    category: "Web App · Data",
    label: "prototype",
    summary:
      "An analytics dashboard that turns raw product events into a single decision view.",
    tech: ["Next.js", "Edge Functions", "SQL", "Charts"],
    outcome: "Prototype: sub-second queries over 1M synthetic events.",
    accent: ["#dcb877", "#ecd3a0"],
    image: "/media/work-helios-dashboard.jpg",
  },
  {
    slug: "aria-agent",
    name: "Aria",
    category: "AI · Knowledge Agent",
    label: "experiment",
    summary:
      "A support agent that reads your docs and drafts grounded, cited answers for a human to send.",
    tech: ["LLM", "RAG", "Vector DB", "TypeScript"],
    outcome: "Experiment: retrieval-grounded drafts with source citations.",
    accent: ["#a4b3c9", "#4da3ff"],
    image: "/media/work-aria-agent.jpg",
  },
];
