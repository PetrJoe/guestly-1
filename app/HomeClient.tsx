"use client";

import React from "react";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import HeroSection from "@/components/homepage/HeroSection";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { filterEvents } from "@/lib/events";
import type { Event } from "@/lib/events";
import { useScrollAnimation, useStaggeredAnimation } from "@/lib/hooks/useScrollAnimation";

const cities = [
  { name: "Lagos", emoji: "🇳🇬", color: "from-primary-500 to-primary-700", desc: "Nigeria's cultural capital" },
  { name: "Abuja", emoji: "🇳🇬", color: "from-success-500 to-success-700", desc: "Political & social hub" },
  { name: "Accra", emoji: "🇬🇭", color: "from-warning-500 to-orange-600", desc: "West Africa's creative city" },
  { name: "Nairobi", emoji: "🇰🇪", color: "from-danger-500 to-danger-700", desc: "East Africa's tech hub" },
];

const stats = [
  { value: "50K+", label: "Events Hosted" },
  { value: "2M+", label: "Tickets Sold" },
  { value: "12", label: "Countries" },
  { value: "98%", label: "Satisfaction" },
];

const testimonials = [
  {
    quote: "Guestly transformed how we sell tickets. Our last conference sold out in 48 hours.",
    name: "Amaka Obi",
    role: "TEDx Lagos Organiser",
    avatar: "AO",
  },
  {
    quote: "The analytics are incredible. I know exactly when to promote and who to target.",
    name: "Kofi Mensah",
    role: "Creative Director, Accra",
    avatar: "KM",
  },
  {
    quote: "Virtual events + merch store = doubled revenue without a bigger venue.",
    name: "Fatima Al-Hassan",
    role: "Tech Community Lead",
    avatar: "FA",
  },
];

export default function HomeClient() {
  const [featured, setFeatured] = React.useState<Event[]>([]);
  const [cityCards, setCityCards] = React.useState<Array<{ name: string; emoji: string; color: string; desc: string; count: number }>>([]);

  // Animation hooks
  const { ref: vendorCtaRef, isVisible: vendorCtaVisible } = useScrollAnimation();
  const { ref: citiesRef, visibleItems: citiesVisible } = useStaggeredAnimation(4);
  const { ref: featuredRef, visibleItems: featuredVisible } = useStaggeredAnimation(6);
  const { ref: virtualRef, isVisible: virtualVisible } = useScrollAnimation();
  const { ref: testimonialsRef, visibleItems: testimonialsVisible } = useStaggeredAnimation(3);
  const { ref: ctaBannerRef, isVisible: ctaBannerVisible } = useScrollAnimation();

  React.useEffect(() => {
    const featuredData = filterEvents({ page: 1, pageSize: 6 }).data;
    const cityCardsData = cities.map((c) => ({
      ...c,
      count: filterEvents({ city: c.name as Event["city"] }).total,
    }));
    
    setFeatured(featuredData);
    setCityCards(cityCardsData);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-bg)]">
      <TopNav />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <HeroSection featured={featured} stats={stats} />

      {/* ── Vendor CTA ────────────────────────────────────────────────────────── */}
      <section 
        ref={vendorCtaRef}
        className={`container py-8 transition-all duration-700 ease-[var(--ease-out)] ${
          vendorCtaVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-[var(--foreground)]">
              Provide services for events?
            </h2>
            <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">
              Join Guestly as a vendor and get discovered by organisers.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button href="/vendor/register" size="md" glow>
              Become a Vendor
            </Button>
            <Button href="/vendor/login" variant="outline" size="md">
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* ── Browse by City ─────────────────────────────────────────────────────── */}
      <section className="container pb-14">
        <div 
          className={`mb-7 flex items-end justify-between transition-all duration-700 ease-[var(--ease-out)] ${
            citiesVisible[0]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Browse by City</h2>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">See what&apos;s happening near you</p>
          </div>
        </div>

        <div ref={citiesRef} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cityCards.map((c, index) => (
            <Link
              key={c.name}
              href={`/city/${c.name}`}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-sm transition-all duration-700 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-lg ${
                citiesVisible[index]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Gradient bar at top */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${c.color}`} />
              <div className="flex flex-col items-center gap-2 p-5 text-center">
                <span className="text-3xl">{c.emoji}</span>
                <span className="text-sm font-bold text-[var(--foreground)]">{c.name}</span>
                <span className="text-xs text-[var(--foreground-muted)]">{c.desc}</span>
                <span className="mt-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-semibold text-primary-700">
                  {c.count} event{c.count !== 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Events ─────────────────────────────────────────────────── */}
      <section className="container pb-14">
        <div 
          className={`mb-7 flex items-end justify-between transition-all duration-700 ease-[var(--ease-out)] ${
            featuredVisible[0]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Featured Events</h2>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">Handpicked experiences you won&apos;t want to miss</p>
          </div>
          <Link href="/explore" className="hidden text-sm font-semibold text-primary-600 hover:text-primary-700 sm:inline-flex items-center gap-1">
            View all
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div ref={featuredRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((e, index) => (
            <div
              key={e.id}
              className={`transition-all duration-700 ease-[var(--ease-out)] ${
                featuredVisible[index]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <EventCard
                id={e.id}
                title={e.title}
                description={e.description}
                date={e.date}
                city={e.city}
                category={e.category}
                image={e.image}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center sm:hidden">
          <Link href="/explore" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all events →
          </Link>
        </div>
      </section>

      {/* ── Virtual Events Section ────────────────────────────────────────────── */}
      <section 
        ref={virtualRef}
        className={`container pb-14 transition-all duration-700 ease-[var(--ease-out)] ${
          virtualVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="overflow-hidden rounded-3xl border border-navy-700 bg-navy-800 p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-700/50 bg-primary-500/10 px-3.5 py-1.5 text-xs font-semibold text-primary-300">
                🌐 Virtual & Hybrid Events
              </span>
              <h2 className="text-3xl font-extrabold text-white leading-tight">
                Host events that reach <span className="text-gradient-blue">anywhere in the world</span>
              </h2>
              <p className="text-navy-300 text-sm leading-relaxed">
                Go beyond borders. Run live conferences, webinars, and concerts
                with streaming, live polls, Q&amp;A, and real-time engagement — all
                inside Guestly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/dashboard/events/new" size="lg" glow>
                  Create Virtual Event
                </Button>
                <Button href="/explore" variant="outline" size="lg">
                  Browse Virtual Events
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🎬", title: "Live Streaming", desc: "Zoom, YouTube Live, Custom RTMP" },
                { icon: "💬", title: "Live Chat & Q&A", desc: "Real-time audience engagement" },
                { icon: "📊", title: "Watch Analytics", desc: "Track retention & drop-off" },
                { icon: "🎟️", title: "Secure Access", desc: "Unique links per ticket" },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl bg-navy-700/50 border border-navy-600 p-4">
                  <span className="text-2xl">{f.icon}</span>
                  <p className="mt-2 text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ──────────────────────────────────────────────────────── */}
      <section className="container pb-14">
        <div 
          className={`text-center mb-10 transition-all duration-700 ease-[var(--ease-out)] ${
            testimonialsVisible[0]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Trusted by organisers across Africa</h2>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">Join thousands of creators building unforgettable experiences</p>
        </div>
        <div ref={testimonialsRef} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {testimonials.map((t, index) => (
            <div 
              key={t.name} 
              className={`flex flex-col gap-4 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-sm transition-all duration-700 ease-[var(--ease-out)] ${
                testimonialsVisible[index]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array(5).fill(null).map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--foreground)] italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[var(--surface-border)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{t.name}</p>
                  <p className="text-xs text-[var(--foreground-muted)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────────── */}
      <section 
        ref={ctaBannerRef}
        className={`container pb-14 transition-all duration-700 ease-[var(--ease-out)] ${
          ctaBannerVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <div className="relative overflow-hidden flex flex-col items-center gap-5 rounded-3xl bg-primary-500 px-8 py-16 text-center text-white">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          </div>

          <span className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <Icon name="rocket" size={16} className="text-white" />
            Free to start — no credit card required
          </span>
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">
            Ready to host your own event?
          </h2>
          <p className="relative max-w-md text-sm text-primary-100 leading-relaxed">
            Create your organiser account, set up your event page, sell tickets,
            launch merchandise, and build your community — all in one place.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard/events/new"
              className="inline-flex h-12 items-center rounded-xl bg-white px-8 text-sm font-bold text-primary-700 shadow-lg transition hover:bg-primary-50 active:scale-95"
            >
              Start Organising Free
            </Link>
            <Link
              href="/explore"
              className="inline-flex h-12 items-center rounded-xl border-2 border-white/40 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
}