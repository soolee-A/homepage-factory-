'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plane, BookOpen, Shield, Info, Mail, Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform">
              <Plane className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Korea OSO</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center space-x-1">
            <Link
              href="/blog"
              className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Guide
            </Link>
            <Link
              href="/about"
              className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <Info className="w-4 h-4 mr-2" />
              About
            </Link>
            <Link
              href="/contact"
              className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Link>
            <Link
              href="/privacy"
              className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="sm:hidden pb-4 space-y-1">
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600">
              <BookOpen className="w-4 h-4 mr-2" /> Guide
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600">
              <Info className="w-4 h-4 mr-2" /> About
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600">
              <Mail className="w-4 h-4 mr-2" /> Contact
            </Link>
            <Link href="/privacy" onClick={() => setMenuOpen(false)} className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600">
              <Shield className="w-4 h-4 mr-2" /> Privacy
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
