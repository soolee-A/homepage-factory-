"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { ShieldCheck, AlertTriangle, CheckCircle2, MapPin, MessageCircle, ChevronRight, Globe } from "lucide-react";
import { airports } from "../Fetch/airportData";

export default function WtokoLandingPage() {
  const router = useRouter();

  const handleAirportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (code) router.push(`/airport/${code}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>

      <header className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-3 mb-2 animate-fade-in-up">
           <Globe className="w-8 h-8 text-blue-900" />
           <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
             Welcome to<br />
             <span className="text-blue-600">South Korea</span>
           </h1>
        </div>
        <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest ml-1">Wtoko Concierge</p>
      </header>

      <aside className="absolute top-36 left-8 w-full max-w-sm z-20 hidden md:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-3xl shadow-sm">
          <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" /> 
            Arrival Checklist
          </h2>
          <ul className="space-y-3">
             {[
               "Official K-ETA Approval (₩10,000)",
               "Q-Code Registration (Free)",
               "Estimated Arrival Time Verification"
             ].map((item, i) => (
               <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                 <span>{item}</span>
               </li>
             ))}
          </ul>
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex gap-2">
             <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
             <p className="text-[10px] text-red-800 leading-tight font-black uppercase tracking-tighter">
                WARNING: Do not pay more than $10 for K-ETA. Fake sites are active!
             </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex items-center justify-center px-6 relative z-10 min-h-screen">
        <div className="w-full max-w-xl text-center">
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
               <MapPin className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Start Your Journey</h2>
            <p className="text-slate-500 font-medium text-lg">Where are you arriving in 2026?</p>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <select 
              className="w-full p-6 md:p-8 border-4 border-white shadow-2xl shadow-blue-900/10 rounded-3xl outline-none bg-white text-slate-900 text-2xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer appearance-none"
              onChange={handleAirportChange}
              defaultValue=""
            >
              <option value="" disabled>Select Arrival Airport</option>
              {airports.map(a => (
                <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
              ))}
            </select>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
               <ChevronRight className="w-10 h-10 text-slate-300" />
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-8 right-8 z-20">
        <button className="group flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-2xl shadow-xl transition-all hover:-translate-y-1">
           <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Have Questions?</p>
              <p className="text-sm font-black tracking-tight">24/7 Inquiry</p>
           </div>
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <MessageCircle className="w-5 h-5 fill-white" />
           </div>
        </button>
      </footer>
    </div>
  );
}
