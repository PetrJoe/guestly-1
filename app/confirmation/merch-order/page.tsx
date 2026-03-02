"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function MerchOrderConfirmation() {
  return (
    <div className="container flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-neutral-100 bg-white p-8 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
            <svg className="h-8 w-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Order Confirmed</h1>
            <p className="mt-1 text-sm text-neutral-600">Your merchandise order has been placed successfully.</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Link href="/wallet">
              <Button variant="outline" className="w-full">View Wallet</Button>
            </Link>
            <Link href="/explore">
              <Button className="w-full">Browse Events</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

