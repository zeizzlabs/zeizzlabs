import type { Offering, Tier, Stat, Faq } from "@/lib/types";

/**
 * PACKAGES — the concrete things a business can point at and say "that one".
 *
 * NOTE ON PRICES: the `price` / `from` values below are editable placeholders.
 * Set them to your real numbers (or delete the field — the UI hides the price
 * line when it's absent and shows "Custom quote" instead).
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
    from: "₹24,999",
    addOns: ["cms", "seo", "analytics", "messaging", "crm", "payments", "ops"],
  },
  {
    id: "ai-calling-agent",
    name: "AI Calling Agent",
    type: "Voice AI",
    icon: "PhoneCall",
    description:
      "A voice AI that answers and makes calls in your brand's voice — 24/7, never misses one.",
    points: ["Books appointments", "Qualifies leads", "Calls back missed enquiries", "Full call transcripts"],
    from: "₹19,999",
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
    from: "₹14,999",
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
    from: "₹9,999",
    addOns: ["cms", "seo"],
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    type: "Commerce",
    icon: "ShoppingCart",
    description: "An online store with payments, inventory and automated order flows.",
    points: ["Payments (UPI/cards)", "Inventory & orders", "Abandoned-cart flows", "Analytics"],
    from: "₹39,999",
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
    from: "₹29,999",
    addOns: ["ai", "backend", "auth", "messaging"],
  },
];

/**
 * ENGAGEMENT MODELS — how people work with ZeizzLabs. Three clear doors.
 * Prices are placeholders; edit or remove.
 */
export const tiers: Tier[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "Get online, properly.",
    price: "₹24,999",
    priceNote: "one-time",
    features: [
      "Up to 6 custom pages",
      "Mobile-first responsive build",
      "SEO, speed & analytics setup",
      "WhatsApp + enquiry form",
      "Domain, hosting & launch handled",
      "30 days post-launch support",
    ],
    cta: "Start with Launch",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "A website that also works for you.",
    price: "₹64,999",
    priceNote: "one-time",
    features: [
      "Everything in Launch",
      "Custom web app or store",
      "AI chat or calling agent",
      "WhatsApp & CRM automation",
      "Brand identity refresh",
      "90 days support & iteration",
    ],
    cta: "Start with Growth",
    featured: true,
  },
  {
    id: "partner",
    name: "Digital Partner",
    tagline: "We become your tech team.",
    price: "₹18,999",
    priceNote: "per month",
    features: [
      "Dedicated monthly build hours",
      "Ongoing features & improvements",
      "AI systems & automation upkeep",
      "Hosting, security & monitoring",
      "Monthly analytics reporting",
      "Priority WhatsApp support",
    ],
    cta: "Talk about a retainer",
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
    a: "It depends on scope, but you get a fixed quote before anything starts — no hourly surprises. The packages on this page are real starting points; most business websites and AI systems land in a predictable range, and we'll tell you honestly if your idea needs less than you think.",
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
