import type { Project } from "@/lib/types";

/**
 * WORK — the studio's own R&D shelf.
 *
 * Nothing here is a delivered client project, and the copy never implies one.
 * Each entry says what it is meant to become, what exists today, and what does
 * not — because a studio with no client case studies yet is better served by
 * being interesting and honest than by sounding established and vague.
 *
 * Replace these with real client work as it ships; the components read whatever
 * is in this array.
 */
export const projects: Project[] = [
  {
    slug: "voice-reception",
    name: "Vox",
    category: "AI Calling Agent · Voice",
    label: "in-development",
    summary:
      "A voice agent meant to answer the calls a small business misses — and to sound like a person while doing it.",
    vision:
      "A clinic, a salon or a workshop loses work every week to a phone nobody could reach. The caller does not leave a voicemail; they ring the next name on the list. Vox is our attempt at the smallest thing that fixes that: something that picks up on the first ring, knows the opening hours and the price list, and can put an appointment in the calendar without a human in the loop. The bar we set is not 'impressive for AI' — it is that the caller should not feel they were fobbed off.",
    building: [
      "Sub-second turn-taking, so it does not feel like a phone tree",
      "A knowledge layer fed from the business's own prices and policies",
      "Calendar booking with a real confirmation back to the caller",
      "Clean handoff to a human the moment it is out of its depth",
      "A transcript of every call, readable the next morning",
    ],
    approach:
      "Streaming speech in and out rather than record-then-respond, because latency is what makes these things feel robotic. The agent is deliberately narrow: it answers from a small, verified set of facts and refuses anything outside it, instead of improvising. Everything it schedules is written to the real calendar, not to a mock.",
    stage:
      "Working on a live number in the studio. Turn-taking and booking hold up in ordinary conversation; accents, background noise and people talking over it are where it still falls down.",
    next: [
      "Hardening against noisy environments and interruptions",
      "Multi-language handling for Hindi and English in one call",
      "A dashboard for reading calls and correcting mistakes",
    ],
    tech: ["Twilio", "Realtime Voice", "Calendar API", "Node"],
    accent: ["#1e7bff", "#4da3ff"],
    image: "/media/work-voice-reception.jpg",
  },
  {
    slug: "whatsapp-desk",
    name: "Relay",
    category: "Automation · Messaging",
    label: "prototype",
    summary:
      "One queue for every enquiry, wherever it arrives — and an answer before the person gets bored.",
    vision:
      "Enquiries turn up on WhatsApp, on Instagram, through the website form, and sometimes by SMS. They sit in four different inboxes owned by three different people, and the fastest of them is checked twice a day. Relay is the idea that all of it should land in one place, get an instant acknowledgement that is actually useful, and only involve a human when a human is needed.",
    building: [
      "A single queue fed by WhatsApp, web forms and social DMs",
      "Instant, context-aware first replies rather than an autoresponder",
      "Routing rules by topic, so the right person sees it",
      "Two-way CRM sync, so the record is never in only one place",
      "Escalation when a thread goes quiet or turns sour",
    ],
    approach:
      "Channel adapters normalise every message into one shape, so adding a channel later does not mean rewriting the logic. Replies are drafted against the business's own catalogue and policies and are deliberately short — the goal is to hold attention until a person arrives, not to fake a full conversation.",
    stage:
      "Prototype. WhatsApp and web-form intake work end to end with sub-five-second first replies. Instagram is not wired yet, and the routing rules are still hand-written rather than configurable.",
    next: [
      "Instagram and Messenger intake",
      "A rules editor, so routing does not need a developer",
      "Reporting on response time and drop-off",
    ],
    tech: ["WhatsApp Cloud API", "Queues", "Webhooks", "CRM sync"],
    accent: ["#4da3ff", "#dcb877"],
    image: "/media/work-whatsapp-desk.jpg",
  },
  {
    slug: "helios-dashboard",
    name: "Helios",
    category: "Web App · Analytics",
    label: "concept",
    summary:
      "An analytics view that answers business questions instead of showing charts.",
    vision:
      "Most small businesses have analytics installed and have never once acted on it, because the tools answer questions nobody asked. Helios starts from the other end: three or four questions an owner genuinely has — where did this month's enquiries come from, what is quietly getting worse, what should I do on Monday — and works backwards to the smallest interface that answers them.",
    building: [
      "A single decision view rather than a wall of charts",
      "Plain-language summaries of what changed and why it matters",
      "Source attribution that survives people arriving from WhatsApp",
      "Alerts on meaningful movement, not on noise",
    ],
    approach:
      "Events are collapsed into a handful of business-level facts at write time, so queries stay fast and the surface stays small. The design constraint is that every number on screen has to be one you could act on; anything that is merely interesting gets cut.",
    stage:
      "Concept with a working query layer. Sub-second aggregates over a million synthetic events; the interface is still wireframes and the plain-language summaries are hand-written, not generated.",
    next: [
      "Turning the wireframes into a real interface",
      "Generating the summaries from the underlying movement",
      "Testing it against a real business's data rather than synthetic",
    ],
    tech: ["Next.js", "Edge Functions", "SQL", "Charts"],
    accent: ["#dcb877", "#ecd3a0"],
    image: "/media/work-helios-dashboard.jpg",
  },
  {
    slug: "aria-agent",
    name: "Aria",
    category: "AI · Knowledge Agent",
    label: "research",
    summary:
      "An assistant that answers only from your documents, and shows its working.",
    vision:
      "General-purpose chatbots are confidently wrong about specific businesses, which is worse than useless when the answer is a price or a policy. Aria is a narrower bet: read only what you gave it, cite the passage it used, and say plainly when the documents do not cover the question. The interesting part is not the answering — it is the refusing.",
    building: [
      "Retrieval over the business's own documents and catalogue",
      "Answers with the source passage attached",
      "An explicit 'not covered' response instead of a guess",
      "A drafting mode where a human approves before anything is sent",
      "Embeddable on the site and inside WhatsApp",
    ],
    approach:
      "Retrieval first, generation second, and a hard rule that anything unsupported by a retrieved passage is not answered. We are more interested in the failure behaviour than the success rate: an assistant that is right 95% of the time and silently wrong the rest is not deployable for a business whose prices are on the line.",
    stage:
      "Research. Grounded, cited drafts work on a small document set. Retrieval quality falls off on long or badly structured documents, and it is not yet reliable enough to answer a customer without review.",
    next: [
      "Better chunking for long and poorly structured documents",
      "Measuring the refusal rate as carefully as the answer rate",
      "A review queue before anything reaches a customer",
    ],
    tech: ["LLM", "RAG", "Vector DB", "TypeScript"],
    accent: ["#a4b3c9", "#4da3ff"],
    image: "/media/work-aria-agent.jpg",
  },
];

/** Human-readable stage labels. Title case — these are shown as-is. */
export const workLabels: Record<Project["label"], string> = {
  concept: "Concept",
  "in-development": "In development",
  prototype: "Prototype",
  research: "Research",
};
