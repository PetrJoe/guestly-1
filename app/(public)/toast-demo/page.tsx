"use client";

import { useToast } from "@/components/ui/ToastProvider";
import Button from "@/components/ui/Button";

export default function ToastDemoPage() {
  const { addToast } = useToast();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Toast Component Demo
          </h1>
          <p className="text-foreground-muted">
            Enhanced toast notifications with all severity levels, auto-dismiss progress,
            action buttons, and stacking support.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Severity Levels */}
          <section className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Severity Levels
            </h2>
            <p className="text-foreground-muted mb-6">
              All four severity levels with appropriate colors and icons.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("This is an informational message", { type: "info" })
                }
              >
                Show Info Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("Operation completed successfully!", { type: "success" })
                }
              >
                Show Success Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("Please review this warning", { type: "warning" })
                }
              >
                Show Warning Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("An error occurred while processing", { type: "error" })
                }
              >
                Show Error Toast
              </Button>
            </div>
          </section>

          {/* Auto-dismiss with Progress */}
          <section className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Auto-dismiss with Progress Indicator
            </h2>
            <p className="text-foreground-muted mb-6">
              Toasts automatically dismiss after a duration with a visual progress bar.
              Hover over a toast to pause the timer.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("This will dismiss in 3 seconds", {
                    type: "info",
                    duration: 3000,
                  })
                }
              >
                3 Second Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("This will dismiss in 5 seconds", {
                    type: "success",
                    duration: 5000,
                  })
                }
              >
                5 Second Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("This will dismiss in 10 seconds", {
                    type: "warning",
                    duration: 10000,
                  })
                }
              >
                10 Second Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("This toast stays until dismissed", {
                    type: "info",
                    duration: 0,
                  })
                }
              >
                Persistent Toast
              </Button>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Action Buttons
            </h2>
            <p className="text-foreground-muted mb-6">
              Toasts can include action buttons for user interaction.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("Your changes have been saved", {
                    type: "success",
                    action: {
                      label: "View",
                      onClick: () => alert("View action clicked!"),
                    },
                  })
                }
              >
                Toast with Action
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("Failed to upload file", {
                    type: "error",
                    action: {
                      label: "Retry",
                      onClick: () => alert("Retry action clicked!"),
                    },
                    duration: 0,
                  })
                }
              >
                Error with Retry
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("New message received", {
                    type: "info",
                    action: {
                      label: "Open",
                      onClick: () => alert("Open action clicked!"),
                    },
                    duration: 8000,
                  })
                }
              >
                Notification with Action
              </Button>
            </div>
          </section>

          {/* Stacking Multiple Toasts */}
          <section className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Stacking Multiple Toasts
            </h2>
            <p className="text-foreground-muted mb-6">
              Multiple toasts stack vertically and animate in smoothly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  addToast("First toast notification", { type: "info" });
                  setTimeout(
                    () => addToast("Second toast notification", { type: "success" }),
                    300
                  );
                  setTimeout(
                    () => addToast("Third toast notification", { type: "warning" }),
                    600
                  );
                }}
              >
                Show 3 Toasts
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  for (let i = 1; i <= 5; i++) {
                    setTimeout(() => {
                      addToast(`Toast notification ${i}`, {
                        type: ["info", "success", "warning", "error", "info"][i - 1] as any,
                        duration: 4000,
                      });
                    }, i * 200);
                  }
                }}
              >
                Show 5 Toasts
              </Button>
            </div>
          </section>

          {/* Dismissible Options */}
          <section className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Dismissible Options
            </h2>
            <p className="text-foreground-muted mb-6">
              Control whether toasts can be manually dismissed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("You can close this toast manually", {
                    type: "info",
                    dismissible: true,
                    duration: 0,
                  })
                }
              >
                Dismissible Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("This toast cannot be closed manually", {
                    type: "warning",
                    dismissible: false,
                    duration: 5000,
                  })
                }
              >
                Non-dismissible Toast
              </Button>
            </div>
          </section>

          {/* Real-world Examples */}
          <section className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Real-world Examples
            </h2>
            <p className="text-foreground-muted mb-6">
              Common use cases for toast notifications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("Ticket purchased successfully!", {
                    type: "success",
                    action: {
                      label: "View Ticket",
                      onClick: () => alert("Navigate to ticket page"),
                    },
                    duration: 6000,
                  })
                }
              >
                Purchase Success
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("Payment failed. Please try again.", {
                    type: "error",
                    action: {
                      label: "Retry Payment",
                      onClick: () => alert("Retry payment flow"),
                    },
                    duration: 0,
                  })
                }
              >
                Payment Failed
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("Event saved to your favorites", {
                    type: "success",
                    duration: 3000,
                  })
                }
              >
                Event Saved
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("Your session will expire in 5 minutes", {
                    type: "warning",
                    action: {
                      label: "Extend Session",
                      onClick: () => alert("Session extended"),
                    },
                    duration: 0,
                  })
                }
              >
                Session Warning
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  addToast("New event in your area!", {
                    type: "info",
                    action: {
                      label: "Explore",
                      onClick: () => alert("Navigate to event"),
                    },
                    duration: 8000,
                  })
                }
              >
                Event Notification
              </Button>
            </div>
          </section>

          {/* Dark Mode Support */}
          <section className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Dark Mode Support
            </h2>
            <p className="text-foreground-muted mb-6">
              All toast variants are optimized for both light and dark themes.
              Toggle your system theme to see the difference.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  addToast("Info toast in current theme", { type: "info" });
                  addToast("Success toast in current theme", { type: "success" });
                  addToast("Warning toast in current theme", { type: "warning" });
                  addToast("Error toast in current theme", { type: "error" });
                }}
              >
                Show All in Current Theme
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
