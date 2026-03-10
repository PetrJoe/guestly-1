"use client";
import React from "react";
import RadioGroup from "@/components/ui/Radio";

export default function RadioDemoPage() {
  const [paymentMethod, setPaymentMethod] = React.useState("card");
  const [eventType, setEventType] = React.useState("");
  const [subscription, setSubscription] = React.useState("monthly");

  const paymentOptions = [
    {
      value: "wallet",
      label: "GUESTLY Wallet",
      description: "Pay instantly with your wallet balance",
    },
    {
      value: "card",
      label: "Credit/Debit Card",
      description: "Visa, Mastercard, Verve accepted",
    },
    {
      value: "crypto",
      label: "Cryptocurrency",
      description: "USDT, Bitcoin supported",
    },
    {
      value: "mobile",
      label: "Mobile Money",
      description: "M-Pesa, MTN Mobile Money",
      disabled: true,
    },
  ];

  const eventTypeOptions = [
    { value: "physical", label: "Physical Event" },
    { value: "virtual", label: "Virtual Event" },
    { value: "hybrid", label: "Hybrid Event" },
  ];

  const subscriptionOptions = [
    { value: "monthly", label: "Monthly - $29/mo" },
    { value: "yearly", label: "Yearly - $290/yr (Save 17%)" },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
            Radio Component Demo
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Demonstrating radio button groups with single selection, keyboard
            navigation, and accessibility features.
          </p>
        </div>

        <div className="space-y-8">
          {/* Payment Method Selection */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Payment Method Selection
            </h2>
            <RadioGroup
              name="payment"
              label="Choose your payment method"
              options={paymentOptions}
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
            <div className="mt-4 p-4 bg-[var(--surface-hover)] rounded-lg">
              <p className="text-sm text-[var(--foreground-muted)]">
                Selected: <span className="font-medium text-[var(--foreground)]">{paymentMethod}</span>
              </p>
            </div>
          </div>

          {/* Event Type Selection */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Event Type Selection
            </h2>
            <RadioGroup
              name="eventType"
              label="What type of event are you hosting?"
              options={eventTypeOptions}
              value={eventType}
              onChange={setEventType}
              error={!eventType ? "Please select an event type" : undefined}
            />
            {eventType && (
              <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-sm text-primary-700">
                  ✓ You selected: <span className="font-semibold">{eventType}</span>
                </p>
              </div>
            )}
          </div>

          {/* Horizontal Layout */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Horizontal Layout
            </h2>
            <RadioGroup
              name="subscription"
              label="Choose your subscription plan"
              options={subscriptionOptions}
              value={subscription}
              onChange={setSubscription}
              orientation="horizontal"
            />
            <div className="mt-4 p-4 bg-success-50 border border-success-200 rounded-lg">
              <p className="text-sm text-success-700">
                Current plan: <span className="font-semibold">{subscription}</span>
              </p>
            </div>
          </div>

          {/* Disabled State */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Disabled State
            </h2>
            <RadioGroup
              name="disabled"
              label="This radio group is disabled"
              options={eventTypeOptions}
              value="physical"
              disabled={true}
            />
          </div>

          {/* Accessibility Features */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Accessibility Features
            </h2>
            <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Full keyboard navigation with arrow keys</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Space and Enter key support for selection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Proper ARIA attributes (role, aria-checked, aria-disabled)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Visible focus indicators for keyboard users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Screen reader support with labels and descriptions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
