# Card Component

Enhanced Card component with hoverable prop, glass morphism variant, and smooth transitions using design tokens.

## Features

### 1. Hoverable Prop
- Adds elevation on hover with smooth transitions
- Uses elevation system tokens (`--elevation-1` through `--elevation-4`)
- Different hover elevations based on variant

### 2. Glass Variant
- Glass morphism effect using design tokens
- Backdrop blur and semi-transparent backgrounds
- Defined in `app/globals.css` with `.glass` utility class

### 3. Smooth Transitions
- Uses animation timing tokens (`--duration-normal`, `--ease-out`)
- Smooth shadow and elevation transitions
- Respects design system timing standards

## API

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated" | "flat" | "bordered" | "navy";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;  // NEW: Enable hover elevation effect
  children?: React.ReactNode;
}
```

## Usage Examples

### Basic Hoverable Card
```tsx
<Card variant="default" hoverable>
  <h3>Hover over me</h3>
  <p>I will elevate smoothly on hover</p>
</Card>
```

### Glass Morphism Card
```tsx
<Card variant="glass" hoverable>
  <h3>Glass Effect</h3>
  <p>Frosted glass with backdrop blur</p>
</Card>
```

### Elevated Card with Hover
```tsx
<Card variant="elevated" hoverable>
  <h3>Already Elevated</h3>
  <p>Gains more elevation on hover</p>
</Card>
```

## Variants

### Default
- Standard card with border and subtle shadow
- Hover: elevation-1 → elevation-3

### Elevated
- More prominent shadow by default
- Hover: elevation-2 → elevation-4

### Glass
- Glass morphism effect with backdrop blur
- Hover: elevation-2 → elevation-4

### Flat
- No shadow by default
- Hover: none → elevation-1

### Bordered
- Transparent background with border only
- Hover: none → elevation-2

### Navy
- Dark navy background with white text
- Hover: elevation-2 → elevation-4

## Design Tokens Used

### Elevation System
- `--elevation-0`: none
- `--elevation-1`: var(--shadow-sm)
- `--elevation-2`: var(--shadow-md)
- `--elevation-3`: var(--shadow-lg)
- `--elevation-4`: var(--shadow-xl)
- `--elevation-5`: var(--shadow-2xl)

### Animation Tokens
- `--duration-normal`: 300ms
- `--ease-out`: cubic-bezier(0, 0, 0.2, 1)

### Glass Morphism
- `--glass-bg-light`: rgba(255,255,255,0.08)
- `--glass-blur`: 16px
- `--glass-border`: rgba(255,255,255,0.12)

## Demo

View the interactive demo at `/card-demo` to see all variants and features in action.

## Requirements Satisfied

- **Requirement 2.4**: Card components use proper elevation, borders, and hover states
- **Requirement 2.9**: Smooth transitions and micro-interactions on interactive elements
- **Requirement 17.4**: Hover elevation on cards and interactive elements
