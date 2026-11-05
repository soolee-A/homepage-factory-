import Link from "next/link";
import { SECTIONS, TOPICS } from "@/lib/sources.ts";
import type { SectionId, TopicId } from "@/lib/types.ts";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#0a0f1a]/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2 whitespace-nowrap font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">IR</span>
          <span className="text-base sm:text-lg">투자레이더</span>
        </Link>
        <nav className="flex gap-0.5 font-semibold sm:gap-1" aria-label="투자 토픽">
          {(Object.keys(TOPICS) as TopicId[]).map((t) => (
            <Link key={t} href={`/invest/${t}`} className="whitespace-nowrap rounded-lg px-1.5 py-1.5 hover:bg-black/5 sm:px-2.5 dark:hover:bg-white/10">
              <span aria-hidden>{TOPICS[t].emoji}</span> <span className="text-xs sm:text-sm">{TOPICS[t].label.replace(/\s?투자$/, "")}</span>
            </Link>
          ))}
        </nav>
      </div>
      <nav className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 text-sm" aria-label="뉴스 섹션">
        {(Object.keys(SECTIONS) as SectionId[]).map((s) => (
          <Link key={s} href={`/news/${s}`} className="shrink-0 rounded-full border border-line px-3 py-1 text-muted hover:border-brand hover:text-brand dark:border-white/10">
            {SECTIONS[s].label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
