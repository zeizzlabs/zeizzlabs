import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.brandName} — ${site.positioning}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.brandName}`,
  },
  description: site.description,
  applicationName: site.brandName,
  keywords: [
    "digital studio",
    "digital products",
    "AI systems",
    "AI agents",
    "automation",
    "web apps",
    "software development",
    "design and branding",
    "Notion systems",
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
    images: [{ url: "/brand/zeizzlabs-logo.png", width: 1536, height: 1024, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/brand/zeizzlabs-logo.png"],
  },
  // Favicons are generated from app/icon.png + app/apple-icon.png (file convention).
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.brandName,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
  logo: `${site.url}/brand/zeizzlabs-emblem.png`,
  email: site.email,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
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
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
