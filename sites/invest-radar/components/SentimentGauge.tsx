import type { SentimentSummary } from "@/lib/types.ts";

export default function SentimentGauge({ s, title = "뉴스 톤 지수" }: { s: SentimentSummary; title?: string }) {
  const color = s.label === "강세" ? "text-up" : s.label === "약세" ? "text-down" : "text-muted";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted">{title}</span>
        <span className={`text-2xl font-extrabold ${color}`}>
          {s.index} <span className="text-base">{s.label}</span>
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gradient-to-r from-down via-gray-300 to-up" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={s.index} aria-label={title}>
        <div className="relative h-full" style={{ width: `${s.index}%` }}>
          <span className="absolute -top-1 right-0 h-4 w-1 rounded bg-ink dark:bg-white" />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        호재 {s.bullish} · 악재 {s.bearish} · 중립 {s.neutral} (헤드라인 규칙 기반)
      </p>
    </div>
  );
}
