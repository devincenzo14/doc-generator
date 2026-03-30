"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import AuthModal from "@/components/auth/AuthModal";
import PricingModal from "@/components/ui/PricingModal";
import { FileText, Crown, LogOut, UserCircle } from "lucide-react";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <FileText size={22} className="text-blue-600" />
            DocGen
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPricing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full hover:bg-amber-100 transition-colors"
            >
              <Crown size={14} />
              Upgrade
            </button>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/profile" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <UserCircle size={18} />
                  {user?.name}
                </Link>
                {user?.tier === "paid" && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">PRO</span>
                )}
                <button onClick={logout} className="text-gray-400 hover:text-gray-600" title="Log out">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </>
  );
}
