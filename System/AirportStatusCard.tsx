"use client";

import { useTranslations } from "next-intl";
import { Train, Bus, Car, CreditCard, ExternalLink, Clock, AlertCircle, Info } from "lucide-react";
import { Airport, Transport } from "../Fetch/airportData";
import { useAirportStatus, AirportStatus } from "../Use/useAirportStatus";

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AirportStatus }) {
  const t = useTranslations("airport");
  const labelMap: Record<AirportStatus, string> = {
    "always-open": t("alwaysOpen"),
    open: t("openNow"),
    curfew: t("curfew"),
  };
  const styleMap: Record<AirportStatus, string> = {
    "always-open": "bg-emerald-100 text-emerald-700 border border-emerald-200",
    open: "bg-blue-100 text-blue-700 border border-blue-200",
    curfew: "bg-red-100 text-red-700 border border-red-200",
  };
  const dotMap: Record<AirportStatus, string> = {
    "always-open": "bg-emerald-500 animate-pulse",
    open: "bg-blue-500 animate-pulse",
    curfew: "bg-red-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${styleMap[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotMap[status]}`} />
      {labelMap[status]}
    </span>
  );
}

// ─── Transport Icon ──────────────────────────────────────────────────────────

function TransportIcon({ type }: { type: Transport["type"] }) {
  const config = {
    train: { icon: <Train className="w-4 h-4" />, cls: "bg-blue-50 text-blue-600" },
    bus:   { icon: <Bus   className="w-4 h-4" />, cls: "bg-amber-50 text-amber-600" },
    taxi:  { icon: <Car   className="w-4 h-4" />, cls: "bg-purple-50 text-purple-600" },
    pass:  { icon: <CreditCard className="w-4 h-4" />, cls: "bg-emerald-50 text-emerald-600" },
  };
  const { icon, cls } = config[type];
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${cls}`}>
      {icon}
    </span>
  );
}

// ─── Transport Row ───────────────────────────────────────────────────────────

function TransportRow({
  transport,
  index,
  airportCode,
}: {
  transport: Transport;
  index: number;
  airportCode: string;
}) {
  const tAir = useTranslations("airport");
  const tData = useTranslations(`airports.${airportCode}.transport.${index}` as any);

  const name: string = tData("name");
  const duration: string = tData("duration");
  const tip: string | null = (() => {
    try { return tData("tip"); } catch { return null; }
  })();

  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <TransportIcon type={transport.type} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {duration}
          {transport.firstDeparture !== "—" && (
            <>
              {" · "}{tAir("first")}{" "}
              <span className="font-medium">{transport.firstDeparture}</span>
              {" · "}{tAir("last")}{" "}
              <span className="font-medium">{transport.lastDeparture}</span>
            </>
          )}
        </p>
        {tip && (
          <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
            <Info className="w-3 h-3 shrink-0" /> {tip}
          </p>
        )}
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-black text-slate-900">{transport.priceKRW}</p>
        <a
          href={transport.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-xs text-blue-600 hover:underline mt-0.5"
        >
          {tAir("book")} <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// ─── Main Card ───────────────────────────────────────────────────────────────

export default function AirportStatusCard({
  airport,
  transports,
}: {
  airport: Airport;
  transports: Transport[];
}) {
  const { status, currentKST } = useAirportStatus(airport);
  const tAir = useTranslations("airport");
  const tCode = useTranslations(`airports.${airport.code}` as any);

  const name: string = tCode("name");
  const city: string = tCode("city");
  const terminal: string = tCode("terminal");
  const fact2026: string | null = (() => { try { return tCode("fact2026"); } catch { return null; } })();
  const curfewWarning: string | null = (() => { try { return tCode("curfewWarning"); } catch { return null; } })();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className={`px-5 py-4 border-b border-slate-200 ${status === "curfew" ? "bg-red-50" : "bg-slate-50"}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 tracking-tight">{airport.code}</span>
              <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                {terminal}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 mt-0.5">{name}</p>
            <p className="text-xs text-slate-400">{city}</p>
          </div>
          <div className="text-right shrink-0">
            <StatusBadge status={status} />
            <div className="flex items-center justify-end gap-1 mt-2 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              <span>KST {currentKST}</span>
            </div>
          </div>
        </div>

        {fact2026 && (
          <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0" /> {fact2026}
          </p>
        )}

        {!airport.is24Hours && curfewWarning && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-700">
              <span className="font-bold">{tAir("curfewPrefix")}</span>
              {curfewWarning}
            </p>
          </div>
        )}
      </div>

      {/* Transport */}
      <div className="px-5 py-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-3 pb-1">
          {tAir("gettingToCity")}
        </p>
        {transports.map((t, i) => (
          <TransportRow key={i} transport={t} index={i} airportCode={airport.code} />
        ))}
      </div>
    </div>
  );
}
