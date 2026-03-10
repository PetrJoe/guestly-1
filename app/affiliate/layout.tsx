"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/affiliate";

  if (isLandingPage) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--surface-bg)]">
        <TopNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const navItems = [
    { href: "/affiliate/dashboard", label: "Dashboard", icon: "chart" },
    { href: "/affiliate/performance", label: "Performance", icon: "trending-up" },
    { href: "/affiliate/payouts", label: "Payouts", icon: "wallet" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[var(--surface-bg)]">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0 z-50 bg-[var(--surface-card)] border-r border-[var(--surface-border)]">
          <div className="flex flex-col flex-1 min-h-0">
            {/* Logo */}
            <div className="flex items-center h-16 px-6 border-b border-[var(--surface-border)]">
              <Link href="/affiliate/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  Guestly
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Affiliates</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-primary-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <Icon name={item.icon as any} className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--surface-border)]">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon name="home" className="w-4 h-4" />
                Back to Guestly
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          {/* Top Bar */}
          <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-[var(--surface-border)] bg-[var(--surface-card)] px-6">
            <h1 className="text-lg font-semibold">Affiliate Portal</h1>
          </div>

          {/* Page Content */}
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
