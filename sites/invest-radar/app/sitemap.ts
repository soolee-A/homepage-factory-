import type { MetadataRoute } from "next";
import { SECTIONS, TOPICS } from "@/lib/sources.ts";
import { SITE_URL } from "@/lib/site.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
    ...Object.keys(TOPICS).map((t) => ({ url: `${SITE_URL}/invest/${t}`, lastModified: now, changeFrequency: "hourly" as const, priority: 0.9 })),
    ...Object.keys(SECTIONS).map((s) => ({ url: `${SITE_URL}/news/${s}`, lastModified: now, changeFrequency: "hourly" as const, priority: 0.7 })),
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
