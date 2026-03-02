"use client";
import React from "react";

function SunIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  function apply(t: "light" | "dark") {
    const el = document.documentElement;
    el.classList.remove("theme-light", "theme-dark");
    el.classList.add(t === "dark" ? "theme-dark" : "theme-light");
    localStorage.setItem("theme", t);
  }

  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("theme") as "light" | "dark" | null) : null;
    let initial: "light" | "dark" = "light";
    if (saved) {
      initial = saved;
    } else if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      initial = prefersDark ? "dark" : "light";
    }
    apply(initial);
    setTheme(initial);
  }, []);

  function toggle() {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t);
    apply(t);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
      title="Toggle theme"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
