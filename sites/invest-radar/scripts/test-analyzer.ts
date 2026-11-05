// 오프라인 단위 검증: node --experimental-strip-types scripts/test-analyzer.ts
import assert from "node:assert/strict";
import { findEntities, normalizeTitle, scoreSentiment, tokenize, summarizeSentiment } from "../lib/analyzer.ts";
import { parseFeed, decodeBody, safeUrl } from "../lib/rss.ts";
import { TOPIC_RULES } from "../lib/sources.ts";

// 1) 엔티티: 긴 별칭 우선 + KT/KT&G 구분
assert.deepEqual(findEntities("에코프로비엠 급등, 에코프로도 강세", "kr-stock").sort(), ["에코프로", "에코프로비엠"].sort());
assert.deepEqual(findEntities("KT&G 배당 확대", "kr-stock"), ["KT&G"]);
assert.deepEqual(findEntities("KT 주가 상승", "kr-stock"), ["KT"]);
assert.deepEqual(findEntities("카카오뱅크 실적", "kr-stock"), ["카카오뱅크"]);
assert.deepEqual(findEntities("BTC breaks record as bitcoin ETF inflows grow", "crypto"), ["비트코인"]);
assert.deepEqual(findEntities("Solar energy stocks", "crypto"), []); // SOL 오탐 방지

// 2) 감성
assert.ok(scoreSentiment("코스피 급등, 외국인 순매수") > 0);
assert.ok(scoreSentiment("비트코인 급락, 해킹 우려") < 0);
assert.equal(scoreSentiment("한국은행 금통위 개최"), 0);
const s = summarizeSentiment([{ sentiment: 1 }, { sentiment: 1 }, { sentiment: -1 }, { sentiment: 0 }] as any);
assert.equal(s.bullish, 2); assert.equal(s.bearish, 1); assert.equal(s.index, 67); assert.equal(s.label, "강세");

// 3) 토큰화: 조사 제거, 명사 '~주의' 보존, 말머리 제거
const toks = tokenize("[속보] 코스피가 삼성전자의 반등에 민주주의 (종합)");
assert.ok(toks.includes("코스피") && toks.includes("삼성전자") && toks.includes("반등") && toks.includes("민주주의"), toks.join(","));
assert.ok(!toks.includes("속보") && !toks.includes("종합"));

// 4) 토픽 규칙
assert.ok(TOPIC_RULES.dividend.test("SK리츠 분기배당 결정"));
assert.ok(TOPIC_RULES.crypto.test("Bitcoin price today"));
assert.ok(!TOPIC_RULES["kr-stock"].test("미국 연준 금리 동결"));

// 5) RSS / Atom 파싱 + EUC-KR 디코딩
const rss = `<?xml version="1.0" encoding="UTF-8"?><rss><channel>
<item><title><![CDATA[삼성전자 &amp; SK하이닉스 상승]]></title><link>https://example.com/a</link><pubDate>Wed, 05 Nov 2026 01:00:00 +0900</pubDate><description><![CDATA[<p>본문 <b>요약</b></p>]]></description></item>
<item><title>단일 아이템</title><link>javascript:alert(1)</link></item>
</channel></rss>`;
const items = parseFeed(rss);
assert.equal(items.length, 2);
assert.equal(items[0].title, "삼성전자 & SK하이닉스 상승");
assert.equal(items[0].description, "본문 요약");
assert.equal(safeUrl(items[1].link), null);

const atom = `<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Bitcoin rallies</title><link rel="alternate" href="https://example.com/b"/><updated>2026-11-05T00:00:00Z</updated></entry></feed>`;
assert.equal(parseFeed(atom)[0].link, "https://example.com/b");

const euckr = new Uint8Array([0x3c,0x3f,0x78,0x6d,0x6c,0x20,0x65,0x6e,0x63,0x6f,0x64,0x69,0x6e,0x67,0x3d,0x22,0x65,0x75,0x63,0x2d,0x6b,0x72,0x22,0x3f,0x3e,0xc7,0xd1,0xb1,0xdb]); // <?xml encoding="euc-kr"?>한글
assert.ok(decodeBody(euckr, null).endsWith("한글"));

// 6) 중복 제거 정규화 (Google News 언론사 접미사)
assert.equal(normalizeTitle("코스피 4000 돌파 - 연합뉴스"), normalizeTitle("코스피 4000 돌파"));

console.log("✅ analyzer/rss tests passed");

// 7) 명사 어미 보존 / 영문 불용어
const t2 = tokenize("삼성전자 신고가 경신, 물가 상승 as expected");
assert.ok(t2.includes("신고가") && !t2.includes("신고") && !t2.includes("as"), t2.join(","));
console.log("✅ tokenizer regression tests passed");
