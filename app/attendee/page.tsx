"use client";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/ui/EmptyState";
import Card from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { filterEvents } from "@/lib/events";
import { useRouter } from "next/navigation";

const tabs = [
  { key: "upcoming", label: "Upcoming", icon: "calendar" as const },
  { key: "saved", label: "Saved", icon: "heart" as const },
  { key: "recommended", label: "For You", icon: "sparkles" as const },
  { key: "past", label: "Past", icon: "clock" as const },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function AttendeePage() {
  const router = useRouter();
  const [tab, setTab] = React.useState<TabKey>("upcoming");

  const allEvents = filterEvents({}).data;
  const upcoming = allEvents.filter((e) => new Date(e.date) > new Date());
  const past = allEvents.filter((e) => new Date(e.date) <= new Date());
  const recommended = filterEvents({ category: "Tech" }).data;
  const saved = filterEvents({ city: "Lagos" }).data.slice(0, 2);

  const sectionMap: Record<TabKey, typeof allEvents> = {
    upcoming,
    saved,
    recommended,
    past,
  };

  const events = sectionMap[tab];

  return (
    <ProtectedRoute allowRoles={["attendee"]}>
      <div className="flex flex-col gap-6">
        {/* Header with gradient background */}
        <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back 👋
              </h1>
              <p className="mt-1 text-sm text-primary-100">
                Here's what's happening with your events
              </p>
            </div>
            <button
              onClick={() => router.push("/explore")}
              className="hidden sm:inline-flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-primary-700 shadow-md transition-all hover:bg-primary-50 hover:shadow-lg hover:scale-105"
            >
              <Icon name="search" size={16} />
              Explore Events
            </button>
          </div>
        </div>

        {/* Stats Grid - Modern cards with icons */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { 
              label: "Upcoming", 
              value: upcoming.length, 
              icon: "calendar" as const,
              bg: "bg-primary-50 dark:bg-primary-900/20",
              color: "text-primary-600 dark:text-primary-400",
              iconBg: "bg-primary-500"
            },
            { 
              label: "Saved", 
              value: saved.length, 
              icon: "heart" as const,
              bg: "bg-danger-50 dark:bg-danger-900/20",
              color: "text-danger-600 dark:text-danger-400",
              iconBg: "bg-danger-500"
            },
            { 
              label: "Recommended", 
              value: recommended.length, 
              icon: "sparkles" as const,
              bg: "bg-warning-50 dark:bg-warning-900/20",
              color: "text-warning-600 dark:text-warning-400",
              iconBg: "bg-warning-500"
            },
            { 
              label: "Past", 
              value: past.length, 
              icon: "clock" as const,
              bg: "bg-neutral-100 dark:bg-neutral-800",
              color: "text-neutral-700 dark:text-neutral-300",
              iconBg: "bg-neutral-500"
            },
          ].map((s) => (
            <Card
              key={s.label}
              variant="elevated"
              padding="lg"
              hoverable
              className="group transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.iconBg} text-white transition-transform duration-300 group-hover:scale-110`}>
                  <Icon name={s.icon} size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-[var(--foreground)]">
                    {s.value}
                  </p>
                  <p className="text-xs font-medium text-[var(--foreground-muted)]">{s.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs - Modern pill design */}
        <div className="flex gap-2 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-1.5 shadow-sm border border-[var(--surface-border)]">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                tab === t.key
                  ? "bg-primary-500 text-white shadow-md scale-105"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {events.length === 0 ? (
          <Card variant="elevated" padding="lg" className="flex justify-center">
            <EmptyState
              emoji="📅"
              title={`No ${tab} events`}
              description="Check back later or explore new events to discover amazing experiences."
              action={{
                label: "Explore Events",
                onClick: () => router.push("/explore")
              }}
            />
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
                </h2>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {events.length} event{events.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard
                  key={e.id}
                  id={e.id}
                  title={e.title}
                  description={e.description}
                  date={e.date}
                  city={e.city}
                  category={e.category}
                  image={e.image}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick Actions Card */}
        <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-[var(--surface-card)] to-[var(--surface-hover)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                <Icon name="lightbulb" size={20} className="text-warning-500" />
                Looking for something specific?
              </h3>
              <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                Browse events by category, city, or date to find your perfect experience
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => router.push("/explore")}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary-500 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
              >
                <Icon name="search" size={16} />
                Explore
              </button>
              <button
                onClick={() => router.push("/near")}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-4 text-sm font-semibold text-[var(--foreground)] transition-all hover:border-primary-500 hover:bg-[var(--surface-hover)]"
              >
                <Icon name="location" size={16} />
                Near Me
              </button>
            </div>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
