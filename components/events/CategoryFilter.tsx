"use client";
import React from "react";

const categories = [
  { value: "", label: "All", icon: "🌟" },
  { value: "Music", label: "Music", icon: "🎵" },
  { value: "Tech", label: "Tech", icon: "💻" },
  { value: "Art", label: "Art", icon: "🎨" },
  { value: "Food", label: "Food", icon: "🍔" },
  { value: "Sports", label: "Sports", icon: "⚽" },
  { value: "Business", label: "Business", icon: "💼" },
  { value: "Health", label: "Health", icon: "🏥" },
];

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function CategoryFilter({ value = "", onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => {
        const active = value === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onChange?.(cat.value)}
            className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] ${
              active
                ? "bg-primary-600 text-white shadow-[var(--elevation-2)] scale-105"
                : "bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)] hover:border-primary-200 hover:scale-105 hover:shadow-[var(--elevation-1)]"
            }`}
            style={{
              transform: active ? "scale(1.05)" : undefined,
            }}
          >
            <span className="text-base leading-none">{cat.icon}</span>
            <span>{cat.label}</span>
            
            {/* Active indicator */}
            {active && (
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 opacity-20 blur-sm" />
            )}
          </button>
        );
      })}
    </div>
  );
}

