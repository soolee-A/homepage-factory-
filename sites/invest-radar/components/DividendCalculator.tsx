"use client";

import { useMemo, useState } from "react";

const TAX_RATE = 0.154; // 배당소득세 14% + 지방소득세 1.4% (원천징수 기준)
const COMPREHENSIVE_TAX_THRESHOLD = 20_000_000; // 금융소득종합과세 기준: 연 2,000만원 초과

interface Row {
  year: number;
  value: number;
  grossDividend: number;
  netDividend: number;
}

function won(n: number): string {
  if (n >= 1e8) return `${(n / 1e8).toFixed(2)}억원`;
  return `${Math.round(n / 1e4).toLocaleString("ko-KR")}만원`;
}

function Field({ label, value, onChange, step = 1, suffix }: { label: string; value: number; onChange: (v: number) => void; step?: number; suffix: string }) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      <div className="mt-1 flex items-center rounded-lg border border-line bg-transparent px-3 focus-within:border-brand dark:border-white/15">
        <input
          type="number"
          inputMode="decimal"
          className="w-full bg-transparent py-2 outline-none"
          value={Number.isFinite(value) ? value : 0}
          step={step}
          min={0}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        />
        <span className="shrink-0 text-muted">{suffix}</span>
      </div>
    </label>
  );
}

export default function DividendCalculator() {
  const [principal, setPrincipal] = useState(3000); // 만원
  const [monthly, setMonthly] = useState(50); // 만원
  const [yieldPct, setYieldPct] = useState(4);
  const [divGrowth, setDivGrowth] = useState(5);
  const [priceGrowth, setPriceGrowth] = useState(3);
  const [years, setYears] = useState(10);
  const [reinvest, setReinvest] = useState(true);

  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    let value = principal * 1e4;
    let curYield = yieldPct / 100;
    const g = divGrowth / 100;
    const p = priceGrowth / 100;
    const n = Math.min(50, Math.max(1, Math.round(years)));
    for (let y = 1; y <= n; y++) {
      value += monthly * 1e4 * 12; // 연초 일괄 납입 가정
      const gross = value * curYield;
      const net = gross * (1 - TAX_RATE);
      value = value * (1 + p) + (reinvest ? net : 0);
      // 주당배당 성장률 g, 주가 상승률 p → 시가배당률 변화
      curYield = (curYield * (1 + g)) / (1 + p);
      out.push({ year: y, value, grossDividend: gross, netDividend: net });
    }
    return out;
  }, [principal, monthly, yieldPct, divGrowth, priceGrowth, years, reinvest]);

  const last = rows.at(-1);
  const totalNet = rows.reduce((s, r) => s + r.netDividend, 0);
  const totalInvested = principal * 1e4 + monthly * 1e4 * 12 * rows.length;
  const overThreshold = rows.find((r) => r.grossDividend > COMPREHENSIVE_TAX_THRESHOLD);

  return (
    <section className="card" aria-labelledby="calc-title">
      <h2 id="calc-title" className="font-bold">🧮 배당 재투자 시뮬레이터</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Field label="초기 투자금" value={principal} onChange={setPrincipal} step={100} suffix="만원" />
        <Field label="월 적립액" value={monthly} onChange={setMonthly} step={10} suffix="만원" />
        <Field label="시가배당률" value={yieldPct} onChange={setYieldPct} step={0.1} suffix="%" />
        <Field label="연 배당성장률" value={divGrowth} onChange={setDivGrowth} step={0.5} suffix="%" />
        <Field label="연 주가상승률" value={priceGrowth} onChange={setPriceGrowth} step={0.5} suffix="%" />
        <Field label="투자 기간" value={years} onChange={setYears} suffix="년" />
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={reinvest} onChange={(e) => setReinvest(e.target.checked)} />
        세후 배당금 재투자
      </label>

      {last && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={`${last.year}년 후 평가액`} value={won(last.value)} />
          <Stat label="총 납입원금" value={won(totalInvested)} />
          <Stat label="누적 세후 배당" value={won(totalNet)} />
          <Stat label="마지막 해 월 배당(세후)" value={won(last.netDividend / 12)} />
        </div>
      )}

      {overThreshold && (
        <p className="mt-3 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
          {overThreshold.year}년차부터 연간 세전 배당이 2,000만원을 초과해 금융소득종합과세 대상이 될 수 있습니다(이자소득 합산). 세무 전문가 확인을 권장합니다.
        </p>
      )}

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-muted">연도별 상세</summary>
        <div className="mt-2 max-h-72 overflow-auto">
          <table className="w-full text-right tabular-nums">
            <thead className="sticky top-0 bg-panel text-xs text-muted dark:bg-[#0a0f1a]">
              <tr><th className="py-1 text-left">연차</th><th>평가액</th><th>세전 배당</th><th>세후 배당</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.year} className="border-t border-line dark:border-white/10">
                  <td className="py-1 text-left">{r.year}</td><td>{won(r.value)}</td><td>{won(r.grossDividend)}</td><td>{won(r.netDividend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p className="mt-3 text-[11px] text-muted">
        가정: 연초 일괄 납입, 배당소득세 15.4% 원천징수, 수수료·환율·ISA/연금계좌 절세 미반영. 과거·가정 수익률은 미래 수익을 보장하지 않습니다.
      </p>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-black/[0.03] p-3 dark:bg-white/5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-lg font-extrabold">{value}</p>
    </div>
  );
}
