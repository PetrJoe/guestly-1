"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";

export default function ButtonDemoPage() {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface-bg p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Button Component Demo</h1>
          <p className="text-foreground-muted">
            Enhanced with glow effects, loading states, icons, and micro-interactions
          </p>
        </div>

        {/* Variants */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </section>

        {/* Glow Effect (Dark Mode) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Glow Effect (Best in Dark Mode)</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" glow>
              Primary with Glow
            </Button>
            <Button variant="primary" glow size="lg">
              Large CTA with Glow
            </Button>
            <Button variant="success" glow>
              Success with Glow
            </Button>
          </div>
          <p className="text-sm text-foreground-muted">
            Toggle dark mode to see the glow effect on primary buttons
          </p>
        </section>

        {/* Loading States */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Loading States</h2>
          <div className="flex flex-wrap gap-4">
            <Button loading>Loading</Button>
            <Button variant="secondary" loading>
              Processing
            </Button>
            <Button variant="success" loading>
              Saving
            </Button>
            <Button onClick={handleLoadingDemo} loading={loading}>
              {loading ? "Loading..." : "Click to Load"}
            </Button>
          </div>
        </section>

        {/* Icons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Add Item
            </Button>
            <Button
              variant="secondary"
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              Next
            </Button>
            <Button
              variant="danger"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              }
            >
              Delete
            </Button>
            <Button
              variant="success"
              size="lg"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              }
            >
              Confirm
            </Button>
          </div>
        </section>

        {/* Disabled States */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Disabled States</h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </section>

        {/* Micro-interactions Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Micro-interactions</h2>
          <div className="space-y-3">
            <p className="text-foreground-muted">Click buttons to see ripple effect and scale animation</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Click for Ripple
              </Button>
              <Button variant="secondary" size="lg">
                Try Me Too
              </Button>
              <Button variant="success" size="lg" glow>
                Glow + Ripple
              </Button>
            </div>
          </div>
        </section>

        {/* Full Width */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Full Width</h2>
          <Button variant="primary" className="w-full" size="lg">
            Full Width Button
          </Button>
        </section>

        {/* Real-world Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Real-world Examples</h2>
          <div className="bg-surface-card p-6 rounded-2xl border border-surface-border space-y-4">
            <h3 className="text-lg font-semibold">Event Ticket Purchase</h3>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" glow className="flex-1" size="lg">
                Buy Tickets - ₦5,000
              </Button>
            </div>
          </div>

          <div className="bg-surface-card p-6 rounded-2xl border border-surface-border space-y-4">
            <h3 className="text-lg font-semibold">Form Actions</h3>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost">Cancel</Button>
              <Button variant="secondary">Save Draft</Button>
              <Button
                variant="primary"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
              >
                Publish Event
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
