"use client";
import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function OrganiserRegisterPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "organiser", username: email.split('@')[0] }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Account created! Check your email to verify.");
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Create your Organiser account</h1>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">Start hosting amazing events on Guestly</p>
      </div>
      {error && (
        <div className="mb-4 rounded-lg bg-danger-50 border border-danger-200 p-3 text-sm text-danger-700">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-4 rounded-lg bg-success-50 border border-success-200 p-3 text-sm text-success-700">
          {message}
        </div>
      )}
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Input label="Full name" placeholder="John Doe" value={name} onChange={(e) => setName(e.currentTarget.value)} required />
        <Input label="Email" type="email" placeholder="organiser@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required />
        <Input label="Confirm password" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.currentTarget.value)} required />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account…" : "Create Account"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
        Already an organiser?{" "}
        <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}