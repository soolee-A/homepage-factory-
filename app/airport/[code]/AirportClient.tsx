"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, ArrowLeft, Youtube, ExternalLink,
  Zap, Train, Bus, Car, Smartphone, CreditCard, 
  Utensils, Heart, ShoppingBag, Navigation, 
  Info, Plane, Send, Globe, Trash2, AlertTriangle,
  Stethoscope, ThermometerSnowflake, Ticket, CameraOff
} from "lucide-react";
import {
  airports,
  transportData,
} from "../../../Fetch/airportData";

/* ── UI Components ── */
function AhaPoint({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/[0.05] border-l-4 border-blue-500 p-4 rounded-r-2xl my-4">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4 text-blue-500" />
        <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest">Aha! Insight</span>
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <div className="text-slate-400 text-xs leading-relaxed">{children}</div>
    </div>
  );
}

function YouTubeTimeline({ search, timeline }: { search: string; timeline: { time: string; desc: string }[] }) {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden mt-4">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-500" />
          <span className="text-slate-300 text-[10px] font-black uppercase tracking-wider">Visual Guide Timeline</span>
        </div>
        <a 
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(search)}`} 
          target="_blank" rel="noopener noreferrer"
          className="text-[10px] text-blue-400 font-bold hover:underline flex items-center gap-1"
        >
          Watch on YouTube <ExternalLink size={10} />
        </a>
      </div>
      <div className="p-4 space-y-3">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-blue-500 font-black text-[10px] tabular-nums bg-blue-500/10 px-1.5 py-0.5 rounded shrink-0">{item.time}</span>
            <span className="text-slate-400 text-[11px] font-medium leading-relaxed">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AirportClient({ code: rawCode }: { code: string }) {
  const router = useRouter();
  const code = rawCode.toUpperCase();
  const airport = airports.find((a) => a.code === code);
  const transports = transportData[code] ?? [];

  if (!airport) return null;

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans pb-20 text-slate-200">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 pt-10 relative">
        {/* Nav */}
        <nav className="flex items-center justify-between mb-16">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-all">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-white font-black tracking-[0.2em] text-xs uppercase">Wtoko Master Guide 2026</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/[0.08] text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Fact-Based Guide
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-none mb-6">
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{airport.code}</span>
          </h1>
          <p className="text-xl font-bold text-slate-400">Everything you need to survive and thrive in Korea.</p>
        </header>

        {/* Section 1: Airport & Arrival */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><Plane className="text-blue-500"/> 1. Arrival & Airport Hacks</h2>
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><CameraOff size={14}/> Security & Immigration</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Photography and vlogging are **strictly prohibited** in security zones. Remove hats, masks, and sunglasses before the kiosk.
              </p>
              {code === 'ICN' && (
                <AhaPoint title="ICN T1 Shuttle Train Trap">
                  If your flight is a foreign airline or LCC at T1, you **MUST take the underground shuttle train** to reach immigration. 90% of first-timers get lost here—don't look for immigration desks until you exit the train.
                </AhaPoint>
              )}
              {code === 'CJU' && (
                <AhaPoint title="Jeju Visa-Free Magic">
                  Arriving on a **direct international flight** to Jeju allows Visa-free entry for most nationalities. Note: You cannot visit Seoul/Mainland without a proper visa.
                </AhaPoint>
              )}
              <YouTubeTimeline search="Incheon Airport Arrival Step by Step 2026" timeline={[
                { time: "01:45", desc: "Walking to the underground shuttle train entrance." },
                { time: "05:30", desc: "Proper Fingerprint scanner usage at the kiosk." }
              ]} />
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><Smartphone size={14}/> eSIM & Data Hacks</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Skip the lines at telecom booths. **eSIMs** are the standard. If you need a physical SIM, go to **CU or GS25 on the 1st floor** and ask for a 'Tourist USIM'.
              </p>
              <AhaPoint title="Zimcarry (Hands-free travel)">
                Use **T-Luggage** or **Zimcarry** at the airport. Send your bags to your hotel for $15 and start exploring Hongdae immediately without heavy bags.
              </AhaPoint>
            </div>
          </div>
        </section>

        {/* Section 2: Transportation */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><Navigation className="text-blue-500"/> 2. Smart Transportation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {transports.map((t, i) => (
              <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    {t.type === 'train' ? <Train size={20}/> : t.type === 'bus' ? <Bus size={20}/> : <Car size={20}/>}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">{t.name}</p>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-wider">{t.priceKRW} · {t.duration}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-xs italic">"{t.tip}"</p>
              </div>
            ))}
          </div>
          <AhaPoint title="Taxi Baggage Limit">
            Standard Taxis (Sonata) only fit **2 large suitcases**. For 3-4 people with luggage, you **must** book a **Private Large Van** via Klook or use KakaoT Venti.
          </AhaPoint>
          <AhaPoint title="KakaoT Payment Hack">
            Overseas cards often fail in the app. Always select **'Pay to Driver'** as the payment method, then pay with your card/cash when you arrive.
          </AhaPoint>
        </section>

        {/* Section 3: SOS & Survival */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><Info className="text-amber-500"/> 3. SOS & Survival Hacks</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-red-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><PhoneCall size={14}/> Emergency SOS</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-black text-2xl">1330</span>
                  <span className="text-slate-500 text-xs font-bold uppercase">Multilingual Travel Hotline</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-black text-2xl">119</span>
                  <span className="text-slate-500 text-xs font-bold uppercase">Medical & Fire</span>
                </div>
              </div>
              <AhaPoint title="Papago Boiler Hack">
                Can't turn on the floor heating (Ondol)? Use **Papago's Camera mode** to live-translate the buttons on the wall.
              </AhaPoint>
            </div>
            <div className="glass p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-orange-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><Trash2 size={14}/> The Trash Trap</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">Korean recycling is strict. Chicken bones, clam shells, and peach pits are **GENERAL waste**, not food waste.</p>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                <p className="text-white font-bold text-xs">Late Night Medicine?</p>
                <p className="text-slate-500 text-[10px] mt-1">Visit **Pharm114.or.kr** or go to any 24h convenience store for basic cold medicine/painkillers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Food & Shopping */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><ShoppingBag className="text-purple-500"/> 4. Food & K-Culture Hacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass p-6 rounded-3xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><Utensils size={16} className="text-amber-500"/> BBQ Etiquette</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Eat the wrap in **one bite**. Biting it in half is considered messy. Look for 'Fresh(생)' meat only.</p>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><Smartphone size={16} className="text-blue-500"/> Waiting Apps</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Use **CatchTable Global** for famous cafes. Scan the QR at the door to get your virtual number.</p>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><Heart size={16} className="text-rose-500"/> Jjimjilbang Rules</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Inside the bathhouse area, you must be **completely naked**. No swimsuits allowed.</p>
            </div>
          </div>
          <div className="mt-6 glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h4 className="text-purple-400 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2"><ShoppingBag size={14}/> Olive Young Instant Refund</h4>
              <p className="text-sm text-slate-300 leading-relaxed">Show your **passport** at checkout for purchases over ₩30,000. They subtract the tax **instantly** on the spot.</p>
            </div>
            <div className="flex-1">
              <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2"><Send size={14}/> Han River Delivery</h4>
              <p className="text-sm text-slate-300 leading-relaxed">Use the **'Shuttle Delivery'** app. It supports English and International credit cards. Meet at 'Delivery Zone 2'.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Seasonal & Passes */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><ThermometerSnowflake className="text-sky-500"/> 5. Gear & Smart Passes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-500/5 border border-sky-500/10 p-8 rounded-[2.5rem]">
              <h4 className="text-sky-400 font-black text-xs uppercase tracking-widest mb-4">Clothing Warning</h4>
              <p className="text-sm text-slate-300 leading-relaxed">Korean winter wind is brutal. Buy a **'Long Puffer' (롱패딩)** and Heattech. In summer, buy a transparent umbrella at any convenience store.</p>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/10 p-8 rounded-[2.5rem]">
              <h4 className="text-purple-400 font-black text-xs uppercase tracking-widest mb-4">Discover Seoul Pass</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">If visiting 5+ palaces and Lotte World, this pass saves you $100+. Use the mobile app barcode for instant entry.</p>
              <YouTubeTimeline search="Is Discover Seoul Pass worth it 2026" timeline={[
                { time: "03:30", desc: "How to skip the ticket line at Lotte World." }
              ]} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-white/5 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 italic">No Scams. Just Facts. Updated for 2026.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white mx-auto hover:scale-110 transition-all">↑</button>
        </footer>
      </div>
    </div>
  );
}
