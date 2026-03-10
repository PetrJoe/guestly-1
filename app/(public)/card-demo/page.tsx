"use client";

import Card from "@/components/ui/Card";

export default function CardDemoPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-3">
            Card Component Demo
          </h1>
          <p className="text-lg text-[var(--foreground-muted)]">
            Enhanced Card component with hoverable prop, glass variant, and smooth transitions
          </p>
        </div>

        {/* Hoverable Cards Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
            Hoverable Cards
          </h2>
          <p className="text-[var(--foreground-muted)] mb-6">
            Cards with <code className="px-2 py-1 bg-[var(--surface-card)] rounded">hoverable</code> prop add elevation on hover with smooth transitions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" hoverable>
              <h3 className="text-xl font-semibold mb-2">Default Hoverable</h3>
              <p className="text-[var(--foreground-muted)]">
                Hover over this card to see the elevation effect with smooth transition.
              </p>
            </Card>

            <Card variant="elevated" hoverable>
              <h3 className="text-xl font-semibold mb-2">Elevated Hoverable</h3>
              <p className="text-[var(--foreground-muted)]">
                Starts with elevation-2 and transitions to elevation-4 on hover.
              </p>
            </Card>

            <Card variant="bordered" hoverable>
              <h3 className="text-xl font-semibold mb-2">Bordered Hoverable</h3>
              <p className="text-[var(--foreground-muted)]">
                Transparent background with border, gains shadow on hover.
              </p>
            </Card>
          </div>
        </section>

        {/* Glass Morphism Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
            Glass Morphism Variant
          </h2>
          <p className="text-[var(--foreground-muted)] mb-6">
            Glass variant uses backdrop blur and semi-transparent backgrounds for a modern frosted glass effect.
          </p>
          
          {/* Background image for glass effect demonstration */}
          <div 
            className="relative rounded-2xl overflow-hidden p-8"
            style={{
              backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              minHeight: "400px"
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="glass" hoverable>
                <h3 className="text-xl font-semibold mb-2 text-white">Glass Card</h3>
                <p className="text-white/90">
                  This card uses the glass morphism effect with backdrop blur. The background shows through with a frosted appearance.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                    Backdrop Blur
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                    Hoverable
                  </span>
                </div>
              </Card>

              <Card variant="glass" hoverable>
                <h3 className="text-xl font-semibold mb-2 text-white">Interactive Glass</h3>
                <p className="text-white/90">
                  Hover to see the elevation increase with smooth animation using design tokens.
                </p>
                <div className="mt-4">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/60 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-sm text-white/80 mt-2">75% Complete</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* All Variants Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
            All Variants with Hover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default" hoverable>
              <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                variant="default"
              </div>
              <h3 className="text-lg font-semibold mb-2">Default</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Standard card with border and subtle shadow
              </p>
            </Card>

            <Card variant="elevated" hoverable>
              <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                variant="elevated"
              </div>
              <h3 className="text-lg font-semibold mb-2">Elevated</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Card with more prominent shadow
              </p>
            </Card>

            <Card variant="flat" hoverable>
              <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                variant="flat"
              </div>
              <h3 className="text-lg font-semibold mb-2">Flat</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                No shadow by default, gains shadow on hover
              </p>
            </Card>

            <Card variant="bordered" hoverable>
              <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                variant="bordered"
              </div>
              <h3 className="text-lg font-semibold mb-2">Bordered</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Transparent with border only
              </p>
            </Card>

            <Card variant="navy" hoverable>
              <div className="text-sm font-mono text-white/70 mb-2">
                variant="navy"
              </div>
              <h3 className="text-lg font-semibold mb-2">Navy</h3>
              <p className="text-sm text-white/80">
                Dark navy background with white text
              </p>
            </Card>

            <Card variant="glass" hoverable className="bg-gradient-to-br from-primary-500/20 to-success-500/20">
              <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                variant="glass"
              </div>
              <h3 className="text-lg font-semibold mb-2">Glass</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Frosted glass effect with backdrop blur
              </p>
            </Card>
          </div>
        </section>

        {/* Padding Variants */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
            Padding Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" padding="sm" hoverable>
              <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                padding="sm"
              </div>
              <p className="text-sm text-[var(--foreground-muted)]">Small padding (p-3)</p>
            </Card>

            <Card variant="default" padding="md" hoverable>
              <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                padding="md"
              </div>
              <p className="text-sm text-[var(--foreground-muted)]">Medium padding (p-5) - default</p>
            </Card>

            <Card variant="default" padding="lg" hoverable>
              <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                padding="lg"
              </div>
              <p className="text-sm text-[var(--foreground-muted)]">Large padding (p-6)</p>
            </Card>

            <Card variant="default" padding="none" hoverable className="p-0">
              <div className="p-5 border-b border-[var(--surface-border)]">
                <div className="text-sm font-mono text-[var(--foreground-muted)] mb-2">
                  padding="none"
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-[var(--foreground-muted)]">
                  No padding - useful for custom layouts
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
            Real-world Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Event Card Example */}
            <Card variant="default" hoverable className="cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-4xl">🎵</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                  Physical
                </span>
                <span className="text-xs text-[var(--foreground-muted)]">Lagos</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Summer Music Festival</h3>
              <p className="text-sm text-[var(--foreground-muted)] mb-3">
                Join us for an unforgettable night of music
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary-600">From ₦5,000</span>
                <span className="text-xs text-[var(--foreground-muted)]">200 tickets left</span>
              </div>
            </Card>

            {/* Stats Card Example */}
            <Card variant="elevated" hoverable>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <span className="text-xs text-success-600 font-semibold">+12.5%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">₦2.4M</h3>
              <p className="text-sm text-[var(--foreground-muted)]">Total Revenue</p>
              <div className="mt-4 h-1 bg-[var(--surface-border)] rounded-full overflow-hidden">
                <div className="h-full bg-success-500 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </Card>

            {/* Action Card Example */}
            <Card variant="bordered" hoverable className="cursor-pointer border-dashed">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-[var(--surface-hover)] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">➕</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Create New Event</h3>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Start planning your next event
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Design Tokens Used */}
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
            Design Tokens Used
          </h2>
          <Card variant="default">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Elevation System</h3>
                <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--elevation-1</code> - Default shadow</li>
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--elevation-2</code> - Elevated shadow</li>
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--elevation-3</code> - Hover shadow (default)</li>
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--elevation-4</code> - Hover shadow (elevated/glass)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Animation Tokens</h3>
                <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--duration-normal</code> - 300ms transition</li>
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--ease-out</code> - Smooth easing function</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Glass Morphism</h3>
                <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--glass-bg-light</code> - Semi-transparent background</li>
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--glass-blur</code> - 16px backdrop blur</li>
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--glass-border</code> - Subtle border</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Surface Tokens</h3>
                <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--surface-card</code> - Card background</li>
                  <li><code className="px-2 py-1 bg-[var(--surface-hover)] rounded">--surface-border</code> - Border color</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
