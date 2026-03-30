"use client";

import React from "react";
import { Rocket } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeOverlay_0.2s_ease-out]" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 w-full max-w-xs p-8 mx-4 text-center animate-[slideUp_0.25s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mx-auto mb-4">
          <Rocket size={26} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Coming Soon</h2>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          Pro subscriptions are on the way! Stay tuned for unlimited downloads, no watermarks, and premium templates.
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-[0.98] shadow-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
