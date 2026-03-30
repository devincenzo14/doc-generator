"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { ArrowLeft, Lock, CheckCircle, AlertCircle } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode") || "";

  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "success" | "invalid">("loading");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!oobCode) {
      setStatus("invalid");
      return;
    }
    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setEmail(email);
        setStatus("ready");
      })
      .catch(() => {
        setStatus("invalid");
      });
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPw) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus("success");
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/expired-action-code":
            setError("This reset link has expired. Please request a new one.");
            break;
          case "auth/invalid-action-code":
            setError("This reset link is invalid or has already been used.");
            break;
          case "auth/weak-password":
            setError("Password must be at least 6 characters.");
            break;
          default:
            setError(err.message);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200";

  if (status === "loading") {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-400">Verifying reset link…</p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Invalid or expired link</h2>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          This password reset link is invalid, expired, or has already been used.
        </p>
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-[0.98] shadow-sm"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Password updated!</h2>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Your password has been reset successfully. You can now sign in with your new
          password.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-[0.98] shadow-sm"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  // status === "ready"
  return (
    <>
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Lock size={22} className="text-blue-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Set new password</h2>
      <p className="text-sm text-slate-400 mb-5">
        Enter a new password for <span className="font-medium text-slate-600">{email}</span>
      </p>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
            placeholder="At least 6 characters"
            required
            minLength={6}
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className={inputCls}
            placeholder="Re-enter your password"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 active:scale-[0.98] shadow-sm"
        >
          {submitting ? "Updating…" : "Reset Password"}
        </button>
      </form>

      <div className="mt-5 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Dashboard
        </Link>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-[slideUp_0.25s_ease-out]">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 p-7">
          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-slate-400">Loading…</p>
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
