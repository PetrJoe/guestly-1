"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";

export default function InputDemoPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Input Component Demo
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Enhanced Input component with icon support, improved focus states, hint text, and smooth error transitions
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Input */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Basic Input
            </h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                hint="This will be displayed on your profile"
              />
              <Input
                label="Username"
                placeholder="Choose a username"
                defaultValue="johndoe"
              />
            </div>
          </section>

          {/* Input with Icons */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Input with Icons
            </h2>
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                error={emailError}
                hint="We'll never share your email with anyone"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hint="Must be at least 8 characters"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                }
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pointer-events-auto hover:text-[var(--foreground)] transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                }
              />

              <Input
                label="Search Events"
                type="search"
                placeholder="Search for events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />

              <Input
                label="Amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                hint="Enter amount in USD"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
            </div>
          </section>

          {/* Error States */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Error States with Smooth Transitions
            </h2>
            <div className="space-y-4">
              <Input
                label="Credit Card Number"
                placeholder="1234 5678 9012 3456"
                error="Invalid card number"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                }
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+234 800 000 0000"
                error="Phone number must be 11 digits"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                }
              />
            </div>
          </section>

          {/* Disabled State */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Disabled State
            </h2>
            <div className="space-y-4">
              <Input
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
                hint="This field cannot be edited"
              />
              <Input
                label="Disabled with Value"
                defaultValue="Read-only value"
                disabled
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                }
              />
            </div>
          </section>

          {/* Focus States Demo */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Focus States
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Click or tab through these inputs to see the improved focus rings with proper design tokens
            </p>
            <div className="space-y-4">
              <Input
                label="Normal Focus"
                placeholder="Focus to see primary ring"
                hint="Uses --ring-primary-500/40 token"
              />
              <Input
                label="Error Focus"
                placeholder="Focus to see danger ring"
                error="This field has an error"
                hint="Uses --ring-danger-400/30 token"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
