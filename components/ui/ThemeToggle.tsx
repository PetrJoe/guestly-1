"use client";

import React, { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Respect system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    if (newTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const root = document.documentElement;
      root.classList.remove("theme-light", "theme-dark");
      root.classList.add(`theme-${prefersDark ? "dark" : "light"}`);
    } else {
      const root = document.documentElement;
      root.classList.remove("theme-light", "theme-dark");
      root.classList.add(`theme-${newTheme}`);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex h-9 w-[140px] items-center justify-center rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--foreground-muted)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-1 shadow-sm">
      <button
        onClick={() => handleThemeChange("light")}
        className={`flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-all duration-[var(--duration-fast)] ${
          theme === "light"
            ? "bg-[var(--surface-hover)] text-[var(--foreground)] shadow-sm"
            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="Light theme"
        title="Light theme"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        onClick={() => handleThemeChange("dark")}
        className={`flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-all duration-[var(--duration-fast)] ${
          theme === "dark"
            ? "bg-[var(--surface-hover)] text-[var(--foreground)] shadow-sm"
            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="Dark theme"
        title="Dark theme"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <span className="hidden sm:inline">Dark</span>
      </button>

      <button
        onClick={() => handleThemeChange("system")}
        className={`flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-all duration-[var(--duration-fast)] ${
          theme === "system"
            ? "bg-[var(--surface-hover)] text-[var(--foreground)] shadow-sm"
            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="System theme"
        title="System theme"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="hidden sm:inline">Auto</span>
      </button>
    </div>
  );
}
