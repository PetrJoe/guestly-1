"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ModalDemoPage() {
  const [basicOpen, setBasicOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [noCloseOpen, setNoCloseOpen] = React.useState(false);
  const [largeOpen, setLargeOpen] = React.useState(false);
  const [nestedOpen, setNestedOpen] = React.useState(false);
  const [nestedInnerOpen, setNestedInnerOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Modal Component</h1>
          <p className="mt-2 text-[var(--foreground-muted)]">
            Enhanced modal with backdrop blur, smooth animations, focus trap, and keyboard handling.
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Modal */}
          <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">Basic Modal</h2>
            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              Standard modal with title, description, and close button. Click overlay or press Escape to close.
            </p>
            <Button onClick={() => setBasicOpen(true)}>Open Basic Modal</Button>
          </div>

          {/* Form Modal */}
          <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">Form Modal</h2>
            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              Modal with form inputs demonstrating focus trap. Tab through inputs to see focus management.
            </p>
            <Button onClick={() => setFormOpen(true)}>Open Form Modal</Button>
          </div>

          {/* No Close Options */}
          <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">Controlled Close</h2>
            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              Modal with disabled overlay click and escape key. Only the action button can close it.
            </p>
            <Button onClick={() => setNoCloseOpen(true)}>Open Controlled Modal</Button>
          </div>

          {/* Large Modal */}
          <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">Large Modal</h2>
            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              Extra large modal with more content. Notice the smooth scale-in animation.
            </p>
            <Button onClick={() => setLargeOpen(true)}>Open Large Modal</Button>
          </div>

          {/* Nested Modals */}
          <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">Nested Modals</h2>
            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              Open a modal from within another modal. Each maintains its own focus trap.
            </p>
            <Button onClick={() => setNestedOpen(true)}>Open Nested Modal</Button>
          </div>

          {/* Accessibility Features */}
          <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
            <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">Accessibility</h2>
            <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
              <li>✓ Focus trap keeps keyboard navigation within modal</li>
              <li>✓ Escape key closes modal (configurable)</li>
              <li>✓ Overlay click closes modal (configurable)</li>
              <li>✓ Proper ARIA attributes for screen readers</li>
              <li>✓ Body scroll lock when modal is open</li>
            </ul>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-8 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Enhanced Features</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium text-[var(--foreground)]">Visual Enhancements</h3>
              <ul className="space-y-1 text-sm text-[var(--foreground-muted)]">
                <li>• Backdrop blur effect (backdrop-blur-md)</li>
                <li>• Smooth scale-in animation using design tokens</li>
                <li>• Transition timing with CSS variables</li>
                <li>• Focus ring on close button</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-[var(--foreground)]">Accessibility Features</h3>
              <ul className="space-y-1 text-sm text-[var(--foreground-muted)]">
                <li>• Focus trap with Tab/Shift+Tab handling</li>
                <li>• Configurable Escape key handling</li>
                <li>• Configurable overlay click handling</li>
                <li>• Body scroll lock with scrollbar compensation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="mt-8 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">API Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--surface-border)]">
                  <th className="pb-2 text-left font-medium text-[var(--foreground)]">Prop</th>
                  <th className="pb-2 text-left font-medium text-[var(--foreground)]">Type</th>
                  <th className="pb-2 text-left font-medium text-[var(--foreground)]">Default</th>
                  <th className="pb-2 text-left font-medium text-[var(--foreground)]">Description</th>
                </tr>
              </thead>
              <tbody className="text-[var(--foreground-muted)]">
                <tr className="border-b border-[var(--surface-border)]">
                  <td className="py-2 font-mono text-xs">open</td>
                  <td className="py-2">boolean</td>
                  <td className="py-2">-</td>
                  <td className="py-2">Controls modal visibility</td>
                </tr>
                <tr className="border-b border-[var(--surface-border)]">
                  <td className="py-2 font-mono text-xs">onClose</td>
                  <td className="py-2">function</td>
                  <td className="py-2">-</td>
                  <td className="py-2">Callback when modal should close</td>
                </tr>
                <tr className="border-b border-[var(--surface-border)]">
                  <td className="py-2 font-mono text-xs">closeOnOverlayClick</td>
                  <td className="py-2">boolean</td>
                  <td className="py-2">true</td>
                  <td className="py-2">Allow closing by clicking overlay</td>
                </tr>
                <tr className="border-b border-[var(--surface-border)]">
                  <td className="py-2 font-mono text-xs">closeOnEscape</td>
                  <td className="py-2">boolean</td>
                  <td className="py-2">true</td>
                  <td className="py-2">Allow closing with Escape key</td>
                </tr>
                <tr className="border-b border-[var(--surface-border)]">
                  <td className="py-2 font-mono text-xs">showCloseButton</td>
                  <td className="py-2">boolean</td>
                  <td className="py-2">true</td>
                  <td className="py-2">Show close button in header</td>
                </tr>
                <tr className="border-b border-[var(--surface-border)]">
                  <td className="py-2 font-mono text-xs">size</td>
                  <td className="py-2">sm | md | lg | xl</td>
                  <td className="py-2">md</td>
                  <td className="py-2">Modal width</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Instances */}
      <Modal
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="Welcome to Guestly"
        description="This is a basic modal with all the enhanced features."
        size="md"
      >
        <p className="text-[var(--foreground-muted)]">
          This modal demonstrates the enhanced features including backdrop blur, smooth scale-in animation,
          and proper focus management. Try pressing the Escape key or clicking outside to close it.
        </p>
        <div className="mt-4 rounded-lg bg-[var(--surface-bg)] p-4">
          <p className="text-sm text-[var(--foreground-muted)]">
            The backdrop uses <code className="rounded bg-[var(--surface-card)] px-1 py-0.5">backdrop-blur-md</code> for
            a premium glass morphism effect.
          </p>
        </div>
      </Modal>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Create Event"
        description="Fill out the form below to create a new event."
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setFormOpen(false)}>Create Event</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Event Name" placeholder="Enter event name" />
          <Input label="Location" placeholder="Enter location" />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Date" type="text" placeholder="Select date" />
            <Input label="Time" type="text" placeholder="Select time" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
              Description
            </label>
            <textarea
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-bg)] px-4 py-2.5 text-[var(--foreground)] transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              rows={4}
              placeholder="Describe your event..."
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={noCloseOpen}
        onClose={() => setNoCloseOpen(false)}
        title="Important Action Required"
        description="This modal requires explicit confirmation."
        closeOnOverlayClick={false}
        closeOnEscape={false}
        showCloseButton={false}
        footer={
          <>
            <Button variant="secondary" onClick={() => setNoCloseOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setNoCloseOpen(false)}>
              Confirm Delete
            </Button>
          </>
        }
      >
        <p className="text-[var(--foreground-muted)]">
          This modal cannot be closed by clicking outside or pressing Escape. You must use one of the action buttons.
          This is useful for critical confirmations where accidental dismissal should be prevented.
        </p>
      </Modal>

      <Modal
        open={largeOpen}
        onClose={() => setLargeOpen(false)}
        title="Event Details"
        description="Complete information about your event"
        size="xl"
      >
        <div className="space-y-4">
          <div className="rounded-lg bg-[var(--surface-bg)] p-4">
            <h3 className="mb-2 font-semibold text-[var(--foreground)]">About This Event</h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              This large modal demonstrates how the component handles more content. The scale-in animation
              uses design tokens for consistent timing across the platform.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-[var(--surface-bg)] p-4">
              <h4 className="mb-1 font-medium text-[var(--foreground)]">Animation Timing</h4>
              <p className="text-sm text-[var(--foreground-muted)]">
                Uses <code className="rounded bg-[var(--surface-card)] px-1 py-0.5">var(--duration-normal)</code>
              </p>
            </div>
            <div className="rounded-lg bg-[var(--surface-bg)] p-4">
              <h4 className="mb-1 font-medium text-[var(--foreground)]">Easing Function</h4>
              <p className="text-sm text-[var(--foreground-muted)]">
                Uses <code className="rounded bg-[var(--surface-card)] px-1 py-0.5">var(--ease-out)</code>
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-[var(--surface-bg)] p-4">
            <h4 className="mb-2 font-medium text-[var(--foreground)]">Accessibility Features</h4>
            <ul className="space-y-1 text-sm text-[var(--foreground-muted)]">
              <li>• Focus automatically moves to first interactive element</li>
              <li>• Tab key cycles through focusable elements within modal</li>
              <li>• Shift+Tab cycles backwards</li>
              <li>• Focus cannot escape the modal (focus trap)</li>
              <li>• Body scroll is locked while modal is open</li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        open={nestedOpen}
        onClose={() => setNestedOpen(false)}
        title="First Modal"
        description="This modal can open another modal"
      >
        <p className="mb-4 text-[var(--foreground-muted)]">
          Click the button below to open a second modal. Each modal maintains its own focus trap and
          keyboard handling.
        </p>
        <Button onClick={() => setNestedInnerOpen(true)}>Open Second Modal</Button>
      </Modal>

      <Modal
        open={nestedInnerOpen}
        onClose={() => setNestedInnerOpen(false)}
        title="Second Modal"
        description="This is a nested modal"
        size="sm"
      >
        <p className="text-[var(--foreground-muted)]">
          This modal was opened from another modal. Close this one to return to the first modal.
        </p>
      </Modal>
    </div>
  );
}
