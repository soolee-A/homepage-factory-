import { formatEok, formatKrw, formatPct } from "@/lib/format.ts";
import type { CoinTicker } from "@/lib/market.ts";

export default function CoinTable({ tickers }: { tickers: CoinTicker[] }) {
  if (tickers.length === 0) return <p className="text-sm text-muted">시세를 불러오지 못했습니다. 잠시 후 자동 갱신됩니다.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-muted">
          <tr>
            <th className="py-2 font-medium">코인</th>
            <th className="py-2 text-right font-medium">현재가(원)</th>
            <th className="py-2 text-right font-medium">전일대비</th>
            <th className="hidden py-2 text-right font-medium sm:table-cell">24h 거래대금</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line dark:divide-white/10">
          {tickers.map((t) => {
            const color = t.changeRate > 0 ? "text-up" : t.changeRate < 0 ? "text-down" : "";
            return (
              <tr key={t.market}>
                <td className="py-2">
                  <span className="font-semibold">{t.name}</span> <span className="text-xs text-muted">{t.market.replace("KRW-", "")}</span>
                </td>
                <td className={`py-2 text-right font-mono tabular-nums ${color}`}>{formatKrw(t.price)}</td>
                <td className={`py-2 text-right font-mono tabular-nums ${color}`}>{formatPct(t.changeRate)}</td>
                <td className="hidden py-2 text-right tabular-nums text-muted sm:table-cell">{formatEok(t.volume24hKrw)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-2 text-[11px] text-muted">출처: 업비트 공개 시세 API · 1분 캐시</p>
    </div>
  );
}
