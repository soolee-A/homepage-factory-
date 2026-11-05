export type SectionId = "world" | "economy" | "politics" | "society" | "domestic" | "asia";
export type TopicId = "dividend" | "kr-stock" | "crypto";

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  lang: "ko" | "en";
  /** 피드 자체가 속한 뉴스 섹션 */
  sections: SectionId[];
  /** 피드 자체가 속한 투자 토픽 (키워드 규칙으로도 추가 태깅됨) */
  topics: TopicId[];
}

export interface Article {
  id: string;
  title: string;
  link: string;
  source: string;
  feedId: string;
  publishedAt: string; // ISO 8601
  snippet: string;
  lang: "ko" | "en";
  sections: SectionId[];
  topics: TopicId[];
  /** 규칙 기반 감성 점수: 양수=호재 우세, 음수=악재 우세 */
  sentiment: number;
}

export interface FeedStatus {
  id: string;
  name: string;
  url: string;
  ok: boolean;
  count: number;
  error?: string;
  ms: number;
}

export interface CollectResult {
  articles: Article[];
  feeds: FeedStatus[];
  collectedAt: string;
}

export interface SentimentSummary {
  index: number; // 0~100 (50 = 중립)
  label: "강세" | "중립" | "약세";
  bullish: number;
  bearish: number;
  neutral: number;
}

export interface Ranked {
  name: string;
  count: number;
}

export interface AiBriefing {
  summary: string;
  sentiment: "bullish" | "neutral" | "bearish";
  keyPoints: { text: string; refs: number[] }[];
  risks: string[];
  watchlist: string[];
}

export interface AiBriefingResult {
  status: "ok" | "disabled" | "error" | "empty";
  briefing?: AiBriefing;
  /** refs 인덱스가 가리키는 기사 목록 (환각 방지: 근거 링크) */
  refArticles?: Pick<Article, "title" | "link" | "source">[];
  model?: string;
  generatedAt?: string;
}
