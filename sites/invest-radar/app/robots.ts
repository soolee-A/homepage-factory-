import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site.ts";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/status"] }], sitemap: `${SITE_URL}/sitemap.xml` };
}
