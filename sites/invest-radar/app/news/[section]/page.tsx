import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBySection } from "@/lib/collector.ts";
import { summarizeSentiment, topKeywords } from "@/lib/analyzer.ts";
import { SECTIONS } from "@/lib/sources.ts";
import { formatKst } from "@/lib/format.ts";
import NewsList from "@/components/NewsList";
import SentimentGauge from "@/components/SentimentGauge";
import RankChips from "@/components/RankChips";
import type { SectionId } from "@/lib/types.ts";

export const revalidate = 900;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

function isSection(s: string): s is SectionId {
  return s in SECTIONS;
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) return {};
  const meta = SECTIONS[section];
  return { title: `${meta.label} 뉴스 실시간 요약`, description: `${meta.description} — 15분마다 자동 수집·분석`, alternates: { canonical: `/news/${section}` } };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  const { articles, collectedAt } = await getBySection(section, 80);
  const meta = SECTIONS[section];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <section className="card">
        <h1 className="text-2xl font-extrabold">{meta.label} 뉴스</h1>
        <p className="mt-1 text-sm text-muted">{meta.description} · {formatKst(collectedAt)} 기준 {articles.length}건</p>
        <div className="mt-2"><NewsList articles={articles} /></div>
      </section>
      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <div className="card"><SentimentGauge s={summarizeSentiment(articles)} /></div>
        <div className="card">
          <p className="mb-3 text-sm font-semibold">핵심 키워드</p>
          <RankChips items={topKeywords(articles, 20)} />
        </div>
      </aside>
    </div>
  );
}
