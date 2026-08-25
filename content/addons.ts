import type { IconName } from "@/lib/types";

/**
 * ADD-ONS — everything that can be bolted onto a website or web app build.
 *
 * Grouped the way a client thinks about them ("I need to take payments"), not
 * the way a developer does ("I need a webhook handler"). Named tools are the
 * ones that are actually pragmatic in this market rather than the ones that
 * sound most impressive — Razorpay over Stripe for Indian businesses because
 * onboarding and UPI support are far better, MSG91 for transactional SMS.
 *
 * Add or remove an item here and the Add-ons section updates.
 */
export interface AddOnGroup {
  id: string;
  title: string;
  icon: IconName;
  blurb: string;
  items: string[];
}

export const addOnGroups: AddOnGroup[] = [
  {
    id: "payments",
    title: "Payments & billing",
    icon: "ShoppingCart",
    blurb: "Take money online without the customer leaving your site.",
    items: [
      "Razorpay / Cashfree / PayU (UPI, cards, netbanking, wallets)",
      "Stripe or PayPal for international customers",
      "Subscriptions and recurring billing",
      "Payment links and one-off invoices",
      "GST-compliant invoices and receipts",
      "Refunds, settlements and reconciliation",
    ],
  },
  {
    id: "crm",
    title: "CRM & sales pipeline",
    icon: "Users",
    blurb: "Every enquiry lands in the system your team already works in.",
    items: [
      "HubSpot, Zoho CRM, Pipedrive or Salesforce",
      "Website and landing-page forms synced to the CRM",
      "WhatsApp and call enquiries pushed in as leads",
      "Lead scoring, owner assignment and routing rules",
      "Deal-stage automation and follow-up reminders",
    ],
  },
  {
    id: "cms",
    title: "CMS & content",
    icon: "Layers",
    blurb: "Edit the site yourself, without touching code or calling us.",
    items: [
      "Sanity, Payload or Strapi (headless, you own the data)",
      "WordPress as a headless backend if the team already knows it",
      "Blog, case studies, careers and landing pages",
      "Draft previews and scheduled publishing",
      "Multi-language content and regional variants",
      "Role-based editing for a wider team",
    ],
  },
  {
    id: "mobile",
    title: "Mobile app capabilities",
    icon: "Smartphone",
    blurb: "The things that separate a real app from a website in an app shell.",
    items: [
      "iOS and Android from one React Native codebase",
      "Push notifications (FCM / APNs) with audience segmentation",
      "Offline mode with background sync when the signal returns",
      "Biometric login — Face ID, Touch ID, fingerprint",
      "In-app purchases and subscriptions (App Store, Play Billing)",
      "Camera, GPS, maps, file uploads and document scanning",
      "Deep links and QR codes that open straight to a screen",
      "Crash reporting and release health monitoring",
      "App Store and Play Store submission, review and updates",
      "Over-the-air updates that skip the store review queue",
    ],
  },
  {
    id: "backend",
    title: "Backend & databases",
    icon: "Server",
    blurb: "The part that actually runs your business logic.",
    items: [
      "Custom APIs and business rules",
      "PostgreSQL, Supabase or MongoDB",
      "Admin dashboards and internal tools",
      "File and media storage with a CDN",
      "Full-text and faceted search",
      "Background jobs, queues and scheduled tasks",
      "Third-party API integrations of any kind",
    ],
  },
  {
    id: "auth",
    title: "Accounts & authentication",
    icon: "Lock",
    blurb: "Customer logins, staff logins, and who is allowed to see what.",
    items: [
      "Email and password, magic links or OTP",
      "Phone-number OTP login, which most Indian users prefer",
      "Google, Apple and Microsoft sign-in",
      "Roles and permissions for staff versus customers",
      "Customer portals: orders, bookings, documents",
      "Two-factor authentication and session management",
    ],
  },
  {
    id: "messaging",
    title: "Email, SMS & notifications",
    icon: "Mail",
    blurb: "The messages your system sends on its own.",
    items: [
      "Transactional email via Resend, Postmark or SES",
      "Transactional SMS and OTP via MSG91 or Twilio",
      "WhatsApp Business API notifications and templates",
      "Newsletters and campaigns via Brevo or Mailchimp",
      "Browser and mobile push notifications",
      "Deliverability setup: SPF, DKIM and DMARC",
    ],
  },
  {
    id: "commerce",
    title: "E-commerce",
    icon: "Boxes",
    blurb: "Selling products, with the operational side handled.",
    items: [
      "Product catalogue, variants and inventory",
      "Cart, checkout and order management",
      "Shipping rates and courier integration (Shiprocket, Delhivery)",
      "Coupons, offers and abandoned-cart recovery",
      "Returns, exchanges and refund flows",
    ],
  },
  {
    id: "booking",
    title: "Booking & scheduling",
    icon: "Clock",
    blurb: "For anything that runs on appointments.",
    items: [
      "Availability, slots and calendar sync",
      "Cal.com or Calendly embedded, or a custom booking engine",
      "Automated confirmations and reminders",
      "Rescheduling, cancellation and no-show handling",
      "Staff, room or resource allocation",
    ],
  },
  {
    id: "analytics",
    title: "Analytics & growth",
    icon: "BarChart3",
    blurb: "Knowing what is working, in terms you can act on.",
    items: [
      "GA4 and Google Tag Manager, configured properly",
      "Meta Pixel and Google Ads conversion tracking",
      "Server-side tracking that survives ad blockers",
      "Heatmaps and session recordings",
      "A/B testing and feature flags",
      "Custom dashboards for the numbers you actually check",
    ],
  },
  {
    id: "seo",
    title: "SEO & visibility",
    icon: "TrendingUp",
    blurb: "Being findable, not just present.",
    items: [
      "Technical SEO, schema markup and sitemaps",
      "Google Business Profile and local SEO",
      "Core Web Vitals tuning",
      "Multilingual SEO with hreflang",
      "Content structure and internal linking",
    ],
  },
  {
    id: "ai",
    title: "AI layers",
    icon: "BrainCircuit",
    blurb: "The intelligence bolted onto an existing build.",
    items: [
      "Site chat assistant trained on your own content",
      "AI voice agent on your business number",
      "AI-assisted search across products or documents",
      "Automated lead qualification and routing",
      "Drafting tools for your team, with human approval",
    ],
  },
  {
    id: "ops",
    title: "Infrastructure, security & compliance",
    icon: "ShieldCheck",
    blurb: "The unglamorous part that decides whether it stays up.",
    items: [
      "Domain, SSL, DNS and business email setup",
      "Staging environments and preview deployments",
      "Automated backups and one-click rollback",
      "Uptime monitoring and error tracking (Sentry)",
      "Bot protection, rate limiting and a WAF",
      "Cookie consent, privacy policy and DPDP/GDPR basics",
      "WCAG AA accessibility compliance",
    ],
  },
];
