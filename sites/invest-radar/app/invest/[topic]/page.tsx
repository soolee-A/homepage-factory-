import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getByTopic } from "@/lib/collector.ts";
import { summarizeSentiment, topEntities, topKeywords } from "@/lib/analyzer.ts";
import { getAiBriefing } from "@/lib/ai.ts";
import { getCoinTickers } from "@/lib/market.ts";
import { TOPICS } from "@/lib/sources.ts";
import { formatKst } from "@/lib/format.ts";
import NewsList from "@/components/NewsList";
import SentimentGauge from "@/components/SentimentGauge";
import RankChips from "@/components/RankChips";
import AiBriefingCard from "@/components/AiBriefingCard";
import CoinTable from "@/components/CoinTable";
import DividendCalculator from "@/components/DividendCalculator";
import type { TopicId } from "@/lib/types.ts";

export const revalidate = 900;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(TOPICS).map((topic) => ({ topic }));
}

function isTopic(t: string): t is TopicId {
  return t in TOPICS;
}

const SEO: Record<TopicId, { title: string; desc: string }> = {
  dividend: { title: "배당주 투자 뉴스 · 배당 재투자 계산기", desc: "고배당주·배당 ETF·리츠 최신 뉴스와 AI 요약, 세후 배당 재투자 시뮬레이터" },
  "kr-stock": { title: "국내주식 뉴스 분석 · 코스피 코스닥 이슈", desc: "코스피·코스닥 수급, 실적, 밸류업 뉴스를 자동 수집하고 많이 언급된 종목을 집계" },
  crypto: { title: "코인 뉴스 · 비트코인 실시간 시세", desc: "비트코인·이더리움·알트코인 뉴스 AI 요약과 업비트 원화 시세" },
};

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  if (!isTopic(topic)) return {};
  return { title: SEO[topic].title, description: SEO[topic].desc, alternates: { canonical: `/invest/${topic}` } };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  if (!isTopic(topic)) notFound();

  const [{ articles, collectedAt }, ai, market] = await Promise.all([
    getByTopic(topic, 80),
    getAiBriefing(topic),
    topic === "crypto" ? getCoinTickers() : Promise.resolve(null),
  ]);
  const meta = TOPICS[topic];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{meta.emoji} {meta.label}</h1>
        <p className="mt-1 text-sm text-muted">{meta.description} · {formatKst(collectedAt)} 기준 {articles.length}건</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <AiBriefingCard result={ai} />
        <div className="space-y-4">
          <div className="card"><SentimentGauge s={summarizeSentiment(articles)} /></div>
          <div className="card">
            <p className="mb-3 text-sm font-semibold">많이 언급된 {topic === "crypto" ? "코인" : "종목·자산"}</p>
            <RankChips items={topEntities(articles, topic, 10)} />
          </div>
        </div>
      </div>

      {market && (
        <section className="card">
          <h2 className="mb-3 font-bold">📊 원화 시세</h2>
          <CoinTable tickers={market.tickers} />
        </section>
      )}

      {topic === "dividend" && <DividendCalculator />}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="card">
          <h2 className="font-bold">최신 뉴스</h2>
          <NewsList articles={articles} showTopics={false} />
        </section>
        <aside className="space-y-4">
          <div className="card">
            <p className="mb-3 text-sm font-semibold">키워드</p>
            <RankChips items={topKeywords(articles, 20)} />
          </div>
          <div className="card text-sm">
            <p className="font-semibold">다른 투자 토픽</p>
            <ul className="mt-2 space-y-1">
              {(Object.keys(TOPICS) as TopicId[]).filter((t) => t !== topic).map((t) => (
                <li key={t}><Link href={`/invest/${t}`} className="text-brand hover:underline">{TOPICS[t].emoji} {TOPICS[t].label} →</Link></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
