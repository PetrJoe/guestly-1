# Modal Component

Enhanced modal component with backdrop blur, smooth animations, focus trap, and comprehensive accessibility features.

## Features

### Visual Enhancements
- **Backdrop Blur Effect**: Uses `backdrop-blur-md` for a premium glass morphism effect
- **Smooth Scale-In Animation**: Modal scales in using design tokens (`--duration-normal` and `--ease-out`)
- **Design Token Integration**: All animations and transitions use CSS variables for consistency
- **Focus Ring**: Visible focus indicator on close button for keyboard navigation

### Accessibility Features
- **Focus Trap**: Keyboard focus is trapped within the modal when open
  - Tab key cycles forward through focusable elements
  - Shift+Tab cycles backward
  - Focus automatically moves to first focusable element on open
  - Focus cannot escape the modal
- **Escape Key Handling**: Configurable escape key to close (default: enabled)
- **Overlay Click Handling**: Configurable overlay click to close (default: enabled)
- **Body Scroll Lock**: Prevents background scrolling when modal is open
  - Compensates for scrollbar width to prevent layout shift
- **ARIA Attributes**: Proper `role="dialog"`, `aria-modal`, and `aria-labelledby` attributes
- **Semantic HTML**: Uses proper heading hierarchy and landmark regions

## Usage

### Basic Modal

```tsx
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Welcome"
        description="This is a basic modal"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

### Form Modal with Footer

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Create Event"
  description="Fill out the form below"
  size="lg"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSubmit}>Create</Button>
    </>
  }
>
  <Input label="Event Name" />
  <Input label="Location" />
</Modal>
```

### Controlled Close Behavior

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Important Action"
  closeOnOverlayClick={false}  // Disable overlay click
  closeOnEscape={false}         // Disable escape key
  showCloseButton={false}       // Hide close button
  footer={
    <Button onClick={() => setOpen(false)}>
      Confirm
    </Button>
  }
>
  <p>This modal requires explicit confirmation</p>
</Modal>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controls modal visibility (required) |
| `onClose` | `() => void` | - | Callback when modal should close |
| `title` | `string` | - | Modal title displayed in header |
| `description` | `string` | - | Description text below title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal width |
| `closeOnOverlayClick` | `boolean` | `true` | Allow closing by clicking overlay |
| `closeOnEscape` | `boolean` | `true` | Allow closing with Escape key |
| `showCloseButton` | `boolean` | `true` | Show close button in header |
| `children` | `React.ReactNode` | - | Modal body content |
| `footer` | `React.ReactNode` | - | Footer content (typically buttons) |

### Size Options

- `sm`: `max-w-sm` (384px)
- `md`: `max-w-md` (448px) - default
- `lg`: `max-w-lg` (512px)
- `xl`: `max-w-2xl` (672px)

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Escape` | Close modal (if `closeOnEscape` is true) |
| `Tab` | Move focus to next focusable element |
| `Shift+Tab` | Move focus to previous focusable element |

Focus cycles within the modal - pressing Tab on the last element moves to the first, and Shift+Tab on the first element moves to the last.

## Accessibility Compliance

This component follows WCAG 2.1 Level AA guidelines:

- ✅ **2.1.1 Keyboard**: All functionality available via keyboard
- ✅ **2.1.2 No Keyboard Trap**: Focus can be moved away using standard methods (Escape key)
- ✅ **2.4.3 Focus Order**: Logical focus order within modal
- ✅ **2.4.7 Focus Visible**: Clear focus indicators on all interactive elements
- ✅ **4.1.2 Name, Role, Value**: Proper ARIA attributes for assistive technologies

## Design Tokens Used

### Animation
- `--duration-normal` (300ms): Modal scale-in animation duration
- `--duration-fast` (200ms): Close button hover transition
- `--ease-out`: Smooth easing for modal entrance

### Colors
- `--surface-card`: Modal background
- `--surface-border`: Modal border and dividers
- `--surface-hover`: Close button hover state
- `--foreground`: Primary text color
- `--foreground-muted`: Secondary text color

### Effects
- `backdrop-blur-md`: 12px blur on overlay
- `bg-navy-900/60`: 60% opacity navy overlay

## Implementation Details

### Focus Trap
The focus trap is implemented using keyboard event listeners that intercept Tab and Shift+Tab keys. When focus reaches the last focusable element and Tab is pressed, focus moves to the first element. Similarly, Shift+Tab on the first element moves to the last.

### Body Scroll Lock
When the modal opens, the component:
1. Calculates the scrollbar width
2. Sets `overflow: hidden` on the body
3. Adds padding-right equal to scrollbar width to prevent layout shift
4. Restores original styles when modal closes

### Portal Rendering
The modal uses React's `createPortal` to render directly into `document.body`, ensuring it appears above all other content regardless of parent component z-index.

### Animation
The modal uses the `scaleIn` keyframe animation defined in `app/globals.css`:

```css
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
```

The animation is applied with design token timing:
```css
animation: scaleIn var(--duration-normal) var(--ease-out) forwards;
```

## Examples

See the demo page at `/modal-demo` for interactive examples including:
- Basic modal with all features
- Form modal with inputs and footer
- Controlled close behavior
- Large modal with extensive content
- Nested modals
- Accessibility demonstrations

## Related Components

- **Button**: Used in modal footers for actions
- **Input**: Common in form modals
- **Card**: Similar elevation and styling patterns

## Requirements Satisfied

This component satisfies the following requirements from the platform redesign spec:

- **Requirement 2.5**: Modal components with proper overlay, animation, and backdrop blur
- **Requirement 20.2**: Full keyboard navigation with visible focus indicators and proper ARIA attributes
