'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  PlaneLanding, MapPin, Calendar, Users, Clock, ChevronDown, Check,
  AlertTriangle, Info, Train, Car, Bus, Smartphone, CreditCard,
  Utensils, ShieldCheck, PhoneCall, Heart, Sparkles, Copy, CheckCircle,
  Moon, Sun, Snowflake, Leaf, Flower2, ArrowRight, Globe, Wifi,
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

// ── Main App ────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedId, setSelectedId] = useState('');
  const [arrivalDate, setArrivalDate] = useState('2026-04-01');
  const [arrivalTime, setArrivalTime] = useState('14:00');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [stayDays, setStayDays] = useState(7);
  const dateRef = useRef<HTMLInputElement>(null);

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
      {/* Hero */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles size={12} /> Korea Travel Guide · Free
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Your Personalized<br />Korea Arrival Guide
        </h1>
        <p className="text-slate-500 font-semibold max-w-md mx-auto leading-relaxed">
          Tell us how you arrive — we'll build a step-by-step guide tailored exactly to you.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 md:p-8">
        <h2 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" /> Select Your Arrival Airport
        </h2>

        {/* Airport Grid */}
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
          {/* Arrival Date */}
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

          {/* Arrival Time */}
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
          {/* Adults */}
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
          {/* Children */}
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
          {/* Stay */}
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
    const seasonIcon = { Spring: <Flower2 size={20} className="text-pink-500" />, Summer: <Sun size={20} className="text-yellow-500" />, Autumn: <Leaf size={20} className="text-orange-500" />, Winter: <Snowflake size={20} className="text-sky-500" /> }[season];

    return (
      <div className="max-w-3xl mx-auto space-y-4">

        {/* Personalized Header */}
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

          {/* Smart Summary Pills */}
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

          {/* Airport-specific alert */}
          {airport.shuttleNote && (
            <div className="mt-4 bg-amber-500/20 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-amber-200">{airport.tip}</p>
            </div>
          )}
          {!airport.shuttleNote && (
            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2">
              <Info size={14} className="text-blue-300 shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-300">{airport.tip}</p>
            </div>
          )}
        </div>

        {/* ─ Section 1: Immigration & Customs ─ */}
        <Section icon={<ShieldCheck size={20} className="text-blue-600" />} title="Immigration & Customs" badge="Step 1 · At the Airport" badgeColor="blue" defaultOpen>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
              <h4 className="font-black text-red-700 text-sm mb-2 flex items-center gap-1.5"><AlertTriangle size={14} /> Before You Queue</h4>
              <ul className="space-y-1.5 text-xs font-semibold text-red-800">
                <li>• <strong>Remove hat, mask, glasses</strong> — face recognition at immigration kiosk</li>
                <li>• <strong>No photos or video</strong> between landing and baggage claim — phones may be confiscated</li>
                <li>• <strong>K-ETA required</strong> for most nationalities — must apply before departure at eta.go.kr</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-2xl p-4">
                <h4 className="font-black text-blue-900 text-sm mb-2">🛂 Immigration Flow</h4>
                <ol className="text-xs text-blue-800 font-semibold space-y-1">
                  <li>1. Follow <strong>Arrivals (도착)</strong> signs</li>
                  {airport.id === 'icn_t1' && <li>2. ⚠️ Take <strong>Shuttle Train</strong> (yellow signs)</li>}
                  <li>{airport.id === 'icn_t1' ? '3' : '2'}. Use <strong>automated kiosk</strong> if eligible</li>
                  <li>{airport.id === 'icn_t1' ? '4' : '3'}. Collect <strong>baggage</strong> on Level 1</li>
                  <li>{airport.id === 'icn_t1' ? '5' : '4'}. <strong>Customs</strong> — declare if needed</li>
                </ol>
              </div>
              <div className="bg-amber-50 rounded-2xl p-4">
                <h4 className="font-black text-amber-900 text-sm mb-2">🧳 Customs — What to Declare</h4>
                <ul className="text-xs text-amber-800 font-semibold space-y-1">
                  <li>• Cash over <strong>$10,000 USD</strong></li>
                  <li>• Duty-free goods over <strong>$800 USD</strong></li>
                  <li>• Alcohol over <strong>1L</strong> or tobacco over <strong>200 cigarettes</strong></li>
                  <li>• Food, plants, meat products</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">📺 Video Guide — Incheon Immigration Walk-through</p>
              <div className="space-y-2">
                {[['0:00', 'Landing & deplaning tips'], ['1:15', 'Shuttle train to main terminal (T1 only)'], ['2:40', 'Immigration kiosk vs. officer lane'], ['4:10', 'Baggage claim & carousel tips'], ['5:30', 'Customs red vs. green lane']].map(([t, d]) => (
                  <div key={t} className="flex gap-3 text-xs"><span className="font-black text-blue-400 tabular-nums shrink-0">{t}</span><span className="text-slate-300 font-semibold">{d}</span></div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ─ Section 2: Smart Transport ─ */}
        <Section icon={<Train size={20} className="text-emerald-600" />} title="Getting to the City" badge={isNight ? '⚠ Night Mode Active' : '✓ All Options Available'} badgeColor={isNight ? 'red' : 'green'} defaultOpen>
          <div className="space-y-4">
            {/* AI Recommendation */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3"><Sparkles size={14} className="text-amber-400" /><span className="text-xs font-black text-amber-400 uppercase tracking-widest">Best Option for You</span></div>
              <div className="flex items-center gap-4">
                <div className="text-4xl shrink-0">
                  {totalPax >= 4 ? '🚐' : isNight ? '🚕' : airport.id.startsWith('icn') ? '🚆' : '🚌'}
                </div>
                <div>
                  <h4 className="font-black text-lg">
                    {totalPax >= 4 ? 'Private Airport Van' : isNight ? 'Night Bus / Taxi' : airport.id.startsWith('icn') ? 'AREX Express Train' : 'Airport Limousine Bus'}
                  </h4>
                  <p className="text-slate-400 text-sm font-semibold mt-1">
                    {totalPax >= 4
                      ? `${totalPax} people + luggage = van is cheaper & more comfortable than 2 taxis. Book on Klook.`
                      : isNight
                      ? `Exit at ~${exitTime}. Regular trains stopped. Use N-Bus or Kakao T app for taxi.`
                      : airport.id.startsWith('icn')
                      ? `Departs every 40 min from B1 (orange gates). ₩11,000 to Seoul Station in 43 min.`
                      : `Direct bus to major hotels. Check airport bus counter on Arrival Level 1.`}
                  </p>
                </div>
              </div>
            </div>

            {/* All Options */}
            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  icon: <Train size={16} />, name: 'AREX Express Train', color: 'blue',
                  available: !isNight && airport.id.startsWith('icn'),
                  price: '₩11,000', time: '43 min to Seoul Station',
                  tip: 'B1 level, Orange gates. Buy at kiosk — card or cash. Runs 05:20–22:40.',
                },
                {
                  icon: <Bus size={16} />, name: 'Airport Limousine Bus', color: 'green',
                  available: !isNight,
                  price: '₩16,000–25,000', time: '60–90 min depending on traffic',
                  tip: 'Level 1, outside Arrivals. Buy at counter or machine. Goes direct to major hotel areas.',
                },
                {
                  icon: <Car size={16} />, name: 'Kakao T Taxi', color: 'amber',
                  available: true,
                  price: `₩${airport.id.startsWith('icn') ? '60,000–90,000' : '15,000–40,000'}`, time: 'Door to door',
                  tip: 'Download Kakao T app. Set pickup to "Arrivals Exit." Black Taxi = premium, no price gouging.',
                },
                {
                  icon: <Car size={16} />, name: 'Private Van (Klook/Viator)', color: 'purple',
                  available: totalPax >= 3,
                  price: '₩80,000–150,000 total', time: 'Door to door',
                  tip: `Best for ${totalPax >= 4 ? 'your group' : 'groups of 3+'}. Pre-book online. Driver meets you at arrivals.`,
                },
              ].map(opt => (
                <div key={opt.name} className={`rounded-2xl p-4 border-2 ${!opt.available ? 'opacity-40 border-slate-100 bg-slate-50' : 'border-slate-100 bg-white'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-black text-slate-900 text-sm">{opt.icon} {opt.name}</div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${!opt.available ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-700'}`}>
                      {!opt.available ? 'Not available now' : 'Available'}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500 font-semibold mb-2">
                    <span>💰 {opt.price}</span><span>⏱ {opt.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{opt.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─ Section 3: First Hour Checklist ─ */}
        <Section icon={<CheckCircle size={20} className="text-amber-500" />} title="First Hour Checklist" badge="Do This Before Leaving the Airport" badgeColor="amber">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                <h4 className="font-black text-purple-900 text-sm mb-3 flex items-center gap-2"><Smartphone size={14} /> SIM / Data</h4>
                <div className="space-y-2 text-xs text-purple-800 font-semibold">
                  <p>✅ <strong>Best: eSIM</strong> — buy before departure (Airalo, Ubigi). Activates on landing.</p>
                  <p>✅ <strong>Physical SIM:</strong> Available at CU convenience store inside arrivals. KT/SK/LG.</p>
                  <p>❌ <strong>Avoid:</strong> Roaming from your home country — very expensive.</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                <h4 className="font-black text-green-900 text-sm mb-3 flex items-center gap-2"><CreditCard size={14} /> Money & Cards</h4>
                <div className="space-y-2 text-xs text-green-800 font-semibold">
                  <p>💡 Exchange only <strong>50,000–100,000 won</strong> at airport (bad rates).</p>
                  <p>✅ Get a <strong>T-money card</strong> at convenience store (₩2,500). Tap for all transit.</p>
                  <p>✅ Best rates: <strong>Myeongdong</strong> money changers or WOWPASS kiosk at subway.</p>
                  <p>✅ Visa/Mastercard accepted almost everywhere in Seoul.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <h4 className="font-black text-slate-800 text-sm mb-3">📱 Essential Apps — Download Now</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['Naver Maps', 'Best for navigation in Korea'],
                  ['Kakao T', 'Taxi booking — fair prices'],
                  ['Papago', 'Naver translator — works offline'],
                  ['Coupang Eats', 'Food delivery to your accommodation'],
                ].map(([app, desc]) => (
                  <div key={app} className="bg-white rounded-xl p-3 border border-slate-100">
                    <p className="font-black text-slate-900 text-xs">{app}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ─ Section 4: Culture & Etiquette ─ */}
        <Section icon={<Heart size={20} className="text-rose-500" />} title="Korean Culture Survival Guide" badge="Avoid Embarrassment" badgeColor="red">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { emoji: '🚫', title: 'No Tipping', body: 'Tipping is NOT done in Korea — not at restaurants, hotels, or taxis. Offering a tip can feel rude.' },
                { emoji: '👟', title: 'Shoes Off Indoors', body: 'Remove shoes when entering homes, guesthouses, and some traditional restaurants (look for raised floor).' },
                { emoji: '🤫', title: 'Quiet in Public', body: 'Keep phone calls short and voices low on public transit. Priority seats (pink) are strictly for elderly.' },
                { emoji: '🍺', title: 'Drinking Etiquette', body: 'Pour drinks for others, not yourself. Accept with two hands. Say "Geonbae!" (건배) for cheers.' },
                { emoji: '👴', title: 'Respect Elders', body: 'Bow slightly when greeting older people. Let elderly passengers board first.' },
                { emoji: '🗑️', title: 'Trash Rules', body: 'Buy designated bags at convenience stores (종량제 봉투). Separate food waste. Fines for violations.' },
              ].map(item => (
                <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-4">
                  <p className="text-2xl mb-2">{item.emoji}</p>
                  <h4 className="font-black text-slate-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─ Section 5: Season Guide ─ */}
        <Section icon={seasonIcon} title={`${season} in Korea — What to Know`} badge={`Arrival: ${dayInfo?.label ?? ''}`} badgeColor="purple">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h4 className="font-black text-slate-900 text-sm mb-2">🌡️ Weather & Clothing</h4>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  {season === 'Spring' && 'Avg 10–18°C. Temperature swings daily — layers essential. High fine dust (미세먼지) in March–April. Bring or buy a KF94 mask.'}
                  {season === 'Summer' && 'Avg 25–35°C with high humidity. Rainy season (장마) June–July. Carry a compact umbrella daily. Light, breathable clothing only.'}
                  {season === 'Autumn' && 'Avg 12–22°C. Best weather of the year. Light jacket for evenings. Peak foliage late October — book accommodation early.'}
                  {season === 'Winter' && 'Avg -5–5°C. Wind makes it feel colder. Long down parka + heattech base layer essential. Ondol (floor heating) in traditional stays.'}
                </p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h4 className="font-black text-slate-900 text-sm mb-2">📅 {season} Events</h4>
                <ul className="text-xs text-slate-600 font-semibold space-y-1">
                  {season === 'Spring' && <>
                    <li>🌸 Cherry blossom festival (late March–April)</li>
                    <li>🎡 Jinhae Gunhangje Festival</li>
                    <li>🌷 Yeouido Spring Flower Festival</li>
                  </>}
                  {season === 'Summer' && <>
                    <li>🎵 Boryeong Mud Festival (July)</li>
                    <li>🌊 Busan International Film Festival (October prep)</li>
                    <li>🏖️ Beach season on Haeundae</li>
                  </>}
                  {season === 'Autumn' && <>
                    <li>🍁 Naejangsan foliage hiking (October)</li>
                    <li>🎬 Busan International Film Festival</li>
                    <li>🏛️ Seoul Lantern Festival (November)</li>
                  </>}
                  {season === 'Winter' && <>
                    <li>⛷️ Ski resorts open (December–February)</li>
                    <li>🎆 New Year sunrise events at Jeongdongjin</li>
                    <li>🏮 Hwacheon Sancheoneo Ice Festival</li>
                  </>}
                </ul>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">📺 {season} Korea Travel Tips</p>
              <div className="space-y-2">
                {(season === 'Spring'
                  ? [['0:00','Cherry blossom spots ranking'],['1:30','Fine dust: KF94 vs KF80 masks'],['3:00','Best cherry blossom locations'],['4:45','Spring clothing packing list']]
                  : season === 'Summer'
                  ? [['0:00','Rainy season survival tips'],['1:20','Best beaches near Seoul'],['2:45','Air conditioning culture'],['4:00','Must-try summer foods']]
                  : season === 'Autumn'
                  ? [['0:00','Top foliage hiking trails'],['1:45','Autumn festival guide'],['3:10','Photography spots'],['4:30','Jacket packing tips']]
                  : [['0:00','Winter clothing essentials'],['1:30','Ski resort guide'],['3:00','Ondol & staying warm'],['4:15','Winter street food']]
                ).map(([t, d]) => (
                  <div key={t} className="flex gap-3 text-xs"><span className="font-black text-blue-400 tabular-nums shrink-0">{t}</span><span className="text-slate-300 font-semibold">{d}</span></div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ─ Section 6: Food Guide ─ */}
        <Section icon={<Utensils size={20} className="text-orange-500" />} title="Korean Food Guide" badge="What, How & Where to Eat" badgeColor="amber">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: '삼겹살 Samgyeopsal', type: 'Pork BBQ', heat: '🌶 None', price: '₩12,000–18,000/person', desc: 'Grilled pork belly at the table. Cook it yourself on the grill. Wrap in lettuce with garlic & sauce.' },
                { name: '비빔밥 Bibimbap', type: 'Mixed Rice', heat: '🌶 Mild', price: '₩8,000–12,000', desc: 'Rice, veggies, egg, gochujang sauce. Mix everything together. Safe for most diets.' },
                { name: '순두부찌개 Sundubu Jjigae', type: 'Soft Tofu Stew', heat: '🌶🌶 Medium', price: '₩8,000–12,000', desc: 'Silky tofu in spicy broth. Comes with rice and small side dishes (banchan) — those are free refills!' },
                { name: '떡볶이 Tteokbokki', type: 'Street Food', heat: '🌶🌶🌶 Hot', price: '₩3,000–5,000', desc: 'Chewy rice cakes in sweet-spicy sauce. Most iconic Korean street food. Find at pojangmacha stalls.' },
              ].map(f => (
                <div key={f.name} className="bg-white border border-slate-100 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-black text-slate-900 text-sm">{f.name}</h4>
                    <span className="text-xs font-bold text-slate-400 ml-2 shrink-0">{f.price}</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] font-black bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">{f.type}</span>
                    <span className="text-[10px] font-black bg-red-50 text-red-500 px-2 py-0.5 rounded-full">{f.heat}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 rounded-2xl p-4">
              <h4 className="font-black text-blue-900 text-sm mb-3">🗣️ Useful Phrases for Restaurants</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <PhraseCard en="I'm allergic to peanuts" ko="땅콩 알레르기가 있어요" romanized="Ttangkong allereugi ga isseoyo" />
                <PhraseCard en="Not spicy please" ko="안 맵게 해주세요" romanized="An maepge haejuseyo" />
                <PhraseCard en="The bill please" ko="계산서 주세요" romanized="Gyesanseo juseyo" />
                <PhraseCard en="Delicious!" ko="맛있어요!" romanized="Masisseoyo!" />
              </div>
            </div>
          </div>
        </Section>

        {/* ─ Section 7: Getting Around Korea ─ */}
        <Section icon={<Globe size={20} className="text-indigo-500" />} title="Getting Around Korea" badge="Subway · Bus · KTX · Taxi" badgeColor="purple">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h4 className="font-black text-slate-900 text-sm mb-2 flex items-center gap-2"><Train size={14} /> Subway (지하철)</h4>
                <ul className="text-xs text-slate-600 font-semibold space-y-1">
                  <li>✅ Most reliable city transport</li>
                  <li>✅ All signs in English + color-coded</li>
                  <li>✅ Tap T-money card to enter/exit</li>
                  <li>💰 Base fare ~₩1,400 per ride</li>
                  <li>📱 Use <strong>Naver Maps</strong> or <strong>Subway Korea</strong> app</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h4 className="font-black text-slate-900 text-sm mb-2 flex items-center gap-2"><Car size={14} /> Taxi Tips</h4>
                <ul className="text-xs text-slate-600 font-semibold space-y-1">
                  <li>✅ Use <strong>Kakao T</strong> app — fair metered prices</li>
                  <li>✅ Show address in Korean on your phone</li>
                  <li>⚠️ Late night surcharge +20%</li>
                  <li>⚠️ Always ask for a receipt (영수증)</li>
                  <li>❌ Never enter unmarked taxis</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h4 className="font-black text-slate-900 text-sm mb-2">🚄 KTX (High Speed Train)</h4>
                <ul className="text-xs text-slate-600 font-semibold space-y-1">
                  <li>✅ Seoul → Busan in 2h 15min</li>
                  <li>✅ Book at <strong>Korail.com</strong> (foreigners get discounts)</li>
                  <li>💰 Seoul–Busan from ₩59,800</li>
                  <li>📍 Departs from Seoul Station or Suseo</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h4 className="font-black text-slate-900 text-sm mb-2">🚌 Intercity Bus</h4>
                <ul className="text-xs text-slate-600 font-semibold space-y-1">
                  <li>✅ Cheaper than KTX</li>
                  <li>✅ Reaches more cities</li>
                  <li>📱 Book via <strong>Kobus.co.kr</strong></li>
                  <li>📍 Departs from Express Bus Terminal (강남구)</li>
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <h4 className="font-black text-amber-900 text-sm mb-2">🗣️ Show This to Your Driver</h4>
              <PhraseCard en="Please take me to this address" ko="이 주소로 가주세요" romanized="I jusoro gajuseyo" />
            </div>
          </div>
        </Section>

        {/* ─ Section 8: Emergency Kit ─ */}
        <Section icon={<PhoneCall size={20} className="text-red-500" />} title="Emergency & SOS Guide" badge="Save These Numbers" badgeColor="red">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { num: '119', label: 'Ambulance / Fire', desc: 'Medical emergency or fire. English operator available.' },
                { num: '112', label: 'Police', desc: 'Crime or safety emergency. English support via interpretation.' },
                { num: '1330', label: 'Tourism Hotline', desc: '24/7 FREE multilingual support. Lost items, translator, directions.' },
              ].map(e => (
                <div key={e.num} className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-black text-red-600 mb-1">{e.num}</p>
                  <p className="font-black text-red-900 text-sm mb-1">{e.label}</p>
                  <p className="text-xs text-red-700 font-medium">{e.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h4 className="font-black text-slate-900 text-sm mb-2">🏥 Medical Emergency</h4>
                <ul className="text-xs text-slate-600 font-semibold space-y-1">
                  <li>✅ Most large hospitals have <strong>International Clinics</strong> with English staff</li>
                  <li>✅ Samsung Seoul Hospital, Severance, Asan — top choices</li>
                  <li>✅ 24h Pharmacy: search <strong>Pharm114.or.kr</strong></li>
                  <li>💡 Bring your travel insurance documents</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h4 className="font-black text-slate-900 text-sm mb-2">📦 Lost Items</h4>
                <ul className="text-xs text-slate-600 font-semibold space-y-1">
                  <li>🚕 Taxi: call <strong>1330</strong> with receipt number</li>
                  <li>🚇 Subway: visit station office or call <strong>1577-1234</strong></li>
                  <li>🌐 Online: <strong>lost112.go.kr</strong> — police lost & found</li>
                  <li>💡 Always photograph your taxi receipt</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-4">
              <h4 className="font-black text-white text-sm mb-3">🗣️ Emergency Phrases — Show Your Phone</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <PhraseCard en="I need an ambulance" ko="구급차가 필요해요" romanized="Gugeupchaga piryohaeyo" />
                <PhraseCard en="Please call the police" ko="경찰을 불러주세요" romanized="Gyeongchal-eul bulleojuseyo" />
                <PhraseCard en="I lost my passport" ko="여권을 잃어버렸어요" romanized="Yeokwon-eul ireoboryeosseoyo" />
                <PhraseCard en="I need a doctor" ko="의사가 필요해요" romanized="Uisa-ga piryohaeyo" />
              </div>
            </div>
          </div>
        </Section>

        {/* ─ Section 9: WiFi & Connectivity ─ */}
        <Section icon={<Wifi size={20} className="text-sky-500" />} title="Stay Connected" badge="SIM · WiFi · Internet" badgeColor="blue">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'eSIM (Recommended)', emoji: '📲', desc: 'Buy before leaving home via Airalo or Ubigi. Activate on landing. No physical card needed. From $8/week.' },
                { title: 'Tourist SIM', emoji: '📦', desc: 'Buy at airport CU store or Pocket WiFi counter. KT, SK, LG. Unlimited data from ₩15,000/week.' },
                { title: 'Pocket WiFi', emoji: '📡', desc: 'Rent at airport. Shares with your group. Return at departure. Good for 4+ people. ~₩6,000/day.' },
              ].map(c => (
                <div key={c.title} className="bg-sky-50 border border-sky-100 rounded-2xl p-4">
                  <p className="text-2xl mb-2">{c.emoji}</p>
                  <h4 className="font-black text-sky-900 text-sm mb-1">{c.title}</h4>
                  <p className="text-xs text-sky-800 font-medium leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-xs font-black text-emerald-800">💡 Korea has free WiFi almost everywhere: subway, cafes, McDonald's, convenience stores, and most tourist spots. You can survive short periods without data!</p>
            </div>
          </div>
        </Section>

        {/* Bottom Actions */}
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

  // ── RENDER ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => setStep(1)} className="flex items-center gap-2 font-black text-slate-900 text-base tracking-tight hover:text-blue-600 transition-colors">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <PlaneLanding size={14} className="text-white" />
            </div>
            Korea OSO Guide
          </button>
          {step === 2 && airport && (
            <div className="flex items-center gap-2 text-xs font-black text-slate-400">
              <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{airport.code}{airport.terminal ? ' ' + airport.terminal : ''}</span>
              <span>{season}</span>
              {isNight && <span className="bg-rose-50 text-rose-500 px-2.5 py-1 rounded-full flex items-center gap-1"><Moon size={10} /> Night</span>}
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
