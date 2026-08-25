import type { Offering, Stat, Faq } from "@/lib/types";

/**
 * PACKAGES — the concrete things a business can point at and say "that one".
 *
 * Deliberately no prices. Scope varies enough that a number on the page either
 * undersells the work or scares off a project that was affordable; every
 * enquiry gets a fixed written quote instead.
 */
export const offerings: Offering[] = [
  {
    id: "business-website",
    name: "Business Website",
    type: "Web",
    icon: "Globe",
    description:
      "A fast, modern, mobile-first website that turns visitors into enquiries.",
    points: ["Custom design", "SEO + speed built in", "Contact & WhatsApp flows", "You own everything"],
    addOns: ["cms", "seo", "analytics", "messaging", "crm", "payments", "ops"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    type: "Apps",
    icon: "Smartphone",
    description:
      "An iOS and Android app built from one codebase — fast, native-feeling, and shipped to both stores.",
    points: [
      "iOS + Android from one build",
      "Works offline, syncs later",
      "Push notifications",
      "Store submission handled",
    ],
    addOns: ["mobile", "backend", "auth", "payments", "messaging", "analytics", "ai"],
  },
  {
    id: "ai-calling-agent",
    name: "AI Calling Agent",
    type: "Voice AI",
    icon: "PhoneCall",
    description:
      "A voice AI that answers and makes calls in your brand's voice — 24/7, never misses one.",
    points: ["Books appointments", "Qualifies leads", "Calls back missed enquiries", "Full call transcripts"],
    addOns: ["booking", "crm", "messaging", "analytics"],
    featured: true,
  },
  {
    id: "whatsapp-automation",
    name: "WhatsApp Automation",
    type: "Automation",
    icon: "MessageCircle",
    description:
      "Auto-replies, broadcasts, catalogues and chatbots on the WhatsApp Business API.",
    points: ["Instant replies 24/7", "Bulk broadcasts", "Catalogue & orders", "CRM sync"],
    addOns: ["crm", "messaging", "commerce", "ai"],
  },
  {
    id: "brand-identity",
    name: "Brand & Logo Identity",
    type: "Design",
    icon: "PenTool",
    description:
      "A logo and full identity system that makes a new business look established.",
    points: ["Logo + variants", "Colour & type system", "Social media kit", "Brand guidelines PDF"],
    addOns: ["cms", "seo"],
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    type: "Commerce",
    icon: "ShoppingCart",
    description: "An online store with payments, inventory and automated order flows.",
    points: ["Payments (UPI/cards)", "Inventory & orders", "Abandoned-cart flows", "Analytics"],
    addOns: ["commerce", "payments", "auth", "messaging", "analytics", "ops"],
  },
  {
    id: "custom-ai-agent",
    name: "Custom AI Agent",
    type: "AI",
    icon: "BrainCircuit",
    description:
      "An assistant trained on your own documents, products and policies.",
    points: ["Answers from your data", "Cited, grounded replies", "Site + WhatsApp embed", "Human handoff"],
    addOns: ["ai", "backend", "auth", "messaging"],
  },
];

/**
 * PROOF NUMBERS. Every value here must be true for your business — edit them.
 * `note` exists so a number is never mistaken for a claim it isn't making.
 */
export const stats: Stat[] = [
  { value: 8, label: "Service pillars", note: "One studio, end to end" },
  { value: 24, suffix: "/7", label: "AI agents on duty", note: "Voice & chat, always up" },
  { value: 90, suffix: "+", label: "Target Lighthouse score", note: "Speed is a feature" },
  { value: 48, suffix: "h", label: "Typical first response", note: "Usually much sooner" },
];

export const faqs: Faq[] = [
  {
    q: "What exactly does ZeizzLabs do?",
    a: "Everything on the digital side of a business — websites, web and mobile apps, logo and brand identity, AI agents and AI calling agents, WhatsApp and workflow automation, cloud hosting, analytics, and immersive digital experiences. If it lives on a screen or runs a process, we build it.",
  },
  {
    q: "How much does a project cost?",
    a: "We do not publish prices, because the honest answer depends on scope — the same brief can be a two-week build or a two-month one. Tell us what you are trying to do and you get a fixed written quote before anything starts, with no hourly surprises afterwards. If your project needs less than you think, we will say so rather than quote for the bigger version.",
  },
  {
    q: "How long does it take?",
    a: "A focused business website is typically 2–3 weeks from kickoff. AI agents and automation take 1–3 weeks depending on integrations. Larger products and stores run 4–10 weeks. You'll have a live staging link from week one, so you're never waiting in the dark.",
  },
  {
    q: "What is an AI calling agent, in plain English?",
    a: "A voice AI with your business's script and knowledge that picks up the phone. It answers questions, books appointments, qualifies leads and calls people back — in a natural voice, at any hour. Every call is transcribed, and anything it can't handle is routed to a human.",
  },
  {
    q: "Do you build mobile apps, or only websites?",
    a: "Both. We build iOS and Android apps from a single codebase, so you are not paying twice for the same app, and the two stay in step when you add features. They are real apps — offline support, push notifications, camera and location, biometric login — not a website wrapped in an app shell. We handle App Store and Play Store submission and the review process too, which is usually the part that catches people out.",
  },
  {
    q: "Do I own the website and the code?",
    a: "Yes. Completely. Domain, hosting account, code, designs and content are yours, in your accounts, from launch day. No lock-in and no hostage situations — you can take it anywhere.",
  },
  {
    q: "Will it work on phones?",
    a: "Mobile isn't an afterthought here — it's where we design first. Every build is tested across phones, tablets and desktops, and tuned for real-world networks, not just fast office Wi-Fi.",
  },
  {
    q: "Can you improve a site I already have?",
    a: "Often, yes. We'll audit what you have and tell you straight whether it's worth improving or rebuilding. If a redesign isn't the best use of your money right now, we'll say so.",
  },
  {
    q: "What happens after launch?",
    a: "You get a walkthrough recording, documentation, and a support window included with every package. After that you can keep us on a monthly retainer for improvements, or take it fully in-house — both are fine.",
  },
];
