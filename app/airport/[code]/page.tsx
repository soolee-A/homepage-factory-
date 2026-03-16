"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShieldCheck, ArrowLeft, Sun, Moon, CheckCircle2, Youtube, ExternalLink, AlertCircle } from "lucide-react";
import { airports, airportTimeGuides, TimeGuide } from "../../../Fetch/airportData";

export default function AirportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;
  const [selectedTime, setSelectedTime] = useState<"day" | "night" | null>(null);

  const airport = airports.find((a) => a.code === code);
  const guide: TimeGuide | null = airport && selectedTime ? airportTimeGuides[code]?.[selectedTime] : null;

  if (!airport) return <div className="p-20 text-center font-bold">Airport Not Found</div>;

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-900 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-black text-blue-800 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Fact-Based Guide for 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Arrival at <span className="text-blue-600">{airport.code}</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">{airport.name} · {airport.city}</p>
        </header>

        {/* Step 1: Time Selection */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-6">1. Select Your Arrival Time</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setSelectedTime("day")}
              className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all ${selectedTime === "day" ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:border-blue-200 bg-slate-50"}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedTime === "day" ? "bg-blue-600 text-white" : "bg-white text-blue-600 shadow-sm"}`}>
                <Sun className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-black text-slate-900 leading-none mb-1">Daytime</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">06:00 - 23:00</p>
              </div>
            </button>
            <button 
              onClick={() => setSelectedTime("night")}
              className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all ${selectedTime === "night" ? "border-blue-900 bg-slate-900 text-white" : "border-slate-100 hover:border-slate-900 bg-slate-50"}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedTime === "night" ? "bg-white text-blue-900" : "bg-white text-blue-900 shadow-sm"}`}>
                <Moon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className={`font-black leading-none mb-1 ${selectedTime === "night" ? "text-white" : "text-slate-900"}`}>Late Night</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">23:00 - 06:00</p>
              </div>
            </button>
          </div>
        </section>

        {/* Step 2: Results Display */}
        {guide && (
          <div className="space-y-10 animate-fade-in-up">
            {/* Fact Box */}
            <section className={`p-8 rounded-3xl border-2 ${guide.availability === "None" ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-slate-900">{guide.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${guide.availability === "None" ? "bg-red-200 text-red-800" : "bg-emerald-200 text-emerald-800"}`}>
                   Availability: {guide.availability}
                </span>
              </div>
              <p className="text-slate-700 font-medium mb-6">{guide.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Steps */}
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Step-by-Step Guide</h3>
                  <ul className="space-y-4">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 font-bold">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Video Tutorial */}
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-600" /> Video Tutorial
                  </h3>
                  <a 
                    href={`https://www.youtube.com/watch?v=${guide.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video bg-slate-200 rounded-2xl overflow-hidden shadow-lg border-2 border-white hover:border-red-600 transition-colors"
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${guide.youtubeId}/mqdefault.jpg`} 
                      alt="YouTube Tutorial"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                       </div>
                    </div>
                  </a>
                  <p className="mt-2 text-[10px] text-center font-bold text-slate-400 uppercase tracking-tighter">Click to watch tutorial on YouTube</p>
                </div>
              </div>
            </section>

            {/* Official Booking Call-to-Action */}
            <section className="bg-blue-900 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="text-center md:text-left">
                  <h2 className="text-xl font-black mb-1">Book Your Seat Now</h2>
                  <p className="text-blue-300 text-sm font-medium">Save time and avoid long queues at the airport.</p>
               </div>
               <a 
                href="https://www.arex.or.kr/" 
                target="_blank" 
                className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-50 transition-colors"
               >
                 Go to Official Booking <ExternalLink className="w-4 h-4" />
               </a>
            </section>
          </div>
        )}

        {/* Emergency Note */}
        <div className="mt-16 pt-8 border-t border-slate-200">
           <div className="flex items-start gap-4 p-6 bg-slate-100 rounded-3xl">
              <AlertCircle className="w-6 h-6 text-slate-400 shrink-0" />
              <div>
                <p className="text-sm font-black text-slate-900 mb-1 tracking-tight italic">Wtoko Survival Tip</p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  If you are arrive after 01:00 AM at Incheon Airport, Night Bus N6000 and N6001 are your best friends. Taxis are available but expect a 40% surcharge after midnight. Stay safe!
                </p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
