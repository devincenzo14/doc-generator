"use client";

import React from "react";
import { TemplateStyle, TemplateConfig } from "@/types";

interface TemplateSelectorProps {
  config: TemplateConfig;
  onChange: (config: TemplateConfig) => void;
}

const STYLES: { value: TemplateStyle; label: string; preview: string }[] = [
  { value: "minimal", label: "Minimal", preview: "bg-white border-2 border-slate-200" },
  { value: "corporate", label: "Corporate", preview: "bg-gradient-to-br from-blue-800 to-blue-950" },
  { value: "modern", label: "Modern", preview: "bg-gradient-to-br from-violet-500 to-indigo-600" },
];

const CURRENCIES = [
  { code: "USD", label: "USD ($)", flag: "🇺🇸" },
  { code: "EUR", label: "EUR (€)", flag: "🇪🇺" },
  { code: "GBP", label: "GBP (£)", flag: "🇬🇧" },
  { code: "JPY", label: "JPY (¥)", flag: "🇯🇵" },
  { code: "CAD", label: "CAD ($)", flag: "🇨🇦" },
  { code: "AUD", label: "AUD ($)", flag: "🇦🇺" },
  { code: "CHF", label: "CHF (Fr)", flag: "🇨🇭" },
  { code: "CNY", label: "CNY (¥)", flag: "🇨🇳" },
  { code: "INR", label: "INR (₹)", flag: "🇮🇳" },
  { code: "BRL", label: "BRL (R$)", flag: "🇧🇷" },
  { code: "MXN", label: "MXN ($)", flag: "🇲🇽" },
  { code: "KRW", label: "KRW (₩)", flag: "🇰🇷" },
  { code: "SGD", label: "SGD ($)", flag: "🇸🇬" },
  { code: "HKD", label: "HKD ($)", flag: "🇭🇰" },
  { code: "SEK", label: "SEK (kr)", flag: "🇸🇪" },
  { code: "NOK", label: "NOK (kr)", flag: "🇳🇴" },
  { code: "DKK", label: "DKK (kr)", flag: "🇩🇰" },
  { code: "NZD", label: "NZD ($)", flag: "🇳🇿" },
  { code: "ZAR", label: "ZAR (R)", flag: "🇿🇦" },
  { code: "PHP", label: "PHP (₱)", flag: "🇵🇭" },
];

export default function TemplateSelector({ config, onChange }: TemplateSelectorProps) {
  const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200";

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Template Style</label>
        <div className="flex gap-3">
          {STYLES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange({ ...config, style: s.value })}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-200 ${config.style === s.value ? "border-blue-500 shadow-md shadow-blue-100" : "border-transparent hover:border-slate-200"}`}
            >
              <div className={`w-16 h-10 rounded-lg ${s.preview}`}></div>
              <span className="text-[11px] font-semibold text-slate-600">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Currency</label>
          <select
            value={config.currency || "USD"}
            onChange={(e) => onChange({ ...config, currency: e.target.value })}
            className={inputCls + " bg-white"}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Company Name</label>
          <input
            type="text"
            value={config.companyName}
            onChange={(e) => onChange({ ...config, companyName: e.target.value })}
            className={inputCls}
            placeholder="Your Company"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Company Email</label>
          <input
            type="email"
            value={config.companyEmail || ""}
            onChange={(e) => onChange({ ...config, companyEmail: e.target.value })}
            className={inputCls}
            placeholder="email@company.com"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Company Address</label>
          <input
            type="text"
            value={config.companyAddress || ""}
            onChange={(e) => onChange({ ...config, companyAddress: e.target.value })}
            className={inputCls}
            placeholder="123 Main St, City, Country"
          />
        </div>
      </div>
    </div>
  );
}
