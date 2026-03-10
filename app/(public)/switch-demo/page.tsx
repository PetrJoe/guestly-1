"use client";
import React, { useState } from "react";
import Switch from "@/components/ui/Switch";

export default function SwitchDemoPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Switch Component Demo
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Toggle controls with smooth animations and accessibility support
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Switches */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Basic Switches
            </h2>
            <div className="space-y-4">
              <Switch
                checked={notifications}
                onChange={setNotifications}
                label="Enable notifications"
              />
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                label="Dark mode"
              />
              <Switch
                checked={autoSave}
                onChange={setAutoSave}
                label="Auto-save changes"
              />
              <Switch
                checked={marketing}
                onChange={setMarketing}
                label="Marketing emails"
              />
            </div>
          </section>

          {/* States */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              States
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Unchecked</p>
                <Switch checked={false} label="Unchecked switch" />
              </div>
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Checked</p>
                <Switch checked={true} label="Checked switch" />
              </div>
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Disabled (unchecked)</p>
                <Switch checked={false} disabled label="Disabled unchecked" />
              </div>
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">Disabled (checked)</p>
                <Switch checked={true} disabled label="Disabled checked" />
              </div>
            </div>
          </section>

          {/* Without Labels */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Without Labels
            </h2>
            <div className="flex items-center gap-4">
              <Switch checked={false} />
              <Switch checked={true} />
              <Switch checked={false} disabled />
              <Switch checked={true} disabled />
            </div>
          </section>

          {/* Settings Example */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Settings Example
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--foreground)]">Push Notifications</p>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    Receive push notifications about event updates
                  </p>
                </div>
                <Switch checked={notifications} onChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--foreground)]">Email Notifications</p>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    Get email updates about your events
                  </p>
                </div>
                <Switch checked={true} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--foreground)]">SMS Notifications</p>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    Receive text messages for important updates
                  </p>
                </div>
                <Switch checked={false} onChange={() => {}} />
              </div>
            </div>
          </section>

          {/* Accessibility Features */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Accessibility Features
            </h2>
            <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
              <li>✓ Keyboard navigation (Space/Enter to toggle)</li>
              <li>✓ Proper ARIA attributes (role="switch", aria-checked)</li>
              <li>✓ Focus indicators for keyboard users</li>
              <li>✓ Associated labels with aria-labelledby</li>
              <li>✓ Disabled state properly communicated</li>
              <li>✓ Smooth animations with CSS transitions</li>
            </ul>
          </section>

          {/* Current State */}
          <section className="bg-[var(--surface-card)] rounded-2xl p-6 border border-[var(--surface-border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Current State
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-[var(--foreground-muted)]">
                Notifications: <span className="font-medium text-[var(--foreground)]">{notifications ? "On" : "Off"}</span>
              </p>
              <p className="text-[var(--foreground-muted)]">
                Dark Mode: <span className="font-medium text-[var(--foreground)]">{darkMode ? "On" : "Off"}</span>
              </p>
              <p className="text-[var(--foreground-muted)]">
                Auto-save: <span className="font-medium text-[var(--foreground)]">{autoSave ? "On" : "Off"}</span>
              </p>
              <p className="text-[var(--foreground-muted)]">
                Marketing: <span className="font-medium text-[var(--foreground)]">{marketing ? "On" : "Off"}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
