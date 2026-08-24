import type { MetadataRoute } from "next";
import { site, nav } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/work";

/**
 * Every real route, built from the same content the pages render — so adding a
 * pillar or a project puts it in the sitemap automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  });

  return [
    page("/", 1),
    ...nav.filter((n) => n.href !== "/").map((n) => page(n.href, 0.8)),
    ...services.map((s) => page(`/services/${s.id}`, 0.7)),
    ...projects.map((p) => page(`/work/${p.slug}`, 0.6)),
  ];
}
