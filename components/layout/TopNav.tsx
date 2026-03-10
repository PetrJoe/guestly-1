"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import NotificationBell from "@/components/notifications/NotificationBell";

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function BellIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function LogOutIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function UserIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function WalletIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 10h20" />
    </svg>
  );
}

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/near", label: "Near Me" },
  { href: "/search", label: "Search" },
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [role, setRole] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const mobileCloseRef = React.useRef<HTMLButtonElement>(null);
  const profileButtonRef = React.useRef<HTMLButtonElement>(null);
  const profileMenuId = React.useId();

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  React.useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.ok) setRole(d.role); })
      .catch(() => { });
  }, []);

  React.useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { setRole(d?.ok ? d.role : null); })
      .catch(() => { });
  }, [pathname]);

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  React.useEffect(() => { setMobileOpen(false); }, [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    mobileCloseRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { e.preventDefault(); setMobileOpen(false); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { setProfileOpen(false); profileButtonRef.current?.focus(); }
    }
    if (profileOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [profileOpen]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setRole(null);
    setProfileOpen(false);
    if (role === "vendor") router.replace("/");
    else router.replace("/login");
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
            ? "border-b border-[var(--surface-border)] bg-[var(--surface-card)]/90 backdrop-blur-xl shadow-sm"
            : "border-b border-transparent bg-[var(--surface-card)]/80 backdrop-blur-md"
          }`}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-7">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-sm font-black text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 btn-glow-blue">
                G
              </div>
              <span className="text-base font-bold tracking-tight text-[var(--foreground)]">
                Guestly
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden items-center gap-0.5 md:flex">
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-150 ${isActive(link.href)
                      ? "text-primary-600 bg-primary-50"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary-500" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Search (mobile) */}
            <Link
              href="/search"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] md:hidden"
              aria-label="Search"
            >
              <SearchIcon />
            </Link>

            {/* Search (desktop inline) */}
            <Link
              href="/search"
              className="hidden md:flex h-9 items-center gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3 text-sm text-[var(--foreground-muted)] transition hover:border-primary-300 hover:text-primary-600"
            >
              <SearchIcon className="h-4 w-4" />
              <span>Search events…</span>
            </Link>

            {/* Notifications */}
            {role && <NotificationBell />}

            {/* Desktop: Auth / Profile */}
            {role ? (
              <div ref={profileRef} className="relative hidden md:block">
                <button
                  ref={profileButtonRef}
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-[var(--surface-hover)]"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  aria-controls={profileMenuId}
                  aria-label="Profile menu"
                >
                  <Avatar name={role === "organiser" ? "Organiser" : role === "vendor" ? "Vendor" : "Attendee"} size={30} />
                  <ChevronDownIcon className={`h-3.5 w-3.5 text-[var(--foreground-muted)] transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <div
                    id={profileMenuId}
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] py-1.5 shadow-xl animate-slide-down"
                  >
                    <div className="border-b border-[var(--surface-border)] px-4 py-3">
                      <div className="text-sm font-semibold text-[var(--foreground)]">
                        {role === "organiser" ? "Organiser" : role === "vendor" ? "Vendor" : "Attendee"}
                      </div>
                      <div className="text-xs text-[var(--foreground-muted)]">Logged in</div>
                    </div>
                    <Link role="menuitem" href="/attendee/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors" onClick={() => setProfileOpen(false)}>
                      <UserIcon /> Profile
                    </Link>
                    <Link role="menuitem" href={role === "organiser" ? "/dashboard" : role === "vendor" ? "/vendor" : "/attendee"} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors" onClick={() => setProfileOpen(false)}>
                      <UserIcon /> Dashboard
                    </Link>
                    <Link role="menuitem" href="/wallet" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors" onClick={() => setProfileOpen(false)}>
                      <WalletIcon /> Wallet
                    </Link>
                    <div className="my-1 border-t border-[var(--surface-border)]" />
                    <button role="menuitem" onClick={handleLogout} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-danger-600 hover:bg-danger-50 transition-colors">
                      <LogOutIcon /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link href="/login" className="rounded-xl px-3.5 py-2 text-sm font-medium text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]">
                  Log in
                </Link>
                <Link href="/register" className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-600 btn-glow-blue shadow-sm">
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] transition-colors md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
          <div
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-[var(--surface-card)] shadow-2xl md:hidden animate-slide-down"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex h-16 items-center justify-between border-b border-[var(--surface-border)] px-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-xs font-black text-white">G</div>
                <span className="text-base font-bold text-[var(--foreground)]">Guestly</span>
              </div>
              <button ref={mobileCloseRef} onClick={() => setMobileOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-[var(--surface-hover)]" aria-label="Close menu">
                <XIcon className="h-5 w-5 text-[var(--foreground-muted)]" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${isActive(link.href)
                      ? "bg-primary-50 text-primary-700"
                      : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-3 border-t border-[var(--surface-border)]" />
              
              {/* Theme Toggle in mobile menu */}
              <div className="px-4 py-2">
                <ThemeToggle />
              </div>
              
              <div className="my-3 border-t border-[var(--surface-border)]" />
              {role ? (
                <>
                  <Link href="/attendee/profile" className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)]">
                    <UserIcon className="h-4 w-4" /> Profile
                  </Link>
                  <Link href={role === "organiser" ? "/dashboard" : role === "vendor" ? "/vendor" : "/attendee"} className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)]">
                    <UserIcon className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link href="/wallet" className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)]">
                    <WalletIcon className="h-4 w-4" /> Wallet
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm text-danger-600 hover:bg-danger-50">
                    <LogOutIcon className="h-4 w-4" /> Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link href="/login" className="rounded-xl border border-[var(--surface-border)] px-4 py-2.5 text-center text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-hover)]">
                    Log in
                  </Link>
                  <Link href="/register" className="rounded-xl bg-primary-500 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-600">
                    Sign up free
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
