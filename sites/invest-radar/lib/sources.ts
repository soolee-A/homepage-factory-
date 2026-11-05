import type { FeedSource, SectionId, TopicId } from "./types.ts";

/**
 * Google News RSS 검색 피드 생성기.
 * 형식: https://news.google.com/rss/search?q=<쿼리>&hl=ko&gl=KR&ceid=KR:ko
 */
function gnews(q: string, lang: "ko" | "en" = "ko"): string {
  const locale = lang === "ko" ? "hl=ko&gl=KR&ceid=KR:ko" : "hl=en-US&gl=US&ceid=US:en";
  return `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&${locale}`;
}

/**
 * 수집 대상 피드.
 * URL 검증 상태는 /status 페이지에서 실시간 확인 (실패 피드는 자동 스킵).
 * 피드 추가/삭제는 이 배열만 수정하면 됨.
 */
export const FEEDS: FeedSource[] = [
  // ── 국내 종합/섹션 ─────────────────────────────
  { id: "yna-all", name: "연합뉴스", url: "https://www.yna.co.kr/rss/news.xml", lang: "ko", sections: ["domestic"], topics: [] },
  { id: "yna-economy", name: "연합뉴스 경제", url: "https://www.yna.co.kr/rss/economy.xml", lang: "ko", sections: ["economy", "domestic"], topics: [] },
  { id: "yna-politics", name: "연합뉴스 정치", url: "https://www.yna.co.kr/rss/politics.xml", lang: "ko", sections: ["politics", "domestic"], topics: [] },
  { id: "yna-society", name: "연합뉴스 사회", url: "https://www.yna.co.kr/rss/society.xml", lang: "ko", sections: ["society", "domestic"], topics: [] },
  { id: "yna-intl", name: "연합뉴스 국제", url: "https://www.yna.co.kr/rss/international.xml", lang: "ko", sections: ["world"], topics: [] },
  { id: "yna-market", name: "연합뉴스 마켓", url: "https://www.yna.co.kr/rss/market.xml", lang: "ko", sections: ["economy", "domestic"], topics: ["kr-stock"] },

  // ── 아시아경제 ─────────────────────────────────
  { id: "asiae-all", name: "아시아경제", url: "https://www.asiae.co.kr/rss/all.htm", lang: "ko", sections: ["domestic"], topics: [] },
  { id: "asiae-stock", name: "아시아경제 증권", url: "https://www.asiae.co.kr/rss/stock.htm", lang: "ko", sections: ["economy", "domestic"], topics: ["kr-stock"] },
  { id: "asiae-economy", name: "아시아경제 경제", url: "https://www.asiae.co.kr/rss/economy.htm", lang: "ko", sections: ["economy", "domestic"], topics: [] },
  { id: "asiae-world", name: "아시아경제 국제", url: "https://www.asiae.co.kr/rss/world.htm", lang: "ko", sections: ["world"], topics: [] },
  // 직접 RSS 장애 시 백업 경로
  { id: "gn-asiae", name: "아시아경제(Google)", url: gnews("site:asiae.co.kr when:1d"), lang: "ko", sections: ["domestic", "economy"], topics: [] },

  // ── 한국경제 / 매일경제 ─────────────────────────
  { id: "hk-economy", name: "한국경제", url: "https://www.hankyung.com/feed/economy", lang: "ko", sections: ["economy", "domestic"], topics: [] },
  { id: "hk-finance", name: "한국경제 증권", url: "https://www.hankyung.com/feed/finance", lang: "ko", sections: ["economy", "domestic"], topics: ["kr-stock"] },
  { id: "hk-intl", name: "한국경제 국제", url: "https://www.hankyung.com/feed/international", lang: "ko", sections: ["world"], topics: [] },
  { id: "mk-stock", name: "매일경제 증권", url: "https://www.mk.co.kr/rss/50200011/", lang: "ko", sections: ["economy", "domestic"], topics: ["kr-stock"] },

  // ── 세계 (영문) ────────────────────────────────
  { id: "bbc-world", name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", lang: "en", sections: ["world"], topics: [] },
  { id: "bbc-business", name: "BBC Business", url: "https://feeds.bbci.co.uk/news/business/rss.xml", lang: "en", sections: ["world", "economy"], topics: [] },
  { id: "bbc-asia", name: "BBC Asia", url: "https://feeds.bbci.co.uk/news/world/asia/rss.xml", lang: "en", sections: ["world", "asia"], topics: [] },
  { id: "cnbc-top", name: "CNBC", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html", lang: "en", sections: ["world", "economy"], topics: [] },

  // ── 투자 토픽 전용 (Google News 검색) ───────────
  { id: "gn-dividend", name: "배당주 뉴스", url: gnews("배당주 OR 고배당 OR 배당금 OR 배당락 when:2d"), lang: "ko", sections: [], topics: ["dividend"] },
  { id: "gn-dividend-etf", name: "배당 ETF 뉴스", url: gnews("배당 ETF OR 커버드콜 OR 리츠 when:3d"), lang: "ko", sections: [], topics: ["dividend"] },
  { id: "gn-kospi", name: "국내증시 뉴스", url: gnews("코스피 OR 코스닥 when:1d"), lang: "ko", sections: ["economy"], topics: ["kr-stock"] },
  { id: "gn-crypto-ko", name: "코인 뉴스", url: gnews("비트코인 OR 가상자산 OR 이더리움 when:1d"), lang: "ko", sections: [], topics: ["crypto"] },

  // ── 코인 (영문 전문지) ──────────────────────────
  { id: "coindesk", name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/", lang: "en", sections: [], topics: ["crypto"] },
  { id: "cointelegraph", name: "Cointelegraph", url: "https://cointelegraph.com/rss", lang: "en", sections: [], topics: ["crypto"] },
  { id: "blockmedia", name: "블록미디어", url: "https://www.blockmedia.co.kr/feed", lang: "ko", sections: [], topics: ["crypto"] },
];

export const SECTIONS: Record<SectionId, { label: string; description: string }> = {
  world: { label: "세계", description: "글로벌 주요 뉴스 · 국제 정세 · 해외 시장" },
  economy: { label: "경제", description: "거시경제 · 금리 · 환율 · 산업 동향" },
  politics: { label: "정치", description: "정책 · 규제 · 국회 · 선거 이슈" },
  society: { label: "사회", description: "사회 · 노동 · 부동산 · 생활 경제" },
  domestic: { label: "국내", description: "연합뉴스 · 아시아경제 · 한국경제 등 국내 매체 종합" },
  asia: { label: "아시아", description: "중국 · 일본 · 대만 · 동남아 · 인도 시장" },
};

export const TOPICS: Record<TopicId, { label: string; emoji: string; description: string }> = {
  dividend: { label: "배당주 투자", emoji: "💰", description: "고배당주 · 배당 ETF · 리츠 · 배당 일정 · 주주환원" },
  "kr-stock": { label: "국내주식", emoji: "📈", description: "코스피 · 코스닥 · 수급 · 실적 · 밸류업" },
  crypto: { label: "코인투자", emoji: "🪙", description: "비트코인 · 이더리움 · 알트코인 · 규제 · 거래소" },
};

/**
 * 키워드 기반 자동 태깅 규칙.
 * 피드 소속과 무관하게 제목/요약에 매칭되면 해당 토픽/섹션으로 추가 분류.
 */
export const TOPIC_RULES: Record<TopicId, RegExp> = {
  dividend: /배당|리츠|REITs?\b|커버드콜|주주환원|dividend|SCHD|JEPI/i,
  "kr-stock": /코스피|코스닥|KOSPI|KOSDAQ|유가증권시장|공매도|외국인\s?순매(수|도)|밸류업|증시|상장사|공모주|IPO/i,
  crypto: /비트코인|이더리움|가상자산|암호화폐|가상화폐|코인|업비트|빗썸|스테이블코인|알트코인|bitcoin|ethereum|crypto|stablecoin|\bBTC\b|\bETH\b|\bXRP\b/i,
};

export const SECTION_RULES: Partial<Record<SectionId, RegExp>> = {
  asia: /중국|일본|대만|홍콩|베트남|인도|싱가포르|아세안|닛케이|항셍|상하이|위안화|엔화|China|Japan|Taiwan|Hong Kong|Vietnam|India|Asia|Nikkei|yuan|\byen\b/i,
};
