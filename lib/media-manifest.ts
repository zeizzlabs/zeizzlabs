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
  "/media/work-construction-estimation-platform.jpg": "jdtsww",
  "/media/work-dental-practice-website.jpg": "kcc1j4",
  "/media/work-digital-studio-website.jpg": "kcivix",
  "/media/work-fashion-delivery-store.jpg": "jdtd0z",
  "/media/work-helios-dashboard.jpg": "eqzsbf",
  "/media/work-mobile-store-website.jpg": "jdvjbt",
  "/media/work-property-advisory-website.jpg": "jdu3a6",
  "/media/work-property-agency-website.jpg": "jdqynv",
  "/media/work-property-consultancy-website.jpg": "kcdv04",
  "/media/work-studied-systems.jpg": "kchfyj",
  "/media/work-template-library.jpg": "jb3swf",
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
