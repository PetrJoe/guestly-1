"use client";
import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AffiliateLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "attendee" }), // Affiliates are attendees with affiliate access
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        return;
      }
      router.replace("/affiliate/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Affiliate Sign In</h1>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">Access your affiliate dashboard</p>
      </div>
      {error && (
        <div className="mb-4 rounded-lg bg-danger-50 border border-danger-200 p-3 text-sm text-danger-700">
          {error}
        </div>
      )}
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="affiliate@example.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
        New affiliate?{" "}
        <Link href="/affiliate-auth/register" className="font-medium text-primary-600 hover:text-primary-700">
          Apply now
        </Link>
      </p>
    </div>
  );
}
