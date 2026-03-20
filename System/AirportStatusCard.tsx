"use client";

import { Train, Bus, Car, CreditCard, ExternalLink, Clock, AlertCircle, Info } from "lucide-react";
import { Airport, Transport } from "../Fetch/airportData";
import { useAirportStatus, AirportStatus } from "../Use/useAirportStatus";

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AirportStatus }) {
  const labelMap: Record<AirportStatus, string> = {
    "always-open": "24h Open",
    open: "Open Now",
    curfew: "Curfew: 23:00 – 06:00",
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
  const config: Record<string, { icon: React.ReactNode; cls: string }> = {
    train: { icon: <Train className="w-4 h-4" />, cls: "bg-blue-50 text-blue-600" },
    bus:   { icon: <Bus   className="w-4 h-4" />, cls: "bg-amber-50 text-amber-600" },
    taxi:  { icon: <Car   className="w-4 h-4" />, cls: "bg-purple-50 text-purple-600" },
    van:   { icon: <Car   className="w-4 h-4" />, cls: "bg-orange-50 text-orange-600" },
    walk:  { icon: <Car   className="w-4 h-4" />, cls: "bg-slate-50 text-slate-600" },
    pass:  { icon: <CreditCard className="w-4 h-4" />, cls: "bg-emerald-50 text-emerald-600" },
  };
  const { icon, cls } = config[type] ?? config["taxi"];
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${cls}`}>
      {icon}
    </span>
  );
}

// ─── Transport Row ───────────────────────────────────────────────────────────

function TransportRow({
  transport,
}: {
  transport: Transport;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <TransportIcon type={transport.type} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">{transport.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {transport.duration}
          {transport.firstDeparture !== "—" && (
            <>
              {" · First "}
              <span className="font-medium">{transport.firstDeparture}</span>
              {" · Last "}
              <span className="font-medium">{transport.lastDeparture}</span>
            </>
          )}
        </p>
        {transport.tip && (
          <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
            <Info className="w-3 h-3 shrink-0" /> {transport.tip}
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
          Book <ExternalLink className="w-3 h-3" />
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className={`px-5 py-4 border-b border-slate-200 ${status === "curfew" ? "bg-red-50" : "bg-slate-50"}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 tracking-tight">{airport.code}</span>
              <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                {airport.terminal}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 mt-0.5">{airport.name}</p>
            <p className="text-xs text-slate-400">{airport.city}</p>
          </div>
          <div className="text-right shrink-0">
            <StatusBadge status={status} />
            <div className="flex items-center justify-end gap-1 mt-2 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              <span>KST {currentKST}</span>
            </div>
          </div>
        </div>

        {airport.fact2026 && (
          <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0" /> {airport.fact2026}
          </p>
        )}

        {!airport.is24Hours && airport.curfewWarning && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-700">
              <span className="font-bold">Curfew 23:00–06:00 KST · </span>
              {airport.curfewWarning}
            </p>
          </div>
        )}
      </div>

      {/* Transport */}
      <div className="px-5 py-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-3 pb-1">
          Getting to the City
        </p>
        {transports.map((t, i) => (
          <TransportRow key={i} transport={t} />
        ))}
      </div>
    </div>
  );
}
