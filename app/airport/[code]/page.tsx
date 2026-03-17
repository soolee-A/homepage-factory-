"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  ArrowLeft,
  Sun,
  Moon,
  CheckCircle2,
  Youtube,
  ExternalLink,
  AlertCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Zap,
} from "lucide-react";
import {
  airports,
  airportTimeGuides,
  transportData,
  TimeGuide,
} from "../../../Fetch/airportData";

/* ── Taegeuk (mini, reused in header) ── */
function TaegeukMini() {
  return (
    <svg width="32" height="32" viewBox="0 0 60 60">
      <defs>
        <linearGradient id="tg2-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5566" />
          <stop offset="100%" stopColor="#CD2E3A" />
        </linearGradient>
        <linearGradient id="tg2-blue" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#003478" />
        </linearGradient>
        <clipPath id="tg2-clip">
          <circle cx="30" cy="30" r="27" />
        </clipPath>
      </defs>
      <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <g clipPath="url(#tg2-clip)">
        <path d="M30,3 A27,27 0,0,1 30,57 A13.5,13.5 0,0,0 30,30 A13.5,13.5 0,0,1 30,3" fill="url(#tg2-red)" />
        <path d="M30,57 A27,27 0,0,1 30,3 A13.5,13.5 0,0,0 30,30 A13.5,13.5 0,0,1 30,57" fill="url(#tg2-blue)" />
        <circle cx="30" cy="16.5" r="6.5" fill="url(#tg2-blue)" />
        <circle cx="30" cy="43.5" r="6.5" fill="url(#tg2-red)" />
      </g>
    </svg>
  );
}

/* ── Availability badge ── */
function AvailabilityBadge({ level }: { level: "High" | "Limited" | "None" }) {
  const styles = {
    High: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    Limited: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    None: "bg-red-500/15 text-red-300 border-red-500/25",
  };
  const dots = {
    High: "bg-emerald-400",
    Limited: "bg-amber-400",
    None: "bg-red-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[level]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dots[level]}`} />
      {level === "None" ? "Closed" : level} Availability
    </span>
  );
}

export default function AirportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const code = (params.code as string).toUpperCase();
  const [selectedTime, setSelectedTime] = useState<"day" | "night" | null>(null);

  const airport = airports.find((a) => a.code === code);
  const guide: TimeGuide | null =
    airport && selectedTime ? airportTimeGuides[code]?.[selectedTime] ?? null : null;
  const transports = transportData[code] ?? [];

  if (!airport)
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <p className="text-white font-black text-2xl">Airport Not Found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans">
      {/* Top gradient glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-blue-700/[0.05] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">

        {/* ── Nav Bar ── */}
        <nav className="flex items-center justify-between mb-12">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-bold
                       transition-colors group glass rounded-2xl px-4 py-2.5"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <TaegeukMini />
            <span className="text-white font-black tracking-widest text-sm">WTOKO</span>
          </div>
        </nav>

        {/* ── Airport Header ── */}
        <header className="mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/[0.08] text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Fact-Based Guide · 2026
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-3">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {airport.code}
                </span>
              </h1>
              <p className="text-xl font-bold text-slate-300 leading-snug">{airport.name}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5" /> {airport.city}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                  <Zap className="w-3.5 h-3.5" /> {airport.terminal}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {airport.is24Hours ? (
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-[10px] font-black uppercase tracking-widest">
                  24H Open
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-[10px] font-black uppercase tracking-widest">
                  Curfew {airport.curfewStart}:00–{String(airport.curfewEnd).padStart(2, "0")}:00
                </span>
              )}
            </div>
          </div>

          {/* 2026 Fact */}
          {airport.fact2026 && (
            <div className="mt-5 glass rounded-2xl p-4 flex items-start gap-3 border-blue-500/10">
              <Zap className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300 font-medium">{airport.fact2026}</p>
            </div>
          )}

          {/* Curfew Warning */}
          {airport.curfewWarning && (
            <div className="mt-3 bg-amber-950/40 border border-amber-700/25 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-200 font-medium">{airport.curfewWarning}</p>
            </div>
          )}
        </header>

        {/* ── Step 1: Time Selection ── */}
        <section
          className="glass-strong rounded-[2.5rem] p-8 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Step 1 — Select Your Arrival Time
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Day */}
            <button
              onClick={() => setSelectedTime("day")}
              className={`flex items-center gap-4 p-6 rounded-[1.5rem] border-2 transition-all duration-200
                ${
                  selectedTime === "day"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/8 glass hover:border-blue-500/40"
                }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
                  ${selectedTime === "day" ? "bg-blue-600" : "glass"}`}
              >
                <Sun className={`w-6 h-6 ${selectedTime === "day" ? "text-white" : "text-amber-400"}`} />
              </div>
              <div className="text-left">
                <p className="font-black text-white leading-none mb-1">Daytime</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  06:00 – 23:00
                </p>
              </div>
            </button>

            {/* Night */}
            <button
              onClick={() => setSelectedTime("night")}
              className={`flex items-center gap-4 p-6 rounded-[1.5rem] border-2 transition-all duration-200
                ${
                  selectedTime === "night"
                    ? "border-indigo-400 bg-indigo-500/10"
                    : "border-white/8 glass hover:border-indigo-500/40"
                }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
                  ${selectedTime === "night" ? "bg-indigo-600" : "glass"}`}
              >
                <Moon className={`w-6 h-6 ${selectedTime === "night" ? "text-white" : "text-indigo-400"}`} />
              </div>
              <div className="text-left">
                <p className="font-black text-white leading-none mb-1">Late Night</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  23:00 – 06:00
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* ── Step 2: Guide ── */}
        {guide && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Guide Header */}
            <section
              className={`rounded-[2.5rem] p-8 border ${
                guide.availability === "None"
                  ? "bg-red-950/30 border-red-800/30"
                  : guide.availability === "Limited"
                  ? "bg-amber-950/30 border-amber-800/30"
                  : "bg-emerald-950/30 border-emerald-800/30"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <h2 className="text-xl font-black text-white">{guide.title}</h2>
                <AvailabilityBadge level={guide.availability} />
              </div>
              <p className="text-slate-300 font-medium mb-8 text-base leading-relaxed">
                {guide.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Steps */}
                <div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5">
                    Step-by-Step Guide
                  </h3>
                  <ol className="space-y-4">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-300 font-medium leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* YouTube Verify */}
                <div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    Verify with Video
                  </h3>
                  <a
                    href={`https://www.youtube.com/watch?v=${guide.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video bg-slate-800/60 rounded-2xl overflow-hidden
                               border border-white/8 hover:border-red-500/50 transition-all duration-200"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${guide.youtubeId}/mqdefault.jpg`}
                      alt="Video guide"
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center
                                   shadow-2xl shadow-red-900/50 group-hover:scale-110 transition-transform"
                      >
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 rounded-full">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">
                        Live Verify
                      </span>
                    </div>
                  </a>
                  <p className="mt-2 text-center text-[9px] text-slate-600 font-bold uppercase tracking-wider">
                    Click to verify on YouTube
                  </p>
                </div>
              </div>
            </section>

            {/* Transport Options */}
            {transports.length > 0 && (
              <section className="glass-strong rounded-[2.5rem] p-8">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                  All Transport Options
                </h2>
                <div className="space-y-3">
                  {transports.map((t, i) => (
                    <div
                      key={i}
                      className="glass rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4
                                 hover:bg-white/[0.07] transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-black
                            ${
                              t.type === "train"
                                ? "bg-blue-600/20 text-blue-400"
                                : t.type === "bus"
                                ? "bg-emerald-600/20 text-emerald-400"
                                : t.type === "taxi"
                                ? "bg-amber-600/20 text-amber-400"
                                : "bg-purple-600/20 text-purple-400"
                            }`}
                        >
                          {t.type === "train" ? "🚆" : t.type === "bus" ? "🚌" : t.type === "taxi" ? "🚕" : "🎫"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-white text-sm leading-none mb-1">{t.name}</p>
                          {t.tip && (
                            <p className="text-[11px] text-slate-500 font-medium leading-snug">{t.tip}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 shrink-0">
                        <div className="text-center">
                          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Time</p>
                          <p className="text-sm font-black text-white">{t.duration}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Price</p>
                          <p className="text-sm font-black text-blue-300">{t.priceKRW}</p>
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Hours</p>
                          <p className="text-xs font-bold text-slate-400">
                            {t.firstDeparture}–{t.lastDeparture}
                          </p>
                        </div>
                        <a
                          href={t.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500
                                     text-white text-xs font-black rounded-xl transition-colors shrink-0"
                        >
                          Book <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA: Official Booking */}
            <section className="rounded-[2.5rem] p-8 bg-gradient-to-br from-blue-700 via-blue-800 to-navy flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-500/20">
              <div className="text-center md:text-left">
                <h2 className="text-xl font-black text-white mb-1">
                  Book Your Seat Now
                </h2>
                <p className="text-blue-300 text-sm font-medium">
                  Skip queues. Confirm before you land.
                </p>
              </div>
              <a
                href="https://www.arex.or.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-black
                           rounded-2xl hover:bg-blue-50 transition-colors shrink-0"
              >
                Official Booking <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          </div>
        )}

        {/* ── Wtoko Survival Tip ── */}
        <div className="mt-10 pt-8 border-t border-white/[0.06]">
          <div className="glass rounded-[1.5rem] p-6 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-white mb-1 tracking-tight italic">
                Wtoko Survival Tip
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                If you arrive after 01:00 AM at Incheon, Night Bus N6000 (Gangnam) and N6001 (Seoul Station) are your best options. Taxis add a 40% surcharge after midnight — use Kakao T for transparent pricing. Stay safe!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
