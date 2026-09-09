"use client";

import * as React from "react";

export type AccentColor = "cyan" | "emerald" | "violet" | "amber" | "rose" | "blue";

export interface AccentOption {
  id: AccentColor;
  name: string;
  description: string;
  hsl: string;
  hex: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { id: "cyan", name: "Cyan", description: "Default neon cyan", hsl: "186 100% 42%", hex: "#06b6d4" },
  { id: "emerald", name: "Emerald", description: "Vibrant natural green", hsl: "160 84% 39%", hex: "#10b981" },
  { id: "violet", name: "Violet", description: "Deep electric purple", hsl: "263 70% 50%", hex: "#8b5cf6" },
  { id: "amber", name: "Amber", description: "Warm solar orange", hsl: "38 92% 50%", hex: "#f59e0b" },
  { id: "rose", name: "Rose", description: "Vivid scarlet rose", hsl: "346 84% 53%", hex: "#f43f5e" },
  { id: "blue", name: "Blue", description: "Classic sapphire blue", hsl: "217 91% 60%", hex: "#3b82f6" },
];

const ACCENT_STORAGE_KEY = "jiga_accent_theme";
const ACCENT_EVENT = "jiga-accent-updated";

export function getStoredAccent(): AccentColor {
  if (typeof window === "undefined") return "cyan";
  const stored = localStorage.getItem(ACCENT_STORAGE_KEY) as AccentColor | null;
  if (stored && ACCENT_OPTIONS.some((opt) => opt.id === stored)) {
    return stored;
  }
  return "cyan";
}

export function setStoredAccent(accent: AccentColor): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, accent);
    document.documentElement.setAttribute("data-accent", accent);
    window.dispatchEvent(new CustomEvent(ACCENT_EVENT, { detail: accent }));
  } catch {
    /* ignore */
  }
}

export function applyAccentToDocument(): void {
  if (typeof window === "undefined") return;
  const accent = getStoredAccent();
  document.documentElement.setAttribute("data-accent", accent);
}

export function useAccent() {
  const [accent, setAccent] = React.useState<AccentColor>(() => {
    if (typeof window !== "undefined") {
      return getStoredAccent();
    }
    return "cyan";
  });

  React.useEffect(() => {
    const current = getStoredAccent();
    setAccent(current);
    document.documentElement.setAttribute("data-accent", current);

    const onUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<AccentColor>;
      if (customEvent.detail) {
        setAccent(customEvent.detail);
      } else {
        setAccent(getStoredAccent());
      }
    };

    window.addEventListener(ACCENT_EVENT, onUpdate);
    return () => window.removeEventListener(ACCENT_EVENT, onUpdate);
  }, []);

  const changeAccent = React.useCallback((newAccent: AccentColor) => {
    setStoredAccent(newAccent);
    setAccent(newAccent);
  }, []);

  return { accent, changeAccent, options: ACCENT_OPTIONS };
}

/**
 * Calculates current local storage memory footprint in bytes
 */
export function getStorageUsage(): { bytes: number; formatted: string; keysCount: number } {
  if (typeof window === "undefined") {
    return { bytes: 0, formatted: "0 KB", keysCount: 0 };
  }
  try {
    let totalBytes = 0;
    const keysCount = localStorage.length;
    for (let i = 0; i < keysCount; i++) {
      const key = localStorage.key(i);
      if (key) {
        const val = localStorage.getItem(key) || "";
        totalBytes += (key.length + val.length) * 2; // UTF-16
      }
    }
    const formatted =
      totalBytes < 1024
        ? `${totalBytes} B`
        : totalBytes < 1024 * 1024
        ? `${(totalBytes / 1024).toFixed(1)} KB`
        : `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;

    return { bytes: totalBytes, formatted, keysCount };
  } catch {
    return { bytes: 0, formatted: "0 KB", keysCount: 0 };
  }
}

/**
 * Clears site cache and localStorage data safely
 */
export function clearSiteCache(options?: {
  clearFavorites?: boolean;
  clearThemeSettings?: boolean;
}): void {
  if (typeof window === "undefined") return;

  try {
    if (options?.clearFavorites) {
      localStorage.removeItem("jiga_favorites_ids");
      window.dispatchEvent(new CustomEvent("jiga-favorites-updated", { detail: [] }));
    }

    if (options?.clearThemeSettings) {
      localStorage.removeItem(ACCENT_STORAGE_KEY);
      localStorage.removeItem("theme"); // next-themes
      document.documentElement.removeAttribute("data-accent");
      window.dispatchEvent(new CustomEvent(ACCENT_EVENT, { detail: "cyan" }));
    }

    // Clear any search caches or session keys
    sessionStorage.clear();

    if (!options || (options.clearFavorites && options.clearThemeSettings)) {
      localStorage.clear();
      document.documentElement.setAttribute("data-accent", "cyan");
    }
  } catch {
    /* storage access error */
  }
}
