import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = [
  "en", "ko", "ja", "zh-CN", "zh-TW",
  "es", "fr", "de", "pt", "ru",
  "ar", "hi", "th", "vi", "id",
  "ms", "tl", "nl", "it", "tr",
  "pl", "uk", "sv", "no", "da", "mn"
] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  "zh-CN": "中文(简体)",
  "zh-TW": "中文(繁體)",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  ar: "العربية",
  hi: "हिन्दी",
  th: "ภาษาไทย",
  vi: "Tiếng Việt",
  id: "Indonesia",
  ms: "Melayu",
  tl: "Filipino",
  nl: "Nederlands",
  it: "Italiano",
  tr: "Türkçe",
  pl: "Polski",
  uk: "Українська",
  sv: "Svenska",
  no: "Norsk",
  da: "Dansk",
  mn: "Монгол",
};

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();
  const validLocale = locale as string;
  return {
    locale: validLocale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
