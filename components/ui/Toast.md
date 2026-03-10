# Toast Component

Enhanced toast notification system with all severity levels, auto-dismiss progress indicator, action buttons, and stacking support.

## Features

- ✅ All severity levels (info, success, warning, error)
- ✅ Auto-dismiss with visual progress indicator
- ✅ Pause on hover functionality
- ✅ Action buttons support
- ✅ Stacking for multiple toasts
- ✅ Manual dismiss option
- ✅ Dark mode support
- ✅ Smooth animations
- ✅ Accessibility compliant (ARIA live regions)

## Usage

### Basic Usage

```tsx
import { useToast } from "@/components/ui/ToastProvider";

function MyComponent() {
  const { addToast } = useToast();

  return (
    <button onClick={() => addToast("Hello, world!")}>
      Show Toast
    </button>
  );
}
```

### Severity Levels

```tsx
// Info (default)
addToast("This is an informational message", { type: "info" });

// Success
addToast("Operation completed successfully!", { type: "success" });

// Warning
addToast("Please review this warning", { type: "warning" });

// Error
addToast("An error occurred", { type: "error" });
```

### Custom Duration

```tsx
// 3 second toast
addToast("Quick message", { type: "info", duration: 3000 });

// 10 second toast
addToast("Important message", { type: "warning", duration: 10000 });

// Persistent toast (stays until manually dismissed)
addToast("Critical alert", { type: "error", duration: 0 });
```

### Action Buttons

```tsx
addToast("File uploaded successfully", {
  type: "success",
  action: {
    label: "View",
    onClick: () => {
      // Navigate to file or perform action
      console.log("View clicked");
    },
  },
});

addToast("Payment failed", {
  type: "error",
  action: {
    label: "Retry",
    onClick: () => {
      // Retry payment logic
      console.log("Retry clicked");
    },
  },
  duration: 0, // Keep visible until user acts
});
```

### Dismissible Control

```tsx
// Dismissible (default)
addToast("You can close this", {
  type: "info",
  dismissible: true,
});

// Non-dismissible (auto-dismiss only)
addToast("Please wait...", {
  type: "info",
  dismissible: false,
  duration: 5000,
});
```

### Multiple Toasts (Stacking)

```tsx
// Toasts automatically stack vertically
addToast("First notification", { type: "info" });
addToast("Second notification", { type: "success" });
addToast("Third notification", { type: "warning" });
```

## API Reference

### `useToast()` Hook

Returns an object with the following methods:

#### `addToast(message, options?)`

Displays a new toast notification.

**Parameters:**

- `message` (string, required): The message to display
- `options` (object, optional):
  - `type` ("info" | "success" | "warning" | "error"): Severity level (default: "info")
  - `duration` (number): Auto-dismiss duration in milliseconds (default: 5000, 0 = persistent)
  - `action` (object): Action button configuration
    - `label` (string): Button text
    - `onClick` (function): Click handler
  - `dismissible` (boolean): Whether toast can be manually dismissed (default: true)

#### `removeToast(id)`

Manually removes a toast by ID (rarely needed, as toasts auto-dismiss).

**Parameters:**

- `id` (string, required): The toast ID to remove

## Design Tokens

The Toast component uses the following design tokens from `app/globals.css`:

### Colors

- `--status-info`: Info toast color (primary-500)
- `--status-success`: Success toast color (success-500)
- `--status-warning`: Warning toast color (warning-500)
- `--status-error`: Error toast color (danger-500)

### Animation

- `--duration-normal`: Animation duration (300ms)
- `--ease-out`: Animation easing

### Shadows

- `--shadow-lg`: Toast shadow elevation

## Accessibility

- Uses `role="alert"` for screen reader announcements
- Uses `aria-live="polite"` for non-intrusive notifications
- Keyboard accessible dismiss button with focus ring
- Proper ARIA labels for dismiss buttons
- Respects reduced motion preferences

## Dark Mode

All toast variants are optimized for both light and dark themes:

- Light mode: Colored backgrounds with dark text
- Dark mode: Darker backgrounds with light text and adjusted colors
- Progress bars maintain visibility in both themes

## Examples

### Real-world Use Cases

#### Purchase Success

```tsx
addToast("Ticket purchased successfully!", {
  type: "success",
  action: {
    label: "View Ticket",
    onClick: () => router.push("/tickets"),
  },
  duration: 6000,
});
```

#### Payment Failed

```tsx
addToast("Payment failed. Please try again.", {
  type: "error",
  action: {
    label: "Retry Payment",
    onClick: () => retryPayment(),
  },
  duration: 0, // Keep visible
});
```

#### Session Warning

```tsx
addToast("Your session will expire in 5 minutes", {
  type: "warning",
  action: {
    label: "Extend Session",
    onClick: () => extendSession(),
  },
  duration: 0,
});
```

#### Simple Notification

```tsx
addToast("Event saved to your favorites", {
  type: "success",
  duration: 3000,
});
```

## Demo

Visit `/toast-demo` to see all features in action.

## Implementation Details

### Progress Indicator

- Visual progress bar shows remaining time
- Pauses when hovering over toast
- Resumes when mouse leaves
- Smooth linear animation

### Stacking Behavior

- New toasts appear at the bottom of the stack
- Toasts slide in from the bottom with animation
- Toasts slide out to the right when dismissed
- Maximum recommended: 5 simultaneous toasts

### Performance

- Efficient timer management with cleanup
- Minimal re-renders using React.useCallback
- Smooth 60fps animations using CSS transitions
- Automatic memory cleanup on unmount

## Migration from Old API

If you're upgrading from the old toast API:

**Old:**
```tsx
addToast("Message", "success");
```

**New:**
```tsx
addToast("Message", { type: "success" });
```

The new API uses an options object for better extensibility and type safety.
