import React from 'react';
import { Mail, MessageCircle, Clock, Globe, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Korea OSO – Get in Touch",
  description: "Contact the Korea OSO team with questions, corrections, or feedback about our South Korea travel guide. We respond within 48 hours.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-3xl mb-6">
          <Mail className="text-blue-600 w-10 h-10" />
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          Contact Us
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Have a question, found an inaccuracy, or want to share your Korea travel experience? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

        {/* General Inquiries */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <Mail className="text-blue-600 w-8 h-8 mb-4" />
          <h2 className="text-xl font-black text-slate-900 mb-2">General Inquiries</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            For general questions about our content, Korea travel tips, or anything else.
          </p>
          <a
            href="mailto:youinvite@naver.com"
            className="inline-flex items-center space-x-2 text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            <span>youinvite@naver.com</span>
          </a>
        </div>

        {/* Content Corrections */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <MessageCircle className="text-green-600 w-8 h-8 mb-4" />
          <h2 className="text-xl font-black text-slate-900 mb-2">Content Corrections</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Found outdated or incorrect information? We take accuracy seriously and appreciate all corrections.
          </p>
          <a
            href="mailto:youinvite@naver.com"
            className="inline-flex items-center space-x-2 text-green-600 font-bold hover:text-green-800 transition-colors"
          >
            <span>youinvite@naver.com</span>
          </a>
        </div>

        {/* Privacy & Data */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <Globe className="text-purple-600 w-8 h-8 mb-4" />
          <h2 className="text-xl font-black text-slate-900 mb-2">Privacy & Data Requests</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            For privacy-related requests, data deletion, or GDPR / CCPA inquiries.
          </p>
          <a
            href="mailto:youinvite@naver.com"
            className="inline-flex items-center space-x-2 text-purple-600 font-bold hover:text-purple-800 transition-colors"
          >
            <span>youinvite@naver.com</span>
          </a>
        </div>

        {/* Response Time */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
          <Clock className="text-blue-600 w-8 h-8 mb-4" />
          <h2 className="text-xl font-black text-slate-900 mb-2">Response Time</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            We typically respond to all inquiries within <strong className="text-slate-700">48 business hours</strong>. For urgent travel questions, we recommend also checking official sources:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Hi Korea – Official Immigration Portal
              </a>
            </li>
            <li>
              <a href="https://www.airport.kr/ap/en/index.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Incheon Airport – Official Site
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQ Before Contacting */}
      <section className="mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Is the information on Korea OSO updated for 2026?",
              a: "Yes. All guides on Korea OSO are reviewed and updated regularly for 2026. Regulations such as K-ETA requirements, airport curfew times, and transport schedules are verified against official sources before publication."
            },
            {
              q: "Can I trust the airport curfew information?",
              a: "Our curfew data is sourced from official airport and government publications. However, curfew times can change. Always confirm directly with your airline or the airport's official website for the most current information before your trip."
            },
            {
              q: "Do you accept guest posts or sponsored content?",
              a: "Korea OSO does not publish sponsored posts or paid editorial content. We accept guest contributions only from verified Korea travel experts, subject to our editorial review process. Contact us at youinvite@naver.com to discuss."
            },
            {
              q: "Is K-ETA required for my country?",
              a: "K-ETA requirements depend on your nationality. Please refer to our main guide or the official K-ETA website (k-eta.go.kr) for the most current list of countries requiring K-ETA approval."
            },
            {
              q: "How do I report a scam or incorrect information?",
              a: "We take accuracy very seriously. If you encounter incorrect information or have been a victim of a travel scam in Korea, please email youinvite@naver.com with the details. We will investigate and update our guide accordingly."
            },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to Guide */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-center text-white">
        <BookOpen className="w-10 h-10 mx-auto mb-4 text-blue-200" />
        <h2 className="text-2xl font-black mb-3">Looking for Travel Tips?</h2>
        <p className="text-blue-200 mb-6 max-w-md mx-auto">
          Before reaching out, check if your question is already answered in our comprehensive 24-tip Korea survival guide.
        </p>
        <Link
          href="/blog"
          className="inline-block px-8 py-4 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 transition-colors"
        >
          Browse the Guide
        </Link>
      </div>
    </div>
  );
}
