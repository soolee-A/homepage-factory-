import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Korea OSO</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              100% fact-based Korea arrival guide. No Scams, Just Facts. Your trusted companion for navigating South Korea.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link></li>
                <li><Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Korea Travel Guide</Link></li>
                <li><Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>© {currentYear} Korea OSO. All rights reserved.</p>
          <p className="italic">Providing clarity in a world of complex travel regulations.</p>
        </div>
      </div>
    </footer>
  );
}
