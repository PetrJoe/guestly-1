# Input Component

Enhanced text input component with icon support, improved focus states, hint text, and smooth error transitions.

## Features

### 1. Icon Support
- **Left Icon**: Display an icon on the left side of the input
- **Right Icon**: Display an icon on the right side of the input
- Icons automatically adjust input padding
- Icons have smooth color transitions
- Icons are non-interactive by default (pointer-events-none)

### 2. Improved Focus States
- **Keyboard Focus**: Visible focus ring using `focus-visible` pseudo-class
- **Design Tokens**: Uses proper design tokens for focus rings
  - Normal: `focus-visible:ring-primary-500/40`
  - Error: `focus-visible:ring-danger-400/30`
- **Border Changes**: Border color changes on focus
  - Normal: `focus-visible:border-primary-500`
  - Error: `focus-visible:border-danger-500`
- **Smooth Transitions**: All state changes use `duration-200 ease-out`

### 3. Hint Text Support
- Display helpful text below the input
- Uses `--foreground-muted` color token
- Properly linked with `aria-describedby`
- Hidden when error is present

### 4. Smooth Error State Transitions
- Error text animates in with fade and slide
- Border smoothly transitions to danger color
- Focus ring smoothly transitions to danger variant
- Min-height container prevents layout shift
- Error takes precedence over hint text

## Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;           // Label text displayed above input
  hint?: string;            // Hint text displayed below input
  error?: string;           // Error message (hides hint when present)
  leftIcon?: React.ReactNode;  // Icon displayed on the left
  rightIcon?: React.ReactNode; // Icon displayed on the right
}
```

## Usage Examples

### Basic Input

```tsx
<Input
  label="Full Name"
  placeholder="Enter your full name"
  hint="This will be displayed on your profile"
/>
```

### Input with Left Icon

```tsx
<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  hint="We'll never share your email"
  leftIcon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  }
/>
```

### Input with Right Icon (Interactive)

```tsx
const [showPassword, setShowPassword] = useState(false);

<Input
  label="Password"
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"
  hint="Must be at least 8 characters"
  leftIcon={<LockIcon />}
  rightIcon={
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="pointer-events-auto hover:text-[var(--foreground)] transition-colors"
    >
      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  }
/>
```

### Input with Error State

```tsx
const [email, setEmail] = useState("");
const [error, setError] = useState("");

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    setError("Please enter a valid email address");
  } else {
    setError("");
  }
};

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }}
  error={error}
  leftIcon={<EmailIcon />}
/>
```

### Controlled Input

```tsx
const [value, setValue] = useState("");

<Input
  label="Username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Choose a username"
/>
```

### Disabled Input

```tsx
<Input
  label="Read-only Field"
  defaultValue="Cannot be edited"
  disabled
  hint="This field is disabled"
/>
```

## Visual States

### Default State
- Border: `border-[var(--surface-border)]`
- Background: `bg-[var(--surface-card)]`
- Text: `text-[var(--foreground)]`
- Placeholder: `placeholder:text-[var(--foreground-subtle)]`

### Hover State
- Border: `hover:border-neutral-300`

### Focus State (Normal)
- Border: `focus-visible:border-primary-500`
- Ring: `focus-visible:ring-2 focus-visible:ring-primary-500/40`
- Outline: `focus:outline-none`

### Focus State (Error)
- Border: `focus-visible:border-danger-500`
- Ring: `focus-visible:ring-2 focus-visible:ring-danger-400/30`

### Error State
- Border: `border-danger-400`
- Error Text: `text-danger-600`
- Animation: `animate-in fade-in slide-in-from-top-1 duration-200`

### Disabled State
- Uses native browser disabled styling
- Reduced opacity and disabled cursor

## Accessibility

### ARIA Attributes
- `aria-invalid`: Set to `true` when error exists
- `aria-describedby`: Links to hint or error text ID

### Keyboard Navigation
- Fully keyboard accessible
- Visible focus indicators using `focus-visible`
- Tab order follows natural document flow

### Screen Readers
- Label properly associated with input via `htmlFor`/`id`
- Error and hint text announced via `aria-describedby`
- Unique IDs generated with `React.useId()`

### WCAG Compliance
- **Requirement 20.1**: Maintains WCAG AA contrast ratios
- **Requirement 20.2**: Full keyboard navigation with visible focus indicators
- **Requirement 20.3**: Proper ARIA labels for interactive components
- **Requirement 20.6**: Form inputs have associated labels and error messages

## Design Tokens

### Colors
- `--surface-card`: Input background
- `--foreground`: Text color
- `--foreground-muted`: Icon and hint text color
- `--foreground-subtle`: Placeholder color
- `--surface-border`: Default border color
- `primary-500`: Focus border color
- `primary-500/40`: Focus ring color (normal state)
- `danger-400`: Error border color
- `danger-500`: Error focus border color
- `danger-400/30`: Error focus ring color
- `danger-600`: Error text color
- `neutral-300`: Hover border color

### Spacing
- Height: `h-10` (40px)
- Padding (no icon): `px-3.5` (14px)
- Padding (with left icon): `pl-10` (40px)
- Padding (with right icon): `pr-10` (40px)
- Icon position: `left-3` / `right-3` (12px)
- Gap between elements: `gap-1.5` (6px)

### Transitions
- Duration: `duration-200` (200ms)
- Easing: `ease-out`
- Properties: `transition-all` (border, ring, colors)

### Border Radius
- Input: `rounded-xl` (12px)

## Requirements Validated

### Requirement 2.3
✅ Input fields have proper focus states
✅ Input fields have proper error states
✅ Input fields have proper accessibility

### Requirement 20.2
✅ Full keyboard navigation support
✅ Visible focus indicators using design tokens
✅ Focus-visible pseudo-class for keyboard-only focus

## Demo

Visit `/input-demo` to see all Input component variations and states in action.

## Related Components

- **Textarea**: Multi-line text input with similar styling
- **Button**: For form submission
- **Form**: For grouping multiple inputs

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with touch optimization

## Dark Mode

All color tokens automatically adapt to dark mode via CSS variables. The component maintains proper contrast and visibility in both light and dark themes.

## Performance

- Minimal re-renders with React.forwardRef
- Efficient ID generation with React.useId()
- CSS transitions handled by GPU
- No JavaScript animations

## Best Practices

1. **Always provide a label** for accessibility
2. **Use hint text** to guide users
3. **Validate on blur** to avoid annoying users while typing
4. **Show errors clearly** with specific messages
5. **Use appropriate input types** (email, tel, number, etc.)
6. **Make icons meaningful** and provide context
7. **Test keyboard navigation** to ensure accessibility
8. **Verify focus rings** are visible in your theme
