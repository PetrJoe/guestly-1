"use client";
import React from "react";
import Popover from "@/components/ui/Popover";

export default function PopoverDemoPage() {
  return (
    <div className="min-h-screen bg-surface-bg p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Popover Component Demo</h1>
          <p className="text-foreground-muted">
            Click-triggered overlay with focus trap, positioning, and collision detection
          </p>
        </div>

        {/* Basic Popover */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Basic Popover</h2>
          <div className="flex gap-4">
            <Popover
              content={
                <div className="p-4 min-w-[200px]">
                  <h3 className="font-semibold text-foreground mb-2">Popover Title</h3>
                  <p className="text-sm text-foreground-muted mb-3">
                    This is a basic popover with some content.
                  </p>
                  <button className="px-3 py-1.5 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600 transition-colors">
                    Action
                  </button>
                </div>
              }
            >
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Open Popover
              </button>
            </Popover>
          </div>
        </section>

        {/* Placement Options */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Placement Options</h2>
          <div className="flex flex-wrap gap-4 items-center justify-center p-12 bg-surface-card rounded-lg">
            <Popover
              placement="top"
              content={
                <div className="p-3 text-sm">
                  <p className="text-foreground">Top placement</p>
                </div>
              }
            >
              <button className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors">
                Top
              </button>
            </Popover>

            <Popover
              placement="bottom"
              content={
                <div className="p-3 text-sm">
                  <p className="text-foreground">Bottom placement</p>
                </div>
              }
            >
              <button className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors">
                Bottom
              </button>
            </Popover>

            <Popover
              placement="left"
              content={
                <div className="p-3 text-sm">
                  <p className="text-foreground">Left placement</p>
                </div>
              }
            >
              <button className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors">
                Left
              </button>
            </Popover>

            <Popover
              placement="right"
              content={
                <div className="p-3 text-sm">
                  <p className="text-foreground">Right placement</p>
                </div>
              }
            >
              <button className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors">
                Right
              </button>
            </Popover>
          </div>
        </section>

        {/* Interactive Content */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Interactive Content with Focus Trap</h2>
          <div className="flex gap-4">
            <Popover
              content={
                <div className="p-4 min-w-[280px]">
                  <h3 className="font-semibold text-foreground mb-3">User Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface-hover rounded-md transition-colors">
                      Edit Profile
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface-hover rounded-md transition-colors">
                      Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface-hover rounded-md transition-colors">
                      View Activity
                    </button>
                    <hr className="border-surface-border my-2" />
                    <button className="w-full px-3 py-2 text-left text-sm text-danger-600 hover:bg-danger-50 rounded-md transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              }
            >
              <button className="px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors">
                User Menu
              </button>
            </Popover>
          </div>
          <p className="text-sm text-foreground-muted">
            Try using Tab key to navigate between buttons. Focus stays trapped within the popover.
          </p>
        </section>

        {/* Form in Popover */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Form in Popover</h2>
          <div className="flex gap-4">
            <Popover
              content={
                <div className="p-4 min-w-[300px]">
                  <h3 className="font-semibold text-foreground mb-3">Quick Add Event</h3>
                  <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Event Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-surface-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter event name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-surface-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 px-3 py-2 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600 transition-colors"
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 border border-surface-border text-foreground rounded-md text-sm hover:bg-surface-hover transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              }
            >
              <button className="px-4 py-2 bg-warning-500 text-white rounded-lg hover:bg-warning-600 transition-colors">
                Add Event
              </button>
            </Popover>
          </div>
        </section>

        {/* Close Behavior Options */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Close Behavior</h2>
          <div className="flex flex-wrap gap-4">
            <Popover
              closeOnBackdropClick={false}
              content={
                <div className="p-4 min-w-[250px]">
                  <h3 className="font-semibold text-foreground mb-2">No Backdrop Close</h3>
                  <p className="text-sm text-foreground-muted mb-3">
                    Click the backdrop - this won't close. Click the trigger button to close.
                  </p>
                </div>
              }
            >
              <button className="px-4 py-2 bg-danger-500 text-white rounded-lg hover:bg-danger-600 transition-colors">
                No Backdrop Close
              </button>
            </Popover>

            <Popover
              closeOnEscape={false}
              content={
                <div className="p-4 min-w-[250px]">
                  <h3 className="font-semibold text-foreground mb-2">No Escape Close</h3>
                  <p className="text-sm text-foreground-muted mb-3">
                    Press Escape - this won't close. Click backdrop or trigger to close.
                  </p>
                </div>
              }
            >
              <button className="px-4 py-2 bg-danger-500 text-white rounded-lg hover:bg-danger-600 transition-colors">
                No Escape Close
              </button>
            </Popover>
          </div>
        </section>

        {/* Edge Cases - Collision Detection */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Collision Detection</h2>
          <p className="text-sm text-foreground-muted">
            These popovers are positioned near viewport edges to test collision detection.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-start">
              <Popover
                placement="left"
                content={
                  <div className="p-4 min-w-[200px]">
                    <p className="text-sm text-foreground">
                      This should adjust position to stay in viewport
                    </p>
                  </div>
                }
              >
                <button className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                  Left Edge
                </button>
              </Popover>
            </div>
            <div className="flex justify-end">
              <Popover
                placement="right"
                content={
                  <div className="p-4 min-w-[200px]">
                    <p className="text-sm text-foreground">
                      This should adjust position to stay in viewport
                    </p>
                  </div>
                }
              >
                <button className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                  Right Edge
                </button>
              </Popover>
            </div>
          </div>
        </section>

        {/* Dark Mode Test */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Dark Mode Support</h2>
          <p className="text-sm text-foreground-muted">
            Toggle your system dark mode to see the popover adapt automatically.
          </p>
          <div className="flex gap-4">
            <Popover
              content={
                <div className="p-4 min-w-[250px]">
                  <h3 className="font-semibold text-foreground mb-2">Dark Mode Ready</h3>
                  <p className="text-sm text-foreground-muted mb-3">
                    This popover uses design system tokens that automatically adapt to dark mode.
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600 transition-colors">
                      Primary
                    </button>
                    <button className="px-3 py-1.5 border border-surface-border text-foreground rounded-md text-sm hover:bg-surface-hover transition-colors">
                      Secondary
                    </button>
                  </div>
                </div>
              }
            >
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Test Dark Mode
              </button>
            </Popover>
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-surface-card p-6 rounded-lg border border-surface-border">
          <h2 className="text-xl font-semibold text-foreground mb-3">Component Features</h2>
          <ul className="space-y-2 text-sm text-foreground-muted">
            <li>✓ Click-triggered (not hover like Tooltip)</li>
            <li>✓ Four placement options: top, bottom, left, right</li>
            <li>✓ Collision detection keeps popover within viewport</li>
            <li>✓ Focus trap for keyboard navigation</li>
            <li>✓ Close on backdrop click (configurable)</li>
            <li>✓ Close on Escape key (configurable)</li>
            <li>✓ Smooth animations using design system tokens</li>
            <li>✓ Backdrop blur effect</li>
            <li>✓ Proper ARIA attributes for accessibility</li>
            <li>✓ Dark mode support</li>
            <li>✓ Custom className support</li>
            <li>✓ onOpenChange callback</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
