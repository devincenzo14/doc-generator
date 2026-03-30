"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DOCUMENT_TYPES, CATEGORIES } from "@/lib/document-registry";
import Sidebar from "@/components/ui/Sidebar";
import {
  FileText,
  Receipt,
  Calculator,
  ShoppingCart,
  Truck,
  Scale,
  ShieldCheck,
  ScrollText,
  Lock,
  User,
  Mail,
  Presentation,
  ClipboardList,
  Handshake,
  TrendingUp,
  DollarSign,
  Package,
  CalendarCheck,
  BarChart3,
  FileSpreadsheet,
  Search,
  ArrowRight,
  Menu,
} from "lucide-react";
import type { DocumentTypeInfo } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  Receipt,
  Calculator,
  ShoppingCart,
  Truck,
  Scale,
  ShieldCheck,
  ScrollText,
  Lock,
  User,
  Mail,
  Presentation,
  ClipboardList,
  Handshake,
  TrendingUp,
  DollarSign,
  Package,
  CalendarCheck,
  BarChart3,
  FileSpreadsheet,
};

const CATEGORY_COLORS: Record<string, { card: string; icon: string; pill: string }> = {
  Business: { card: "bg-blue-50/60 border-blue-100 hover:border-blue-300 hover:shadow-blue-100/50", icon: "text-blue-600 bg-blue-100", pill: "bg-blue-100 text-blue-700" },
  Legal: { card: "bg-amber-50/60 border-amber-100 hover:border-amber-300 hover:shadow-amber-100/50", icon: "text-amber-600 bg-amber-100", pill: "bg-amber-100 text-amber-700" },
  Personal: { card: "bg-emerald-50/60 border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-100/50", icon: "text-emerald-600 bg-emerald-100", pill: "bg-emerald-100 text-emerald-700" },
  Freelancer: { card: "bg-violet-50/60 border-violet-100 hover:border-violet-300 hover:shadow-violet-100/50", icon: "text-violet-600 bg-violet-100", pill: "bg-violet-100 text-violet-700" },
  "Small Business": { card: "bg-rose-50/60 border-rose-100 hover:border-rose-300 hover:shadow-rose-100/50", icon: "text-rose-600 bg-rose-100", pill: "bg-rose-100 text-rose-700" },
  Reports: { card: "bg-cyan-50/60 border-cyan-100 hover:border-cyan-300 hover:shadow-cyan-100/50", icon: "text-cyan-600 bg-cyan-100", pill: "bg-cyan-100 text-cyan-700" },
};

function DocCard({ doc }: { doc: DocumentTypeInfo }) {
  const IconComponent = ICON_MAP[doc.icon] || FileText;
  const colors = CATEGORY_COLORS[doc.category] || { card: "bg-slate-50 border-slate-100", icon: "text-slate-600 bg-slate-100", pill: "" };

  return (
    <Link
      href={`/documents/${doc.type}`}
      className={`group block p-4 rounded-2xl border transition-all duration-300 ${colors.card} hover:shadow-lg hover:-translate-y-0.5`}
    >
      <div className="flex items-start gap-3.5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.icon} shrink-0 transition-transform duration-300 group-hover:scale-110`}>
          <IconComponent size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[13px] font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
            {doc.label}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{doc.description}</p>
        </div>
        <ArrowRight
          size={14}
          className="text-slate-300 group-hover:text-slate-500 mt-1 transition-all duration-300 group-hover:translate-x-0.5 shrink-0"
        />
      </div>
    </Link>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = DOCUMENT_TYPES.filter((doc) => {
    const matchSearch =
      !search ||
      doc.label.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !activeCategory || doc.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const grouped = CATEGORIES.filter((cat) => filtered.some((d) => d.category === cat)).map(
    (cat) => ({
      category: cat,
      docs: filtered.filter((d) => d.category === cat),
    })
  );

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      {/* Main content, offset by sidebar on desktop */}
      <div className="md:pl-[240px] transition-all duration-300">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-100">
          <div className="px-4 sm:px-6 md:px-8 py-4 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all md:hidden shrink-0"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-[13px] text-slate-400 mt-0.5 hidden sm:block">Create and manage your documents</p>
              </div>
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
              />
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 md:px-8 py-6 animate-fade-in">
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                !activeCategory
                  ? "bg-slate-900 text-white shadow-md shadow-slate-300/30"
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => {
              const colors = CATEGORY_COLORS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? `${colors?.pill || "bg-slate-100 text-slate-700"} shadow-sm`
                      : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Document grid by category */}
          {grouped.map(({ category, docs }) => (
            <section key={category} className="mb-10">
              <div className="flex items-center gap-2.5 mb-4">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">{category}</h2>
                <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                  {docs.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {docs.map((doc) => (
                  <DocCard key={doc.type} doc={doc} />
                ))}
              </div>
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <Search size={40} className="mx-auto mb-4 text-slate-300" />
              <p className="text-base font-medium">No documents match your search.</p>
              <p className="text-sm mt-1">Try a different keyword or category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
