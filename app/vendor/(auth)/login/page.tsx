"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VendorLoginRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/vendor-auth/login");
  }, [router]);

  return null;
}
