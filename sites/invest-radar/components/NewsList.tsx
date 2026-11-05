import { TOPICS } from "@/lib/sources.ts";
import { formatKst } from "@/lib/format.ts";
import type { Article } from "@/lib/types.ts";

function SentimentDot({ s }: { s: number }) {
  if (s > 0) return <span className="text-up" title="호재 톤">▲</span>;
  if (s < 0) return <span className="text-down" title="악재 톤">▼</span>;
  return <span className="text-muted" title="중립">•</span>;
}

export default function NewsList({ articles, showTopics = true, compact = false }: { articles: Article[]; showTopics?: boolean; compact?: boolean }) {
  if (articles.length === 0) {
    return <p className="py-8 text-center text-sm text-muted">수집된 기사가 없습니다. 잠시 후 자동 갱신됩니다.</p>;
  }
  return (
    <ul className="divide-y divide-line dark:divide-white/10">
      {articles.map((a) => (
        <li key={a.id} className={compact ? "py-2" : "py-3"}>
          <a href={a.link} target="_blank" rel="noopener noreferrer nofollow" className="group flex gap-2">
            <SentimentDot s={a.sentiment} />
            <div className="min-w-0 flex-1">
              <p className={`font-medium leading-snug group-hover:text-brand group-hover:underline ${compact ? "line-clamp-1 text-sm" : ""}`}>{a.title}</p>
              {!compact && a.snippet && <p className="mt-1 line-clamp-2 text-sm text-muted">{a.snippet}</p>}
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                <span>{a.source}</span>
                <span aria-hidden>·</span>
                <time dateTime={a.publishedAt}>{formatKst(a.publishedAt)}</time>
                {showTopics &&
                  a.topics.map((t) => (
                    <span key={t} className="rounded bg-brand/10 px-1.5 py-0.5 text-[11px] font-semibold text-brand">
                      {TOPICS[t].label}
                    </span>
                  ))}
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
