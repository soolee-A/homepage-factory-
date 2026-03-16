"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "../navigation";
import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { locales, localeNames, Locale } from "../i18n";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchLocale(next: Locale) {
    router.push(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/20"
      >
        <Globe className="w-4 h-4" />
        <span>{localeNames[locale]}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-20 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 w-48 max-h-80 overflow-y-auto">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${
                  l === locale ? "text-blue-600 font-bold bg-blue-50" : "text-slate-700"
                }`}
              >
                <span>{localeNames[l]}</span>
                {l === locale && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
