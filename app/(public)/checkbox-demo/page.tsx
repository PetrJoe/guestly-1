"use client";
import React from "react";
import Checkbox from "@/components/ui/Checkbox";

export default function CheckboxDemoPage() {
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  });

  const [features, setFeatures] = React.useState({
    analytics: true,
    merchandise: false,
    virtual: true,
  });

  // Calculate indeterminate state for "select all" checkbox
  const allNotificationsSelected = Object.values(notifications).every(Boolean);
  const someNotificationsSelected = Object.values(notifications).some(Boolean);
  const notificationsIndeterminate =
    someNotificationsSelected && !allNotificationsSelected;

  const handleSelectAllNotifications = (checked: boolean) => {
    setNotifications({
      email: checked,
      sms: checked,
      push: checked,
    });
  };

  const allFeaturesSelected = Object.values(features).every(Boolean);
  const someFeaturesSelected = Object.values(features).some(Boolean);
  const featuresIndeterminate = someFeaturesSelected && !allFeaturesSelected;

  const handleSelectAllFeatures = (checked: boolean) => {
    setFeatures({
      analytics: checked,
      merchandise: checked,
      virtual: checked,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
            Checkbox Component Demo
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Demonstrating checkboxes with indeterminate state, keyboard
            navigation, and accessibility features.
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Checkboxes */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Basic Checkboxes
            </h2>
            <div className="space-y-4">
              <Checkbox
                label="Accept terms and conditions"
                description="I agree to the terms of service and privacy policy"
                checked={acceptTerms}
                onChange={setAcceptTerms}
                error={!acceptTerms ? "You must accept the terms to continue" : undefined}
              />
              <Checkbox
                label="Subscribe to newsletter"
                description="Receive updates about new events and features"
                checked={newsletter}
                onChange={setNewsletter}
              />
            </div>
          </div>

          {/* Indeterminate State - Notifications */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Indeterminate State - Select All
            </h2>
            <div className="space-y-3">
              <Checkbox
                label="All Notifications"
                description="Enable or disable all notification types"
                checked={allNotificationsSelected}
                indeterminate={notificationsIndeterminate}
                onChange={handleSelectAllNotifications}
              />
              <div className="ml-8 space-y-3 border-l-2 border-[var(--surface-border)] pl-4">
                <Checkbox
                  label="Email notifications"
                  checked={notifications.email}
                  onChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
                <Checkbox
                  label="SMS notifications"
                  checked={notifications.sms}
                  onChange={(checked) =>
                    setNotifications({ ...notifications, sms: checked })
                  }
                />
                <Checkbox
                  label="Push notifications"
                  checked={notifications.push}
                  onChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
            </div>
          </div>

          {/* Indeterminate State - Features */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Feature Selection with Indeterminate
            </h2>
            <div className="space-y-3">
              <Checkbox
                label="Enable all features"
                checked={allFeaturesSelected}
                indeterminate={featuresIndeterminate}
                onChange={handleSelectAllFeatures}
              />
              <div className="ml-8 space-y-3 border-l-2 border-primary-200 pl-4">
                <Checkbox
                  label="Analytics Dashboard"
                  description="View detailed event analytics and insights"
                  checked={features.analytics}
                  onChange={(checked) =>
                    setFeatures({ ...features, analytics: checked })
                  }
                />
                <Checkbox
                  label="Merchandise Store"
                  description="Sell event merchandise and products"
                  checked={features.merchandise}
                  onChange={(checked) =>
                    setFeatures({ ...features, merchandise: checked })
                  }
                />
                <Checkbox
                  label="Virtual Events"
                  description="Host online and hybrid events"
                  checked={features.virtual}
                  onChange={(checked) =>
                    setFeatures({ ...features, virtual: checked })
                  }
                />
              </div>
            </div>
          </div>

          {/* Disabled State */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Disabled State
            </h2>
            <div className="space-y-4">
              <Checkbox
                label="This checkbox is disabled and checked"
                checked={true}
                disabled={true}
              />
              <Checkbox
                label="This checkbox is disabled and unchecked"
                checked={false}
                disabled={true}
              />
              <Checkbox
                label="This checkbox is disabled and indeterminate"
                indeterminate={true}
                disabled={true}
              />
            </div>
          </div>

          {/* Without Labels */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Checkboxes Without Labels
            </h2>
            <div className="flex items-center gap-4">
              <Checkbox checked={true} onChange={() => {}} />
              <Checkbox checked={false} onChange={() => {}} />
              <Checkbox indeterminate={true} onChange={() => {}} />
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Accessibility Features
            </h2>
            <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Full keyboard navigation with Space and Enter keys</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>
                  Proper ARIA attributes (role=checkbox, aria-checked with
                  mixed state)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Indeterminate state for hierarchical selections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Visible focus indicators for keyboard users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>
                  Screen reader support with labels, descriptions, and error
                  messages
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Smooth animations with scale-in effect</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
