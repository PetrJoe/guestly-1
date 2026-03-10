"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VendorRegisterRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/vendor-auth/register");
  }, [router]);

  return null;
}
