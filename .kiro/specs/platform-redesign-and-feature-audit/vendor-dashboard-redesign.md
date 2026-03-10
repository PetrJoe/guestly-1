# Vendor Dashboard Redesign Specification

## Overview

This document specifies the comprehensive redesign of the vendor dashboard to match the modern, premium aesthetic of the organizer dashboard. The redesign addresses layout issues, visual hierarchy, glass morphism effects, responsive design, and micro-interactions.

## Current Issues

1. **Layout Clutter**: Too many sections competing for attention without clear hierarchy
2. **Inconsistent Design System**: Sidebar and top bar don't match organizer dashboard aesthetic
3. **Missing Modern Effects**: No glass morphism, subtle animations, or depth
4. **Weak Visual Hierarchy**: Metrics cards lack emphasis and modern styling
5. **Poor Responsive Design**: No proper grid system for different screen sizes
6. **Basic Data Visualization**: Payment summary and earnings need better visual representation
7. **Generic Iconography**: Quick actions section needs better icons and styling

## Design Goals

1. Create cohesive design system matching organizer dashboard
2. Implement glass morphism effects for cards and overlays
3. Establish proper spacing, typography hierarchy, and color usage
4. Design responsive layouts for mobile, tablet, and desktop
5. Add micro-interactions and animations for better UX
6. Redesign metrics cards with better data visualization
7. Improve sidebar navigation with better active states and icons
8. Enhance top bar with better user menu and notification system
9. Create more visual earnings dashboard with charts
10. Design better invitation cards with clear CTAs

## Design System Alignment

### Color Palette

Use existing CSS variables from `app/globals.css`:

```css
/* Primary colors */
--color-primary-{50-900}
--color-navy-{50-900}
--color-success-{50-900}
--color-danger-{50-900}
--color-warning-{50-900}
```

/* Semantic tokens */
--surface-bg
--surface-card
--surface-border
--surface-hover
--surface-overlay
--foreground
--foreground-muted
--foreground-subtle

/* Glass morphism */
--glass-bg-light: rgba(255,255,255,0.08)
--glass-bg-medium: rgba(255,255,255,0.12)
--glass-border: rgba(255,255,255,0.12)
--glass-blur: 16px
```

### Typography Scale

```css
/* Headings */
.text-3xl: 30px (Dashboard title)
.text-2xl: 24px (Section headers)
.text-xl: 20px (Card titles)
.text-lg: 18px (Subsection headers)

/* Body */
.text-base: 16px (Body text)
.text-sm: 14px (Secondary text)
.text-xs: 12px (Captions, labels)

/* Font weights */
.font-bold: 700 (Primary headings)
.font-semibold: 600 (Card titles, labels)
.font-medium: 500 (Body emphasis)
.font-normal: 400 (Body text)
```

### Spacing System

```css
/* Consistent spacing scale */
gap-2: 8px
gap-3: 12px
gap-4: 16px
gap-6: 24px
gap-8: 32px

/* Padding scale */
p-3: 12px
p-4: 16px
p-6: 24px
p-8: 32px
```


## Component Specifications

### 1. VendorSidebar Component Redesign

**Current Issues:**
- Dark navy background feels heavy
- Icon containers lack visual interest
- Active state indicator is subtle
- Collapsed state tooltips need better styling

**Redesign Specifications:**

#### Visual Design
```typescript
// Background: Glass morphism effect
background: linear-gradient(180deg, 
  rgba(15, 23, 42, 0.95) 0%, 
  rgba(15, 23, 42, 0.98) 100%)
backdrop-filter: blur(16px)
border-right: 1px solid rgba(255,255,255,0.08)

// Logo area
- Add subtle gradient background
- Increase logo size to 40px
- Add soft glow effect on logo
- Animate logo on hover (scale 1.05)

// Navigation items
- Increase padding: py-3 px-4
- Add smooth transitions (duration-200)
- Hover: background with glass effect
- Active: gradient background + glow
```

#### Active State Design
```typescript
// Active navigation item
background: linear-gradient(135deg, 
  rgba(67,146,241,0.15) 0%, 
  rgba(67,146,241,0.08) 100%)
border-left: 3px solid var(--color-primary-400)
box-shadow: inset 0 0 20px rgba(67,146,241,0.1)

// Icon container for active item
background: rgba(67,146,241,0.2)
box-shadow: 0 0 12px rgba(67,146,241,0.3)
```


#### Hover Interactions
```typescript
// Hover state
transform: translateX(4px)
background: rgba(255,255,255,0.05)
transition: all 200ms ease-out

// Icon animation on hover
transform: scale(1.1) rotate(5deg)
transition: transform 200ms ease-out
```

#### Badge Design
```typescript
// Notification badge
background: linear-gradient(135deg, 
  var(--color-primary-500), 
  var(--color-primary-600))
box-shadow: 0 0 12px rgba(67,146,241,0.4)
animation: pulse 2s infinite
```

#### Collapsed State
```typescript
// Tooltip styling
background: rgba(15, 23, 42, 0.98)
backdrop-filter: blur(12px)
border: 1px solid rgba(255,255,255,0.12)
box-shadow: 0 8px 32px rgba(0,0,0,0.4)
animation: slideInRight 150ms ease-out
```

#### Footer User Info
```typescript
// User info card
background: rgba(255,255,255,0.05)
border: 1px solid rgba(255,255,255,0.08)
border-radius: 12px
padding: 12px
transition: all 200ms

// Hover effect
background: rgba(255,255,255,0.08)
transform: translateY(-2px)
box-shadow: 0 4px 12px rgba(0,0,0,0.2)
```


### 2. VendorTopBar Component Redesign

**Current Issues:**
- Generic styling without personality
- User menu dropdown lacks visual polish
- No smooth transitions
- Notification bell needs better integration

**Redesign Specifications:**

#### Visual Design
```typescript
// Top bar container
background: rgba(255,255,255,0.8)
backdrop-filter: blur(12px)
border-bottom: 1px solid rgba(0,0,0,0.08)
box-shadow: 0 1px 3px rgba(0,0,0,0.05)

// Dark mode
background: rgba(15,23,42,0.8)
border-bottom: 1px solid rgba(255,255,255,0.08)
```

#### Mobile Menu Button
```typescript
// Button styling
background: transparent
border: 1px solid var(--surface-border)
border-radius: 10px
padding: 8px
transition: all 200ms

// Hover
background: var(--surface-hover)
border-color: var(--color-primary-300)
transform: scale(1.05)

// Icon animation
transition: transform 200ms
// On click: rotate 90deg
```


#### User Menu Button
```typescript
// Button container
background: var(--surface-card)
border: 1px solid var(--surface-border)
border-radius: 12px
padding: 8px 12px
gap: 8px
transition: all 200ms

// Hover
background: var(--surface-hover)
border-color: var(--color-primary-300)
box-shadow: 0 4px 12px rgba(0,0,0,0.08)
transform: translateY(-1px)

// Avatar
width: 32px
height: 32px
background: linear-gradient(135deg, 
  var(--color-primary-400), 
  var(--color-primary-600))
box-shadow: 0 0 12px rgba(67,146,241,0.3)
```

#### Dropdown Menu
```typescript
// Container
background: var(--surface-card)
backdrop-filter: blur(16px)
border: 1px solid var(--surface-border)
border-radius: 16px
box-shadow: 0 12px 48px rgba(0,0,0,0.12)
animation: slideDown 200ms ease-out

// Menu items
padding: 10px 12px
border-radius: 8px
transition: all 150ms

// Hover
background: var(--surface-hover)
transform: translateX(4px)

// Icons
color: var(--foreground-muted)
transition: color 150ms
// On hover: color primary
```


### 3. Dashboard Page Layout Redesign

**Current Issues:**
- Cluttered layout with competing sections
- Metrics cards lack visual impact
- No clear information hierarchy
- Sidebar widgets feel disconnected

**Redesign Specifications:**

#### Page Container
```typescript
// Main container
max-width: 1400px
margin: 0 auto
padding: 32px 24px

// Responsive
@media (max-width: 768px) {
  padding: 16px
}
```

#### Header Section
```typescript
// Header container
margin-bottom: 32px
display: flex
justify-content: space-between
align-items: flex-start
gap: 24px

// Title
font-size: 32px
font-weight: 700
letter-spacing: -0.02em
color: var(--foreground)

// Subtitle
font-size: 14px
color: var(--foreground-muted)
margin-top: 4px

// Premium badge (if applicable)
background: linear-gradient(135deg, 
  rgba(67,146,241,0.1), 
  rgba(34,197,94,0.1))
border: 1px solid rgba(67,146,241,0.2)
border-radius: 12px
padding: 12px 16px
display: flex
align-items: center
gap: 8px
animation: shimmer 3s infinite
```


#### Metrics Cards Grid
```typescript
// Grid container
display: grid
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
gap: 20px
margin-bottom: 32px

// Responsive
@media (max-width: 640px) {
  grid-template-columns: 1fr
}
```

#### Individual Metric Card
```typescript
// Card container
background: var(--surface-card)
border: 1px solid var(--surface-border)
border-radius: 16px
padding: 24px
position: relative
overflow: hidden
transition: all 300ms ease-out

// Hover effect
transform: translateY(-4px)
box-shadow: 0 12px 32px rgba(0,0,0,0.08)
border-color: var(--color-primary-200)

// Background gradient (subtle)
&::before {
  content: ''
  position: absolute
  top: 0
  right: 0
  width: 120px
  height: 120px
  background: radial-gradient(circle, 
    rgba(67,146,241,0.08) 0%, 
    transparent 70%)
  pointer-events: none
}

// Icon container
width: 48px
height: 48px
border-radius: 12px
display: flex
align-items: center
justify-content: center
transition: all 300ms

// Icon colors by type
.earnings { background: rgba(34,197,94,0.1); color: var(--color-success-600) }
.events { background: rgba(67,146,241,0.1); color: var(--color-primary-600) }
.rating { background: rgba(251,191,36,0.1); color: var(--color-warning-600) }
.time { background: rgba(100,116,139,0.1); color: var(--color-navy-600) }
```


// Metric label
font-size: 13px
font-weight: 500
color: var(--foreground-muted)
text-transform: uppercase
letter-spacing: 0.05em
margin-bottom: 8px

// Metric value
font-size: 36px
font-weight: 700
color: var(--foreground)
line-height: 1
letter-spacing: -0.02em

// Animated number counting
animation: countUp 1s ease-out

// Trend indicator (if applicable)
display: flex
align-items: center
gap: 4px
font-size: 13px
font-weight: 600
margin-top: 8px

.trend-up { color: var(--color-success-600) }
.trend-down { color: var(--color-danger-600) }
```

#### Main Content Grid
```typescript
// Two-column layout
display: grid
grid-template-columns: 2fr 1fr
gap: 24px

// Responsive
@media (max-width: 1024px) {
  grid-template-columns: 1fr
}
```


### 4. Invitation Cards Redesign

**Current Issues:**
- Basic border styling without depth
- CTAs lack visual emphasis
- No status indicators with personality
- Missing hover interactions

**Redesign Specifications:**

```typescript
// Invitation card container
background: var(--surface-card)
border: 1px solid var(--surface-border)
border-radius: 16px
padding: 20px
display: flex
gap: 16px
transition: all 300ms ease-out
position: relative
overflow: hidden

// Hover effect
transform: translateY(-2px)
box-shadow: 0 8px 24px rgba(0,0,0,0.08)
border-color: var(--color-primary-200)

// Event image
width: 80px
height: 80px
border-radius: 12px
object-fit: cover
box-shadow: 0 4px 12px rgba(0,0,0,0.1)

// Status badge
position: absolute
top: 16px
right: 16px
padding: 6px 12px
border-radius: 20px
font-size: 11px
font-weight: 600
text-transform: uppercase
letter-spacing: 0.05em

// Status variants
.pending {
  background: linear-gradient(135deg, 
    rgba(251,191,36,0.15), 
    rgba(251,191,36,0.1))
  color: var(--color-warning-700)
  border: 1px solid rgba(251,191,36,0.3)
  animation: pulse 2s infinite
}

.accepted {
  background: rgba(34,197,94,0.1)
  color: var(--color-success-700)
  border: 1px solid rgba(34,197,94,0.2)
}
```


// Event title
font-size: 16px
font-weight: 600
color: var(--foreground)
margin-bottom: 4px

// Event details
font-size: 13px
color: var(--foreground-muted)
display: flex
align-items: center
gap: 8px

// Category badge
background: rgba(67,146,241,0.1)
color: var(--color-primary-600)
padding: 2px 8px
border-radius: 6px
font-size: 11px
font-weight: 600

// Action buttons
display: flex
gap: 8px
margin-top: 12px

// Accept button
background: linear-gradient(135deg, 
  var(--color-primary-500), 
  var(--color-primary-600))
color: white
padding: 8px 16px
border-radius: 8px
font-size: 13px
font-weight: 600
transition: all 200ms
box-shadow: 0 2px 8px rgba(67,146,241,0.3)

// Hover
transform: translateY(-1px)
box-shadow: 0 4px 12px rgba(67,146,241,0.4)

// Decline button
background: transparent
border: 1px solid var(--surface-border)
color: var(--foreground-muted)
padding: 8px 16px
border-radius: 8px
font-size: 13px
font-weight: 600
transition: all 200ms

// Hover
background: var(--surface-hover)
border-color: var(--color-danger-300)
color: var(--color-danger-600)
```


### 5. Upcoming Events Calendar Redesign

**Current Issues:**
- Basic list layout without visual interest
- Date display lacks emphasis
- No timeline visualization
- Missing event type indicators

**Redesign Specifications:**

```typescript
// Calendar card container
background: var(--surface-card)
border: 1px solid var(--surface-border)
border-radius: 16px
padding: 24px

// Section header
display: flex
justify-content: space-between
align-items: center
margin-bottom: 20px

// Event item
display: flex
gap: 16px
padding: 16px
border-radius: 12px
border: 1px solid var(--surface-border)
transition: all 200ms
position: relative

// Hover
background: var(--surface-hover)
transform: translateX(4px)
border-color: var(--color-primary-200)

// Date badge
width: 64px
height: 64px
border-radius: 12px
display: flex
flex-direction: column
align-items: center
justify-content: center
background: linear-gradient(135deg, 
  rgba(67,146,241,0.1), 
  rgba(67,146,241,0.05))
border: 1px solid rgba(67,146,241,0.2)
flex-shrink: 0

// Month
font-size: 11px
font-weight: 600
text-transform: uppercase
color: var(--color-primary-600)
letter-spacing: 0.05em

// Day
font-size: 24px
font-weight: 700
color: var(--color-primary-600)
line-height: 1
```


// Event details container
flex: 1
display: flex
flex-direction: column
gap: 4px

// Event title
font-size: 15px
font-weight: 600
color: var(--foreground)

// Event metadata
display: flex
align-items: center
gap: 12px
font-size: 13px
color: var(--foreground-muted)

// Category badge
background: rgba(67,146,241,0.1)
color: var(--color-primary-600)
padding: 2px 8px
border-radius: 6px
font-size: 11px
font-weight: 600

// Status badge
position: absolute
top: 16px
right: 16px
padding: 4px 10px
border-radius: 12px
font-size: 11px
font-weight: 600
background: rgba(34,197,94,0.1)
color: var(--color-success-700)
border: 1px solid rgba(34,197,94,0.2)

// Time until event
font-size: 12px
color: var(--foreground-subtle)
margin-top: 4px
display: flex
align-items: center
gap: 4px

// Clock icon
width: 14px
height: 14px
color: var(--color-primary-500)

// Empty state
text-align: center
padding: 48px 24px
border-radius: 12px
background: var(--surface-hover)
border: 2px dashed var(--surface-border)

// Empty state icon
font-size: 48px
margin-bottom: 12px
opacity: 0.5
```


### 6. Sidebar Widgets Redesign

**Current Issues:**
- Widgets feel disconnected from main content
- Progress bars lack visual appeal
- Quick actions buttons are generic
- Payment summary needs better visualization

**Redesign Specifications:**

#### Quick Stats Widget
```typescript
// Widget container
background: var(--surface-card)
border: 1px solid var(--surface-border)
border-radius: 16px
padding: 20px

// Widget title
font-size: 14px
font-weight: 600
color: var(--foreground)
margin-bottom: 16px

// Stat item
display: flex
justify-content: space-between
align-items: center
padding: 12px 0
border-bottom: 1px solid var(--surface-border)

&:last-child {
  border-bottom: none
}

// Stat label
font-size: 13px
color: var(--foreground-muted)

// Stat value
font-size: 20px
font-weight: 700
color: var(--foreground)

// Highlight pending items
.pending-value {
  color: var(--color-warning-600)
  animation: pulse 2s infinite
}
```


#### Earnings Breakdown Widget
```typescript
// Widget container (same as Quick Stats)

// Progress item
margin-bottom: 16px

// Progress header
display: flex
justify-content: space-between
align-items: center
margin-bottom: 8px

// Period label
font-size: 13px
color: var(--foreground-muted)

// Amount
font-size: 15px
font-weight: 600
color: var(--foreground)

// Progress bar container
width: 100%
height: 8px
background: var(--surface-hover)
border-radius: 4px
overflow: hidden
position: relative

// Progress bar fill
height: 100%
border-radius: 4px
transition: width 1s ease-out
position: relative
overflow: hidden

// Animated gradient
background: linear-gradient(90deg, 
  var(--color-success-500), 
  var(--color-success-400))

// Shimmer effect
&::after {
  content: ''
  position: absolute
  top: 0
  left: -100%
  width: 100%
  height: 100%
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255,255,255,0.3), 
    transparent)
  animation: shimmer 2s infinite
}

// Color variants
.this-month { background: linear-gradient(90deg, 
  var(--color-success-500), 
  var(--color-success-400)) }
.last-month { background: linear-gradient(90deg, 
  var(--color-primary-500), 
  var(--color-primary-400)) }
.all-time { background: linear-gradient(90deg, 
  var(--color-navy-500), 
  var(--color-navy-400)) }
```


#### Quick Actions Widget
```typescript
// Widget container (same as Quick Stats)

// Action button
width: 100%
padding: 12px 16px
border-radius: 10px
font-size: 13px
font-weight: 600
display: flex
align-items: center
gap: 8px
transition: all 200ms
margin-bottom: 8px

// Primary action (first button)
background: linear-gradient(135deg, 
  var(--color-primary-500), 
  var(--color-primary-600))
color: white
box-shadow: 0 2px 8px rgba(67,146,241,0.3)

// Hover
transform: translateY(-2px)
box-shadow: 0 4px 12px rgba(67,146,241,0.4)

// Secondary actions
background: var(--surface-hover)
border: 1px solid var(--surface-border)
color: var(--foreground)

// Hover
background: var(--surface-card)
border-color: var(--color-primary-300)
transform: translateX(4px)

// Icon/Emoji
font-size: 16px
```


#### Payment Summary Widget
```typescript
// Widget container (same as Quick Stats)

// Payment item
padding: 12px 0
border-bottom: 1px solid var(--surface-border)

&:last-child {
  border-bottom: none
}

// Payment header
display: flex
justify-content: space-between
align-items: center
margin-bottom: 4px

// Payment label
font-size: 13px
color: var(--foreground-muted)

// Payment amount
font-size: 16px
font-weight: 600

// Amount variants
.paid { color: var(--color-success-600) }
.pending { color: var(--color-warning-600) }
.total { color: var(--foreground) }

// Payment count
font-size: 12px
color: var(--foreground-subtle)

// Total section
padding-top: 12px
border-top: 2px solid var(--surface-border)
margin-top: 12px

// View all link
display: inline-flex
align-items: center
gap: 4px
font-size: 13px
font-weight: 600
color: var(--color-primary-600)
transition: all 200ms

// Hover
color: var(--color-primary-700)
transform: translateX(2px)
```


## Responsive Design Strategy

### Mobile-First Approach

#### Breakpoints
```css
/* Mobile: 0-640px */
- Single column layout
- Stacked metrics cards
- Full-width sidebar drawer
- Simplified navigation

/* Tablet: 641-1024px */
- Two-column metrics grid
- Sidebar remains drawer
- Main content full width

/* Desktop: 1025px+ */
- Four-column metrics grid
- Persistent sidebar
- Two-column main layout (2fr + 1fr)
```

### Mobile Optimizations

#### Header
```typescript
// Mobile header
padding: 16px
flex-direction: column
gap: 12px

// Title
font-size: 24px

// Actions
width: 100%
justify-content: stretch
```

#### Metrics Cards
```typescript
// Mobile metrics
grid-template-columns: 1fr
gap: 12px

// Card padding
padding: 16px

// Metric value
font-size: 28px

// Icon container
width: 40px
height: 40px
```


#### Invitation Cards
```typescript
// Mobile invitation
flex-direction: column
padding: 16px

// Event image
width: 100%
height: 160px
margin-bottom: 12px

// Status badge
top: 12px
right: 12px

// Action buttons
flex-direction: column
width: 100%

button {
  width: 100%
}
```

#### Sidebar Widgets
```typescript
// Mobile widgets
margin-bottom: 16px

// On mobile, widgets appear below main content
order: 2
```

### Tablet Optimizations

```typescript
// Metrics grid
grid-template-columns: repeat(2, 1fr)
gap: 16px

// Main content
grid-template-columns: 1fr
// Sidebar widgets stack below

// Invitation cards
flex-direction: row
// Image returns to side layout
```


## Animation Specifications

### Micro-Interactions

#### Page Load Animations
```css
/* Stagger animation for metrics cards */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-card {
  animation: slideInUp 400ms ease-out;
  animation-fill-mode: both;
}

.metric-card:nth-child(1) { animation-delay: 0ms; }
.metric-card:nth-child(2) { animation-delay: 100ms; }
.metric-card:nth-child(3) { animation-delay: 200ms; }
.metric-card:nth-child(4) { animation-delay: 300ms; }
```

#### Number Counting Animation
```typescript
// Animated number counter for metrics
function useCountUp(end: number, duration: number = 1000) {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return count;
}
```


#### Pulse Animation for Pending Items
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.pending-indicator {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

#### Shimmer Effect for Premium Badge
```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.premium-badge {
  background: linear-gradient(
    90deg,
    rgba(67,146,241,0.1) 0%,
    rgba(67,146,241,0.2) 50%,
    rgba(67,146,241,0.1) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}
```

#### Slide Down Animation for Dropdowns
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-menu {
  animation: slideDown 200ms ease-out;
}
```

#### Progress Bar Fill Animation
```css
@keyframes fillProgress {
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
  }
}

.progress-bar-fill {
  animation: fillProgress 1s ease-out;
}
```


### Hover Transitions

```css
/* Smooth transitions for all interactive elements */
.interactive {
  transition-property: transform, box-shadow, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
}

/* Card hover lift */
.card-hover:hover {
  transform: translateY(-4px);
  transition-duration: 300ms;
}

/* Button press effect */
.button:active {
  transform: scale(0.98);
  transition-duration: 100ms;
}

/* Icon rotation on hover */
.icon-rotate:hover {
  transform: rotate(5deg);
}
```

## Dark Mode Specifications

### Color Adjustments

```css
/* Dark mode overrides */
.theme-dark {
  /* Backgrounds */
  --surface-bg: rgb(15, 23, 42);
  --surface-card: rgb(30, 41, 59);
  --surface-border: rgba(255, 255, 255, 0.08);
  --surface-hover: rgba(255, 255, 255, 0.05);
  
  /* Text */
  --foreground: rgb(248, 250, 252);
  --foreground-muted: rgb(148, 163, 184);
  --foreground-subtle: rgb(100, 116, 139);
  
  /* Glass morphism adjustments */
  --glass-bg-light: rgba(255, 255, 255, 0.05);
  --glass-bg-medium: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```


### Dark Mode Specific Adjustments

```css
/* Metric cards in dark mode */
.theme-dark .metric-card {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(255, 255, 255, 0.08);
}

.theme-dark .metric-card:hover {
  background: rgba(30, 41, 59, 1);
  border-color: rgba(67, 146, 241, 0.3);
}

/* Icon containers in dark mode */
.theme-dark .icon-container {
  background: rgba(67, 146, 241, 0.15);
}

/* Sidebar in dark mode */
.theme-dark .vendor-sidebar {
  background: linear-gradient(180deg, 
    rgba(15, 23, 42, 0.98) 0%, 
    rgba(15, 23, 42, 1) 100%);
  border-right-color: rgba(255, 255, 255, 0.08);
}

/* Top bar in dark mode */
.theme-dark .vendor-topbar {
  background: rgba(15, 23, 42, 0.8);
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

/* Shadows in dark mode - more subtle */
.theme-dark .card-shadow {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.theme-dark .card-shadow:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

## Data Visualization Components

### Earnings Chart Component

```typescript
interface EarningsChartProps {
  data: Array<{ period: string; amount: number }>;
  variant?: 'line' | 'bar';
}

// Visual specifications
- Height: 200px
- Responsive width
- Gradient fill under line chart
- Animated drawing on mount
- Tooltip on hover
- Grid lines with low opacity
- Axis labels in muted color
```


### Performance Metrics Sparkline

```typescript
interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
}

// Visual specifications
- Minimal design (no axes)
- Smooth curve interpolation
- Gradient fill
- Height: 40px
- Width: 100%
- Animate on mount
```

### Rating Stars Component

```typescript
interface RatingStarsProps {
  rating: number; // 0-5
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

// Visual specifications
- Filled stars: warning-500 color
- Empty stars: neutral-300 color
- Half-star support
- Smooth fill animation
- Size variants: 14px, 18px, 24px
```

## Loading States

### Skeleton Screens

```typescript
// Metric card skeleton
<div className="metric-card animate-pulse">
  <div className="h-12 w-12 bg-neutral-200 rounded-lg" />
  <div className="h-4 w-24 bg-neutral-200 rounded mt-4" />
  <div className="h-8 w-32 bg-neutral-200 rounded mt-2" />
</div>

// Invitation card skeleton
<div className="invitation-card animate-pulse">
  <div className="h-20 w-20 bg-neutral-200 rounded-lg" />
  <div className="flex-1">
    <div className="h-5 w-48 bg-neutral-200 rounded" />
    <div className="h-4 w-32 bg-neutral-200 rounded mt-2" />
    <div className="h-4 w-24 bg-neutral-200 rounded mt-1" />
  </div>
</div>
```


### Loading Spinner

```typescript
// Inline spinner for buttons
<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
  <circle 
    className="opacity-25" 
    cx="12" cy="12" r="10" 
    stroke="currentColor" 
    strokeWidth="4" 
    fill="none"
  />
  <path 
    className="opacity-75" 
    fill="currentColor" 
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  />
</svg>
```

## Empty States

### No Invitations
```typescript
<div className="empty-state">
  <div className="text-6xl mb-4">📬</div>
  <h3 className="text-lg font-semibold text-foreground mb-2">
    No pending invitations
  </h3>
  <p className="text-sm text-foreground-muted mb-4">
    Event organizers will send you invitations here
  </p>
  <Button variant="secondary" size="sm">
    Browse Events
  </Button>
</div>
```

### No Upcoming Events
```typescript
<div className="empty-state">
  <div className="text-6xl mb-4">📅</div>
  <h3 className="text-lg font-semibold text-foreground mb-2">
    No upcoming bookings
  </h3>
  <p className="text-sm text-foreground-muted mb-4">
    Accept event invitations to see them here
  </p>
</div>
```


## Implementation Guidelines

### Component Structure

```
components/
├── layout/
│   ├── VendorSidebar.tsx (redesigned)
│   └── VendorTopBar.tsx (redesigned)
├── vendors/
│   ├── VendorMetricCard.tsx (new)
│   ├── VendorInvitationCard.tsx (new)
│   ├── VendorUpcomingEvent.tsx (new)
│   ├── VendorQuickStats.tsx (new)
│   ├── VendorEarningsBreakdown.tsx (new)
│   ├── VendorQuickActions.tsx (new)
│   ├── VendorPaymentSummary.tsx (new)
│   └── VendorAnalytics.tsx (existing - enhance)
└── charts/
    ├── EarningsChart.tsx (new)
    └── Sparkline.tsx (new)
```

### Implementation Priority

**Phase 1: Core Components (Week 1)**
1. VendorSidebar redesign
2. VendorTopBar redesign
3. VendorMetricCard component
4. Dashboard page layout restructure

**Phase 2: Feature Components (Week 2)**
5. VendorInvitationCard component
6. VendorUpcomingEvent component
7. Sidebar widgets (QuickStats, EarningsBreakdown, QuickActions)
8. VendorPaymentSummary component

**Phase 3: Data Visualization (Week 3)**
9. EarningsChart component
10. Sparkline component
11. Enhanced VendorAnalytics
12. Loading states and skeletons

**Phase 4: Polish & Responsive (Week 4)**
13. Animations and micro-interactions
14. Dark mode refinements
15. Mobile responsive optimizations
16. Empty states and error handling


### Code Quality Standards

**TypeScript**
- Strict mode enabled
- Proper type definitions for all props
- No `any` types
- Interface over type for component props

**React Best Practices**
- Functional components with hooks
- Proper dependency arrays in useEffect
- Memoization for expensive computations
- Error boundaries for graceful failures

**Performance**
- Lazy load charts and heavy components
- Debounce search and filter inputs
- Virtual scrolling for long lists
- Image optimization with Next.js Image

**Accessibility**
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management in modals
- Color contrast ratios (WCAG AA)

### Testing Strategy

**Unit Tests**
- Component rendering
- User interactions (clicks, hovers)
- State management
- Data transformations

**Integration Tests**
- API data fetching
- Navigation flows
- Form submissions
- Real-time updates

**Visual Regression Tests**
- Screenshot comparisons
- Responsive layouts
- Dark mode variants
- Animation states


## Design Tokens Reference

### Complete Token List

```css
/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
--spacing-3xl: 48px;

/* Border Radius */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-full: 9999px;

/* Shadows */
--shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
--shadow-sm: 0 2px 4px rgba(0,0,0,0.06);
--shadow-md: 0 4px 8px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 16px rgba(0,0,0,0.1);
--shadow-xl: 0 12px 24px rgba(0,0,0,0.12);
--shadow-2xl: 0 16px 48px rgba(0,0,0,0.15);

/* Transitions */
--transition-fast: 150ms;
--transition-normal: 200ms;
--transition-slow: 300ms;
--transition-slower: 500ms;

/* Z-index */
--z-dropdown: 50;
--z-sticky: 30;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-tooltip: 60;
```

## Accessibility Checklist

- [ ] All interactive elements have visible focus states
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announcements for dynamic content
- [ ] Skip navigation links provided
- [ ] Error messages are descriptive and helpful
- [ ] Loading states are announced
- [ ] Modal focus trapping implemented


## Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Dashboard-Specific Metrics
- Initial page load: < 1.5s
- Time to interactive: < 2s
- API response time: < 500ms
- Animation frame rate: 60fps
- Bundle size: < 200KB (gzipped)

### Optimization Strategies
1. Code splitting by route
2. Lazy load charts and analytics
3. Optimize images with Next.js Image
4. Minimize CSS-in-JS runtime
5. Use React.memo for expensive components
6. Debounce search and filter operations
7. Implement virtual scrolling for long lists
8. Cache API responses with SWR or React Query

## Browser Support

### Target Browsers
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Android 10+

### Progressive Enhancement
- Core functionality works without JavaScript
- Graceful degradation for older browsers
- Polyfills for missing features
- Feature detection over browser detection

## Success Metrics

### User Experience
- Dashboard load time reduced by 40%
- User engagement increased by 25%
- Task completion rate improved by 30%
- User satisfaction score > 4.5/5

### Technical
- Zero accessibility violations
- 90+ Lighthouse score
- < 5% error rate
- 99.9% uptime


## Summary

This vendor dashboard redesign specification provides a comprehensive blueprint for transforming the vendor portal into a modern, premium experience that matches the quality of the organizer dashboard. The redesign addresses all identified issues through:

1. **Visual Consistency**: Unified design system with glass morphism, proper spacing, and typography hierarchy
2. **Enhanced UX**: Micro-interactions, smooth animations, and clear visual feedback
3. **Better Information Architecture**: Improved layout with clear hierarchy and responsive grid system
4. **Modern Aesthetics**: Premium styling with gradients, shadows, and depth
5. **Accessibility**: WCAG AA compliance with keyboard navigation and screen reader support
6. **Performance**: Optimized loading, animations at 60fps, and efficient rendering
7. **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
8. **Dark Mode**: Intentional dark mode with proper contrast and visual adjustments

### Key Deliverables

- Redesigned VendorSidebar component with glass morphism and better navigation
- Redesigned VendorTopBar component with improved user menu and notifications
- New VendorMetricCard component with animated numbers and visual hierarchy
- Enhanced invitation cards with better CTAs and status indicators
- Improved upcoming events calendar with timeline visualization
- Redesigned sidebar widgets with progress animations and better data display
- New data visualization components (EarningsChart, Sparkline)
- Comprehensive loading states and empty states
- Complete animation and transition system
- Full dark mode support

### Implementation Timeline

**Total Duration**: 4 weeks

- Week 1: Core layout components (Sidebar, TopBar, Metrics)
- Week 2: Feature components (Invitations, Events, Widgets)
- Week 3: Data visualization and analytics
- Week 4: Polish, responsive design, and testing

### Next Steps

1. Review and approve this specification
2. Create detailed component mockups in Figma (optional)
3. Begin Phase 1 implementation
4. Conduct user testing after each phase
5. Iterate based on feedback
6. Deploy to production with feature flags
