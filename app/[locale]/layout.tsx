import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "../../i18n";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://wtoko.com";

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US", ko: "ko_KR", ja: "ja_JP",
  "zh-CN": "zh_CN", "zh-TW": "zh_TW",
  es: "es_ES", fr: "fr_FR", de: "de_DE",
  pt: "pt_BR", ru: "ru_RU", ar: "ar_SA",
  hi: "hi_IN", th: "th_TH", vi: "vi_VN",
  id: "id_ID", ms: "ms_MY", tl: "fil_PH",
  nl: "nl_NL", it: "it_IT", tr: "tr_TR",
  pl: "pl_PL", uk: "uk_UA", sv: "sv_SE",
  no: "nb_NO", da: "da_DK", mn: "mn_MN",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: locale as Locale, namespace: "seo" });

  // hreflang alternates for all 26 locales
  const languages: Record<string, string> = { "x-default": `${BASE_URL}/en` };
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}`;
  }

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      url: `${BASE_URL}/${locale}`,
      locale: OG_LOCALE_MAP[locale as Locale] ?? "en_US",
      siteName: "Wtoko",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const t = await getTranslations({ locale: locale as Locale, namespace: "seo" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wtoko",
    url: BASE_URL,
    inLanguage: locale,
    description: t("description"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does K-ETA cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The official K-ETA fee is ₩10,000 (approximately $7.50 USD). Beware of fake sites charging $50–$100.",
        },
      },
      {
        "@type": "Question",
        name: "Does Gimpo Airport have a curfew?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Gimpo Airport (GMP) is closed from 23:00 to 06:00 KST. Flights may be diverted to Incheon.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get from Incheon Airport to Seoul?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Take the AREX Express (43 min, ₩11,000) or the All-Stop train (59 min, ₩4,150) to Seoul Station.",
        },
      },
    ],
  };

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
