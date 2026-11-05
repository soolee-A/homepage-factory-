import type { Article, Ranked, SentimentSummary, TopicId } from "./types.ts";
import { NEGATIVE_TERMS, POSITIVE_TERMS, STOPWORDS, TOPIC_ENTITIES, type Entity } from "./dictionary.ts";

/** 문장 단위 규칙 기반 감성 점수 (-3 ~ +3 클램프) */
export function scoreSentiment(text: string): number {
  let score = 0;
  for (const re of POSITIVE_TERMS) if (re.test(text)) score += 1;
  for (const re of NEGATIVE_TERMS) if (re.test(text)) score -= 1;
  return Math.max(-3, Math.min(3, score));
}

export function summarizeSentiment(articles: Article[]): SentimentSummary {
  let bullish = 0;
  let bearish = 0;
  let neutral = 0;
  for (const a of articles) {
    if (a.sentiment > 0) bullish++;
    else if (a.sentiment < 0) bearish++;
    else neutral++;
  }
  const polar = bullish + bearish;
  const index = polar === 0 ? 50 : Math.round(50 + (50 * (bullish - bearish)) / polar);
  const label = index >= 60 ? "강세" : index <= 40 ? "약세" : "중립";
  return { index, label, bullish, bearish, neutral };
}

// ── 키워드 추출 ─────────────────────────────────────────

const PARTICLES = ["으로", "에서", "에게", "까지", "부터", "보다", "처럼", "은", "는", "이", "가", "을", "를", "의", "에", "도", "로", "와", "과", "만"];
// "~주의/~회의/~합의" 등 명사 일부인 '의'는 조사로 보지 않음
const UI_NOUN_PREFIX = new Set(["주", "회", "합", "협", "논", "동", "정", "결", "건", "심", "토", "문", "의", "모", "강", "열"]);

// 조사처럼 보이지만 명사 일부인 어미 (신고가, 물가, 경기도 등)
const NOUN_ENDINGS = ["고가", "저가", "주가", "물가", "원가", "평가", "시가", "종가", "단가", "국가", "증가", "추가", "호가", "작가", "속도", "경기도", "제주도", "강도", "반도", "의도"];

function stripParticle(token: string): string {
  if (!/^[가-힣]+$/.test(token.slice(-1)) || token.length < 3) return token;
  if (NOUN_ENDINGS.some((n) => token.endsWith(n))) return token;
  for (const p of PARTICLES) {
    if (token.endsWith(p) && token.length - p.length >= 2) {
      if (p === "의" && UI_NOUN_PREFIX.has(token.at(-2) ?? "")) return token;
      return token.slice(0, -p.length);
    }
  }
  return token;
}

export function tokenize(text: string): string[] {
  return text
    .replace(/\[[^\]]*\]|\([^)]*\)/g, " ") // [속보], (종합) 등 말머리 제거
    .split(/[^가-힣A-Za-z0-9&]+/)
    .map((t) => stripParticle(t.trim()))
    .filter((t) => t.length >= 2 && t.length <= 15)
    .filter((t) => !/^\d+$/.test(t))
    .filter((t) => !STOPWORDS.has(t.toLowerCase()));
}

/** 제목 기준 상위 키워드. 동일 기사 내 중복 토큰은 1회만 집계 */
export function topKeywords(articles: Article[], limit = 20): Ranked[] {
  const counts = new Map<string, number>();
  const display = new Map<string, string>();
  for (const a of articles) {
    const seen = new Set<string>();
    for (const tok of tokenize(a.title)) {
      const key = tok.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      counts.set(key, (counts.get(key) ?? 0) + 1);
      if (!display.has(key)) display.set(key, tok);
    }
  }
  return [...counts.entries()]
    .filter(([, c]) => c >= 2)
    .sort((x, y) => y[1] - x[1])
    .slice(0, limit)
    .map(([k, count]) => ({ name: display.get(k) ?? k, count }));
}

// ── 엔티티(종목/코인) 언급 집계 ─────────────────────────

interface CompiledAlias {
  entity: string;
  re: RegExp;
  len: number;
}

const compiledCache = new Map<TopicId, CompiledAlias[]>();

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function compile(entities: Entity[]): CompiledAlias[] {
  const list: CompiledAlias[] = [];
  for (const e of entities) {
    for (const a of e.aliases) {
      const re = typeof a === "string" ? new RegExp(escapeRe(a), "g") : new RegExp(a.source, a.flags.includes("g") ? a.flags : a.flags + "g");
      list.push({ entity: e.name, re, len: typeof a === "string" ? a.length : a.source.length });
    }
  }
  // 긴 별칭 우선 → "에코프로비엠"이 "에코프로"보다 먼저 구간 점유
  return list.sort((x, y) => y.len - x.len);
}

export function findEntities(text: string, topic: TopicId): string[] {
  let aliases = compiledCache.get(topic);
  if (!aliases) {
    aliases = compile(TOPIC_ENTITIES[topic]);
    compiledCache.set(topic, aliases);
  }
  const used: [number, number][] = [];
  const found = new Set<string>();
  for (const { entity, re } of aliases) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const start = m.index;
      const end = start + m[0].length;
      if (m[0].length === 0) {
        re.lastIndex++;
        continue;
      }
      const overlaps = used.some(([s, e]) => start < e && end > s);
      if (!overlaps) {
        used.push([start, end]);
        found.add(entity);
      }
    }
  }
  return [...found];
}

export function topEntities(articles: Article[], topic: TopicId, limit = 10): Ranked[] {
  const counts = new Map<string, number>();
  for (const a of articles) {
    for (const name of findEntities(`${a.title} ${a.snippet}`, topic)) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((x, y) => y[1] - x[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

// ── 중복 제거용 제목 정규화 ─────────────────────────────

export function normalizeTitle(title: string): string {
  return title
    .replace(/\s+-\s+[^-]{1,30}$/, "") // Google News "제목 - 언론사" 접미사
    .replace(/\[[^\]]*\]/g, "")
    .replace(/[^가-힣A-Za-z0-9]/g, "")
    .toLowerCase()
    .slice(0, 60);
}
