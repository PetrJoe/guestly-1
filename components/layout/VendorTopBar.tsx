"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import NotificationBell from "@/components/notifications/NotificationBell";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function VendorTopBar() {
  const router = useRouter();
  const sidebar = useSidebar();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [vendorName, setVendorName] = React.useState("Vendor");

  React.useEffect(() => {
    // Fetch vendor profile
    async function fetchProfile() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          // In a real app, fetch vendor details from /api/vendor/profile
          setVendorName(data.user?.name || "Vendor");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    fetchProfile();
  }, []);

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/vendor/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--surface-border)] bg-[var(--surface-card)] px-4 md:px-6 shadow-sm">
      {/* Left: Mobile menu toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => sidebar?.setOpenMobile(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--surface-border)] text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-hover)] md:hidden"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Breadcrumb or page title can go here */}
        <h1 className="hidden text-lg font-semibold text-[var(--foreground)] md:block">
          Vendor Portal
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <NotificationBell />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3 py-2 transition-colors hover:bg-[var(--surface-hover)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500/20 text-xs font-bold text-primary-600">
              {vendorName.charAt(0).toUpperCase()}
            </span>
            <span className="hidden text-sm font-medium text-[var(--foreground)] md:inline">
              {vendorName}
            </span>
            <svg className="h-4 w-4 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-lg z-50">
                <div className="border-b border-[var(--surface-border)] p-3">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{vendorName}</p>
                  <p className="text-xs text-[var(--foreground-muted)]">Vendor Account</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/vendor/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/vendor/subscription");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Subscription
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/vendor/notifications");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Notifications
                  </button>
                </div>
                <div className="border-t border-[var(--surface-border)] p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-danger-600 transition-colors hover:bg-danger-50"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
