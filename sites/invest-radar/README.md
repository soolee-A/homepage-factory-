# 투자레이더 (InvestRadar)

세계·국내 뉴스를 15분마다 자동으로 수집하고 분석하는 투자 전용 뉴스 대시보드입니다. 배당주, 국내주식, 코인을 다룹니다.

## 기능

| 영역 | 내용 |
|---|---|
| 뉴스 섹션 | 세계 · 경제 · 정치 · 사회 · 국내(연합뉴스/아시아경제/한국경제/매일경제) · 아시아 |
| 투자 토픽 | 💰 배당주 · 📈 국내주식 · 🪙 코인 |
| 규칙 기반 분석 (무료) | 뉴스 톤 지수(호재·악재), 핫 키워드, 많이 언급된 종목/코인 집계, 중복 기사 병합 |
| AI 브리핑 (선택) | 토픽별 요약, 핵심 이슈와 근거 기사 링크, 리스크, 주목 자산. 3시간 캐시 |
| 시세 | 업비트 공개 API 기반 원화 코인 시세 (1분 캐시) |
| 도구 | 배당 재투자 시뮬레이터 (세후 15.4%, 금융소득종합과세 2,000만원 경고) |
| 운영 | `/status`에서 피드별 수집 성공/실패 확인 |

## 아키텍처

```
RSS 26개 피드 ─┐
               ├─ lib/collector.ts  (병렬 fetch, 8초 타임아웃, EUC-KR 디코딩, 분류, 중복 제거)
업비트 API ────┘        │  unstable_cache 15분
                        ▼
              lib/analyzer.ts  (감성 · 키워드 · 엔티티, 순수 함수)
                        │
              lib/ai.ts  (Claude 구조화 JSON 출력, 3시간 캐시, 키 없으면 비활성)
                        ▼
              Next.js App Router ISR 페이지 (Vercel icn1 서울 리전)
```

- 서버, DB, 크론이 필요 없습니다. 방문이 들어오면 Vercel ISR이 캐시를 자동으로 갱신합니다.
- 피드 하나가 실패해도 그 피드만 건너뛰고 나머지로 페이지를 만듭니다.

## 배포 (Vercel)

1. Vercel → **Add New Project** → 이 GitHub 레포를 Import합니다.
2. **Root Directory**를 `sites/invest-radar`로 지정합니다. (중요)
3. Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://내도메인` (sitemap 생성용)
   - `ANTHROPIC_API_KEY` = (선택) AI 브리핑을 쓸 때만 설정
   - `AI_MODEL` = (선택) 기본값은 `claude-opus-5-5`. 비용을 줄이려면 `claude-haiku-5-5`
4. Deploy를 누릅니다.

## 로컬 실행 (Windows PowerShell)

```powershell
cd sites/invest-radar
npm install
Copy-Item .env.example .env.local
npm run dev            # http://localhost:3000
npm run test:analyzer  # 분석 로직 오프라인 테스트
```

## AI 비용 추정

토픽 3개에 3시간 캐시를 적용하면 하루 최대 24회 호출합니다. 1회 기준 입력 약 2K 토큰, 출력 약 0.6K 토큰입니다.

| 모델 | 1회 | 월 (24회 × 30일) |
|---|---|---|
| `claude-opus-5-5` ($4 / $20 per MTok) | 약 $0.020 | 약 $14 |
| `claude-haiku-5-5` ($0.10 / $0.50 per MTok) | 약 $0.0005 | 약 $0.4 |

수치는 추정치이므로 실제 비용은 Anthropic Console Usage에서 확인하세요.

## 커스터마이징

- 피드 추가/삭제: `lib/sources.ts`의 `FEEDS` 배열
- 종목/코인 사전: `lib/dictionary.ts`
- 갱신 주기: `lib/collector.ts`의 `NEWS_REVALIDATE_SEC`, `lib/ai.ts`의 `AI_REVALIDATE_SEC`

## 법적 고지

- 기사는 제목, 출처, 원문 링크, RSS 요약(160자)만 표시합니다.
- 매수·매도 추천 문구는 없습니다. AI 프롬프트에서도 금지하고 있습니다.
- 유료 리딩방이나 1:1 종목 추천 기능을 추가하면 유사투자자문업 신고 대상이 될 수 있습니다.
