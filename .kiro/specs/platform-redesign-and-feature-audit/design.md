# Design Document: Platform Redesign and Feature Audit

## Overview

This design document defines the technical architecture and implementation strategy for bringing the Guestly platform to production-ready quality. The platform currently has a working foundation with basic design tokens, component library, and feature implementations. This design addresses gaps in visual polish, component quality, feature completeness, and user experience to achieve a premium event commerce platform comparable to Stripe, Linear, Notion, or Airbnb.

### Design Goals

1. **Design System Excellence**: Establish a comprehensive design system with complete token coverage, glass morphism effects, intentional dark mode, and animation primitives
2. **Component Library Quality**: Upgrade all UI components to premium standards with proper states, accessibility, and micro-interactions
3. **Visual Redesign**: Transform key user journeys (homepage, dashboard, checkout) with modern, energetic, premium aesthetics
4. **Feature Completeness**: Implement missing features for virtual events, merchandise, wallet/crypto, savings, and group payments
5. **Advanced Capabilities**: Add AI analytics, geo-discovery, community engagement, vendor management, and planning tools
6. **Platform Maturity**: Ensure mobile optimization, motion design, admin controls, performance, and accessibility compliance

### Scope

This design covers all 20 requirements from the requirements document:
- Requirements 1-2: Design system and component library audits and improvements
- Requirements 3-5: Visual redesign of homepage, dashboard, and checkout flow
- Requirement 6: Intentional dark mode implementation
- Requirements 7-10: Virtual events, merchandise, wallet, and payment features
- Requirements 11-15: AI analytics, geo-discovery, community, vendors, and planning
- Requirements 16-20: Mobile optimization, motion design, admin panel, performance, and accessibility

### Technology Constraints

The design must work within the existing technology stack:
- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with CSS variables in `app/globals.css`
- **Real-time**: Socket.IO (server in `server.js`, client in `lib/websocket.ts`)
- **Data Layer**: In-memory store pattern (`lib/store.ts` and `lib/events.ts`)
- **Component Structure**: Existing organization in `components/ui/`, `components/layout/`, etc.

### Design Principles

1. **Incremental Enhancement**: Build on existing implementation without breaking changes
2. **Token-Driven Design**: Use CSS variables for all design decisions to enable theming
3. **Component Composition**: Create complex UIs from simple, reusable primitives
4. **Progressive Disclosure**: Show complexity only when needed
5. **Performance First**: Optimize for fast loading and smooth interactions
6. **Accessibility by Default**: Build inclusive experiences from the ground up

## Architecture

### System Architecture

The platform follows a client-server architecture with real-time capabilities:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Next.js App Router (React 19)                         │ │
│  │  ├─ Route Groups: (auth), (public), (dashboard)       │ │
│  │  ├─ Component Library (components/ui/)                │ │
│  │  ├─ Feature Modules (features/)                       │ │
│  │  └─ Real-time Client (lib/websocket.ts)              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Server (Node.js)                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Custom HTTP Server (server.js)                       │ │
│  │  ├─ Next.js Handler                                   │ │
│  │  ├─ Socket.IO Server (/api/socket/io)                │ │
│  │  └─ API Routes (app/api/)                            │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Data Layer (In-Memory)                               │ │
│  │  ├─ lib/store.ts (tickets, orders, wallets, etc.)    │ │
│  │  └─ lib/events.ts (event data)                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Design System Architecture

The design system is implemented through a layered token system:

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 4: Page Compositions                                  │
│  (Homepage, Dashboard, Checkout Flow)                        │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: Feature Components                                 │
│  (EventCard, TicketSelector, WalletCard, AnalyticsWidget)   │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: UI Primitives                                      │
│  (Button, Input, Card, Modal, Tabs, Table)                  │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Design Tokens (CSS Variables)                     │
│  (Colors, Typography, Spacing, Shadows, Animations)         │
└─────────────────────────────────────────────────────────────┘
```

### State Management Strategy

The platform uses a hybrid state management approach:

1. **Server State**: In-memory store (`lib/store.ts`) for all persistent data
2. **Client State**: React hooks (useState, useReducer) for UI state
3. **Real-time State**: Socket.IO for live updates (chat, ticket sales, analytics)
4. **Context State**: React Context for cross-cutting concerns (theme, cart, auth)

### Component Organization

Components are organized by abstraction level:

```
components/
├── ui/                    # Primitive components (Button, Input, Card)
├── layout/                # Layout components (TopNav, Footer, Sidebar)
├── events/                # Event-specific components (EventCard, EventHero)
├── tickets/               # Ticket purchase flow components
├── wallet/                # Wallet and payment components
├── virtual/               # Virtual event components (Chat, Polls, Stream)
├── charts/                # Data visualization components
├── near/                  # Geolocation components
└── organiser/             # Organizer dashboard components
    └── tabs/              # Dashboard tab panels
```

### Routing Architecture

The platform uses Next.js App Router with route groups:

```
app/
├── (auth)/                # Authentication pages (login, register)
├── (public)/              # Public pages (explore, event detail, community)
├── (dashboard)/           # Legacy dashboard route group
├── dashboard/             # Organizer dashboard with sidebar
├── vendor/                # Vendor portal
├── attendee/              # Attendee dashboard
├── wallet/                # Wallet management
├── cart/                  # Shopping cart
├── checkout/              # Checkout flow
├── confirmation/          # Order confirmation
├── payment/               # Payment processing
└── api/                   # API routes
    ├── auth/              # Authentication endpoints
    ├── events/            # Event management
    ├── tickets/           # Ticket operations
    ├── wallet/            # Wallet operations
    ├── merch/             # Merchandise operations
    └── socket/            # WebSocket endpoint
```

## Components and Interfaces

### Design Token System

The design token system is the foundation of the visual language. It extends the existing `app/globals.css` with missing tokens and improvements.

#### Color Tokens

Current implementation has 5 brand colors with tonal scales. No changes needed to existing tokens, but we'll add utility classes for common patterns.

**Brand Colors**:
- Primary (Blue): `--color-primary-{50-900}` ✓ Exists
- Navy: `--color-navy-{50-900}` ✓ Exists
- Success (Green): `--color-success-{50-900}` ✓ Exists
- Danger (Red): `--color-danger-{50-900}` ✓ Exists
- Warning: `--color-warning-{50-900}` ✓ Exists
- Neutral: `--color-neutral-{50-900}` ✓ Exists

**Semantic Tokens**:
- Surface tokens: `--surface-bg`, `--surface-card`, `--surface-border`, `--surface-hover`, `--surface-overlay` ✓ Exists
- Foreground tokens: `--foreground`, `--foreground-muted`, `--foreground-subtle` ✓ Exists

**Missing Tokens to Add**:
```css
/* Additional surface layers for depth */
--surface-elevated: /* card + 1 level */
--surface-overlay-light: rgba(255,255,255,0.1);
--surface-overlay-dark: rgba(0,0,0,0.3);

/* Interactive states */
--interactive-hover: var(--color-primary-50);
--interactive-active: var(--color-primary-100);
--interactive-disabled: var(--color-neutral-300);

/* Status colors */
--status-info: var(--color-primary-500);
--status-success: var(--color-success-500);
--status-warning: var(--color-warning-500);
--status-error: var(--color-danger-500);
```

#### Shadow Tokens

Current implementation has basic shadows and glow effects. We'll add elevation-specific shadows.

**Existing Shadows**: `--shadow-{xs,sm,md,lg,xl,2xl}` ✓ Exists
**Existing Glows**: `--shadow-glow-{blue,green,red}` ✓ Exists

**Missing Tokens to Add**:
```css
/* Elevation system */
--elevation-0: none;
--elevation-1: var(--shadow-sm);
--elevation-2: var(--shadow-md);
--elevation-3: var(--shadow-lg);
--elevation-4: var(--shadow-xl);
--elevation-5: var(--shadow-2xl);

/* Interactive shadows */
--shadow-focus: 0 0 0 3px rgba(67,146,241,0.2);
--shadow-focus-danger: 0 0 0 3px rgba(223,41,53,0.2);

/* Glow for dark mode CTAs */
--shadow-glow-primary: 0 0 20px rgba(67,146,241,0.4), 0 4px 12px rgba(67,146,241,0.2);
```

#### Animation Tokens

Current implementation has keyframes but missing timing and easing tokens.

**Missing Tokens to Add**:
```css
/* Timing */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;

/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

#### Glass Morphism Tokens

Current implementation has `.glass` and `.glass-dark` utility classes. We'll add variants.

**Missing Tokens to Add**:
```css
/* Glass morphism variants */
--glass-bg-light: rgba(255,255,255,0.08);
--glass-bg-medium: rgba(255,255,255,0.12);
--glass-bg-heavy: rgba(255,255,255,0.16);
--glass-border: rgba(255,255,255,0.12);
--glass-blur: 16px;
--glass-blur-heavy: 24px;
```

### Component API Specifications

#### Button Component

The Button component is the most frequently used interactive element. It must support all variants, sizes, states, and loading indicators.

**API**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  glow?: boolean; // Enable glow effect for CTAs
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
```

**Visual States**:
- Default: Base styling with proper padding and typography
- Hover: Slight elevation increase, color shift
- Active: Pressed state with scale transform
- Focus: Visible focus ring for keyboard navigation
- Disabled: Reduced opacity, no pointer events
- Loading: Spinner with disabled state

**Variants**:
- Primary: Solid blue background with white text, glow effect optional
- Secondary: Outlined with transparent background
- Ghost: No background, text color only
- Danger: Red background for destructive actions
- Success: Green background for positive actions

#### Input Component

The Input component handles all text input scenarios with proper validation states.

**API**:
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  autoFocus?: boolean;
}
```

**Visual States**:
- Default: Border with subtle background
- Focus: Primary color border with focus ring
- Error: Danger color border with error message
- Disabled: Reduced opacity with disabled cursor
- Filled: Subtle background change when has value

#### Card Component

The Card component is the primary container for content grouping.

**API**:
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean; // Enable hover elevation
  clickable?: boolean; // Add cursor pointer
  children: React.ReactNode;
  className?: string;
}
```

**Variants**:
- Default: White background with border
- Elevated: Shadow with no border
- Outlined: Border only, no background
- Glass: Glass morphism effect

#### Modal Component

The Modal component handles all overlay scenarios.

**API**:
```typescript
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

**Features**:
- Backdrop blur effect
- Smooth scale-in animation
- Focus trap for accessibility
- Escape key handling
- Scroll lock on body

#### Missing Components to Create

Based on the requirements audit, these components need to be created:

1. **Tooltip**: Hover information display
2. **Popover**: Click-triggered overlay
3. **Progress**: Linear and circular progress indicators
4. **Switch**: Toggle control
5. **Radio**: Radio button group
6. **Checkbox**: Checkbox with indeterminate state
7. **Textarea**: Multi-line text input
8. **Toast**: Notification system (exists as ToastProvider, needs enhancement)
9. **Slider**: Range input control
10. **DatePicker**: Date selection control
11. **TimePicker**: Time selection control
12. **FileUpload**: File upload with drag-and-drop
13. **Accordion**: Collapsible content sections
14. **Breadcrumb**: Navigation trail
15. **Stepper**: Multi-step process indicator

### Feature Component Specifications

#### EventCard Component

Displays event information in a card format with hover effects.

**API**:
```typescript
interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    category: string;
    city: string;
    type: 'Physical' | 'Virtual' | 'Hybrid';
    ticketsAvailable?: number;
    price?: number;
  };
  variant?: 'default' | 'featured' | 'compact';
  showSaveButton?: boolean;
  onSave?: () => void;
}
```

**Features**:
- Event type badge (Physical/Virtual/Hybrid)
- Ticket availability indicator
- Hover elevation effect
- Save/bookmark button
- Responsive image with blur placeholder

#### TicketSelector Component

Handles ticket type selection and quantity.

**API**:
```typescript
interface TicketSelectorProps {
  tickets: Array<{
    type: string;
    price: number;
    available: number;
    description?: string;
  }>;
  selected: Record<string, number>;
  onChange: (selected: Record<string, number>) => void;
  maxPerOrder?: number;
}
```

**Features**:
- Quantity controls with validation
- Real-time total calculation
- Availability warnings
- Disabled state when sold out

#### WalletCard Component

Displays wallet balance and quick actions.

**API**:
```typescript
interface WalletCardProps {
  balance: number;
  currency?: string;
  cryptoBalances?: Array<{
    symbol: string;
    amount: number;
    usdValue: number;
  }>;
  onAddFunds?: () => void;
  onWithdraw?: () => void;
  showTransactions?: boolean;
}
```

**Features**:
- Large balance display
- Crypto balance conversion
- Quick action buttons
- Recent transactions list

#### AnalyticsWidget Component

Displays analytics data with charts.

**API**:
```typescript
interface AnalyticsWidgetProps {
  title: string;
  value: number | string;
  change?: number; // Percentage change
  trend?: 'up' | 'down' | 'neutral';
  chart?: {
    type: 'line' | 'bar' | 'pie';
    data: Array<{ label: string; value: number }>;
  };
  loading?: boolean;
}
```

**Features**:
- Animated number counting
- Trend indicators with colors
- Inline chart visualization
- Loading skeleton state



## Data Models

### Extended Data Models

The platform needs additional data models to support new features. These extend the existing models in `lib/store.ts`.

#### Virtual Event Models

```typescript
// Streaming configuration
interface StreamingConfig {
  provider: 'zoom' | 'google_meet' | 'youtube' | 'vimeo' | 'rtmp';
  url: string;
  accessControl: 'ticket_holders' | 'public';
  enableChat: boolean;
  enablePolls: boolean;
  enableQA: boolean;
  enableReactions: boolean;
  recordingEnabled: boolean;
  replayAccess?: 'ticket_holders' | 'none';
}

// Virtual event access
interface VirtualAccess {
  userId: string;
  eventId: string;
  joinLink: string;
  expiresAt: number;
  createdAt: number;
}

// Live engagement
interface Poll {
  id: string;
  eventId: string;
  question: string;
  options: Array<{ id: string; text: string; votes: number }>;
  createdAt: number;
  closedAt?: number;
}

interface QAQuestion {
  id: string;
  eventId: string;
  userId: string;
  question: string;
  upvotes: number;
  answered: boolean;
  answer?: string;
  createdAt: number;
}

interface Reaction {
  userId: string;
  eventId: string;
  type: '👏' | '❤️' | '🔥' | '🎉' | '👍';
  timestamp: number;
}
```

#### Analytics Models

```typescript
// AI-powered insights
interface EventInsight {
  eventId: string;
  type: 'attendance_prediction' | 'revenue_forecast' | 'pricing_recommendation' | 'timing_suggestion' | 'promotion_timing';
  title: string;
  description: string;
  confidence: number; // 0-1
  data: Record<string, any>;
  createdAt: number;
}

// Performance metrics
interface EventMetrics {
  eventId: string;
  views: number;
  saves: number;
  ticketsSold: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  refundRate: number;
  attendanceRate?: number; // For completed events
  satisfactionScore?: number; // Post-event survey
}

// Comparative analytics
interface BenchmarkData {
  category: string;
  city: string;
  averageTicketPrice: number;
  averageAttendance: number;
  averageRevenue: number;
  topPerformingDay: string;
  topPerformingTime: string;
}
```

#### Savings and Group Payment Models

```typescript
// Enhanced savings target
interface SavingsTarget {
  id: string;
  userId: string;
  eventId: string;
  goalAmount: number;
  currentAmount: number;
  recurringAmount?: number;
  recurringFrequency?: 'weekly' | 'biweekly' | 'monthly';
  nextContribution?: number;
  targetDate?: string;
  autoApply: boolean; // Auto-apply at checkout
  createdAt: number;
}

// Group payment wallet
interface GroupWallet {
  id: string;
  name: string;
  eventId?: string;
  creatorUserId: string;
  members: Array<{
    userId: string;
    name: string;
    targetAmount: number;
    contributedAmount: number;
    joinedAt: number;
  }>;
  totalTarget: number;
  totalContributed: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: number;
}

// Group contribution
interface GroupContribution {
  id: string;
  groupWalletId: string;
  userId: string;
  amount: number;
  createdAt: number;
}
```

#### Geo-Discovery Models

```typescript
// Location data
interface EventLocation {
  eventId: string;
  latitude: number;
  longitude: number;
  address: string;
  venue?: string;
  city: string;
  country: string;
}

// User location preferences
interface UserLocation {
  userId: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  radius: number; // Preferred search radius in km
  updatedAt: number;
}

// City statistics
interface CityStats {
  city: string;
  totalEvents: number;
  upcomingEvents: number;
  totalAttendees: number;
  popularCategories: Array<{ category: string; count: number }>;
  trendingEvents: string[]; // Event IDs
}
```

#### Community Models

```typescript
// Enhanced discussion with threading
interface DiscussionThread {
  id: string;
  eventId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
}

interface DiscussionReply {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  content: string;
  likes: number;
  createdAt: number;
}

// User profile
interface UserProfile {
  userId: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  interests: string[];
  eventsAttended: string[];
  eventsOrganized: string[];
  followers: number;
  following: number;
  createdAt: number;
}

// Follow system
interface Follow {
  followerId: string;
  followingId: string;
  type: 'user' | 'organizer';
  createdAt: number;
}
```

#### Admin Models

```typescript
// Platform metrics
interface PlatformMetrics {
  totalEvents: number;
  totalUsers: number;
  totalRevenue: number;
  totalCommission: number;
  activeOrganizers: number;
  activeVendors: number;
  period: 'day' | 'week' | 'month' | 'year';
  timestamp: number;
}

// Featured placement
interface FeaturedPlacement {
  eventId: string;
  position: number;
  startDate: number;
  endDate: number;
  sponsorshipFee?: number;
  createdBy: string;
  createdAt: number;
}

// Dispute
interface Dispute {
  id: string;
  orderId: string;
  userId: string;
  eventId: string;
  reason: string;
  status: 'open' | 'investigating' | 'resolved' | 'rejected';
  resolution?: string;
  createdAt: number;
  resolvedAt?: number;
}

// Audit log
interface AuditLog {
  id: string;
  adminUserId: string;
  action: string;
  targetType: 'event' | 'user' | 'order' | 'vendor' | 'dispute';
  targetId: string;
  details: Record<string, any>;
  timestamp: number;
}
```

### Data Store Extensions

The in-memory store pattern in `lib/store.ts` will be extended with new module-scoped records and CRUD functions:

```typescript
// New store sections to add
const streamingConfigs: Record<string, StreamingConfig> = {};
const virtualAccess: Record<string, VirtualAccess[]> = {};
const polls: Record<string, Poll[]> = {};
const qaQuestions: Record<string, QAQuestion[]> = {};
const reactions: Record<string, Reaction[]> = {};

const eventInsights: Record<string, EventInsight[]> = {};
const eventMetrics: Record<string, EventMetrics> = {};
const benchmarkData: Record<string, BenchmarkData> = {};

const savingsTargets: Record<string, SavingsTarget[]> = {};
const groupWallets: Record<string, GroupWallet> = {};
const groupContributions: Record<string, GroupContribution[]> = {};

const eventLocations: Record<string, EventLocation> = {};
const userLocations: Record<string, UserLocation> = {};
const cityStats: Record<string, CityStats> = {};

const discussionThreads: Record<string, DiscussionThread[]> = {};
const discussionReplies: Record<string, DiscussionReply[]> = {};
const userProfiles: Record<string, UserProfile> = {};
const follows: Follow[] = [];

const platformMetrics: PlatformMetrics[] = [];
const featuredPlacements: FeaturedPlacement[] = [];
const disputes: Record<string, Dispute> = {};
const auditLogs: AuditLog[] = [];
```

### API Contract Specifications

All API routes follow REST conventions and return consistent response formats.

#### Standard Response Format

```typescript
// Success response
interface SuccessResponse<T> {
  success: true;
  data: T;
}

// Error response
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

#### Virtual Events API

```typescript
// POST /api/events/[id]/streaming
// Configure streaming for an event
Request: StreamingConfig
Response: SuccessResponse<StreamingConfig>

// GET /api/events/[id]/virtual-access
// Get virtual access link for authenticated user
Response: SuccessResponse<VirtualAccess>

// POST /api/events/[id]/polls
// Create a poll during live event
Request: { question: string; options: string[] }
Response: SuccessResponse<Poll>

// POST /api/events/[id]/polls/[pollId]/vote
// Vote on a poll
Request: { optionId: string }
Response: SuccessResponse<Poll>

// POST /api/events/[id]/qa
// Submit Q&A question
Request: { question: string }
Response: SuccessResponse<QAQuestion>

// POST /api/events/[id]/reactions
// Send reaction
Request: { type: Reaction['type'] }
Response: SuccessResponse<void>
```

#### Analytics API

```typescript
// GET /api/events/[id]/insights
// Get AI-powered insights for event
Response: SuccessResponse<EventInsight[]>

// GET /api/events/[id]/metrics
// Get event performance metrics
Response: SuccessResponse<EventMetrics>

// GET /api/analytics/benchmarks
// Get benchmark data for category/city
Query: { category: string; city: string }
Response: SuccessResponse<BenchmarkData>

// GET /api/analytics/forecast
// Get revenue forecast
Query: { eventId: string }
Response: SuccessResponse<{ forecast: number; confidence: number }>
```

#### Savings and Group Payments API

```typescript
// POST /api/wallet/savings
// Create savings target
Request: { eventId: string; goalAmount: number; recurringAmount?: number }
Response: SuccessResponse<SavingsTarget>

// POST /api/wallet/savings/[id]/contribute
// Add to savings
Request: { amount: number }
Response: SuccessResponse<SavingsTarget>

// POST /api/wallet/groups
// Create group wallet
Request: { name: string; eventId?: string; members: Array<{ userId: string; targetAmount: number }> }
Response: SuccessResponse<GroupWallet>

// POST /api/wallet/groups/[id]/contribute
// Contribute to group wallet
Request: { amount: number }
Response: SuccessResponse<GroupWallet>
```

#### Geo-Discovery API

```typescript
// GET /api/events/near-me
// Get events near user location
Query: { latitude: number; longitude: number; radius: number }
Response: SuccessResponse<Array<Event & { distance: number }>>

// GET /api/cities/[city]/events
// Get all events in a city
Response: SuccessResponse<Event[]>

// GET /api/cities/[city]/stats
// Get city statistics
Response: SuccessResponse<CityStats>
```

#### Community API

```typescript
// POST /api/events/[id]/discussions
// Create discussion thread
Request: { title: string; content: string }
Response: SuccessResponse<DiscussionThread>

// POST /api/discussions/[id]/replies
// Reply to thread
Request: { content: string }
Response: SuccessResponse<DiscussionReply>

// POST /api/discussions/[id]/like
// Like thread or reply
Response: SuccessResponse<void>

// POST /api/users/[id]/follow
// Follow user or organizer
Response: SuccessResponse<void>

// GET /api/users/[id]/profile
// Get user profile
Response: SuccessResponse<UserProfile>
```

#### Admin API

```typescript
// GET /api/admin/metrics
// Get platform metrics
Query: { period: 'day' | 'week' | 'month' | 'year' }
Response: SuccessResponse<PlatformMetrics>

// POST /api/admin/featured
// Create featured placement
Request: FeaturedPlacement
Response: SuccessResponse<FeaturedPlacement>

// GET /api/admin/disputes
// List disputes
Query: { status?: string }
Response: SuccessResponse<Dispute[]>

// POST /api/admin/disputes/[id]/resolve
// Resolve dispute
Request: { resolution: string; action: 'refund' | 'reject' }
Response: SuccessResponse<Dispute>

// GET /api/admin/audit-logs
// Get audit logs
Query: { startDate?: number; endDate?: number; adminUserId?: string }
Response: SuccessResponse<AuditLog[]>
```

### WebSocket Events

Real-time features use Socket.IO events. The server in `server.js` handles these events.

#### Chat Events (Existing)

```typescript
// Client -> Server
'join-room': { eventId: string; userId: string; userName: string }
'send-message': { eventId: string; userId: string; userName: string; message: string }
'leave-room': { eventId: string; userId: string }

// Server -> Client
'user-joined': { userId: string; userName: string }
'new-message': { userId: string; userName: string; message: string; timestamp: number }
'user-left': { userId: string; userName: string }
```

#### New Real-time Events

```typescript
// Live ticket sales
'ticket-sold': { eventId: string; ticketType: string; remaining: number }

// Live analytics
'metrics-update': { eventId: string; metrics: Partial<EventMetrics> }

// Live engagement
'poll-created': { eventId: string; poll: Poll }
'poll-voted': { eventId: string; pollId: string; results: Poll }
'qa-question': { eventId: string; question: QAQuestion }
'reaction': { eventId: string; reaction: Reaction }

// Group wallet updates
'group-contribution': { groupWalletId: string; contribution: GroupContribution; newTotal: number }
```



## Vendor Dashboard Redesign

The vendor dashboard requires a comprehensive redesign to match the modern, premium aesthetic of the organizer dashboard. This includes updates to the sidebar, top bar, metrics cards, invitation cards, and all dashboard widgets.

**Detailed Specification**: See `vendor-dashboard-redesign.md` for complete specifications including:

- Component-by-component redesign specifications
- Visual design tokens and styling guidelines
- Responsive design strategy for mobile, tablet, and desktop
- Animation and micro-interaction specifications
- Dark mode adjustments
- Data visualization components
- Loading states and empty states
- Implementation guidelines and timeline
- Performance targets and accessibility requirements

### Key Changes

**VendorSidebar Component**:
- Glass morphism background with backdrop blur
- Enhanced active state with gradient and glow
- Improved hover interactions with smooth transitions
- Better collapsed state with styled tooltips
- Animated navigation items

**VendorTopBar Component**:
- Frosted glass effect with backdrop blur
- Redesigned user menu dropdown with smooth animations
- Better mobile menu button with icon rotation
- Enhanced notification integration

**Dashboard Page Layout**:
- Redesigned metrics cards with animated numbers
- Glass morphism effects on all cards
- Improved invitation cards with better CTAs
- Enhanced upcoming events calendar with timeline visualization
- Redesigned sidebar widgets with progress animations
- Better visual hierarchy and spacing

**New Components**:
- VendorMetricCard: Animated metric display with icons
- VendorInvitationCard: Enhanced invitation with status badges
- VendorUpcomingEvent: Timeline-style event display
- VendorQuickStats: Sidebar statistics widget
- VendorEarningsBreakdown: Animated progress bars
- VendorQuickActions: Action buttons with icons
- VendorPaymentSummary: Payment status visualization
- EarningsChart: Line/bar chart for earnings data
- Sparkline: Minimal trend visualization

### Design System Alignment

The vendor dashboard redesign follows the same design system as the organizer dashboard:
- Uses existing CSS variables from `app/globals.css`
- Implements glass morphism effects consistently
- Follows the same spacing, typography, and color scales
- Maintains consistent animation timing and easing
- Supports dark mode with proper contrast adjustments

### Implementation Priority

1. **Phase 1 (Week 1)**: Core layout components
2. **Phase 2 (Week 2)**: Feature components and widgets
3. **Phase 3 (Week 3)**: Data visualization and analytics
4. **Phase 4 (Week 4)**: Polish, responsive design, and testing
