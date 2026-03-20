'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, BookOpen, Shield, Info, Mail, Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isHome
        ? 'bg-slate-950/60 border-white/[0.08] shadow-none'
        : 'bg-white/80 border-slate-100 shadow-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform">
              <Plane className="text-white w-5 h-5" />
            </div>
            <span className={`text-xl font-black tracking-tight transition-colors ${isHome ? 'text-white' : 'text-slate-900'}`}>Korea OSO</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center space-x-1">
            {[
              { href: '/blog', icon: <BookOpen className="w-4 h-4 mr-2" />, label: 'Guide' },
              { href: '/about', icon: <Info className="w-4 h-4 mr-2" />, label: 'About' },
              { href: '/contact', icon: <Mail className="w-4 h-4 mr-2" />, label: 'Contact' },
              { href: '/privacy', icon: <Shield className="w-4 h-4 mr-2" />, label: 'Privacy' },
            ].map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all
                  ${isHome
                    ? 'text-slate-400 hover:bg-white/10 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
              >
                {icon}{label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className={`sm:hidden p-2 rounded-xl transition-colors ${isHome ? 'text-slate-400 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className={`sm:hidden pb-4 space-y-1 ${isHome ? 'border-t border-white/10 pt-3 mt-1' : ''}`}>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className={`flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all ${isHome ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
              <BookOpen className="w-4 h-4 mr-2" /> Guide
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className={`flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all ${isHome ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
              <Info className="w-4 h-4 mr-2" /> About
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className={`flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all ${isHome ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
              <Mail className="w-4 h-4 mr-2" /> Contact
            </Link>
            <Link href="/privacy" onClick={() => setMenuOpen(false)} className={`flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all ${isHome ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
              <Shield className="w-4 h-4 mr-2" /> Privacy
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
