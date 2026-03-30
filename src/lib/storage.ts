"use client";

const STORAGE_KEY_PREFIX = "docgen_";

export function saveDraft(docType: string, data: unknown): void {
  try {
    const key = `${STORAGE_KEY_PREFIX}draft_${docType}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage may be unavailable
  }
}

export function loadDraft<T>(docType: string): T | null {
  try {
    const key = `${STORAGE_KEY_PREFIX}draft_${docType}`;
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function clearDraft(docType: string): void {
  try {
    const key = `${STORAGE_KEY_PREFIX}draft_${docType}`;
    localStorage.removeItem(key);
  } catch {
    // noop
  }
}

export function saveUserTier(tier: "free" | "paid"): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}tier`, tier);
  } catch {
    // noop
  }
}

export function getUserTier(): "free" | "paid" {
  try {
    return (localStorage.getItem(`${STORAGE_KEY_PREFIX}tier`) as "free" | "paid") || "free";
  } catch {
    return "free";
  }
}

export function incrementDownloadCount(): number {
  try {
    const month = new Date().toISOString().slice(0, 7);
    const key = `${STORAGE_KEY_PREFIX}downloads_${month}`;
    const count = parseInt(localStorage.getItem(key) || "0", 10) + 1;
    localStorage.setItem(key, String(count));
    return count;
  } catch {
    return 0;
  }
}

export function getDownloadCount(): number {
  try {
    const month = new Date().toISOString().slice(0, 7);
    const key = `${STORAGE_KEY_PREFIX}downloads_${month}`;
    return parseInt(localStorage.getItem(key) || "0", 10);
  } catch {
    return 0;
  }
}
