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
      "Online stores",
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
    id: "social-media",
    title: "Social Media Management",
    short: "Social Media Management",
    icon: "Megaphone",
    blurb: "Turn a quiet account into the channel that makes the phone ring.",
    overview:
      "Most small-business accounts are not underperforming, they are unattended — three posts in a good month and a DM that goes unread for two days while the customer books somewhere else. We run the account as a sales channel with a job: every month starts from what the business needs to happen, and the content is reverse-engineered from that. Nothing is posted because the calendar said Tuesday.",
    outcomes: [
      "A profile a stranger understands in five seconds",
      "Enquiries that reach a human while they are still warm",
      "A monthly report saying what changes next, and why",
    ],
    deliverables: [
      "Content strategy",
      "Reels & carousels",
      "Copywriting",
      "Community management",
      "Google Business Profile",
    ],
    span: "wide",
    accent: "gold",
  },
  {
    id: "content-channels",
    title: "Content & Channel Management",
    short: "Content & Channel Management",
    icon: "Video",
    blurb: "YouTube and short-form, run on the two numbers that actually decide it.",
    overview:
      "Almost nobody fails on YouTube because the videos were bad. They fail because nobody clicked — a thumbnail that says nothing and forty seconds of throat-clearing before the point. We work click-through rate and retention: packaging first, then the first fifteen seconds, then everything else. Publish, read the retention curve, find the second people left, fix it in the next one.",
    outcomes: [
      "Titles and thumbnails people click without feeling tricked",
      "Viewers who stay past the first fifteen seconds",
      "A back catalogue that keeps earning views",
    ],
    deliverables: [
      "Channel strategy",
      "Thumbnails & packaging",
      "Scripting & hooks",
      "Retention editing",
      "Shorts funnel",
    ],
    accent: "blue",
  },
  {
    id: "seo-visibility",
    title: "SEO & Search Visibility",
    short: "SEO & Search Visibility",
    icon: "Search",
    blurb: "Be the result people find, in Google and in the AI answer.",
    overview:
      "Most small-business sites are invisible for reasons that have nothing to do with content — no structured data, a title tag that says 'Home', pages Google was never told about, and a mobile score that quietly costs them the ranking. We fix the technical foundation first, because writing more posts on a site search engines cannot read is spending money to stay where you are. Then the part that now matters as much: whether an AI assistant asked about your category can find and correctly quote you.",
    outcomes: [
      "Found for the searches that actually bring enquiries",
      "Correctly quoted when an AI is asked about your category",
      "Reporting that names the next change, not just the rank",
    ],
    deliverables: [
      "Technical SEO audit",
      "On-page & metadata",
      "Local SEO",
      "Structured data",
      "Core Web Vitals",
      "AI search visibility",
    ],
    span: "wide",
    accent: "steel",
  },
  {
    id: "notion-systems",
    title: "Notion & Internal Systems",
    short: "Notion & Internal Systems",
    icon: "LayoutGrid",
    blurb: "The internal system your team is still using three months later.",
    overview:
      "Most workspaces die the same way: built in a burst of enthusiasm, abandoned once keeping them current costs more than the thing they replaced. We build for the day the enthusiasm runs out — fewer databases with sharper relations, views that answer one question each, templates so an entry takes seconds, and nothing that depends on somebody remembering to tidy up.",
    outcomes: [
      "One place the answer actually lives",
      "A system still in use three months later",
      "Onboarding that does not need the founder's memory",
    ],
    deliverables: [
      "Workspace architecture",
      "Client & project systems",
      "SOPs and wiki",
      "Spreadsheet migration",
      "Notion templates",
    ],
    accent: "steel",
  },
  {
    id: "ai-calling-agents",
    title: "AI Calling Agents",
    short: "AI Calling Agents",
    icon: "PhoneCall",
    blurb: "Answer the calls you are currently losing.",
    overview:
      "A missed call is not a missed call — it is a customer ringing the next name on the list. We put a voice agent on a real number that knows your hours, your prices and your services, books into the calendar you already use, and hands cleanly to a human the moment the call goes beyond its brief. It handles Hindi and English, including switching mid-call.",
    outcomes: [
      "Every call answered, including the ones at 9pm",
      "Bookings that land in the calendar you already use",
      "A transcript and summary of every call",
    ],
    deliverables: [
      "Voice agent on a real number",
      "Calendar booking",
      "Human handoff",
      "Hindi & English",
      "Call transcripts",
    ],
    accent: "gold",
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    short: "AI Chatbots",
    icon: "Bot",
    blurb: "An assistant that answers from your business, or says it does not know.",
    overview:
      "A general chatbot is confidently wrong about your prices, and confidently wrong is worse than useless when a customer acts on it. We build assistants that read only what you gave them, refuse to invent a price or a delivery promise, and say plainly when your documents do not cover the question. Assembled from the same data your site renders, so it cannot drift out of date.",
    outcomes: [
      "Answers customers can act on without checking",
      "Fewer repeat questions reaching your staff",
      "A log of what your site is failing to explain",
    ],
    deliverables: [
      "Grounded answers",
      "Refuses rather than guesses",
      "Product search",
      "Lead capture",
      "Site or WhatsApp",
    ],
    accent: "blue",
  },
  {
    id: "whatsapp-integration",
    title: "WhatsApp Integration",
    short: "WhatsApp Integration",
    icon: "MessageSquare",
    blurb: "Meet customers where the sale actually closes.",
    overview:
      "In India the sale does not close on the website, it closes on WhatsApp. The trick is not adding a green button — it is making sure the message that arrives is a complete enquiry with the product, the date and the contact already in it, rather than the word 'price?', and that it lands somewhere it will be answered.",
    outcomes: [
      "Enquiries that arrive complete, on the first message",
      "Replies fast enough to hold attention",
      "A history that survives a staff change",
    ],
    deliverables: [
      "Structured handoff",
      "Catalogue & orders",
      "Order notifications",
      "Shared team inbox",
      "CRM sync",
    ],
    span: "wide",
    accent: "steel",
  },
  {
    id: "crm-sales",
    title: "CRM & Sales Systems",
    short: "CRM & Sales Systems",
    icon: "Users",
    blurb: "So a lead never depends on one person remembering.",
    overview:
      "The most expensive thing a small business loses is not a sale, it is the enquiry nobody followed up — sitting in a personal inbox or a WhatsApp thread until the customer bought elsewhere. We build a pipeline shaped like how you actually sell, fed by every channel at once, because a CRM your team will not use is worth nothing however good it is.",
    outcomes: [
      "No enquiry unanswered because someone was on leave",
      "A customer list the business owns, not an individual",
      "Honest visibility of where the pipeline leaks",
    ],
    deliverables: [
      "Pipeline design",
      "Every channel, one queue",
      "Routing & reminders",
      "Spreadsheet migration",
      "Permissions & audit",
    ],
    accent: "blue",
  },
  {
    id: "custom-tools",
    title: "Custom Tools & Calculators",
    short: "Custom Tools & Calculators",
    icon: "Calculator",
    blurb: "The thing your industry needs and no product sells.",
    overview:
      "Every trade has one calculation that decides the deal — the estimate, the instalment, the trade-in, the tax treatment — and it usually lives in one person's spreadsheet with a formula nobody else understands. We have built an estimator where every rate traces to a published Indian Standard, EMI and trade-in tools, and tax logic that handles the cases packaged software gets wrong.",
    outcomes: [
      "A number a customer can act on, and you can defend",
      "The calculation out of one head and into the business",
      "A tool competitors cannot simply buy",
    ],
    deliverables: [
      "Pricing & estimation",
      "EMI & finance",
      "Domain calculators",
      "Typeset PDF output",
      "Internal tools",
    ],
    accent: "gold",
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

/**
 * The pillar count, derived. It was written out as "eight" in five places and
 * was wrong in all of them the moment a pillar was added.
 */
export const servicesCount = services.length;

const WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
  "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
];
/** "Seventeen" for the headline; falls back to the numeral past twenty. */
export const servicesCountWord = WORDS[servicesCount] ?? String(servicesCount);

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
  "SEO",
  "Social Media",
  "YouTube Management",
  "Content Strategy",
  "Notion Systems",
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
