# AGENTS.md

This file provides guidance when working with code in this repository.

## Project Overview

Guestly is an event ticketing, planning, and community platform targeting African cities (Lagos, Abuja, Accra, Nairobi, etc). It supports physical, virtual, and hybrid events with ticketing, merchandise, wallet/payments, vendor management, analytics, and real-time community features.

## Commands

- **Dev server:** `npm run dev` — runs `node server.js` (custom HTTP server wrapping Next.js + Socket.IO)
- **Build:** `npm run build`
- **Production:** `npm run start`
- **Lint:** `npm run lint` (ESLint with next/core-web-vitals + next/typescript)
- **Type check:** `npx tsc --noEmit`

There is no test framework configured.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`; custom CSS variables defined in `app/globals.css`
- **Real-time:** Socket.IO (server in `server.js`, client helper in `lib/websocket.ts`)
- **Fonts:** Geist, Geist Mono, Inter via `next/font/google`

## Architecture

### Custom Server

`server.js` is a Node.js HTTP server that wraps Next.js and initialises a Socket.IO WebSocket server at path `/api/socket/io`. It manages in-memory chat rooms per event (join, messages, leave). The dev and production start scripts both use this file, not `next dev` directly.

### Data Layer — In-Memory Store

**There is no database.** All state lives in module-scoped variables in `lib/store.ts` and `lib/events.ts` and resets on server restart. This includes:

- Events (seed data in `lib/events.ts`, dynamic events via `addEvent`)
- Ticket availability, orders, and payment status
- Wallets, transactions, and savings targets
- Vendor profiles and subscriptions
- Organiser subscriptions
- Merchandise products (seed data) and merch orders
- Event discussions, planning tasks, budget items, and documents
- Event-vendor links/invitations

`lib/store.ts` is the central module — nearly all API routes import from it. When adding new domain entities, follow the existing pattern: define the type, create a module-scoped `Record`/array, and export CRUD functions.

### Authentication

Auth is cookie-based and simplified (no real password verification). `POST /api/auth/login` sets `access_token`, `refresh_token`, `role`, and `user_id` cookies. `GET /api/auth/me` reads these cookies to determine auth state. Three roles exist: `attendee`, `organiser`, `vendor`.

Client-side route protection uses `components/ProtectedRoute.tsx`, which calls `/api/auth/me` and redirects based on role.

### Route Groups (App Router)

- `app/(auth)/` — login, register, forgot-password, verify-email (split-screen layout with branding panel)
- `app/(public)/` — explore, event detail, buy, community, lobby, merch store, near-me, city pages (TopNav + Footer + BottomNav)
- `app/(dashboard)/` — legacy dashboard route group (same layout as `app/dashboard/`)
- `app/dashboard/` — organiser dashboard with sidebar, event management, analytics, merch, wallet, subscription, settings. Uses `SidebarProvider` context for collapsible sidebar.
- `app/vendor/` — vendor portal (register, login, onboarding, subscription, dashboard)
- `app/attendee/` — attendee dashboard
- `app/wallet/`, `app/cart/`, `app/checkout/`, `app/confirmation/`, `app/payment/`, `app/search/` — standalone pages

### API Routes

All under `app/api/`. They use Next.js Route Handlers (`NextRequest`/`NextResponse`). Auth routes are at `app/api/auth/*`. Domain routes call functions from `lib/store.ts` or `lib/events.ts`. The user identity is read from cookies (`req.cookies.get("user_id")`).

### Component Organisation

- `components/ui/` — generic UI primitives (Button, Card, Modal, Input, Tabs, Table, etc.)
- `components/layout/` — app chrome (TopNav, Footer, BottomNav, Sidebar, DashboardTopBar)
- `components/events/` — event-specific (EventCard, EventHero, SearchBar, CategoryFilter)
- `components/organiser/tabs/` — organiser dashboard tab panels (OverviewTab, TicketsTab, BudgetTab, VendorsTab, PlanningTab, etc.)
- `components/tickets/` — ticket purchase flow (TicketSelector, OrderSummary, PaymentMethodSelector, QRDisplay)
- `components/wallet/` — wallet UI (WalletCard, AddFundsForm, CryptoPaymentUI, TransactionItem, SavingsProgressBar)
- `components/virtual/` — virtual event (ChatPanel, PollPanel, StreamEmbed, VirtualLobbyClient)
- `components/charts/` — data visualisation (BarChart, LineChart, PieChart, DateRangeFilter)
- `components/near/` — geolocation (NearMeClient)

### Features Directory

- `features/merchandise/CartProvider.tsx` — React context for shopping cart state (wraps entire app in root layout)
- `features/analytics/analyticsData.ts` — seed analytics data and helper functions for dashboard charts
- `features/geo/cities.ts` — city coordinates and Haversine distance calculation for "near me" feature

### Styling Conventions

Tailwind utility classes are used throughout. Custom brand colour scales (`primary-*`, `navy-*`, `success-*`, `danger-*`, `warning-*`) and semantic surface tokens (`--surface-bg`, `--surface-card`, `--foreground`, etc.) are defined as CSS variables in `globals.css`. Dark mode is supported via `.theme-dark` class and `prefers-color-scheme` media query.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`). Use `@/lib/`, `@/components/`, `@/features/`, `@/types/` for imports.
