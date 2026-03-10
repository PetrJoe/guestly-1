"use client";
import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorTopBar from "@/components/layout/VendorTopBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
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
