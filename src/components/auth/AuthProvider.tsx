"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { UserTier } from "@/types";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  upgradeTier: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  upgradeTier: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const TIER_KEY = "docgen_user_tier";

function toAuthUser(fbUser: FirebaseUser): AuthUser {
  const savedTier = (typeof window !== "undefined" && localStorage.getItem(`${TIER_KEY}_${fbUser.uid}`)) as UserTier | null;
  return {
    id: fbUser.uid,
    name: fbUser.displayName || "User",
    email: fbUser.email || "",
    tier: savedTier === "paid" ? "paid" : "free",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser ? toAuthUser(fbUser) : null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    // Re-read so displayName is picked up
    setUser(toAuthUser(credential.user));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const upgradeTier = useCallback(() => {
    if (user) {
      const upgraded = { ...user, tier: "paid" as const };
      setUser(upgraded);
      try { localStorage.setItem(`${TIER_KEY}_${user.id}`, "paid"); } catch { /* noop */ }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading, login, signup, loginWithGoogle, logout, upgradeTier }}>
      {children}
    </AuthContext.Provider>
  );
}
