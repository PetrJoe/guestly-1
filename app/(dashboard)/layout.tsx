"use client";
import React from "react";
import DashboardTopBar from "@/components/layout/DashboardTopBar";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebar();
  const collapsed = sidebar ? !sidebar.open : false;
  const offsets = collapsed ? "md:ml-16 md:w-[calc(100%-4rem)]" : "md:ml-64 md:w-[calc(100%-16rem)]";
  const [subActive, setSubActive] = React.useState<boolean | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    fetch("/api/organiser/subscription")
      .then((r) => r.json())
      .then((d) => {
        const active = d?.subscription && d.subscription.expiresAt > Date.now();
        setSubActive(!!active);
      })
      .catch(() => setSubActive(null));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar />
      <DashboardTopBar />
      {subActive === false && pathname !== "/dashboard/subscription" && (
        <div className={`px-4 sm:px-6 lg:px-8 ${offsets}`}>
          <div className="mb-2 rounded-lg border border-warning-200 bg-warning-50 px-3 py-2 text-xs text-warning-800">
            Your organiser account is inactive. Activate a subscription to continue using all features.
            <Link href="/dashboard/subscription" className="ml-2 rounded-md border border-warning-300 bg-white px-2 py-0.5 font-semibold text-warning-800 hover:bg-warning-100">
              Activate
            </Link>
          </div>
        </div>
      )}
      <main className={`min-w-0 px-4 py-6 sm:px-6 lg:px-8 ${offsets}`}>{children}</main>
    </div>
  );
}
