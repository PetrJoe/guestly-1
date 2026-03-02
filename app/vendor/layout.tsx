"use client";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const unprotected = pathname === "/vendor/login" || pathname === "/vendor/register";
  const [subActive, setSubActive] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (unprotected) return;
    fetch("/api/vendor/subscription")
      .then((r) => r.json())
      .then((d) => {
        const active = d?.subscription && d.subscription.expiresAt > Date.now();
        setSubActive(!!active);
      })
      .catch(() => setSubActive(null));
  }, [unprotected]);
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <TopNav />
      {unprotected ? (
        <main className="container flex-1 py-8">{children}</main>
      ) : (
        <ProtectedRoute allowRoles={["vendor"]}>
          <>
            {subActive === false && pathname !== "/vendor/subscription" && (
              <div className="bg-warning-50 border-y border-warning-100">
                <div className="container flex items-center justify-between py-2 text-xs">
                  <span className="text-warning-800">Your vendor account is inactive. Activate a subscription plan to access all features.</span>
                  <Link href="/vendor/subscription" className="rounded-md border border-warning-200 bg-white px-2 py-1 font-medium text-warning-800 hover:bg-warning-100">
                    Activate
                  </Link>
                </div>
              </div>
            )}
            <main className="container flex-1 py-8">{children}</main>
          </>
        </ProtectedRoute>
      )}
      <Footer />
      <BottomNav />
    </div>
  );
}
