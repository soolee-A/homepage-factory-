import { formatKrw, formatPct } from "@/lib/format.ts";
import type { CoinTicker } from "@/lib/market.ts";

export default function CoinStrip({ tickers }: { tickers: CoinTicker[] }) {
  if (tickers.length === 0) return null;
  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto text-sm">
      {tickers.slice(0, 5).map((t) => (
        <div key={t.market} className="shrink-0">
          <span className="font-semibold">{t.market.replace("KRW-", "")}</span>{" "}
          <span className="font-mono tabular-nums">{formatKrw(t.price)}</span>{" "}
          <span className={`font-mono tabular-nums ${t.changeRate > 0 ? "text-up" : t.changeRate < 0 ? "text-down" : ""}`}>{formatPct(t.changeRate)}</span>
        </div>
      ))}
    </div>
  );
}
