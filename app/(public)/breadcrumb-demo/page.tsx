"use client";
import React from "react";
import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";

export default function BreadcrumbDemoPage() {
  const basicItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/explore" },
    { label: "Event Details" },
  ];

  const withIconsItems: BreadcrumbItem[] = [
    { 
      label: "Home", 
      href: "/",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      label: "Dashboard", 
      href: "/dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      label: "Settings",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  const longPathItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Events", href: "/dashboard/events" },
    { label: "Tech Conference 2024", href: "/dashboard/events/tech-conf-2024" },
    { label: "Tickets", href: "/dashboard/events/tech-conf-2024/tickets" },
    { label: "Edit Ticket Type" },
  ];

  const shortPathItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Current Page" },
  ];

  const chevronIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const arrowIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Breadcrumb Component Demo
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Navigation trails with separators, icons, and proper semantic HTML
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Breadcrumb */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Basic Breadcrumb
            </h2>
            <Breadcrumb items={basicItems} />
          </section>

          {/* With Icons */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              With Icons
            </h2>
            <Breadcrumb items={withIconsItems} />
          </section>

          {/* Custom Separators */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Custom Separators
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Slash separator (default)</p>
                <Breadcrumb items={basicItems} separator="/" />
              </div>
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Greater than separator</p>
                <Breadcrumb items={basicItems} separator=">" />
              </div>
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Dash separator</p>
                <Breadcrumb items={basicItems} separator="-" />
              </div>
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Chevron icon separator</p>
                <Breadcrumb items={basicItems} separator={chevronIcon} />
              </div>
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Arrow icon separator</p>
                <Breadcrumb items={basicItems} separator={arrowIcon} />
              </div>
            </div>
          </section>

          {/* Long Path */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Long Path
            </h2>
            <Breadcrumb items={longPathItems} separator={chevronIcon} />
          </section>

          {/* Short Path */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Short Path
            </h2>
            <Breadcrumb items={shortPathItems} />
          </section>

          {/* Real-World Examples */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Real-World Examples
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)] mb-2">Event Detail Page</p>
                <Breadcrumb 
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Explore", href: "/explore" },
                    { label: "Lagos", href: "/explore?city=lagos" },
                    { label: "Tech Conference 2024" },
                  ]}
                  separator={chevronIcon}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)] mb-2">Organizer Dashboard</p>
                <Breadcrumb 
                  items={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "My Events", href: "/dashboard/events" },
                    { label: "Tech Conference 2024", href: "/dashboard/events/tech-conf-2024" },
                    { label: "Analytics" },
                  ]}
                  separator={chevronIcon}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)] mb-2">Checkout Flow</p>
                <Breadcrumb 
                  items={[
                    { label: "Event", href: "/events/tech-conf-2024" },
                    { label: "Tickets", href: "/buy/tech-conf-2024" },
                    { label: "Checkout", href: "/checkout" },
                    { label: "Payment" },
                  ]}
                  separator={chevronIcon}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)] mb-2">Vendor Portal</p>
                <Breadcrumb 
                  items={[
                    { label: "Vendor Dashboard", href: "/vendor/dashboard" },
                    { label: "Services", href: "/vendor/services" },
                    { label: "Edit Service" },
                  ]}
                  separator={chevronIcon}
                />
              </div>
            </div>
          </section>

          {/* Accessibility Features */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Accessibility Features
            </h2>
            <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
              <li>✓ Semantic HTML with nav, ol, and li elements</li>
              <li>✓ Proper ARIA labels (aria-label=&quot;Breadcrumb&quot;, aria-current=&quot;page&quot;)</li>
              <li>✓ Keyboard navigation with focus indicators</li>
              <li>✓ Clear visual hierarchy (current page not clickable)</li>
              <li>✓ Hover states for interactive links</li>
              <li>✓ Icons marked as aria-hidden to avoid confusion</li>
              <li>✓ Separators marked as aria-hidden (decorative only)</li>
              <li>✓ Focus ring for keyboard users</li>
            </ul>
          </section>

          {/* Usage Guidelines */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Usage Guidelines
            </h2>
            <div className="space-y-4 text-sm text-[var(--foreground-muted)]">
              <div>
                <p className="font-medium text-[var(--foreground)] mb-1">When to use:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Deep navigation hierarchies (3+ levels)</li>
                  <li>Complex multi-step processes</li>
                  <li>Content with clear parent-child relationships</li>
                  <li>When users need to navigate back to parent pages</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-[var(--foreground)] mb-1">Best practices:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Keep labels concise (1-3 words)</li>
                  <li>Make the current page non-clickable</li>
                  <li>Use consistent separators across the site</li>
                  <li>Consider truncating very long paths on mobile</li>
                  <li>Place breadcrumbs near the top of the page</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
