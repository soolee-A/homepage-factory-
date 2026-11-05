/**
 * 업비트 공개 시세 API (인증 불필요)
 * GET https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH
 */
export const MARKET_REVALIDATE_SEC = 60;

export const COIN_MARKETS: { market: string; name: string }[] = [
  { market: "KRW-BTC", name: "비트코인" },
  { market: "KRW-ETH", name: "이더리움" },
  { market: "KRW-XRP", name: "리플" },
  { market: "KRW-SOL", name: "솔라나" },
  { market: "KRW-DOGE", name: "도지코인" },
  { market: "KRW-ADA", name: "에이다" },
  { market: "KRW-TRX", name: "트론" },
  { market: "KRW-SUI", name: "수이" },
];

export interface CoinTicker {
  market: string;
  name: string;
  price: number;
  changeRate: number; // -0.0123 = -1.23%
  volume24hKrw: number;
  high: number;
  low: number;
}

interface UpbitTicker {
  market: string;
  trade_price: number;
  signed_change_rate: number;
  acc_trade_price_24h: number;
  high_price: number;
  low_price: number;
}

export async function getCoinTickers(): Promise<{ tickers: CoinTicker[]; ok: boolean }> {
  const markets = COIN_MARKETS.map((m) => m.market).join(",");
  try {
    const res = await fetch(`https://api.upbit.com/v1/ticker?markets=${markets}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: MARKET_REVALIDATE_SEC },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as UpbitTicker[];
    if (!Array.isArray(data)) throw new Error("unexpected payload");
    const names = new Map(COIN_MARKETS.map((m) => [m.market, m.name]));
    const tickers = data
      .filter((d) => typeof d.trade_price === "number")
      .map((d) => ({
        market: d.market,
        name: names.get(d.market) ?? d.market,
        price: d.trade_price,
        changeRate: d.signed_change_rate,
        volume24hKrw: d.acc_trade_price_24h,
        high: d.high_price,
        low: d.low_price,
      }))
      .sort((a, b) => COIN_MARKETS.findIndex((m) => m.market === a.market) - COIN_MARKETS.findIndex((m) => m.market === b.market));
    return { tickers, ok: true };
  } catch (err) {
    console.warn("[market] upbit failed:", err instanceof Error ? err.message : err);
    return { tickers: [], ok: false };
  }
}
