import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://koreaoso.com";

export const metadata: Metadata = {
  title: {
    default: "Korea OSO – Korea Arrival Guide 2026 | Incheon Airport, K-ETA, No Scams",
    template: "%s | Korea OSO Travel Guide"
  },
  description: "100% fact-based Korea arrival guide 2026. K-ETA official cost ₩10,000, Incheon Airport transport, curfew times, entry documents. No Scams, Just Facts.",
  keywords: ["South Korea Travel Guide 2026", "Incheon Airport Entry", "K-ETA official site", "Korea arrival checklist", "Gimpo airport curfew", "Jeju Airport", "Cheongju Airport", "Korea OSO"],
  authors: [{ name: "Korea OSO Team" }],
  creator: "Korea OSO",
  publisher: "Korea OSO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Korea OSO – Korea Arrival Survival Kit 2026",
    description: "No Scams, Just Facts. Complete Korea entry guide — K-ETA, airports, transport for 2026.",
    type: "website",
    url: "/",
    locale: "en_US",
    siteName: "Korea OSO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Korea OSO – Korea Arrival Survival Kit 2026",
    description: "No Scams, Just Facts. Complete Korea entry guide — K-ETA, airports, transport for 2026.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Korea OSO",
    url: BASE_URL,
    inLanguage: "en",
    description: "100% fact-based Korea arrival guide 2026.",
    publisher: {
      "@type": "Organization",
      "name": "Korea OSO",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    potentialAction: {
      "@type": "SearchAction",
      "target": `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
