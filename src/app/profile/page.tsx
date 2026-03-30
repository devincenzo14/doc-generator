"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Sidebar from "@/components/ui/Sidebar";
import PricingModal from "@/components/ui/PricingModal";
import { getDownloadCount } from "@/lib/storage";
import { DOCUMENT_TYPES } from "@/lib/document-registry";
import {
  User,
  Mail,
  Crown,
  Download,
  FileText,
  Shield,
  Calendar,
  Zap,
  ChevronRight,
  Trash2,
  LogOut,
  Menu,
} from "lucide-react";

const FREE_LIMIT = 3;
const STORAGE_PREFIX = "docgen_draft_";

interface SavedDraft {
  type: string;
  label: string;
}

function getSavedDrafts(): SavedDraft[] {
  if (typeof window === "undefined") return [];
  const drafts: SavedDraft[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      const type = key.replace(STORAGE_PREFIX, "");
      const info = DOCUMENT_TYPES.find((d) => d.type === type);
      if (info) {
        drafts.push({ type, label: info.label });
      }
    }
  }
  return drafts;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, loading, logout } = useAuth();
  const [showPricing, setShowPricing] = useState(false);
  const [downloads, setDownloads] = useState(0);
  const [drafts, setDrafts] = useState<SavedDraft[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setDownloads(getDownloadCount());
    setDrafts(getSavedDrafts());
  }, []);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/");
    }
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const isPro = user.tier === "paid";
  const remaining = isPro ? Infinity : Math.max(0, FREE_LIMIT - downloads);
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  const handleDeleteDraft = (type: string) => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${type}`);
      setDrafts((prev) => prev.filter((d) => d.type !== type));
    } catch {
      /* noop */
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <div className="md:pl-[240px] transition-all duration-300">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-100">
          <div className="px-4 sm:px-6 md:px-8 py-4 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all md:hidden shrink-0"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800">Account</h1>
              <p className="text-[13px] text-slate-400 mt-0.5 hidden sm:block">Manage your profile and subscription</p>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 md:px-8 py-6 max-w-4xl animate-fade-in">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 mb-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shrink-0">
                <User size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-800">{user.name}</h2>
                  {isPro ? (
                    <span className="text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Pro
                    </span>
                  ) : (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Free
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-[13px] flex items-center gap-1.5 mt-0.5">
                  <Mail size={13} /> {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {/* Current Plan */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isPro ? "bg-blue-50" : "bg-slate-50"}`}>
                  <Crown size={15} className={isPro ? "text-blue-600" : "text-slate-400"} />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">
                {isPro ? "Pro" : "Free"}
                {isPro && <span className="text-sm font-normal text-slate-400 ml-1.5">$9/mo</span>}
              </p>
              {!isPro && (
                <button
                  onClick={() => setShowPricing(true)}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-200"
                >
                  <Zap size={13} /> Upgrade to Pro
                </button>
              )}
              {isPro && (
                <p className="mt-3 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active subscription
                </p>
              )}
            </div>

            {/* Downloads */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Download size={15} className="text-slate-400" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Downloads</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-1.5">{currentMonth}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-800">{downloads}</span>
                {!isPro && <span className="text-sm text-slate-400">/ {FREE_LIMIT}</span>}
                {isPro && <span className="text-sm text-slate-400">this month</span>}
              </div>
              {!isPro && (
                <div className="mt-3">
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        remaining === 0 ? "bg-red-500" : remaining === 1 ? "bg-amber-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${Math.min(100, (downloads / FREE_LIMIT) * 100)}%` }}
                    />
                  </div>
                  <p className={`mt-1.5 text-[11px] ${remaining === 0 ? "text-red-600 font-semibold" : "text-slate-400"}`}>
                    {remaining === 0
                      ? "Limit reached — upgrade for unlimited"
                      : `${remaining} download${remaining !== 1 ? "s" : ""} remaining`}
                  </p>
                </div>
              )}
              {isPro && (
                <p className="mt-3 text-[11px] text-slate-400">Unlimited downloads included</p>
              )}
            </div>
          </div>

          {/* Plan Features */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                <Shield size={15} className="text-slate-400" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan Features</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Feature active>{isPro ? "Unlimited" : "3"} downloads / month</Feature>
              <Feature active={isPro}>{isPro ? "No watermark" : "Watermark on PDFs"}</Feature>
              <Feature active>All 20 document types</Feature>
              <Feature active={isPro}>Premium templates</Feature>
              <Feature active>Auto-save drafts</Feature>
              <Feature active={isPro}>Priority support</Feature>
            </div>
            {!isPro && (
              <button
                onClick={() => setShowPricing(true)}
                className="mt-4 text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
              >
                View all plans <ChevronRight size={13} />
              </button>
            )}
          </div>

          {/* Saved Drafts */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                <FileText size={15} className="text-slate-400" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Saved Drafts</span>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold ml-auto">
                {drafts.length}
              </span>
            </div>
            {drafts.length === 0 ? (
              <p className="text-[13px] text-slate-400">No saved drafts yet. Start creating documents to see them here.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {drafts.map((draft) => (
                  <li key={draft.type} className="flex items-center justify-between py-2.5 group">
                    <button
                      onClick={() => router.push(`/documents/${draft.type}`)}
                      className="text-[13px] text-slate-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      {draft.label}
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft.type)}
                      className="text-slate-300 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Delete draft"
                    >
                      <Trash2 size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Account Details */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                <Calendar size={15} className="text-slate-400" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Details</span>
            </div>
            <dl className="space-y-3 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-slate-400">User ID</dt>
                <dd className="text-slate-700 font-mono text-[11px]">{user.id.slice(0, 16)}…</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Name</dt>
                <dd className="text-slate-700 font-medium">{user.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Email</dt>
                <dd className="text-slate-700">{user.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Tier</dt>
                <dd className="text-slate-700 font-semibold">{isPro ? "Pro" : "Free"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Downloads this month</dt>
                <dd className="text-slate-700">{downloads}</dd>
              </div>
            </dl>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 border border-red-200/80 text-red-500 rounded-2xl text-xs font-semibold hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </main>
      </div>

      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </div>
  );
}

function Feature({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-2.5 text-[13px] py-1 ${active ? "text-slate-700" : "text-slate-400"}`}>
      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? "bg-emerald-500" : "bg-slate-300"}`} />
      {children}
    </div>
  );
}
