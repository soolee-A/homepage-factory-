"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, AlertTriangle, CheckCircle2, ExternalLink, Info } from "lucide-react";
import AirportStatusCard from "../System/AirportStatusCard";
import LanguageSwitcher from "../System/LanguageSwitcher";
import { airports, transportData, entryDocuments } from "../Fetch/airportData";

// ─── Scam Alert Banner ───────────────────────────────────────────────────────

function ScamAlertBanner() {
  const t = useTranslations("docs");
  return (
    <div className="space-y-3">
      <div className="bg-red-50 border-2 border-red-400 rounded-xl px-5 py-4 flex gap-3 items-start">
        <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-base font-black text-red-800">{t("scamTitle")}</p>
          <p className="text-sm text-red-700 mt-1">{t("scamDesc")}</p>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 flex gap-3 items-start">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          <span className="font-bold">{t("exemptTitle")}</span>{" "}{t("exemptDesc")}
        </p>
      </div>
    </div>
  );
}

// ─── Entry Document Card ─────────────────────────────────────────────────────

function EntryDocCard({ doc }: { doc: (typeof entryDocuments)[number] }) {
  const tSection = useTranslations("docs");
  const tDoc = useTranslations(`entryDocs.${doc.id}` as any);

  const name: string = tDoc("name");
  const officialCost: string = tDoc("officialCost");
  const scamWarning: string = tDoc("scamWarning");
  const exemptionNote: string | null = (() => { try { return tDoc("exemptionNote"); } catch { return null; } })();
  const steps = tDoc.raw("steps") as string[];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-slate-900 flex-1">{name}</h3>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap">
            {officialCost}
          </span>
        </div>
        <div className="flex items-start gap-1.5 mt-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <ShieldCheck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">{scamWarning}</p>
        </div>
        {exemptionNote && (
          <div className="flex items-start gap-1.5 mt-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">{exemptionNote}</p>
          </div>
        )}
      </div>
      <div className="px-5 py-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          {tSection("stepByStep")}
        </p>
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <a
          href={doc.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {tSection("officialSite")} <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WtokoPage() {
  const hero      = useTranslations("hero");
  const airport   = useTranslations("airport");
  const docs      = useTranslations("docs");
  const checklist = useTranslations("checklist");
  const footer    = useTranslations("footer");
  const nav       = useTranslations("nav");

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-[#0a1628] text-white px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="text-left">
              <span className="text-xl font-black">{nav("title")}</span>
              <span className="text-xs text-slate-400 ml-2">{nav("subtitle")}</span>
            </div>
            <LanguageSwitcher />
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-300 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            {hero("badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            {hero("h1a")}<br />
            <span className="text-blue-400">{hero("h1b")}</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{hero("desc")}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* Airport Status */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">{airport("h2")}</h2>
            <p className="text-slate-500 text-sm mt-1">{airport("desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {airports.map((a) => (
              <AirportStatusCard key={a.code} airport={a} transports={transportData[a.code]} />
            ))}
          </div>
        </section>

        {/* Entry Documents */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">{docs("h2")}</h2>
            <p className="text-slate-500 text-sm mt-1">{docs("desc")}</p>
          </div>
          <ScamAlertBanner />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {entryDocuments.map((doc) => (
              <EntryDocCard key={doc.id} doc={doc} />
            ))}
          </div>
        </section>

        {/* Pre-Flight Checklist */}
        <section className="bg-[#0a1628] rounded-2xl px-6 py-8 text-white">
          <h2 className="text-xl font-black mb-6">{checklist("h2")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(checklist.raw("items") as string[]).map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-4 py-8 text-center text-xs text-slate-400">
        <p className="font-bold text-slate-600 text-sm mb-1">{footer("name")}</p>
        <p>{footer("desc")}</p>
      </footer>
    </main>
  );
}
