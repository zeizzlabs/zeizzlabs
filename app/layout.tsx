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
import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";
import { PageTransition } from "@/components/motion/PageTransition";

/**
 * Type system:
 *  - Sora        → display. Wide, geometric, slightly squared — the closest
 *                  well-supported web face to the ZeizzLabs wordmark.
 *  - Inter       → body. Neutral and highly legible at small sizes.
 *  - Poppins     → logotype fallback only, for if the wordmark artwork is
 *                  ever removed. Closest match to the real letterforms.
 *  - JetBrains   → mono. Eyebrows, tags and technical labels: the "lab" voice.
 */
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
/* Fallback only — the real wordmark artwork is used when present, so this is
   not preloaded. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  preload: false,
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
    images: [{ url: "/brand/og-image.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/brand/og-image.jpg"],
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
      image: `${site.url}/brand/og-image.jpg`,
      email: [site.email, site.emailAlt],
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
      data-theme="light"
      className={`${inter.variable} ${sora.variable} ${poppins.variable} ${jet.variable} h-full antialiased`}
    >
      <head>
        {/*
          Applied before first paint. Reading the stored theme in an effect
          would repaint the whole page one frame in, which is a visible flash on
          every single load. ?theme=light or ?theme=dark overrides the stored
          preference, which makes a theme shareable as a link and testable in a
          headless browser.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search).get("theme");var t=q||localStorage.getItem("zeizz.theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;if(q)localStorage.setItem("zeizz.theme",t);}}catch(e){}})();`,
          }}
        />
      </head>
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
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <PageTransition>
          <Navbar logo={<Logo size={58} priority revealOnScroll />} />
          <main id="main">{children}</main>
          <Footer />
        </PageTransition>
        <MobileActionBar />
        <BackToTop />
      </body>
    </html>
  );
}
