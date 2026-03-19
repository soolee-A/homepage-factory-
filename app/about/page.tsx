import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Globe, Users, BookOpen, Heart, Mail, Plane } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Korea OSO – Our Mission & Team",
  description: "Learn about Korea OSO, the team behind the 100% fact-based Korea travel guide. Our mission is to help travelers navigate South Korea without scams or confusion.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">

      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-3xl mb-6">
          <Plane className="text-blue-600 w-10 h-10" />
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          About Korea OSO
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          We are a team of Korea travel enthusiasts and long-term residents dedicated to providing the most accurate, up-to-date arrival information for international visitors to South Korea.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-white">
          <h2 className="text-3xl font-black mb-4">Our Mission</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-6">
            Korea OSO was founded with one simple goal: <strong className="text-white">eliminate the confusion and scams that plague first-time visitors to South Korea</strong>.
          </p>
          <p className="text-blue-100 leading-relaxed">
            Every year, millions of travelers arrive at Incheon International Airport overwhelmed by unfamiliar systems — confusing taxi zones, hidden surcharges, language barriers at immigration, and outdated information from travel blogs. Korea OSO exists to cut through the noise and give you facts, not filler.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-6">Our Story</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
          <p>
            Korea OSO started as a personal project by a group of expatriates who had lived in Seoul for years and watched the same mistakes happen over and over again. Friends would visit and immediately get overcharged by taxis. Colleagues would buy prepaid SIMs at inflated airport prices. Family members would miss their shuttle train connection at Incheon T1 and end up on the wrong side of immigration.
          </p>
          <p>
            What began as a shared Google Doc of tips and tricks grew into a comprehensive guide. We realized that most "Korea travel" content online was either outdated, inaccurate, or written by people who visited once and never returned. We decided to build something different: a continuously updated, fact-checked resource built on real experience and official sources.
          </p>
          <p>
            Today, Korea OSO covers all major international airports in South Korea — Incheon (ICN), Gimpo (GMP), Gimhae/Busan (PUS), Jeju (CJU), and Cheongju (CJJ) — along with comprehensive guides on transportation, money, culture, food, and essential apps.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <ShieldCheck className="text-blue-600 w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">100% Fact-Based</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Every piece of information on Korea OSO is verified against official sources — government websites, official airport communications, and current regulations. We never publish guesses or unverified rumors.
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <Globe className="text-green-600 w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Always Up-to-Date</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Korea's travel regulations change frequently. We actively monitor updates to K-ETA policies, airport operating hours, transportation schedules, and entry requirements to ensure our guides reflect current reality.
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <Users className="text-purple-600 w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Traveler-First</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              We write for real travelers, not search engines. Our guides are practical, specific, and actionable. We tell you exactly what to do, step by step, so you can navigate Korea confidently from the moment you land.
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <Heart className="text-red-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Hidden Agendas</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Korea OSO does not take paid placements or sponsored recommendations. When we recommend a service or app, it is because it genuinely helps travelers. Our revenue comes from display advertising, not from promoting specific vendors.
            </p>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-6">What Korea OSO Covers</h2>
        <div className="bg-slate-50 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Incheon Airport (T1 & T2) arrival guide",
              "Gimpo, Busan, Jeju & Cheongju airports",
              "K-ETA application and requirements",
              "AREX express train to Seoul Station",
              "Airport bus routes and limousine services",
              "Taxi booking apps (KakaoT, Uber Korea)",
              "Money exchange and cashless payment tips",
              "eSIM and Korean SIM card setup",
              "Seasonal travel advice and packing tips",
              "Korean BBQ and food culture etiquette",
              "Emergency contacts and SOS resources",
              "Shopping, K-beauty, and tax refunds",
              "Jjimjilbang and cultural experience guides",
              "Hands-free luggage delivery services",
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                <p className="text-slate-600 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-6">Editorial Standards & Disclaimer</h2>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <p className="text-slate-600 leading-relaxed mb-4">
            Korea OSO strives for accuracy in all published content. However, travel regulations, airport procedures, and transportation options can change without notice. We strongly recommend verifying critical information — especially visa requirements, K-ETA status, and flight details — directly with official Korean government sources before your trip.
          </p>
          <p className="text-slate-600 leading-relaxed">
            All information on Korea OSO is provided for general informational purposes only. Korea OSO is not affiliated with any Korean government agency, airline, airport authority, or transportation company. Use of our guides is at your own risk.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <BookOpen className="text-blue-600 w-10 h-10 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-slate-900 mb-4">Start Exploring Our Guide</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          24 essential tips covering everything from airport arrival to local culture.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-colors"
          >
            Read the Guide
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-slate-100 text-slate-700 font-black rounded-2xl hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
