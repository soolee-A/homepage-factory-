import { XMLParser } from "fast-xml-parser";

export interface RawItem {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  source?: string;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  cdataPropName: false,
  trimValues: true,
  processEntities: true,
  htmlEntities: true,
});

/** XML 선언/Content-Type 기반 인코딩 감지 (EUC-KR 피드 대응) */
export function detectEncoding(bytes: Uint8Array, contentType: string | null): string {
  const fromHeader = contentType?.match(/charset=([\w-]+)/i)?.[1];
  const head = new TextDecoder("ascii").decode(bytes.subarray(0, 200));
  const fromDecl = head.match(/encoding=["']([\w-]+)["']/i)?.[1];
  const enc = (fromDecl ?? fromHeader ?? "utf-8").toLowerCase();
  return enc === "ks_c_5601-1987" || enc === "cp949" ? "euc-kr" : enc;
}

export function decodeBody(bytes: Uint8Array, contentType: string | null): string {
  const enc = detectEncoding(bytes, contentType);
  try {
    return new TextDecoder(enc).decode(bytes);
  } catch (err) {
    if (err instanceof RangeError) return new TextDecoder("utf-8").decode(bytes);
    throw err;
  }
}

function text(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "object" && "#text" in (v as Record<string, unknown>)) {
    return String((v as Record<string, unknown>)["#text"] ?? "");
  }
  return "";
}

export function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** http(s) 링크만 허용 (javascript: 등 XSS 벡터 차단) */
export function safeUrl(raw: string): string | null {
  try {
    const u = new URL(raw.trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

function asArray<T>(v: T | T[] | undefined): T[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

/** RSS 2.0 + Atom 1.0 공통 파서 */
export function parseFeed(xml: string): RawItem[] {
  const doc = parser.parse(xml) as Record<string, any>;

  // RSS 2.0
  const rssItems = asArray(doc?.rss?.channel?.item ?? doc?.["rdf:RDF"]?.item);
  if (rssItems.length > 0) {
    return rssItems
      .map((it: Record<string, unknown>) => ({
        title: stripHtml(text(it.title)),
        link: text(it.link) || text((it.guid as unknown) ?? ""),
        pubDate: text(it.pubDate) || text(it["dc:date"]),
        description: stripHtml(text(it.description)),
        source: text(it.source),
      }))
      .filter((i) => i.title && i.link);
  }

  // Atom
  const entries = asArray(doc?.feed?.entry);
  return entries
    .map((e: Record<string, any>) => {
      const links = asArray(e.link) as Record<string, string>[];
      const alt = links.find((l) => !l["@_rel"] || l["@_rel"] === "alternate") ?? links[0];
      return {
        title: stripHtml(text(e.title)),
        link: alt?.["@_href"] ?? "",
        pubDate: text(e.published) || text(e.updated),
        description: stripHtml(text(e.summary) || text(e.content)),
      };
    })
    .filter((i) => i.title && i.link);
}
