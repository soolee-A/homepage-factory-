import { unstable_cache } from "next/cache";
import { FEEDS, SECTION_RULES, TOPIC_RULES } from "./sources.ts";
import { decodeBody, parseFeed, safeUrl } from "./rss.ts";
import { normalizeTitle, scoreSentiment } from "./analyzer.ts";
import type { Article, CollectResult, FeedSource, FeedStatus, SectionId, TopicId } from "./types.ts";

export const NEWS_REVALIDATE_SEC = 900; // 15분
const FETCH_TIMEOUT_MS = 8000;
const MAX_ITEMS_PER_FEED = 40;
const MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000; // 3일
const USER_AGENT = "InvestRadarBot/1.0 (+news aggregator; RSS reader)";

/** FNV-1a 32bit — 링크 기반 안정적 ID */
function hashId(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

function classify(feed: FeedSource, title: string, snippet: string): { sections: SectionId[]; topics: TopicId[] } {
  const hay = `${title} ${snippet}`;
  const sections = new Set<SectionId>(feed.sections);
  const topics = new Set<TopicId>(feed.topics);

  for (const [topic, re] of Object.entries(TOPIC_RULES) as [TopicId, RegExp][]) {
    if (re.test(hay)) topics.add(topic);
  }
  // 아시아 태깅은 국제/경제 맥락 기사에 한정 (국내 기사 속 '엔화' 언급 등 오분류 방지)
  const asiaRule = SECTION_RULES.asia;
  if (asiaRule && (sections.has("world") || feed.lang === "en") && asiaRule.test(title)) {
    sections.add("asia");
  }
  return { sections: [...sections], topics: [...topics] };
}

async function fetchFeed(feed: FeedSource, now: number): Promise<{ status: FeedStatus; articles: Article[] }> {
  const started = Date.now();
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/rss+xml, application/xml, text/xml, */*" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: NEWS_REVALIDATE_SEC },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    const xml = decodeBody(bytes, res.headers.get("content-type"));
    const items = parseFeed(xml).slice(0, MAX_ITEMS_PER_FEED);

    const articles: Article[] = [];
    for (const it of items) {
      const link = safeUrl(it.link);
      if (!link) continue;
      const ts = it.pubDate ? Date.parse(it.pubDate) : NaN;
      const publishedMs = Number.isFinite(ts) ? Math.min(ts, now) : now;
      if (now - publishedMs > MAX_AGE_MS) continue;

      // Google News: "제목 - 언론사" → 제목/언론사 분리
      let title = it.title;
      let source = it.source || feed.name;
      if (feed.url.includes("news.google.com")) {
        const m = title.match(/^(.*)\s+-\s+([^-]{1,30})$/);
        if (m) {
          title = m[1];
          source = it.source || m[2];
        }
      }
      const snippet = (it.description ?? "").replace(title, "").trim().slice(0, 160);
      const { sections, topics } = classify(feed, title, snippet);

      articles.push({
        id: hashId(link),
        title,
        link,
        source,
        feedId: feed.id,
        publishedAt: new Date(publishedMs).toISOString(),
        snippet,
        lang: feed.lang,
        sections,
        topics,
        sentiment: scoreSentiment(title),
      });
    }
    return { status: { id: feed.id, name: feed.name, url: feed.url, ok: true, count: articles.length, ms: Date.now() - started }, articles };
  } catch (err) {
    const message =
      err instanceof DOMException && err.name === "TimeoutError"
        ? `timeout ${FETCH_TIMEOUT_MS}ms`
        : err instanceof Error
          ? err.message.slice(0, 120)
          : "unknown error";
    console.warn(`[collector] feed failed: ${feed.id} (${message})`);
    return { status: { id: feed.id, name: feed.name, url: feed.url, ok: false, count: 0, error: message, ms: Date.now() - started }, articles: [] };
  }
}

/** 제목 정규화 기준 중복 제거 + 분류 병합 */
function dedupe(articles: Article[]): Article[] {
  const byKey = new Map<string, Article>();
  for (const a of articles) {
    const key = normalizeTitle(a.title);
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, a);
      continue;
    }
    prev.sections = [...new Set([...prev.sections, ...a.sections])];
    prev.topics = [...new Set([...prev.topics, ...a.topics])];
    // 직접 RSS(언론사 원문 링크)를 Google News 리다이렉트 링크보다 우선
    if (prev.link.includes("news.google.com") && !a.link.includes("news.google.com")) {
      prev.link = a.link;
      prev.source = a.source;
    }
  }
  return [...byKey.values()].sort((x, y) => y.publishedAt.localeCompare(x.publishedAt));
}

async function collectUncached(): Promise<CollectResult> {
  const now = Date.now();
  const results = await Promise.all(FEEDS.map((f) => fetchFeed(f, now)));
  return {
    articles: dedupe(results.flatMap((r) => r.articles)),
    feeds: results.map((r) => r.status),
    collectedAt: new Date(now).toISOString(),
  };
}

export const collectNews = unstable_cache(collectUncached, ["collect-news-v1"], {
  revalidate: NEWS_REVALIDATE_SEC,
  tags: ["news"],
});

export async function getBySection(section: SectionId, limit = 60): Promise<{ articles: Article[]; collectedAt: string }> {
  const { articles, collectedAt } = await collectNews();
  return { articles: articles.filter((a) => a.sections.includes(section)).slice(0, limit), collectedAt };
}

export async function getByTopic(topic: TopicId, limit = 60): Promise<{ articles: Article[]; collectedAt: string }> {
  const { articles, collectedAt } = await collectNews();
  return { articles: articles.filter((a) => a.topics.includes(topic)).slice(0, limit), collectedAt };
}
