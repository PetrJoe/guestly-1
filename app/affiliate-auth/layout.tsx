import React from "react";
import Link from "next/link";

export default function AffiliateAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left branding panel — hidden on mobile */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy-800 p-10 lg:flex">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-100 w-100 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-success-500/10 blur-3xl" />

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-sm font-black text-white shadow-md btn-glow-blue">
            G
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Guestly</span>
        </Link>

        {/* Feature list */}
        <div className="relative z-10 flex flex-col gap-8 max-w-sm">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-700/50 bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-300 mb-4">
              🤝 Affiliate Program
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-white">
              Turn your influence into earnings
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-300">
              Drive ticket sales for the hottest events and earn commissions on every referral.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {[
              "High conversion commissions",
              "Real-time referral tracking",
              "Dedicated affiliate dashboard",
              "Fast payouts to bank or wallet",
              "Access to marketing assets",
            ].map((feat) => (
              <li key={feat} className="flex items-center gap-2.5 text-sm text-navy-200">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-500/15">
                  <svg className="h-3 w-3 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-navy-500">
          &copy; {new Date().getFullYear()} Guestly
        </p>
      </div>

      {/* Right content panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[var(--surface-bg)] px-4 py-10">
        {/* Mobile logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-sm font-black text-white btn-glow-blue">
            G
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">Guestly</span>
        </Link>

        {children}
      </div>
    </div>
  );
}
