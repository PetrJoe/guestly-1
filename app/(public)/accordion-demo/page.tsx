"use client";
import React, { useState } from "react";
import Accordion from "@/components/ui/Accordion";

export default function AccordionDemoPage() {
  const [singleExpanded, setSingleExpanded] = useState<string>("");
  const [multipleExpanded, setMultipleExpanded] = useState<string[]>([]);

  const basicItems = [
    {
      id: "item-1",
      title: "What is Guestly?",
      content:
        "Guestly is a modern event ticketing, planning, and community platform targeting African cities. We support physical, virtual, and hybrid events with comprehensive features for organizers and attendees.",
    },
    {
      id: "item-2",
      title: "How do I create an event?",
      content:
        "Creating an event is simple! Navigate to your organizer dashboard, click 'Create Event', and follow the step-by-step wizard. You can set up tickets, merchandise, streaming, and more.",
    },
    {
      id: "item-3",
      title: "What payment methods are supported?",
      content:
        "We support multiple payment methods including GUESTLY Wallet, credit/debit cards, cryptocurrency (USDT, Bitcoin), and mobile money (M-Pesa). Choose the method that works best for you.",
    },
    {
      id: "item-4",
      title: "Can I sell merchandise with my event?",
      content:
        "Yes! You can set up a merchandise store for your event. Add products with variants (sizes, colors), manage inventory, and offer bundled deals with tickets.",
    },
  ];

  const eventPlanningItems = [
    {
      id: "planning-1",
      title: "Event Setup",
      content: (
        <div className="space-y-2">
          <p>Configure your event details including:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Event type (Physical, Virtual, or Hybrid)</li>
            <li>Date, time, and location</li>
            <li>Ticket categories and pricing</li>
            <li>Event description and imagery</li>
          </ul>
        </div>
      ),
    },
    {
      id: "planning-2",
      title: "Ticket Management",
      content: (
        <div className="space-y-2">
          <p>Manage your ticket sales effectively:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Set capacity limits per ticket type</li>
            <li>Create early bird and VIP tiers</li>
            <li>Track real-time sales and availability</li>
            <li>Generate QR codes for entry</li>
          </ul>
        </div>
      ),
    },
    {
      id: "planning-3",
      title: "Marketing & Promotion",
      content: (
        <div className="space-y-2">
          <p>Promote your event to reach more attendees:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Share on social media platforms</li>
            <li>Send email campaigns to followers</li>
            <li>Create discount codes and promotions</li>
            <li>Get featured on city discovery pages</li>
          </ul>
        </div>
      ),
    },
    {
      id: "planning-4",
      title: "Day of Event",
      content: (
        <div className="space-y-2">
          <p>Everything you need for event day:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Check-in attendees with QR scanner</li>
            <li>Monitor live attendance numbers</li>
            <li>Engage with live chat and polls</li>
            <li>Track real-time analytics</li>
          </ul>
        </div>
      ),
    },
  ];

  const disabledItems = [
    {
      id: "disabled-1",
      title: "Available Section",
      content: "This section is available and can be expanded.",
    },
    {
      id: "disabled-2",
      title: "Disabled Section",
      content: "This content is not accessible.",
      disabled: true,
    },
    {
      id: "disabled-3",
      title: "Another Available Section",
      content: "This section is also available.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-bg py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Accordion Component
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Collapsible content sections with smooth animations. Supports single
            and multiple expansion modes with full keyboard navigation.
          </p>
        </div>

        {/* Single Expansion Mode */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Single Expansion Mode
            </h2>
            <p className="text-foreground-muted">
              Only one section can be open at a time. Opening a new section
              automatically closes the previous one.
            </p>
            {singleExpanded && (
              <p className="text-sm text-primary-600 font-medium">
                Currently expanded: {singleExpanded}
              </p>
            )}
          </div>
          <div className="bg-surface-card rounded-lg shadow-sm overflow-hidden">
            <Accordion
              items={basicItems}
              mode="single"
              onChange={(expanded) => setSingleExpanded(expanded as string)}
            />
          </div>
        </section>

        {/* Multiple Expansion Mode */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Multiple Expansion Mode
            </h2>
            <p className="text-foreground-muted">
              Multiple sections can be open simultaneously. Each section toggles
              independently.
            </p>
            {multipleExpanded.length > 0 && (
              <p className="text-sm text-primary-600 font-medium">
                Currently expanded: {multipleExpanded.join(", ")}
              </p>
            )}
          </div>
          <div className="bg-surface-card rounded-lg shadow-sm overflow-hidden">
            <Accordion
              items={eventPlanningItems}
              mode="multiple"
              defaultExpanded={["planning-1"]}
              onChange={(expanded) => setMultipleExpanded(expanded as string[])}
            />
          </div>
        </section>

        {/* With Disabled Items */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              With Disabled Items
            </h2>
            <p className="text-foreground-muted">
              Some sections can be disabled to prevent interaction.
            </p>
          </div>
          <div className="bg-surface-card rounded-lg shadow-sm overflow-hidden">
            <Accordion items={disabledItems} mode="single" />
          </div>
        </section>

        {/* Default Expanded */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Default Expanded State
            </h2>
            <p className="text-foreground-muted">
              Accordion can start with specific sections already expanded.
            </p>
          </div>
          <div className="bg-surface-card rounded-lg shadow-sm overflow-hidden">
            <Accordion
              items={basicItems.slice(0, 3)}
              mode="single"
              defaultExpanded="item-2"
            />
          </div>
        </section>

        {/* Features */}
        <section className="bg-surface-card rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Smooth Animations
              </h3>
              <p className="text-sm text-foreground-muted">
                Height transitions with CSS animations for smooth expand/collapse
                effects.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Keyboard Navigation
              </h3>
              <p className="text-sm text-foreground-muted">
                Full keyboard support with Enter and Space keys to toggle
                sections.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Accessible
              </h3>
              <p className="text-sm text-foreground-muted">
                Proper ARIA attributes and semantic HTML for screen readers.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Flexible Content
              </h3>
              <p className="text-sm text-foreground-muted">
                Supports React nodes for both titles and content sections.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Two Modes
              </h3>
              <p className="text-sm text-foreground-muted">
                Single expansion (one at a time) or multiple expansion (many at
                once).
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Design Tokens
              </h3>
              <p className="text-sm text-foreground-muted">
                Uses CSS variables for consistent theming and dark mode support.
              </p>
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section className="bg-navy-900 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Usage Example</h2>
          <pre className="text-sm overflow-x-auto">
            <code>{`import Accordion from "@/components/ui/Accordion";

const items = [
  {
    id: "item-1",
    title: "Section Title",
    content: "Section content goes here",
  },
  {
    id: "item-2",
    title: "Another Section",
    content: <div>Rich content with JSX</div>,
    disabled: false,
  },
];

<Accordion
  items={items}
  mode="single"
  defaultExpanded="item-1"
  onChange={(expanded) => console.log(expanded)}
/>`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
