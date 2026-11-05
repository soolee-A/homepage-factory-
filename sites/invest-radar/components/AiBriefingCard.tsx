import { formatKst } from "@/lib/format.ts";
import type { AiBriefingResult } from "@/lib/types.ts";

const LABEL = { bullish: ["긍정적", "text-up"], neutral: ["중립", "text-muted"], bearish: ["부정적", "text-down"] } as const;

export default function AiBriefingCard({ result }: { result: AiBriefingResult }) {
  if (result.status !== "ok" || !result.briefing) {
    const msg =
      result.status === "disabled"
        ? "AI 브리핑 비활성 상태입니다. ANTHROPIC_API_KEY 환경변수를 설정하면 3시간마다 자동 생성됩니다."
        : result.status === "empty"
          ? "브리핑을 만들 기사가 아직 충분하지 않습니다."
          : "AI 브리핑을 일시적으로 생성하지 못했습니다. 다음 주기에 자동 재시도합니다.";
    return (
      <section className="card">
        <h2 className="font-bold">🤖 AI 브리핑</h2>
        <p className="mt-2 text-sm text-muted">{msg}</p>
      </section>
    );
  }

  const b = result.briefing;
  const refs = result.refArticles ?? [];
  const [label, color] = LABEL[b.sentiment];
  return (
    <section className="card">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold">🤖 AI 브리핑</h2>
        <span className={`text-sm font-bold ${color}`}>뉴스 톤: {label}</span>
      </div>
      <p className="mt-3 leading-relaxed">{b.summary}</p>

      {b.keyPoints.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm">
          {b.keyPoints.map((k, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-brand">■</span>
              <span>
                {k.text}
                {k.refs.map((r) =>
                  refs[r] ? (
                    <a key={r} href={refs[r].link} target="_blank" rel="noopener noreferrer nofollow" title={`${refs[r].title} (${refs[r].source})`} className="ml-1 align-super text-[10px] font-bold text-brand hover:underline">
                      [{r + 1}]
                    </a>
                  ) : null,
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        {b.risks.length > 0 && (
          <div>
            <p className="font-semibold text-down">리스크 요인</p>
            <ul className="mt-1 list-disc pl-5 text-muted">{b.risks.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
        )}
        {b.watchlist.length > 0 && (
          <div>
            <p className="font-semibold">기사 속 주목 자산</p>
            <div className="mt-1 flex flex-wrap gap-1">{b.watchlist.map((w) => <span key={w} className="chip">{w}</span>)}</div>
          </div>
        )}
      </div>
      <p className="mt-4 text-[11px] text-muted">
        수집 헤드라인만을 근거로 자동 생성 · {result.generatedAt ? formatKst(result.generatedAt) : ""} · 투자 권유 아님
      </p>
    </section>
  );
}
