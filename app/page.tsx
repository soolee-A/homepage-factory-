'use client';

import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  PlaneLanding, MapPin, Calendar, Users, Clock, ChevronDown, Check,
  AlertTriangle, Info, Train, Car, Bus, Smartphone, CreditCard,
  Utensils, ShieldCheck, PhoneCall, Heart, Sparkles, Copy, CheckCircle,
  Moon, Sun, Snowflake, Leaf, Flower2, ArrowRight, Globe, Wifi, Plane,
} from 'lucide-react';


// ── Types ──────────────────────────────────────────────────────────────
interface Airport {
  id: string;
  code: string;
  nameEn: string;
  nameKo: string;
  terminal?: string;
  region: string;
  is24h: boolean;
  curfew?: string;
  tip: string;
  shuttleNote?: string;
}

// ── Airport Data ────────────────────────────────────────────────────────
const AIRPORTS: Airport[] = [
  { id: 'icn_t1', code: 'ICN', nameEn: 'Incheon T1', nameKo: '인천 제1터미널', terminal: 'T1', region: 'Seoul / Gyeonggi', is24h: true, tip: 'Take the Shuttle Train inside the terminal to reach Immigration — follow yellow signs.', shuttleNote: 'Shuttle Train required for some gates' },
  { id: 'icn_t2', code: 'ICN', nameEn: 'Incheon T2', nameKo: '인천 제2터미널', terminal: 'T2', region: 'Seoul / Gyeonggi', is24h: true, tip: 'T2 is modern and compact — no shuttle needed. Mostly SkyTeam (Korean Air, Delta).' },
  { id: 'gmp',    code: 'GMP', nameEn: 'Gimpo', nameKo: '김포국제공항', region: 'Seoul City', is24h: false, curfew: '23:00–06:00', tip: 'Closest airport to downtown Seoul. Direct subway to Hongdae in 20 min.' },
  { id: 'pus',    code: 'PUS', nameEn: 'Gimhae', nameKo: '김해국제공항', region: 'Busan', is24h: false, curfew: '23:00–06:00', tip: 'Gateway to southern Korea. Busan subway line 3 connects directly to city center.' },
  { id: 'cju',    code: 'CJU', nameEn: 'Jeju', nameKo: '제주국제공항', region: 'Jeju Island', is24h: false, curfew: '23:00–06:00', tip: 'Direct international arrivals may qualify for 30-day Visa-free entry to Jeju only.' },
  { id: 'cjj',    code: 'CJJ', nameEn: 'Cheongju', nameKo: '청주국제공항', region: 'Central Korea', is24h: false, curfew: '22:00–07:00', tip: 'Small and easy. Popular for K-Pop tours. Airport bus to downtown in 30 min.' },
];

// ── Helpers ─────────────────────────────────────────────────────────────
function addHour(time: string, h = 1): string {
  const [hr, mn] = time.split(':').map(Number);
  const total = (hr + h) % 24;
  return `${String(total).padStart(2, '0')}:${String(mn).padStart(2, '0')}`;
}

function getDayLabel(dateStr: string): { label: string; isWeekend: boolean } {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const parts = dateStr.split('-');
  if (parts.length !== 3) return { label: dateStr, isWeekend: false };
  const d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
  if (isNaN(d.getTime())) return { label: dateStr, isWeekend: false };
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  return { label: `${dateStr} (${days[d.getDay()]})`, isWeekend };
}

function getSeason(dateStr: string) {
  const m = new Date(dateStr).getMonth() + 1;
  if (m >= 3 && m <= 5) return 'Spring';
  if (m >= 6 && m <= 8) return 'Summer';
  if (m >= 9 && m <= 11) return 'Autumn';
  return 'Winter';
}

// ── Copy Button ─────────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="ml-2 p-1 rounded text-slate-400 hover:text-blue-600 transition-colors">
      {copied ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  );
}

// ── Phrase Card ─────────────────────────────────────────────────────────
function PhraseCard({ en, ko, romanized }: { en: string; ko: string; romanized: string }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
      <p className="text-xs text-slate-400 font-semibold mb-1">{en}</p>
      <div className="flex items-center justify-between">
        <p className="text-xl font-black text-slate-900">{ko}</p>
        <CopyBtn text={ko} />
      </div>
      <p className="text-xs text-blue-500 font-medium mt-1 italic">"{romanized}"</p>
    </div>
  );
}

// ── Section Card ────────────────────────────────────────────────────────
function Section({ icon, title, badge, badgeColor = 'blue', children, defaultOpen = false }: {
  icon: React.ReactNode; title: string; badge?: string; badgeColor?: string;
  children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700', red: 'bg-red-50 text-red-600',
    green: 'bg-emerald-50 text-emerald-700', amber: 'bg-amber-50 text-amber-700',
    purple: 'bg-purple-50 text-purple-700',
  };
  return (
    <div className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${open ? 'shadow-xl border-slate-200' : 'shadow-sm border-slate-100 hover:border-blue-200'}`}>
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-5 flex items-center justify-between text-left gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">{icon}</div>
          <div>
            <h3 className="text-base font-black text-slate-900">{title}</h3>
            {badge && <span className={`text-[10px] font-black px-2 py-0.5 rounded-full mt-0.5 inline-block ${colorMap[badgeColor]}`}>{badge}</span>}
          </div>
        </div>
        <ChevronDown size={18} className={`text-slate-300 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-6 pb-7 border-t border-slate-50 pt-5">{children}</div>}
    </div>
  );
}

// ── Main Content Component ──
function MainAppContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedId, setSelectedId] = useState('');
  const [arrivalDate, setArrivalDate] = useState('2026-04-01');
  const [arrivalTime, setArrivalTime] = useState('14:00');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [stayDays, setStayDays] = useState(7);
  const dateRef = useRef<HTMLInputElement>(null);

  // Parse URL Parameters on Load
  useEffect(() => {
    const airportParam = searchParams.get('airport');
    const dateParam = searchParams.get('departureDate');
    const paxParam = searchParams.get('passengers');

    if (airportParam) {
      const cleanParam = airportParam.toUpperCase();
      const match = AIRPORTS.find(a =>
        cleanParam.includes(a.code) ||
        cleanParam.includes(a.nameEn.toUpperCase()) ||
        cleanParam.includes(a.nameKo)
      );
      if (match) setSelectedId(match.id);
    }

    if (dateParam) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
        setArrivalDate(dateParam);
      }
    }

    if (paxParam) {
      const p = parseInt(paxParam);
      if (!isNaN(p) && p > 0) setAdults(p);
    }
  }, [searchParams]);

  const airport = useMemo(() => AIRPORTS.find(a => a.id === selectedId), [selectedId]);
  const totalPax = adults + children;
  const exitTime = useMemo(() => addHour(arrivalTime, 1), [arrivalTime]);
  const isNight = useMemo(() => { const h = +exitTime.split(':')[0]; return h >= 23 || h < 6; }, [exitTime]);
  const season = useMemo(() => getSeason(arrivalDate), [arrivalDate]);
  const dayInfo = useMemo(() => arrivalDate ? getDayLabel(arrivalDate) : null, [arrivalDate]);

  const canProceed = selectedId && arrivalDate;

  // ── STEP 1: Luxury Hero ──────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="relative overflow-hidden">
      {/* ── Dark premium background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0c1a3a] to-slate-900" />

      {/* Ambient glow effects */}
      <div className="absolute top-[-15%] left-[10%] w-[560px] h-[560px] bg-blue-700 rounded-full blur-[220px] opacity-[0.18] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[420px] h-[420px] bg-indigo-600 rounded-full blur-[180px] opacity-[0.14] pointer-events-none" />
      <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] bg-blue-500 rounded-full blur-[160px] opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-12 pb-20">

        {/* ── Hero headline ── */}
        <div className="text-center mb-10">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-7">
            <Sparkles size={11} />
            Korea OSO · 2026 Verified Guide
          </div>

          <h1 className="text-4xl md:text-[3.25rem] font-black text-white tracking-tight leading-[1.08] mb-5">
            Your Trusted Travel<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
              Expert for Korea
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg font-medium max-w-sm mx-auto leading-relaxed mb-7">
            Tell us your arrival details — we generate a step-by-step,
            fact-verified guide tailored precisely to your trip.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
            <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
              <ShieldCheck size={14} /> 100% Fact-Verified
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5 text-blue-400 text-sm font-semibold">
              <Check size={14} /> No Commissions
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5 text-purple-400 text-sm font-semibold">
              <Heart size={14} /> Always Free
            </span>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { num: '50K+', label: 'Travelers Guided', icon: <Users size={15} className="text-blue-400" /> },
            { num: '6', label: 'Korean Airports', icon: <Plane size={15} className="text-indigo-400" /> },
            { num: '24', label: 'Verified Steps', icon: <ShieldCheck size={15} className="text-emerald-400" /> },
          ].map(s => (
            <div key={s.label} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl py-4 px-3 text-center backdrop-blur-sm">
              <div className="flex justify-center mb-1.5">{s.icon}</div>
              <p className="text-[1.4rem] font-black text-white leading-none">{s.num}</p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Form card ── */}
        <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.10] rounded-[2rem] p-6 md:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.55)]">

          <h2 className="text-base font-black text-white mb-5 flex items-center gap-2">
            <MapPin size={17} className="text-blue-400" /> Select Your Arrival Airport
          </h2>

          {/* Airport selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-6">
            {AIRPORTS.map(ap => {
              const sel = selectedId === ap.id;
              return (
                <button
                  key={ap.id}
                  type="button"
                  onClick={() => setSelectedId(ap.id)}
                  className={`relative text-left p-3.5 rounded-xl border transition-all duration-200
                    ${sel
                      ? 'border-blue-500 bg-blue-500/[0.18] shadow-[0_0_24px_rgba(59,130,246,0.22)]'
                      : 'border-white/[0.09] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.07]'}`}
                >
                  {sel && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={8} strokeWidth={3} className="text-white" />
                    </div>
                  )}
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-widest mb-1.5 inline-block
                    ${sel ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                    {ap.code}{ap.terminal ? ` ${ap.terminal}` : ''}
                  </span>
                  <p className={`text-sm font-black leading-tight ${sel ? 'text-white' : 'text-slate-300'}`}>
                    {ap.nameEn}
                  </p>
                  <p className={`text-[10px] font-medium mt-0.5 ${sel ? 'text-blue-300' : 'text-slate-500'}`}>
                    {ap.region}
                  </p>
                  {ap.is24h
                    ? <p className="text-[9px] font-black text-emerald-400 mt-1.5">● 24h Open</p>
                    : <p className="text-[9px] font-black text-rose-400 mt-1.5">✕ Closed {ap.curfew}</p>}
                </button>
              );
            })}
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                <Calendar size={10} className="inline mr-1" /> Arrival Date
              </label>
              <div
                className="relative bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 flex items-center cursor-pointer hover:bg-white/[0.09] focus-within:ring-2 focus-within:ring-blue-500 transition-all"
                onClick={() => dateRef.current?.showPicker()}
              >
                <Calendar size={16} className="text-slate-400 mr-2.5 shrink-0" />
                {dayInfo ? (
                  <span className={`text-sm font-bold ${dayInfo.isWeekend ? 'text-rose-300' : 'text-white'}`}>
                    {dayInfo.label}
                  </span>
                ) : <span className="text-sm text-slate-500">Select date</span>}
                <input
                  ref={dateRef}
                  type="date"
                  value={arrivalDate}
                  onChange={e => setArrivalDate(e.target.value)}
                  className="sr-only"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                <Clock size={10} className="inline mr-1" /> Landing Time
              </label>
              <div className="relative bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 flex items-center hover:bg-white/[0.09] focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <Clock size={16} className="text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="time"
                  value={arrivalTime}
                  onChange={e => setArrivalTime(e.target.value)}
                  className="bg-transparent outline-none font-bold text-white text-sm w-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Pax + Stay row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {([
              { label: 'Adults', value: adults, setter: setAdults, min: 1 },
              { label: 'Children', value: children, setter: setChildren, min: 0 },
              { label: 'Stay (days)', value: stayDays, setter: setStayDays, min: 1 },
            ] as const).map(({ label, value, setter, min }) => (
              <div key={label}>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  {label}
                </label>
                <div className="flex items-center bg-white/[0.05] border border-white/[0.09] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setter(Math.max(min, value - 1))}
                    className="px-3 py-3 text-slate-300 hover:bg-white/10 font-bold text-lg leading-none transition-colors"
                  >−</button>
                  <span className="flex-1 text-center font-black text-white">{value}</span>
                  <button
                    onClick={() => setter(value + 1)}
                    className="px-3 py-3 text-slate-300 hover:bg-white/10 font-bold text-lg leading-none transition-colors"
                  >+</button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => canProceed && setStep(2)}
            disabled={!canProceed}
            className={`w-full py-4 font-black text-base rounded-2xl transition-all duration-200 flex items-center justify-center gap-2
              ${canProceed
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_36px_rgba(59,130,246,0.38)] hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(59,130,246,0.52)]'
                : 'bg-white/[0.05] border border-white/[0.09] text-slate-500 cursor-not-allowed'}`}
          >
            {canProceed
              ? <><span>Build My Personal Guide</span><ArrowRight size={18} /></>
              : 'Select an airport to continue'}
          </button>
        </div>

        {/* ── Bottom trust line ── */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mt-7">
          <p className="text-[11px] text-slate-500 font-medium">
            Trusted by travelers from 80+ countries
          </p>
          <span className="hidden sm:block w-px h-3 bg-white/10" />
          <p className="text-[11px] text-slate-500 font-medium">
            Updated March 2026
          </p>
          <span className="hidden sm:block w-px h-3 bg-white/10" />
          <p className="text-[11px] text-slate-500 font-medium">
            No sign-up required
          </p>
        </div>
      </div>
    </div>
  );

  // ── STEP 2: Personalized Guide ──────────────────────────────────────
  const renderStep2 = () => {
    if (!airport) return null;
    const seasonIcon = { Spring: <Flower2 size={20} className="text-pink-500" />, Summer: <Sun size={20} className="text-yellow-500" />, Autumn: <Leaf size={20} className="text-orange-500" />, Winter: <Snowflake size={20} className="text-sky-500" /> }[season as 'Spring' | 'Summer' | 'Autumn' | 'Winter'];

    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[2rem] p-6 md:p-8 text-white">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
            <div>
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Your Personalized Guide</p>
              <h2 className="text-2xl font-black leading-tight">
                {airport.nameEn} <span className="text-blue-300">({airport.code}{airport.terminal ? ' ' + airport.terminal : ''})</span>
              </h2>
              <p className="text-slate-400 text-sm font-semibold mt-1">{airport.region}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end mb-1">
                {seasonIcon}
                <span className="font-black text-sm">{season}</span>
              </div>
              <p className="text-slate-400 text-xs font-semibold">{dayInfo?.label}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 ${isNight ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
              {isNight ? <Moon size={12} /> : <Sun size={12} />}
              {isNight ? `Late-night arrival (exit ~${exitTime})` : `Daytime arrival (exit ~${exitTime})`}
            </span>
            <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-black flex items-center gap-1">
              <Users size={12} /> {totalPax} {totalPax === 1 ? 'traveler' : 'travelers'}{children > 0 ? ` (${children} child${children > 1 ? 'ren' : ''})` : ''}
            </span>
            <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-black flex items-center gap-1">
              <Calendar size={12} /> {stayDays}-day stay
            </span>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2">
            <Info size={14} className="text-blue-300 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-slate-300">{airport.tip}</p>
          </div>
        </div>

        <Section icon={<ShieldCheck size={20} className="text-blue-600" />} title="Immigration & Customs" badge="Step 1 · At the Airport" badgeColor="blue" defaultOpen>
          <div className="space-y-4 text-xs font-medium text-slate-600 leading-relaxed">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
              <h4 className="font-black text-red-700 text-sm mb-2 flex items-center gap-1.5"><AlertTriangle size={14} /> Security Notice</h4>
              <p>Photography is strictly prohibited in the security area. Remove hats and masks for face recognition.</p>
            </div>
            <p>1. Follow the <strong>Arrivals</strong> signs. If you are in ICN T1 on a foreign airline, you must take the shuttle train first.</p>
            <p>2. Have your <strong>K-ETA</strong> or Visa ready. You can present it on your mobile phone.</p>
            <p>3. Use the automated gates if you have registered for SES (Smart Entry Service).</p>
          </div>
        </Section>

        <Section icon={<Globe size={20} className="text-indigo-500" />} title="Full Survival Guide" badge="New" badgeColor="purple">
          <div className="p-4 bg-slate-50 rounded-2xl text-center">
            <p className="text-sm font-bold text-slate-800 mb-4">Want the complete 24-step master guide for 2026?</p>
            <button
              onClick={() => router.push(`/airport/${airport.code.toLowerCase()}`)}
              className="px-6 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 mx-auto"
            >
              Open Full Guide <ArrowRight size={16} />
            </button>
          </div>
        </Section>

        <div className="flex gap-3 pt-2 pb-8">
          <button onClick={() => setStep(1)}
            className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all">
            ← Change Details
          </button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all">
            Back to Top ↑
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`font-sans ${step === 2 ? 'min-h-screen bg-[#F8FAFC] text-slate-900' : ''}`}>
      {/* Step 2 sub-header: airport context bar */}
      {step === 2 && airport && (
        <div className="bg-white border-b border-slate-100 shadow-sm">
          <div className="container mx-auto px-6 h-11 flex items-center justify-between max-w-3xl">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-blue-600 transition-colors"
            >
              ← Change Details
            </button>
            <div className="flex items-center gap-2 text-xs font-black text-slate-400">
              <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{airport.code}</span>
              <span>{season}</span>
            </div>
          </div>
        </div>
      )}

      <main className={step === 2 ? 'container mx-auto px-4 py-6 max-w-3xl' : ''}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-sm font-bold">Loading…</div>}>
      <MainAppContent />
    </Suspense>
  );
}
