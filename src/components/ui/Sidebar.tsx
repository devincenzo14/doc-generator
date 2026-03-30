"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import AuthModal from "@/components/auth/AuthModal";
import PricingModal from "@/components/ui/PricingModal";
import {
  FileText,
  LayoutDashboard,
  UserCircle,
  Crown,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard, show: true },
    { href: "/profile", label: "Account", icon: UserCircle, show: isLoggedIn },
  ];

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-slate-100 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
          <FileText size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-[15px] font-bold text-slate-800 tracking-tight">
            DocGen
          </span>
        )}
        {/* Mobile close button */}
        {mobileOpen && (
          <button
            onClick={onMobileClose}
            className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all md:hidden"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.filter((item) => item.show).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <item.icon
                size={18}
                className={`shrink-0 transition-colors ${
                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      {!collapsed && (!user || user.tier === "free") && (
        <div className="mx-3 mb-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">Upgrade to Pro</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
              Unlimited downloads, no watermarks, premium templates.
            </p>
            <button
              onClick={() => { onMobileClose?.(); setShowPricing(true); }}
              className="block w-full text-center py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-semibold hover:shadow-md hover:shadow-blue-200 transition-all duration-200"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* User Section */}
      <div className="border-t border-slate-100 px-3 py-3 shrink-0">
        {isLoggedIn ? (
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0">
              <UserCircle size={16} className="text-slate-500" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-medium text-slate-700 truncate">{user?.name}</p>
                  {user?.tier === "paid" && (
                    <Crown size={12} className="text-amber-500 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors ${
              collapsed ? "px-2" : "px-4"
            }`}
          >
            <UserCircle size={14} />
            {!collapsed && "Sign In"}
          </button>
        )}
      </div>

      {/* Collapse Toggle — desktop only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-sm transition-all duration-200 hidden md:flex"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen flex-col bg-white border-r border-slate-200/80 transition-all duration-300 ease-in-out hidden md:flex ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-[fadeOverlay_0.2s_ease-out]"
            onClick={onMobileClose}
          />
          <aside className="fixed top-0 left-0 z-50 h-screen w-[280px] flex flex-col bg-white border-r border-slate-200/80 shadow-2xl md:hidden animate-[slideInLeft_0.25s_ease-out]">
            {sidebarContent}
          </aside>
        </>
      )}

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </>
  );
}
