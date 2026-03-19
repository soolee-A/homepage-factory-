'use client';

import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PlaneLanding, MapPin, Calendar, Users, Clock, ChevronDown, Check,
  AlertTriangle, Info, Train, Car, Bus, Smartphone, CreditCard,
  Utensils, ShieldCheck, PhoneCall, Heart, Sparkles, Copy, CheckCircle,
  Moon, Sun, Snowflake, Leaf, Flower2, ArrowRight, Globe, Wifi, Plane,
} from 'lucide-react';

export const runtime = 'edge';

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

  // ── STEP 1 ─────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles size={12} /> Korea Travel Guide 2026
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Your Personalized<br />Korea Arrival Guide
        </h1>
        <p className="text-slate-500 font-semibold max-w-md mx-auto leading-relaxed">
          Tell us how you arrive — we'll build a step-by-step guide tailored exactly to you.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 md:p-8">
        <h2 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" /> Select Your Arrival Airport
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {AIRPORTS.map(ap => {
            const sel = selectedId === ap.id;
            return (
              <button key={ap.id} type="button" onClick={() => setSelectedId(ap.id)}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200
                  ${sel ? 'border-blue-600 bg-blue-50 shadow-md shadow-blue-100' : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-white hover:shadow-md'}`}>
                {sel && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check size={10} strokeWidth={3} className="text-white" />
                  </div>
                )}
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-widest mb-1.5 inline-block
                  ${sel ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {ap.code}{ap.terminal ? ` ${ap.terminal}` : ''}
                </span>
                <p className={`text-sm font-black leading-tight ${sel ? 'text-blue-900' : 'text-slate-800'}`}>{ap.nameEn}</p>
                <p className={`text-[10px] font-medium mt-0.5 ${sel ? 'text-blue-400' : 'text-slate-400'}`}>{ap.region}</p>
                {ap.is24h
                  ? <p className="text-[9px] font-black text-emerald-600 mt-1">● 24h Open</p>
                  : <p className="text-[9px] font-black text-red-400 mt-1">✕ Closed {ap.curfew}</p>}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <Calendar size={10} className="inline mr-1" /> Arrival Date
            </label>
            <div className="relative bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center cursor-pointer
                            focus-within:ring-2 focus-within:ring-blue-500 transition-all"
              onClick={() => dateRef.current?.showPicker()}>
              <Calendar size={16} className="text-slate-400 mr-2.5 shrink-0" />
              {dayInfo ? (
                <span className={`text-sm font-bold ${dayInfo.isWeekend ? 'text-rose-600' : 'text-slate-900'}`}>
                  {dayInfo.label}
                </span>
              ) : <span className="text-sm text-slate-400">Select date</span>}
              <input ref={dateRef} type="date" value={arrivalDate}
                onChange={e => setArrivalDate(e.target.value)} className="sr-only" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <Clock size={10} className="inline mr-1" /> Flight Landing Time
            </label>
            <div className="relative bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <Clock size={16} className="text-slate-400 mr-2.5 shrink-0" />
              <input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)}
                className="bg-transparent outline-none font-bold text-slate-900 text-sm w-full cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Adults</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setAdults(Math.max(1, adults - 1))}
                className="px-3 py-3 text-slate-500 hover:bg-slate-100 font-bold text-lg leading-none">−</button>
              <span className="flex-1 text-center font-black text-slate-900">{adults}</span>
              <button onClick={() => setAdults(adults + 1)}
                className="px-3 py-3 text-slate-500 hover:bg-slate-100 font-bold text-lg leading-none">+</button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Children</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setChildren(Math.max(0, children - 1))}
                className="px-3 py-3 text-slate-500 hover:bg-slate-100 font-bold text-lg leading-none">−</button>
              <span className="flex-1 text-center font-black text-slate-900">{children}</span>
              <button onClick={() => setChildren(children + 1)}
                className="px-3 py-3 text-slate-500 hover:bg-slate-100 font-bold text-lg leading-none">+</button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Stay (days)</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setStayDays(Math.max(1, stayDays - 1))}
                className="px-3 py-3 text-slate-500 hover:bg-slate-100 font-bold text-lg leading-none">−</button>
              <span className="flex-1 text-center font-black text-slate-900">{stayDays}</span>
              <button onClick={() => setStayDays(stayDays + 1)}
                className="px-3 py-3 text-slate-500 hover:bg-slate-100 font-bold text-lg leading-none">+</button>
            </div>
          </div>
        </div>

        <button
          onClick={() => canProceed && setStep(2)}
          disabled={!canProceed}
          className={`w-full py-4 font-black text-base rounded-2xl transition-all duration-200 flex items-center justify-center gap-2
            ${canProceed ? 'bg-slate-900 hover:bg-blue-600 text-white shadow-lg hover:-translate-y-0.5' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
          {canProceed ? <>Build My Guide <ArrowRight size={18} /></> : 'Select an airport to continue'}
        </button>
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
              Open Full Guide <ArrowRight size={16}/>
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => setStep(1)} className="flex items-center gap-2 font-black text-slate-900 text-base tracking-tight hover:text-blue-600 transition-colors">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane size={14} className="text-white fill-white" />
            </div>
            WTOKO Guide
          </button>
          {step === 2 && airport && (
            <div className="flex items-center gap-2 text-xs font-black text-slate-400">
              <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{airport.code}</span>
              <span>{season}</span>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <MainAppContent />
    </Suspense>
  );
}
