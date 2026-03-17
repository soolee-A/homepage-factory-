'use client';

import React, { useState, useMemo } from 'react';
import {
  MapPin,
  MessageCircle,
  Navigation,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sun,
  Moon,
  AlertCircle,
  ExternalLink,
  Plane,
} from 'lucide-react';
import { survivalArticles } from '../Fetch/articleData';

// ── Types ──────────────────────────────────────────────────────────────────
interface Airport {
  id: string;
  code: string;
  nameEn: string;
}

interface TimeSlot {
  id: string;
  labelEn: string;
  isNight: boolean;
  hours: string;
}

interface TransportOption {
  id: string;
  type: 'train' | 'bus' | 'taxi' | 'rental';
  nameEn: string;
  nameKo: string;
  descriptionEn: string;
  duration: string;
  operatingHours: string;
  usageInstructions: string[];
  youtubeVideoId: string;
  timestampSeconds: number;
}

// ── Static Data ────────────────────────────────────────────────────────────
const airports: Airport[] = [
  { id: 'icn_t1', code: 'ICN', nameEn: 'Incheon — Terminal 1' },
  { id: 'icn_t2', code: 'ICN', nameEn: 'Incheon — Terminal 2' },
  { id: 'gmp',    code: 'GMP', nameEn: "Gimpo Int'l" },
  { id: 'pus',    code: 'PUS', nameEn: "Gimhae (Busan) Int'l" },
  { id: 'cju',    code: 'CJU', nameEn: "Jeju Int'l" },
  { id: 'cjj',    code: 'CJJ', nameEn: "Cheongju Int'l" },
];

const timeSlots: TimeSlot[] = [
  { id: 'day',   labelEn: 'Daytime',    isNight: false, hours: '06:00 – 23:00' },
  { id: 'night', labelEn: 'Late Night', isNight: true,  hours: '23:00 – 06:00' },
];

const transportDatabase: Record<string, TransportOption[]> = {
  // ── ICN T1 ──
  icn_t1_day: [
    {
      id: 'icn_t1_arex', type: 'train',
      nameEn: 'AREX Express', nameKo: '공항철도 직통',
      descriptionEn: 'Non-stop to Seoul Station in 43 minutes. Fastest option.',
      duration: '43 min', operatingHours: '05:23 – 22:48',
      usageInstructions: [
        'Follow orange "AREX" signs to B1 Transportation Center.',
        'Purchase ticket at orange kiosk (₩11,000).',
        'Platform 1 — Express departs every 30 minutes.',
      ],
      youtubeVideoId: '7L_qfT9n27I', timestampSeconds: 75,
    },
    {
      id: 'icn_t1_bus', type: 'bus',
      nameEn: 'KAL Limousine 6001', nameKo: '6001번 공항리무진',
      descriptionEn: 'Direct to Myeong-dong & Dongdaemun. Door-to-hotel service.',
      duration: '75 min', operatingHours: '05:40 – 22:40',
      usageInstructions: [
        'Exit Gate 5 or 6, Ground Floor Arrivals.',
        'Platform 5B — buy ticket at the kiosk before boarding.',
        'Show destination to driver if unsure of stop.',
      ],
      youtubeVideoId: 'Y2XW_K6r8_o', timestampSeconds: 120,
    },
  ],
  icn_t1_night: [
    {
      id: 'icn_t1_nightbus', type: 'bus',
      nameEn: 'N6000 Night Bus', nameKo: 'N6000 심야버스',
      descriptionEn: 'Goes to Gangnam / Express Bus Terminal. AREX is stopped.',
      duration: '70 min', operatingHours: '23:50 – 04:10',
      usageInstructions: [
        'Platform 6A, Ground Floor (Gate 6 area).',
        'T-Money card or contactless credit card — no cash.',
        'N6001 for Seoul Station / Hongik University route.',
      ],
      youtubeVideoId: 'k_H_W0S7kQ0', timestampSeconds: 30,
    },
  ],

  // ── ICN T2 ──
  icn_t2_day: [
    {
      id: 'icn_t2_arex', type: 'train',
      nameEn: 'AREX Express', nameKo: '공항철도 직통',
      descriptionEn: 'Non-stop to Seoul Station in 51 minutes from Terminal 2.',
      duration: '51 min', operatingHours: '05:15 – 22:32',
      usageInstructions: [
        'Follow green "Railroad" signs to B2 level.',
        'Purchase at the orange AREX kiosk (₩11,000).',
        'T2 has fewer express seats — book online if possible.',
      ],
      youtubeVideoId: '7L_qfT9n27I', timestampSeconds: 0,
    },
  ],
  icn_t2_night: [
    {
      id: 'icn_t2_nightbus', type: 'bus',
      nameEn: 'N6000 Night Bus', nameKo: 'N6000 심야버스',
      descriptionEn: 'Night bus service continues after AREX shuts down at T2.',
      duration: '75 min', operatingHours: '00:10 – 04:00',
      usageInstructions: [
        'Exit through Ground Floor Arrivals, Platform 1.',
        'T-Money or contactless card payment only.',
        'Allow extra travel time — late-night traffic can double journey.',
      ],
      youtubeVideoId: 'k_H_W0S7kQ0', timestampSeconds: 30,
    },
  ],

  // ── GMP ──
  gmp_day: [
    {
      id: 'gmp_line9', type: 'train',
      nameEn: 'Metro Line 9 Express', nameKo: '9호선 급행',
      descriptionEn: 'Fastest to Gangnam & Yeouido. Express skips most stops.',
      duration: '30 min', operatingHours: '05:32 – 23:32',
      usageInstructions: [
        'Follow "Subway" signs to underground station.',
        'Board the "급행 Express" — gold colored train.',
        'Exit at Sinnonhyeon (Gangnam) or Yeouido.',
      ],
      youtubeVideoId: 'N7z1Z6y-Z-o', timestampSeconds: 55,
    },
    {
      id: 'gmp_line5', type: 'train',
      nameEn: 'Metro Line 5', nameKo: '5호선',
      descriptionEn: 'Best for city center — Gwanghwamun, Dongdaemun.',
      duration: '45 min', operatingHours: '05:35 – 24:00',
      usageInstructions: [
        'Same underground station — follow purple Line 5 signs.',
        'Direction: Banghwa or Macheon (city center).',
        'T-Money or single-journey ticket ₩1,550.',
      ],
      youtubeVideoId: 'N7z1Z6y-Z-o', timestampSeconds: 0,
    },
  ],
  gmp_night: [],

  // ── PUS ──
  pus_day: [
    {
      id: 'pus_lightrail', type: 'train',
      nameEn: 'Busan-Gimhae Light Rail', nameKo: '부산-김해 경전철',
      descriptionEn: 'Connects directly to Busan Metro Lines 2 and 3.',
      duration: '20 min to subway', operatingHours: '05:00 – 23:30',
      usageInstructions: [
        'Follow purple rail signs through arrival exit.',
        'Board at Gimhae Airport Station.',
        'Transfer to Metro Line 2 at Daejeo or Line 3 at Sasang.',
      ],
      youtubeVideoId: 'pus_rail_guide', timestampSeconds: 55,
    },
  ],
  pus_night: [],

  // ── CJU ──
  cju_day: [
    {
      id: 'cju_bus600', type: 'bus',
      nameEn: 'Limousine Bus 600', nameKo: '600번 리무진버스',
      descriptionEn: 'Direct to downtown Jeju City. Most popular option.',
      duration: '30 min', operatingHours: '06:10 – 22:30',
      usageInstructions: [
        'Exit Gate 5 outside arrivals.',
        'Board Bus 600 — ticket ₩5,500 at kiosk or T-Money.',
        'Stops at Jeju City Hall, Jeju Bus Terminal.',
      ],
      youtubeVideoId: 'xZkABBGOwIY', timestampSeconds: 0,
    },
    {
      id: 'cju_rental', type: 'rental',
      nameEn: 'Rental Car (Recommended)', nameKo: '렌터카 셔틀',
      descriptionEn: 'Jeju has no metro. Renting a car gives full freedom.',
      duration: '5 min shuttle + pickup', operatingHours: '06:00 – 22:00',
      usageInstructions: [
        'Follow "Rental Car 렌터카" signs to Ground Floor.',
        'Free shuttle buses depart every 10 minutes.',
        'All major companies: Lotte, AJ, SK Rent-a-Car.',
      ],
      youtubeVideoId: 'xZkABBGOwIY', timestampSeconds: 90,
    },
  ],
  cju_night: [],

  // ── CJJ ──
  cjj_day: [
    {
      id: 'cjj_bus747', type: 'bus',
      nameEn: 'Express Bus 747 (Seoul)', nameKo: '747번 공항버스',
      descriptionEn: 'Direct to Dong Seoul Bus Terminal. No transfer needed.',
      duration: '90 min', operatingHours: '08:00 – 20:30',
      usageInstructions: [
        'Exit arrivals — bus stop is directly outside.',
        'No reservation needed. Ticket ₩11,200 (buy at kiosk).',
        'Arrives Dong Seoul Terminal (Gangbyeon Station Line 2).',
      ],
      youtubeVideoId: 'p8F5Z5YgMoA', timestampSeconds: 0,
    },
  ],
  cjj_night: [],
};

// ── Taegeuk Symbol ─────────────────────────────────────────────────────────
function TaegeukSymbol() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
      <defs>
        <linearGradient id="hd-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4455" />
          <stop offset="100%" stopColor="#CD2E3A" />
        </linearGradient>
        <linearGradient id="hd-blue" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#003478" />
        </linearGradient>
        <clipPath id="hd-clip">
          <circle cx="50" cy="50" r="45" />
        </clipPath>
      </defs>
      <g clipPath="url(#hd-clip)">
        <path d="M50,5 A45,45 0,0,1 50,95 A22.5,22.5 0,0,0 50,50 A22.5,22.5 0,0,1 50,5" fill="url(#hd-red)" />
        <path d="M50,95 A45,45 0,0,1 50,5 A22.5,22.5 0,0,0 50,50 A22.5,22.5 0,0,1 50,95" fill="url(#hd-blue)" />
        <circle cx="50" cy="27.5" r="11" fill="url(#hd-blue)" />
        <circle cx="50" cy="72.5" r="11" fill="url(#hd-red)" />
      </g>
    </svg>
  );
}

// ── Step Badge ─────────────────────────────────────────────────────────────
function StepBadge({ num, done }: { num: number; done: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black
        transition-all duration-300
        ${done ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}
    >
      {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : num}
    </span>
  );
}

// ── Transport type icon ────────────────────────────────────────────────────
function TransportIcon({ type }: { type: TransportOption['type'] }) {
  const map = { train: '🚄', bus: '🚌', taxi: '🚕', rental: '🚗' };
  return <span className="text-2xl">{map[type]}</span>;
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function WtokoDashboard() {
  const [selectedAirport, setSelectedAirport] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const isReady = !!(selectedAirport && selectedTimeSlot);
  const dbKey = isReady ? `${selectedAirport}_${selectedTimeSlot}` : null;
  const transportOptions: TransportOption[] = dbKey ? (transportDatabase[dbKey] ?? []) : [];

  function handleAirportSelect(id: string) {
    setSelectedAirport(id);
    // Reset time selection when airport changes
    if (selectedAirport !== id) setSelectedTimeSlot(null);
  }

  const displayedArticles = useMemo(() => {
    if (!selectedAirport) return survivalArticles.filter(a => a.tags.includes('all'));
    const specific = survivalArticles.filter(a => a.tags.includes(selectedAirport));
    const common   = survivalArticles.filter(a => a.tags.includes('all'));
    return [...specific, ...common];
  }, [selectedAirport]);

  // Progress label
  const currentAirport = airports.find(a => a.id === selectedAirport);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-x-hidden">

      {/* ── Fixed Header ── */}
      <header className="fixed top-0 left-0 w-full h-20 bg-white/85 backdrop-blur-xl z-50
                         border-b border-slate-100 flex items-center justify-between px-8 md:px-12">
        <div className="flex items-center gap-3">
          <TaegeukSymbol />
          <h1 className="text-2xl font-black tracking-tighter text-slate-900">
            Wtok<span className="text-blue-600">o</span>
          </h1>
        </div>

        {/* Progress indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400">
          <StepBadge num={1} done={!!selectedAirport} />
          <span className={`transition-colors duration-300 ${selectedAirport ? 'text-slate-700' : ''}`}>
            {selectedAirport ? currentAirport?.nameEn : 'Select Airport'}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <StepBadge num={2} done={!!selectedTimeSlot} />
          <span className={`transition-colors duration-300 ${selectedTimeSlot ? 'text-slate-700' : ''}`}>
            {selectedTimeSlot === 'day' ? 'Daytime' : selectedTimeSlot === 'night' ? 'Late Night' : 'Arrival Time'}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <StepBadge num={3} done={isReady} />
          <span>Transport</span>
        </div>

        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-[10px]
                           font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg">
          K-ETA Status
        </button>
      </header>

      <main className="max-w-6xl mx-auto pt-40 pb-32 px-6">

        {/* ── Hero ── */}
        <div className="mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-5 tracking-tight leading-[0.9]">
            Arrival<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600">
              Intelligence.
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
            100% verified transit data and real-time survival guides for your Korea arrival in 2026.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-12 gap-10">

          {/* Left Column: Steps 1 + 2 */}
          <div className="lg:col-span-4 space-y-0">

            {/* ── Step 1: Airport ── */}
            <section className="animate-fade-in-up">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-5
                             flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-600" />
                01 — Select Gateway
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {airports.map((ap) => (
                  <button
                    key={ap.id}
                    onClick={() => handleAirportSelect(ap.id)}
                    className={`group flex items-center justify-between p-4 rounded-2xl border-2
                               transition-all duration-200
                               ${selectedAirport === ap.id
                                 ? 'border-blue-600 bg-white shadow-lg shadow-blue-100/60 scale-[1.01]'
                                 : 'border-slate-100 bg-white/60 hover:border-slate-200 hover:bg-white hover:shadow-md'
                               }`}
                  >
                    <div className="flex items-center gap-3">
                      <Plane className={`w-4 h-4 transition-colors ${selectedAirport === ap.id ? 'text-blue-600' : 'text-slate-300'}`} />
                      <div className="text-left">
                        <div className="text-sm font-black text-slate-900 leading-none">{ap.nameEn}</div>
                        <div className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">{ap.code}</div>
                      </div>
                    </div>
                    {selectedAirport === ap.id && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 animate-fade-in-up" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* ── Step 2: Time (animates in after Step 1) ── */}
            <div
              className={`transition-all duration-500 ease-out
                ${selectedAirport
                  ? 'opacity-100 translate-y-0 max-h-[600px] mt-8'
                  : 'opacity-0 translate-y-4 max-h-0 overflow-hidden mt-0 pointer-events-none'
                }`}
            >
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-5
                               flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-red-500" />
                  02 — Arrival Time
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {timeSlots.map((ts) => (
                    <button
                      key={ts.id}
                      onClick={() => setSelectedTimeSlot(ts.id)}
                      className={`relative overflow-hidden p-5 rounded-3xl border-2 transition-all duration-300
                        flex items-center justify-between group
                        ${selectedTimeSlot === ts.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-2xl scale-[1.01]'
                          : 'border-slate-100 bg-white/60 hover:border-slate-200 hover:bg-white hover:shadow-md'
                        }`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center
                          ${ts.isNight ? 'bg-indigo-900' : 'bg-amber-50'}`}>
                          {ts.isNight
                            ? <Moon className="w-6 h-6 text-indigo-300" />
                            : <Sun  className="w-6 h-6 text-amber-500" />
                          }
                        </div>
                        <div className="text-left">
                          <div className="text-base font-black uppercase tracking-tight">{ts.labelEn}</div>
                          <div className={`text-[11px] font-bold mt-0.5
                            ${selectedTimeSlot === ts.id ? 'text-slate-400' : 'text-slate-400'}`}>
                            {ts.hours}
                          </div>
                        </div>
                      </div>
                      {selectedTimeSlot === ts.id && (
                        <CheckCircle2 className="w-5 h-5 text-blue-400 relative z-10" />
                      )}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Step 3 — Transport Results */}
          <div className="lg:col-span-8">

            {/* Not ready: placeholder */}
            <div
              className={`transition-all duration-500 ease-out absolute-placeholder
                ${isReady ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}
            >
              <div className="h-full min-h-[520px] flex flex-col items-center justify-center text-center
                              space-y-6 bg-white/50 backdrop-blur-xl rounded-[3rem] border-2 border-dashed
                              border-slate-200">
                <Navigation className="w-14 h-14 text-slate-200 animate-pulse" />
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Ready for Arrival?</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                    {!selectedAirport
                      ? '← Select your gateway airport to begin'
                      : '← Now select your arrival time window'}
                  </p>
                </div>
                <div className="flex gap-3">
                  {[1, 2, 3].map(n => (
                    <div key={n}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                        ${n === 1 && selectedAirport ? 'bg-blue-600 scale-125'
                          : n === 2 && selectedTimeSlot ? 'bg-blue-600 scale-125'
                          : n === 3 && isReady ? 'bg-blue-600 scale-125'
                          : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Ready: transport cards */}
            {isReady && (
              <div className={`space-y-5 transition-all duration-700 ease-out
                ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                {/* Info banner */}
                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <p className="text-xs font-bold text-amber-800">
                    Times show first/last departures. Arrive at the stop 10 min early.
                  </p>
                </div>

                {/* Transport options */}
                {transportOptions.length > 0 ? (
                  transportOptions.map((opt, i) => (
                    <div
                      key={opt.id}
                      className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl
                                 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300
                                 relative overflow-hidden group animate-fade-in-up"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    >
                      {/* Operating hours badge */}
                      <div className="absolute top-0 right-10 bg-blue-600 text-white px-5 py-2 rounded-b-2xl shadow-lg">
                        <div className="text-[9px] font-black uppercase tracking-widest text-blue-200 mb-0.5">
                          Operating Hours
                        </div>
                        <div className="text-sm font-black flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {opt.operatingHours}
                        </div>
                      </div>

                      {/* Card header */}
                      <div className="flex items-center gap-5 mb-7 mt-3">
                        <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center
                                        text-2xl shadow-xl group-hover:scale-105 transition-transform">
                          <TransportIcon type={opt.type} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                            {opt.nameEn}
                          </h4>
                          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {opt.nameKo}
                          </p>
                          <span className="inline-block mt-2 text-xs font-black text-blue-600
                                           bg-blue-50 px-3 py-1 rounded-full">
                            {opt.duration}
                          </span>
                        </div>
                      </div>

                      {/* Instructions + Video */}
                      <div className="grid md:grid-cols-2 gap-8 mb-7">
                        <div>
                          <p className="text-slate-600 font-medium italic text-sm mb-5 leading-relaxed">
                            &ldquo;{opt.descriptionEn}&rdquo;
                          </p>
                          <div className="space-y-3">
                            {opt.usageInstructions.map((inst, j) => (
                              <div key={j} className="flex items-start gap-3">
                                <div className="w-5 h-5 bg-slate-100 text-slate-700 rounded-full
                                                flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                                  {j + 1}
                                </div>
                                <p className="text-xs font-bold text-slate-700 leading-relaxed">{inst}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* YouTube video placeholder */}
                        <a
                          href={`https://youtube.com/watch?v=${opt.youtubeVideoId}&t=${opt.timestampSeconds}s`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative overflow-hidden rounded-3xl bg-slate-900 aspect-video
                                     flex flex-col items-center justify-center border border-slate-800
                                     group/video hover:border-red-500 transition-all duration-200"
                        >
                          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center
                                          shadow-2xl group-hover/video:scale-110 transition-transform mb-3">
                            <div className="w-0 h-0 border-t-[9px] border-t-transparent
                                            border-l-[16px] border-l-white
                                            border-b-[9px] border-b-transparent ml-1" />
                          </div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Verify Route on YouTube
                          </p>
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/80 rounded-full">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">
                              Live Verify
                            </span>
                          </div>
                        </a>
                      </div>

                      {/* CTA */}
                      <a
                        href={`https://youtube.com/watch?v=${opt.youtubeVideoId}&t=${opt.timestampSeconds}s`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white
                                   py-4 rounded-2xl font-black uppercase tracking-widest text-xs
                                   hover:bg-blue-600 transition-colors"
                      >
                        Verify Route via Video Guide <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))
                ) : (
                  // No transport available (night curfew airports)
                  <div className="bg-white/50 border-2 border-dashed border-slate-200
                                  rounded-[3rem] p-16 text-center animate-fade-in-up">
                    <Moon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="font-black text-slate-500 text-lg tracking-tighter mb-2">
                      Night Curfew in Effect
                    </p>
                    <p className="text-sm text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
                      This airport observes a strict night curfew. No public transport operates.
                      Pre-book a private transfer or stay near the airport.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Survival Guides ── */}
        <section className="mt-32">
          <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-8">
            <div>
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">
                Essential Concierge
              </h3>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {selectedAirport
                  ? `Essential for ${currentAirport?.code}`
                  : 'Survival Guides'}
              </h2>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Last Updated
              </p>
              <p className="text-base font-black text-slate-900">March 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article, i) => {
              const isSpecific = selectedAirport && article.tags.includes(selectedAirport);
              return (
                <div
                  key={article.id}
                  className={`group p-8 rounded-[2.5rem] border-2 transition-all duration-300
                              cursor-pointer hover:shadow-xl hover:-translate-y-0.5 animate-fade-in-up
                              ${isSpecific
                                ? 'border-blue-600 bg-white shadow-lg shadow-blue-50'
                                : 'border-slate-100 bg-white/60 hover:border-slate-200 hover:bg-white'
                              }`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest
                      ${isSpecific ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {article.category}
                    </span>
                    {isSpecific && (
                      <span className="text-[10px] font-black text-blue-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> MUST READ
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-3 leading-tight
                                 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-1.5 text-blue-600 font-bold text-sm">
                    Full Guide
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ── Fixed Footer CTA ── */}
      <footer className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center gap-4 bg-white border border-slate-100 p-2.5 pl-6
                           rounded-full shadow-2xl hover:-translate-y-1 transition-all duration-200 group">
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">
              Need help?
            </p>
            <p className="text-xs font-black text-slate-900 tracking-tight">AI Concierge</p>
          </div>
          <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center
                          text-white shadow-lg group-hover:rotate-12 transition-transform">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
        </button>
      </footer>
    </div>
  );
}
