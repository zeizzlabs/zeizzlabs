import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Per-page metadata, built in one place.
 *
 * THE BUG THIS EXISTS TO PREVENT. Next.js merges metadata from the layout
 * down, and a page that sets only `title` and `description` inherits the
 * layout's `alternates.canonical` and its whole `openGraph` / `twitter`
 * objects verbatim. Every page on this site was therefore emitting
 * `<link rel="canonical" href="https://zeizzlabs.com">` — telling Google that
 * all forty-five pages are duplicates of the homepage — and sharing any of
 * them to WhatsApp or LinkedIn showed the homepage title and blurb.
 *
 * A page title alone does not fix that: Next does not derive `og:title` from
 * `title` once a parent has declared an `openGraph` object. Each page has to
 * state its own. So every page goes through this helper, and the canonical is
 * built from the same `path` the sitemap uses.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  /** The page's own title, without the brand suffix. */
  title: string;
  description: string;
  /** Route path, leading slash, no trailing slash. "/" for the homepage. */
  path: string;
  /** Page-specific share image. Falls back to the brand card. */
  image?: string;
  type?: "website" | "article";
}): Metadata {
  // Matches the layout's title template, so the shared card reads the same as
  // the browser tab rather than losing the brand.
  const full = `${title} — ${site.brandName}`;
  const url = `${site.url}${path === "/" ? "" : path}`;
  const img = image ?? "/brand/og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: site.brandName,
      title: full,
      description,
      images: [{ url: img, width: 1200, height: 630, alt: full }],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [img],
    },
  };
}
