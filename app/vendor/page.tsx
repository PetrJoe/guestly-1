"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VendorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new comprehensive dashboard
    router.replace("/vendor/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
    </div>
  );
}
