import React from 'react';
import { AlertTriangle, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Disclaimer – Korea OSO",
  description: "Important disclaimer for Korea OSO travel guide. Our content is for informational purposes only. Always verify with official sources before travel.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-amber-50 rounded-3xl mb-6">
          <AlertTriangle className="text-amber-500 w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Disclaimer</h1>
        <p className="text-slate-500 mt-4 font-medium">Last Updated: March 19, 2026</p>
      </div>

      <div className="space-y-10 text-slate-600 leading-relaxed">

        <section className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="text-amber-500 w-8 h-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">General Disclaimer</h2>
              <p>
                The information provided on Korea OSO (koreaoso.com) is for general informational and educational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Info className="text-blue-600 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">Travel Information Disclaimer</h2>
          </div>
          <p className="mb-4">
            Travel regulations, immigration requirements, airport procedures, and transportation options in South Korea change frequently and sometimes without advance notice. Korea OSO makes every effort to keep our guides current, but we cannot guarantee that information is accurate at the exact moment you read it.
          </p>
          <p className="mb-4">
            <strong className="text-slate-800">Before relying on any information from Korea OSO for travel decisions, you should:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Verify visa and K-ETA requirements directly at the official K-ETA portal (k-eta.go.kr)</li>
            <li>Confirm entry requirements with the nearest Korean embassy or consulate in your country</li>
            <li>Check current airport hours and transportation schedules on official airport websites</li>
            <li>Consult your airline for any specific entry or travel requirements</li>
            <li>Review current travel advisories from your home country's government</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Affiliate & Advertising Disclosure</h2>
          <p>
            Korea OSO displays advertisements through Google AdSense. We may also include links to third-party products or services. These links are provided for convenience and do not constitute an endorsement. Korea OSO does not accept payment for favorable editorial coverage of any product or service.
          </p>
          <p className="mt-4">
            Where we recommend specific apps, services, or products (such as AREX, KakaoT, WOWPASS, etc.), these recommendations are based solely on our assessment of their usefulness to travelers, not any commercial arrangement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Official Resources</h2>
          <p className="mb-6">For the most accurate and current information, always refer to official sources:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "K-ETA Official Portal", url: "https://www.k-eta.go.kr", desc: "Electronic travel authorization" },
              { name: "Hi Korea Immigration", url: "https://www.hikorea.go.kr", desc: "Visa & immigration information" },
              { name: "Incheon Airport Official", url: "https://www.airport.kr/ap/en/index.do", desc: "ICN airport information" },
              { name: "Korea Tourism Organization", url: "https://english.visitkorea.or.kr", desc: "Official Korea travel guide" },
              { name: "AREX Official Site", url: "https://www.arex.or.kr", desc: "Airport railroad information" },
              { name: "1330 Korea Tourism Hotline", url: "tel:1330", desc: "24/7 travel assistance in English" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 bg-white border border-slate-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition-all group"
              >
                <ExternalLink className="text-blue-500 w-4 h-4 shrink-0 mt-1 group-hover:text-blue-700" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Questions about this disclaimer? <Link href="/contact" className="text-blue-600 hover:underline font-medium">Contact us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
