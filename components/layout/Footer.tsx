import React from "react";
import Link from "next/link";

const footerLinks = {
  discover: [
    { href: "/explore", label: "Explore Events" },
    { href: "/search", label: "Search" },
    { href: "/city/Lagos", label: "Lagos" },
    { href: "/city/Abuja", label: "Abuja" },
    { href: "/city/Accra", label: "Accra" },
    { href: "/city/Nairobi", label: "Nairobi" },
  ],
  organise: [
    { href: "/dashboard", label: "Organiser Dashboard" },
    { href: "/dashboard/events/new", label: "Create Event" },
    { href: "/dashboard/analytics", label: "Analytics" },
    { href: "/dashboard/merch", label: "Merchandise" },
  ],
  account: [
    { href: "/login", label: "Log in" },
    { href: "/register", label: "Sign up" },
    { href: "/wallet", label: "Wallet" },
    { href: "/wallet/savings", label: "Event Savings" },
  ],
  platform: [
    { href: "#", label: "Virtual Events" },
    { href: "/vendor/register", label: "Become a Vendor" },
    { href: "#", label: "Pricing" },
    { href: "#", label: "API Docs" },
  ],
};

const socialLinks = [
  {
    href: "https://twitter.com",
    label: "X / Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--surface-card)] text-[var(--foreground-muted)] border-t border-[var(--surface-border)]">
      {/* Top Feature Bar */}
      <div className="border-b border-[var(--surface-border)]">
        <div className="container py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: "🎟️", title: "Instant Tickets", desc: "Buy in seconds" },
              { icon: "🌍", title: "Pan-Africa", desc: "Lagos to Nairobi" },
              { icon: "📊", title: "Smart Analytics", desc: "Real-time insights" },
              { icon: "🔒", title: "Secure Payments", desc: "Bank-grade encryption" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-black text-[var(--foreground)] uppercase tracking-wider">{item.title}</p>
                  <p className="text-[10px] text-[var(--foreground-subtle)] font-medium uppercase tracking-widest">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-sm font-black text-white shadow-md btn-glow-blue transition-all group-hover:scale-105">
                G
              </div>
              <span className="text-base font-bold tracking-tight text-[var(--foreground)]">Guestly</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-muted)]">
              The event infrastructure platform for Africa and beyond.
            </p>

            {/* Social Links */}
            <div className="mt-4 flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-bg)] text-[var(--foreground-subtle)] transition hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries({
          Discover: footerLinks.discover,
          Organise: footerLinks.organise,
          Account: footerLinks.account,
          Platform: footerLinks.platform,
        }).map(([section, links]) => (
          <div key={section}>
            <div className="mb-4 text-xs font-black uppercase tracking-widest text-[var(--foreground-subtle)]">{section}</div>
            <ul className="flex flex-col gap-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-6 sm:flex-row">
        <div className="text-xs text-[var(--foreground-subtle)] font-medium">
          &copy; {new Date().getFullYear()} Guestly. All rights reserved. Built for Africa.
        </div>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Support"].map((label) => (
            <Link key={label} href="#" className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground-subtle)] transition-colors hover:text-[var(--foreground)]">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
    </footer>
  );
}
