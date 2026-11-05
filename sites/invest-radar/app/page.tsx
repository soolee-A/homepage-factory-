import Link from "next/link";
import { collectNews } from "@/lib/collector.ts";
import { summarizeSentiment, topEntities, topKeywords } from "@/lib/analyzer.ts";
import { getCoinTickers } from "@/lib/market.ts";
import { SECTIONS, TOPICS } from "@/lib/sources.ts";
import { formatKst } from "@/lib/format.ts";
import NewsList from "@/components/NewsList";
import SentimentGauge from "@/components/SentimentGauge";
import RankChips from "@/components/RankChips";
import CoinStrip from "@/components/CoinStrip";
import type { TopicId } from "@/lib/types.ts";

export const revalidate = 900;

export default async function Home() {
  const [{ articles, feeds, collectedAt }, { tickers }] = await Promise.all([collectNews(), getCoinTickers()]);
  const okFeeds = feeds.filter((f) => f.ok).length;
  const last24h = articles.filter((a) => Date.now() - Date.parse(a.publishedAt) < 864e5);

  return (
    <div className="space-y-6">
      <section className="card">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">오늘의 투자 레이더</h1>
            <p className="mt-1 text-sm text-muted">
              {formatKst(collectedAt)} 기준 · 기사 {articles.length.toLocaleString()}건 · 소스 {okFeeds}/{feeds.length} 정상 ·{" "}
              <Link href="/status" className="underline">수집 현황</Link>
            </p>
          </div>
          <CoinStrip tickers={tickers} />
        </div>
        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold">🔥 24시간 핫 키워드</p>
          <RankChips items={topKeywords(last24h, 15)} />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(TOPICS) as TopicId[]).map((t) => {
          const list = articles.filter((a) => a.topics.includes(t));
          return (
            <section key={t} className="card flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{TOPICS[t].emoji} {TOPICS[t].label}</h2>
                <Link href={`/invest/${t}`} className="text-sm font-semibold text-brand hover:underline">분석 보기 →</Link>
              </div>
              <div className="mt-3"><SentimentGauge s={summarizeSentiment(list)} /></div>
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold text-muted">많이 언급된 자산</p>
                <RankChips items={topEntities(list, t, 5)} />
              </div>
              <div className="mt-3 flex-1"><NewsList articles={list.slice(0, 5)} showTopics={false} compact /></div>
            </section>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(["world", "domestic"] as const).map((s) => (
          <section key={s} className="card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{SECTIONS[s].label} 주요 뉴스</h2>
              <Link href={`/news/${s}`} className="text-sm font-semibold text-brand hover:underline">더보기 →</Link>
            </div>
            <NewsList articles={articles.filter((a) => a.sections.includes(s)).slice(0, 8)} compact />
          </section>
        ))}
      </div>
    </div>
  );
}
