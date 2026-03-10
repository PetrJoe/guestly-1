"use client";

import React, { useState } from "react";
import Textarea from "@/components/ui/Textarea";

export default function TextareaDemoPage() {
  const [basicValue, setBasicValue] = useState("");
  const [autoResizeValue, setAutoResizeValue] = useState("");
  const [charCountValue, setCharCountValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-[var(--foreground)]">
            Textarea Component Demo
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Multi-line text input with auto-resize, character count, and validation
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Textarea */}
          <section className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
              Basic Textarea
            </h2>
            <div className="space-y-4">
              <Textarea
                label="Description"
                placeholder="Enter your description here..."
                value={basicValue}
                onChange={(e) => setBasicValue(e.target.value)}
              />
              <Textarea
                label="With Hint"
                hint="This is a helpful hint text"
                placeholder="Type something..."
              />
              <Textarea placeholder="Without Label" />
            </div>
          </section>

          {/* Auto-Resize Textarea */}
          <section className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
              Auto-Resize Textarea
            </h2>
            <div className="space-y-4">
              <Textarea
                label="Auto-Resize Description"
                hint="This textarea grows as you type"
                placeholder="Start typing and watch it grow..."
                autoResize={true}
                value={autoResizeValue}
                onChange={(e) => setAutoResizeValue(e.target.value)}
              />
            </div>
          </section>

          {/* Character Count */}
          <section className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
              Character Count
            </h2>
            <div className="space-y-4">
              <Textarea
                label="Limited Text"
                hint="Maximum 200 characters"
                placeholder="Type up to 200 characters..."
                showCharCount={true}
                maxLength={200}
                value={charCountValue}
                onChange={(e) => setCharCountValue(e.target.value)}
              />
              <Textarea
                label="Auto-Resize with Character Count"
                hint="Combines auto-resize with character limit"
                placeholder="Type here..."
                autoResize={true}
                showCharCount={true}
                maxLength={500}
              />
            </div>
          </section>

          {/* Error State */}
          <section className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
              Error State
            </h2>
            <div className="space-y-4">
              <Textarea
                label="Required Field"
                error="This field is required"
                placeholder="This field has an error..."
                value={errorValue}
                onChange={(e) => setErrorValue(e.target.value)}
              />
              <Textarea
                label="Validation Error"
                error="Description must be at least 50 characters"
                placeholder="Type at least 50 characters..."
                showCharCount={true}
                maxLength={500}
              />
            </div>
          </section>

          {/* Disabled State */}
          <section className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
              Disabled State
            </h2>
            <div className="space-y-4">
              <Textarea
                label="Disabled Textarea"
                placeholder="This textarea is disabled"
                disabled={true}
                value="This content cannot be edited"
              />
            </div>
          </section>

          {/* Custom Rows */}
          <section className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
              Custom Rows
            </h2>
            <div className="space-y-4">
              <Textarea
                label="Small (3 rows)"
                placeholder="3 rows by default"
                rows={3}
              />
              <Textarea
                label="Large (8 rows)"
                placeholder="8 rows by default"
                rows={8}
              />
            </div>
          </section>

          {/* Real-World Example */}
          <section className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
              Real-World Example: Event Description
            </h2>
            <div className="space-y-4">
              <Textarea
                label="Event Description"
                hint="Describe your event in detail. Include what attendees can expect, schedule, and any special requirements."
                placeholder="Enter a compelling description for your event..."
                autoResize={true}
                showCharCount={true}
                maxLength={2000}
                rows={4}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
