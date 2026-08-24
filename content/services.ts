import type { Service } from "@/lib/types";

/**
 * THE EIGHT PILLARS — taken verbatim from the ZeizzLabs brand banner.
 * Order matters: it drives the bento grid rhythm. `span` shapes the tile.
 */
export const services: Service[] = [
  {
    id: "software-development",
    image: "/media/service-software-development.jpg",
    title: "Software & Development",
    short: "Software & Development",
    icon: "Code2",
    blurb:
      "Websites, web apps and mobile apps engineered to be fast, secure and built to last.",
    overview:
      "We design and engineer the thing your business actually runs on — a site that sells, a web app that replaces a spreadsheet, a mobile app your customers keep. Everything is built on a modern stack, tested on real devices and tuned for the networks your customers are actually on, not office Wi-Fi.",
    outcomes: [
      "A fast, accessible product that ranks and converts",
      "Clean code and documentation you own outright",
      "A staging link from week one so you are never guessing",
    ],
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
    image: "/media/service-ai-intelligence.jpg",
    title: "AI & Intelligence",
    short: "AI & Intelligence",
    icon: "BrainCircuit",
    blurb:
      "AI agents, AI calling agents and assistants that actually work inside your business.",
    overview:
      "AI is only useful when it knows your business. We train agents on your prices, policies, catalogue and documents, then put them where your customers already are — on the phone, on WhatsApp, on your site. Every answer is grounded in your data, and anything the agent cannot handle is routed to a human.",
    outcomes: [
      "A voice agent that answers and books, around the clock",
      "A chat assistant that replies in seconds, not hours",
      "Full transcripts, so you see exactly what was said",
    ],
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
    image: "/media/service-automation-workflows.jpg",
    title: "Automation & Workflows",
    short: "Automation & Workflows",
    icon: "Workflow",
    blurb: "Remove the manual work sitting between your tools and your team.",
    overview:
      "Most small teams lose hours a week to copying things between tools. We map the actual process, then wire the integrations that run it — leads routed the moment they arrive, follow-ups sent without anyone remembering, records updated in both places at once.",
    outcomes: [
      "Hours returned to your team every week",
      "No lead sitting unanswered in an inbox",
      "One source of truth instead of four",
    ],
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
    image: "/media/service-design-branding.jpg",
    title: "Design & Branding",
    short: "Design & Branding",
    icon: "PenTool",
    blurb: "Logos, identity and interfaces that make a business look worth trusting.",
    overview:
      "A new business is judged on how it looks long before anyone reads a word. We build the identity — logo, colour, type, the whole system — and then the interfaces that carry it, so every touchpoint feels like it came from the same company.",
    outcomes: [
      "A logo and identity system in every format you need",
      "Brand guidelines your future suppliers can follow",
      "Interfaces designed before they are built",
    ],
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
    image: "/media/service-digital-products.jpg",
    title: "Digital Products",
    short: "Digital Products",
    icon: "Boxes",
    blurb: "Your idea, taken from a sentence to a shipped, usable product.",
    overview:
      "Taking an idea from a sentence to something people can use is a specific skill. We scope it honestly, cut it to what matters, design it properly and ship a first version fast enough to learn from — then keep going based on what real usage shows.",
    outcomes: [
      "A working product, not a pitch deck",
      "A scope that fits your budget honestly",
      "A roadmap based on evidence, not opinion",
    ],
    deliverables: ["SaaS platforms", "MVPs", "Dashboards", "Portals", "Micro-tools"],
    accent: "steel",
  },
  {
    id: "cloud-infrastructure",
    image: "/media/service-cloud-infrastructure.jpg",
    title: "Cloud & Infrastructure",
    short: "Cloud & Infrastructure",
    icon: "Cloud",
    blurb: "Hosting, domains, pipelines and uptime — handled, so you never think about it.",
    overview:
      "The part nobody sees until it breaks. We set up hosting, domains, email, deploy pipelines, backups and monitoring, all in accounts that belong to you — so the site stays fast, stays up, and stays yours.",
    outcomes: [
      "Everything in your name, no lock-in",
      "Automatic deploys and rollbacks",
      "Monitoring that tells us before it tells you",
    ],
    deliverables: ["Cloud hosting", "CI/CD", "Domains & email", "Security", "Monitoring"],
    accent: "blue",
  },
  {
    id: "data-analytics",
    image: "/media/service-data-analytics.jpg",
    title: "Data & Analytics",
    short: "Data & Analytics",
    icon: "BarChart3",
    blurb: "Know what's actually working — dashboards and tracking you can act on.",
    overview:
      "You cannot improve what you cannot see. We set up tracking that answers real questions — where people come from, where they drop off, what actually turns into an enquiry — and put it in a dashboard you will genuinely look at.",
    outcomes: [
      "Tracking that answers business questions",
      "A dashboard in plain language",
      "Monthly reporting on what changed and why",
    ],
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
    image: "/media/service-digital-experiences.jpg",
    title: "Digital Experiences",
    short: "Digital Experiences",
    icon: "Rocket",
    blurb:
      "Motion, 3D and interaction design that makes people stop scrolling and remember you.",
    overview:
      "When a category is crowded, being memorable is the strategy. Motion, 3D and interaction design turn a page people skim into something they finish — used deliberately, and never at the cost of speed or accessibility.",
    outcomes: [
      "Work people remember and share",
      "Motion that guides attention, not decoration",
      "Accessible and fast, or we do not ship it",
    ],
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
