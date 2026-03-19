"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, ArrowLeft, Youtube, ExternalLink,
  Zap, Train, Bus, Car, Smartphone, CreditCard, 
  Utensils, Heart, ShoppingBag, Navigation, 
  Info, Plane, Send, Globe, Trash2
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

  if (!airport) return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <p className="text-white font-black">Airport Not Found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans pb-20 text-slate-200 selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 pt-10 relative">
        
        {/* Nav */}
        <nav className="flex items-center justify-between mb-16">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-all hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" /> Back to Search
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Plane className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-white font-black tracking-[0.2em] text-xs uppercase">Wtoko Guide 2026</span>
          </div>
        </nav>

        {/* Airport Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/[0.08] text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Fact-Based Survival Kit
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            Landing at <br/>
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{airport.code}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 font-bold">
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg border border-white/5"><MapPin size={14} className="text-blue-500" /> {airport.city}</span>
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg border border-white/5"><Zap size={14} className="text-blue-500" /> {airport.terminal}</span>
          </div>
        </header>

        {/* Part 1: Transport Logic (Context Aware) */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <Navigation className="text-blue-500" /> Getting to the City
            </h2>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">Step-by-Step</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {transports.map((t, i) => (
              <div key={i} className="group glass p-6 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl group-hover:scale-110 transition-transform">
                      {t.type === "train" ? <Train size={24}/> : t.type === "bus" ? <Bus size={24}/> : t.type === "taxi" ? <Car size={24}/> : <ShoppingBag size={24}/>}
                    </div>
                    <div>
                      <p className="text-white font-black text-sm leading-tight">{t.name}</p>
                      <p className="text-blue-400 text-[10px] font-black uppercase tracking-wider mt-1">{t.duration} · {t.priceKRW}</p>
                    </div>
                  </div>
                  <a href={t.bookingUrl} target="_blank" className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all shadow-sm">
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-slate-400 text-xs font-medium leading-relaxed italic border-t border-white/5 pt-4">"{t.tip}"</p>
              </div>
            ))}
          </div>

          {/* Context-Aware Aha Point for Transport */}
          {code === "ICN" && (
            <AhaPoint title="Large Group? Standard Taxis will Fail You.">
              Standard Korean taxis (Sonata/K5) only fit **2 large suitcases (28")**. If you are 3-4 people with bags, you **cannot** take one taxi. 
              **The Solution:** Book a **Private Large Van** via Klook or VanGo. It costs roughly the same as 4 bus tickets but takes you door-to-door.
            </AhaPoint>
          )}
          {code === "CJU" && (
            <AhaPoint title="Visa-Free Entry Magic">
              Did you know? Even if you need a visa for mainland Korea (Seoul), most nationalities can enter **Jeju Island Visa-free** if you arrive on a **DIRECT international flight**. *Warning: You cannot take a domestic flight to Seoul from here without a visa.*
            </AhaPoint>
          )}
        </section>

        {/* Master Survival Guide Sections */}
        <div className="space-y-16">
          
          {/* 1. Airport Survival */}
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-black">1</div>
              <h3 className="text-3xl font-black text-white tracking-tight">Airport Survival Guide</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl">
                  <h4 className="text-blue-400 font-black text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2"><Globe size={12}/> Arrival Protocol</h4>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    Security is strict. **No photos or vlogs** allowed until you pass baggage claim. Have your **K-ETA** or Visa ready on your phone (Offline screenshot recommended).
                  </p>
                  <AhaPoint title="ICN T1 Shuttle Train Trap">
                    Foreign airlines usually land at the 'Concourse'. You **MUST take the underground shuttle train** to reach the main building for immigration. If you don't see immigration desks, you missed the train entrance.
                  </AhaPoint>
                </div>
                
                <div className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl">
                  <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2"><Smartphone size={12}/> Connectivity (eSIM/USIM)</h4>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    Don't waste 30 mins at telecom booths. **eSIM** is the 2026 standard. Buy before you land.
                  </p>
                  <AhaPoint title="The CU Convenience Store Hack">
                    Need a physical SIM? Skip the airport lines. Go to any **CU or GS25** on the 1st floor and ask for "Tourist USIM". It's instant and supports data-only plans.
                  </AhaPoint>
                </div>
              </div>

              <YouTubeTimeline 
                search="Incheon Airport Arrival Guide for Foreigners 2026"
                timeline={[
                  { time: "01:45", desc: "Landing & following the yellow 'Arrivals' signs." },
                  { time: "03:20", desc: "Taking the Shuttle Train (T1 foreign airlines only)." },
                  { time: "05:30", desc: "No-photo zone & fingerprint scanner tutorial." }
                ]}
              />
            </div>
          </section>

          {/* 2. SOS & Money */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-500 font-black">2</div>
              <h3 className="text-3xl font-black text-white tracking-tight">SOS & Smart Money</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 glass p-8 rounded-3xl border border-white/5">
                <h4 className="text-amber-400 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"><CreditCard size={12}/> WOWPASS & Cashless Culture</h4>
                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-6">
                  Korea is 99% cashless. Even $2 street food can be paid by card. **WOWPASS** is a must—it's a debit card you can top up with your home currency (USD/EUR/JPY) at subway stations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-white font-bold text-xs mb-1">Exchange Sanctuary</p>
                    <p className="text-slate-500 text-[10px] leading-relaxed">Go to Myeongdong (Chinese Embassy area) for the highest rates. Bring crisp $100 bills.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-white font-bold text-xs mb-1">T-Money Card</p>
                    <p className="text-slate-500 text-[10px] leading-relaxed">Required for all buses/subways. Buy at any convenience store for ₩2,500.</p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
                <div>
                  <h4 className="text-red-400 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"><PhoneCall size={12}/> Emergency SOS</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-black text-xl tabular-nums">1330</span>
                      <p className="text-slate-400 text-[10px] font-bold">24/7 Multilingual Travel Hotline</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-black text-xl tabular-nums">119</span>
                      <p className="text-slate-400 text-[10px] font-bold">Medical/Fire Emergency</p>
                    </div>
                  </div>
                </div>
                <AhaPoint title="Lost Something?">
                  Search **LOST112.go.kr**. Every single item found by police is photographed and uploaded there daily.
                </AhaPoint>
              </div>
            </div>
          </section>

          {/* 3. Culture & Trash */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-500 font-black">3</div>
              <h3 className="text-3xl font-black text-white tracking-tight">Culture & Manners</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="glass p-6 rounded-3xl border border-white/5">
                  <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><Heart size={14} className="text-rose-500"/> No Tipping Policy</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Tipping is not expected and can sometimes be confusing for staff. If you leave money, they will likely chase you thinking you forgot it.
                  </p>
                </div>
                <div className="glass p-6 rounded-3xl border border-white/5">
                  <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><Bus size={14} className="text-blue-500"/> Bus Etiquette</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    You cannot board a bus with an **open cup** (coffee, juice). It must be in a sealed bag or finished before boarding.
                  </p>
                </div>
              </div>
              <div className="bg-orange-500/[0.03] border border-orange-500/10 p-8 rounded-[2rem]">
                <h4 className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"><Trash2 size={12}/> The Trash Trap</h4>
                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-4">
                  Korean trash separation is strict. Especially in Airbnbs.
                </p>
                <ul className="space-y-3 text-xs font-bold text-slate-400">
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-orange-500"/> Chicken Bones = General Waste</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-orange-500"/> Clam Shells = General Waste</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-orange-500"/> Peach Pits = General Waste</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-orange-500"/> Fruit Peels = Food Waste</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Food & Shopping */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500 font-black">4</div>
              <h3 className="text-3xl font-black text-white tracking-tight">Shopping & K-Food Hacks</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="glass p-6 rounded-3xl border border-white/5 flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0"><ShoppingBag size={24}/></div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">Olive Young Instant Refund</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Show your **passport** at the counter for purchases over ₩30,000. They subtract the tax **instantly**. No need to wait at the airport customs!</p>
                  </div>
                </div>
                <div className="glass p-6 rounded-3xl border border-white/5 flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0"><Utensils size={24}/></div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">K-BBQ Etiquette</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Eat the wrap (Ssam) in **one bite**. Biting it in half is considered messy. Always look for 'Fresh(생)' meat on the menu, never frozen.</p>
                  </div>
                </div>
                <div className="glass p-6 rounded-3xl border border-white/5 flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0"><Info size={24}/></div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">30-Min Glasses</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Korea has the fastest opticians. Visit 'Davich' or Namdaemun Market. High-quality prescription glasses are ready in just **30 minutes**.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                  <h4 className="text-white font-black text-sm mb-4 flex items-center gap-2"><Send size={14} className="text-blue-500"/> Han River Delivery</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    You don't need a Korean ID to order fried chicken to the park. Use the **'Shuttle Delivery'** app (Full English/Global Cards).
                  </p>
                  <YouTubeTimeline 
                    search="Ordering Delivery to Han River without Korean ID"
                    timeline={[
                      { time: "04:30", desc: "Meet the rider at 'Delivery Zone 2' signs (Yeouido)." },
                      { time: "07:15", desc: "Paying with International Visa/Mastercard in-app." }
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Survival Tip Footer */}
        <div className="mt-24 pt-12 border-t border-white/[0.06]">
          <div className="glass rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/10 border border-white/10 shadow-2xl">
            <div className="text-center md:text-left">
              <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-3 italic">Wtoko Survival Kit 2026</p>
              <h4 className="text-3xl font-black text-white mb-2 leading-tight">Your journey starts here. <br/>Safe travels in Korea!</h4>
              <p className="text-slate-400 text-sm font-medium">100% Fact-checked. Updated weekly by the Wtoko team.</p>
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group shrink-0 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-600/20 hover:scale-110 transition-all active:scale-95">
              <ArrowLeft className="w-8 h-8 rotate-90 group-hover:animate-bounce" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
