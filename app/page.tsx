"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  Plane,
} from "lucide-react";
import { airports } from "../Fetch/airportData";

/* ── Taegeuk Symbol (modern gradient yin-yang) ── */
function TaegeukSymbol({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="tg-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5566" />
          <stop offset="100%" stopColor="#CD2E3A" />
        </linearGradient>
        <linearGradient id="tg-blue" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#003478" />
        </linearGradient>
        <clipPath id="tg-outer">
          <circle cx="30" cy="30" r="27" />
        </clipPath>
      </defs>
      {/* Outer glow ring */}
      <circle
        cx="30"
        cy="30"
        r="28"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <g clipPath="url(#tg-outer)">
        {/* Red (Yang) half – top */}
        <path
          d="M30,3 A27,27 0,0,1 30,57 A13.5,13.5 0,0,0 30,30 A13.5,13.5 0,0,1 30,3"
          fill="url(#tg-red)"
        />
        {/* Blue (Eum) half – bottom */}
        <path
          d="M30,57 A27,27 0,0,1 30,3 A13.5,13.5 0,0,0 30,30 A13.5,13.5 0,0,1 30,57"
          fill="url(#tg-blue)"
        />
        {/* Contrast dots */}
        <circle cx="30" cy="16.5" r="6.5" fill="url(#tg-blue)" />
        <circle cx="30" cy="43.5" r="6.5" fill="url(#tg-red)" />
      </g>
    </svg>
  );
}

/* ── Korea Map SVG (decorative, includes Ulleungdo & Dokdo) ── */
function KoreaMapSVG() {
  return (
    <svg
      viewBox="0 0 240 340"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      fill="currentColor"
    >
      {/* Main Peninsula */}
      <path d="M 98,20 C 118,12 142,14 162,28 C 175,38 182,56 182,76 C 182,96 176,116 172,136 C 168,154 164,172 158,190 C 152,206 140,220 124,230 C 108,240 90,242 74,234 C 58,226 46,210 40,192 C 34,174 36,152 42,134 C 46,118 44,102 48,86 C 52,70 62,52 78,36 Z" />
      {/* Jeju Island */}
      <ellipse cx="98" cy="290" rx="32" ry="16" />
      {/* Ulleungdo – East Sea */}
      <circle cx="210" cy="95" r="9" />
      {/* Dokdo – 2 islets */}
      <circle cx="228" cy="110" r="4.5" />
      <circle cx="233" cy="115" r="2.8" />
      {/* Island labels */}
      <text
        x="168"
        y="100"
        fontSize="7"
        opacity="0.55"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Ulleungdo
      </text>
      <text
        x="228"
        y="126"
        fontSize="5.5"
        opacity="0.55"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Dokdo
      </text>
      <text
        x="70"
        y="312"
        fontSize="7"
        opacity="0.55"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Jeju
      </text>
    </svg>
  );
}

/* ── Mugunghwa (Rose of Sharon) flower watermark ── */
function MugunghwaFlower({ size = 100 }: { size?: number }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="26"
          rx="11"
          ry="23"
          fill="#CD2E3A"
          transform={`rotate(${angle}, 50, 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="9" fill="#a0192a" />
      <circle cx="50" cy="50" r="5" fill="#ffcdd2" />
    </svg>
  );
}

/* ── Airport code badge colors ── */
const airportAccents: Record<string, string> = {
  ICN: "from-blue-600 to-blue-800",
  GMP: "from-indigo-600 to-indigo-800",
  CJU: "from-emerald-600 to-teal-700",
  CJJ: "from-violet-600 to-purple-800",
};

export default function WtokoLandingPage() {
  const router = useRouter();

  const handleAirportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (code) router.push(`/airport/${code}`);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col relative overflow-hidden font-sans">

      {/* ── Background: Korea Map SVG ── */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 w-[440px] h-[600px]
                   text-blue-400/[0.065] pointer-events-none z-0 select-none animate-float"
        style={{ animationDelay: "0s" }}
      >
        <KoreaMapSVG />
      </div>

      {/* ── Background: Mugunghwa watermarks ── */}
      <div className="absolute top-12 left-[38%] opacity-[0.022] pointer-events-none select-none">
        <MugunghwaFlower size={140} />
      </div>
      <div className="absolute bottom-28 right-20 opacity-[0.016] pointer-events-none select-none">
        <MugunghwaFlower size={100} />
      </div>
      <div className="absolute top-[40%] left-[15%] opacity-[0.012] pointer-events-none select-none">
        <MugunghwaFlower size={80} />
      </div>

      {/* ── Background: Gradient glow circles ── */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-blue-700/[0.06] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-60 w-[400px] h-[400px] bg-red-700/[0.05] rounded-full translate-y-1/2 blur-3xl pointer-events-none" />

      {/* ── Header: WTOKO Brand ── */}
      <header className="absolute top-8 left-8 z-20 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <TaegeukSymbol size={46} />
          <div>
            <h1 className="text-2xl font-black text-white tracking-widest leading-none">
              WTOKO
            </h1>
            <p className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.3em] mt-0.5">
              Korea Concierge
            </p>
          </div>
        </div>
      </header>

      {/* ── Sidebar: Arrival Checklist (desktop lg+) ── */}
      <aside
        className="absolute top-28 left-8 w-[300px] z-20 hidden lg:block animate-fade-in-up"
        style={{ animationDelay: "0.25s" }}
      >
        <div className="glass-strong rounded-[2rem] p-6 space-y-4">
          <h2 className="text-[10px] font-black text-white uppercase tracking-[0.25em] flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Arrival Checklist
          </h2>
          <ul className="space-y-3">
            {[
              "Official K-ETA Approval (₩10,000)",
              "Q-Code Registration (Free)",
              "Arrival Time Verified",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <div className="p-3.5 bg-red-950/60 border border-red-700/30 rounded-2xl flex gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-red-300 leading-snug font-bold uppercase tracking-tight">
              Warning: Real K-ETA costs ₩10,000 only. Scam sites are active — use the official government site!
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main: Airport Selector ── */}
      <main className="flex-1 flex items-center justify-center px-6 relative z-10 min-h-screen">
        <div className="w-full max-w-2xl text-center">

          {/* Fact badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       border border-blue-500/25 bg-blue-500/[0.08] text-blue-300
                       text-[10px] font-black uppercase tracking-[0.2em] mb-8
                       animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Fact-Based · Zero Scams · 2026
          </div>

          {/* Hero heading */}
          <div
            className="mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-4">
              Welcome to
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                South Korea
              </span>
            </h2>
            <p className="text-slate-400 text-lg font-medium mt-4">
              Select your arrival airport to get your personalised guide.
            </p>
          </div>

          {/* Airport Selector Card */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="glass-strong rounded-[2.5rem] p-3 mb-3 relative group hover:border-blue-500/30 transition-all duration-300">
              <select
                className="w-full px-6 py-5 bg-transparent text-white text-xl font-black
                           outline-none cursor-pointer appearance-none pr-14"
                onChange={handleAirportChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Arrival Airport
                </option>
                {airports.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.name} ({a.code})
                  </option>
                ))}
              </select>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>

            {/* Quick-pick airport tiles */}
            <div className="grid grid-cols-4 gap-2">
              {airports.map((a) => (
                <button
                  key={a.code}
                  onClick={() => router.push(`/airport/${a.code}`)}
                  className={`relative glass rounded-2xl py-4 px-2 text-center
                             hover:bg-white/10 hover:-translate-y-0.5
                             transition-all duration-200 group overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                               bg-gradient-to-br ${airportAccents[a.code] ?? "from-blue-600 to-blue-800"} rounded-2xl`}
                    style={{ opacity: 0.15 }}
                  />
                  <Plane className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors mx-auto mb-1" />
                  <p className="text-sm font-black text-white">{a.code}</p>
                  <p className="text-[9px] text-slate-500 font-medium truncate mt-0.5">
                    {a.city}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer: 24/7 Inquiry ── */}
      <footer className="absolute bottom-8 right-8 z-20 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <button
          className="group flex items-center gap-3 glass-md rounded-[1.5rem] px-6 py-4
                     hover:bg-white/10 hover:-translate-y-1 transition-all duration-200"
        >
          <div className="text-right">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">
              Have Questions?
            </p>
            <p className="text-sm font-black text-white tracking-tight">24/7 Support</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <MessageCircle className="w-5 h-5 fill-white" />
          </div>
        </button>
      </footer>
    </div>
  );
}
