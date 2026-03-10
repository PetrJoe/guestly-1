"use client";
import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorTopBar from "@/components/layout/VendorTopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/vendor";

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[var(--surface-bg)]">
        <VendorSidebar />
        <main className="flex-1 md:ml-64">
          <VendorTopBar />
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
