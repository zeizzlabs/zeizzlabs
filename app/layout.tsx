import type { Metadata, Viewport } from "next";
import { Inter, Sora, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { faqs } from "@/content/offerings";
import { Navbar } from "@/components/layout/Navbar";
import { Logo } from "@/components/brand/Logo";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { Cursor } from "@/components/layout/Cursor";

/**
 * Type system:
 *  - Sora        → display. Wide, geometric, slightly squared — the closest
 *                  well-supported web face to the ZeizzLabs wordmark.
 *  - Inter       → body. Neutral and highly legible at small sizes.
 *  - Poppins     → logotype ONLY. Its geometric bowls and single-storey "a"
 *                  are the closest match to the real ZeizzLabs wordmark, so the
 *                  brand name is set in it wherever it appears as a logo.
 *  - JetBrains   → mono. Eyebrows, tags and technical labels: the "lab" voice.
 */
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});
const jet = JetBrains_Mono({
  variable: "--font-mono-jet",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${site.brandName} — ${site.positioning}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.brandName}` },
  description: site.description,
  applicationName: site.brandName,
  keywords: [
    "website development",
    "app development",
    "logo design",
    "brand building",
    "AI automation",
    "AI calling agent",
    "AI agents",
    "WhatsApp automation",
    "digital products",
    "cloud infrastructure",
    "data analytics",
    "digital experiences",
    "digital agency India",
    "ZeizzLabs",
  ],
  authors: [{ name: site.brandName }],
  creator: site.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.brandName,
    title,
    description: site.description,
    images: [
      { url: "/brand/zeizzlabs-logo.png", width: 1536, height: 1024, alt: title },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/brand/zeizzlabs-logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Never block zoom — pinch-zoom is an accessibility requirement.
  maximumScale: 5,
};

/** Organization + Service catalogue + FAQ, so search engines can read the offer. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#org`,
      name: site.brandName,
      url: site.url,
      description: site.description,
      slogan: site.tagline,
      logo: `${site.url}/brand/zeizzlabs-emblem.png`,
      image: `${site.url}/brand/zeizzlabs-logo.png`,
      email: site.email,
      telephone: site.phone,
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.short, description: s.blurb },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${poppins.variable} ${jet.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <Cursor />
        <Navbar logo={<Logo size={46} priority revealOnScroll />} />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <BackToTop />
      </body>
    </html>
  );
}
