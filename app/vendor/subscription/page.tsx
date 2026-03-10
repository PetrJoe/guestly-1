"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type SubscriptionPlan = "free" | "1m" | "3m" | "6m" | "12m";

interface PlanDetails {
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

const PLANS: Record<SubscriptionPlan, PlanDetails> = {
  free: {
    name: "Free",
    price: 0,
    duration: "Forever",
    features: [
      "Basic vendor profile",
      "Receive event invitations",
      "Contact information display",
      "Portfolio showcase (up to 5 images)",
    ],
  },
  "1m": {
    name: "Premium Monthly",
    price: 4999,
    duration: "1 Month",
    features: [
      "All Free features",
      "Featured placement in vendor directory",
      "Priority in search results",
      "Advanced analytics dashboard",
      "Unlimited portfolio images",
      "Performance metrics tracking",
      "Lead generation insights",
    ],
  },
  "3m": {
    name: "Premium Quarterly",
    price: 12999,
    duration: "3 Months",
    popular: true,
    features: [
      "All Premium Monthly features",
      "Save 13% vs monthly",
      "Featured placement guarantee",
      "Priority customer support",
      "Quarterly performance reports",
    ],
  },
  "6m": {
    name: "Premium Semi-Annual",
    price: 23999,
    duration: "6 Months",
    features: [
      "All Premium Quarterly features",
      "Save 20% vs monthly",
      "Extended featured placement",
      "Dedicated account manager",
      "Custom branding options",
    ],
  },
  "12m": {
    name: "Premium Annual",
    price: 44999,
    duration: "12 Months",
    features: [
      "All Premium Semi-Annual features",
      "Save 25% vs monthly",
      "Year-round featured placement",
      "Premium badge on profile",
      "Advanced lead analytics",
      "Priority event invitations",
    ],
  },
};

export default function VendorSubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>("free");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const res = await fetch("/api/vendor/subscription");
      if (res.ok) {
        const data = await res.json();
        if (data.subscription) {
          setCurrentPlan(data.subscription.plan);
          setExpiresAt(data.subscription.expiresAt);
        }
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (plan === "free") return;

    setSubscribing(true);
    setSelectedPlan(plan);

    try {
      const res = await fetch("/api/vendor/subscription/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentPlan(data.subscription.plan);
        setExpiresAt(data.subscription.expiresAt);
        alert("Subscription activated successfully!");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to activate subscription");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubscribing(false);
      setSelectedPlan(null);
    }
  };

  const isPremium = currentPlan !== "free";
  const daysRemaining = expiresAt
    ? Math.ceil((expiresAt - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-bg)] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-[var(--surface-card)] rounded w-64 mb-4"></div>
            <div className="h-4 bg-[var(--surface-card)] rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-[var(--surface-card)] rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Vendor Subscription
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Upgrade to Premium to unlock featured placement, advanced analytics, and more
          </p>
        </div>

        {/* Current Plan Status */}
        {isPremium && (
          <Card className="mb-8 p-6 bg-gradient-to-r from-primary-500/10 to-success-500/10 border-primary-500/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-[var(--foreground)]">
                    Current Plan: {PLANS[currentPlan].name}
                  </span>
                  <span className="px-2 py-1 bg-success-500 text-white text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {daysRemaining > 0
                    ? `${daysRemaining} days remaining`
                    : "Expired - Please renew"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  ₦{(PLANS[currentPlan].price / 100).toLocaleString()}
                </p>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {PLANS[currentPlan].duration}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {(Object.keys(PLANS) as SubscriptionPlan[]).map((planKey) => {
            const plan = PLANS[planKey];
            const isCurrent = planKey === currentPlan;
            const isPopular = plan.popular;

            return (
              <Card
                key={planKey}
                className={`relative p-6 ${
                  isPopular
                    ? "border-2 border-primary-500 shadow-lg"
                    : isCurrent
                    ? "border-2 border-success-500"
                    : ""
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {isCurrent && (
                  <div className="absolute -top-3 right-4">
                    <span className="px-3 py-1 bg-success-500 text-white text-xs font-bold rounded-full">
                      CURRENT
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-[var(--foreground)]">
                      ₦{(plan.price / 100).toLocaleString()}
                    </span>
                    {planKey !== "free" && (
                      <span className="text-sm text-[var(--foreground-muted)]">
                        / {plan.duration.toLowerCase()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    {plan.duration}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-[var(--foreground-muted)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isPopular ? "primary" : "secondary"}
                  fullWidth
                  disabled={isCurrent || subscribing}
                  loading={subscribing && selectedPlan === planKey}
                  onClick={() => handleSubscribe(planKey)}
                >
                  {isCurrent
                    ? "Current Plan"
                    : planKey === "free"
                    ? "Free Forever"
                    : "Subscribe Now"}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Premium Benefits */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Why Go Premium?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                Featured Placement
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Appear at the top of vendor search results and get 3x more visibility
                from event organizers looking for services.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-success-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-success-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                Advanced Analytics
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Track profile views, invitation rates, and conversion metrics to optimize
                your vendor business.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-warning-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-warning-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                Priority Support
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Get dedicated support and faster response times to help grow your vendor
                business on Guestly.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
