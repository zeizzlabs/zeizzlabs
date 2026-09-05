// GENERATED FILE — do not edit.
// Written by scripts/media-manifest.mjs before every dev and build run.

export const MEDIA_VIDEOS: ReadonlySet<string> = new Set([]);

const VERSIONS: Record<string, string> = {
  "/media/about-studio.jpg": "eqz8kg",
  "/media/contact-signal.jpg": "eqze1n",
  "/media/service-ai-intelligence.jpg": "eqzviy",
  "/media/service-automation-workflows.jpg": "er9r92",
  "/media/service-cloud-infrastructure.jpg": "er09gl",
  "/media/service-data-analytics.jpg": "er15dz",
  "/media/service-design-branding.jpg": "eqz3bh",
  "/media/service-digital-experiences.jpg": "eqzh0p",
  "/media/service-digital-products.jpg": "eqzhug",
  "/media/service-software-development.jpg": "eqyyxo",
  "/media/work-aria-agent.jpg": "eqzq4b",
  "/media/work-cafe-roastery-website.jpg": "lhh5u0",
  "/media/work-construction-estimation-platform.jpg": "jdtsww",
  "/media/work-dental-practice-website.jpg": "kcc1j4",
  "/media/work-digital-studio-website.jpg": "kcivix",
  "/media/work-engineering-workbooks.jpg": "lh52km",
  "/media/work-fashion-delivery-store.jpg": "jdtd0z",
  "/media/work-fast-food-ordering-website.jpg": "lhe2ag",
  "/media/work-helios-dashboard.jpg": "eqzsbf",
  "/media/work-hotel-website.jpg": "uv4znf",
  "/media/work-kawaii-little-worlds.jpg": "lh8s5j",
  "/media/work-mobile-store-website.jpg": "jdvjbt",
  "/media/work-property-advisory-website.jpg": "jdu3a6",
  "/media/work-property-agency-website.jpg": "jdqynv",
  "/media/work-property-consultancy-website.jpg": "kcdv04",
  "/media/work-property-developer-website.jpg": "lhexrg",
  "/media/work-restaurant-website.jpg": "lheksm",
  "/media/work-salon-spa-website.jpg": "lhdai7",
  "/media/work-tell-it-back.jpg": "lhcryr",
  "/media/work-the-application-kit.jpg": "lhcrvc",
  "/media/work-the-evidence-log.jpg": "lhdn3q",
  "/media/work-travel-booking-website.jpg": "lhen5m",
  "/media/work-voice-reception.jpg": "eqztxc",
  "/media/work-whatsapp-desk.jpg": "eqzc9c"
};

/**
 * Append a content stamp so a replaced file gets a new URL, defeating both the
 * Next image cache and the browser cache. Unknown paths pass through unchanged.
 */
export function mediaSrc(path: string): string {
  const clean = path.split("?")[0];
  const v = VERSIONS[clean];
  return v ? `${clean}?v=${v}` : path;
}
