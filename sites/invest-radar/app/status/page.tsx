import type { Metadata } from "next";
import { collectNews } from "@/lib/collector.ts";
import { formatKst } from "@/lib/format.ts";

export const revalidate = 900;
export const metadata: Metadata = { title: "수집 현황", robots: { index: false } };

export default async function StatusPage() {
  const { feeds, collectedAt, articles } = await collectNews();
  const ok = feeds.filter((f) => f.ok).length;
  return (
    <section className="card">
      <h1 className="text-2xl font-extrabold">수집 현황</h1>
      <p className="mt-1 text-sm text-muted">{formatKst(collectedAt)} · 정상 {ok}/{feeds.length} · 중복 제거 후 {articles.length}건 · 15분 주기 자동 갱신</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="text-left text-xs text-muted">
            <tr><th className="py-2">상태</th><th>소스</th><th className="text-right">기사</th><th className="text-right">응답</th><th className="pl-4">오류</th></tr>
          </thead>
          <tbody className="divide-y divide-line dark:divide-white/10">
            {feeds.map((f) => (
              <tr key={f.id}>
                <td className="py-2">{f.ok ? "🟢" : "🔴"}</td>
                <td><span className="font-medium">{f.name}</span> <span className="text-xs text-muted">{f.id}</span></td>
                <td className="text-right tabular-nums">{f.count}</td>
                <td className="text-right tabular-nums text-muted">{f.ms}ms</td>
                <td className="pl-4 text-xs text-down">{f.error ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
