"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { RevenueWidget } from "@/components/organiser/widgets/RevenueWidget";
import { QuickActionCards } from "@/components/organiser/widgets/QuickActionCards";
import { SettlementWidget } from "@/components/organiser/widgets/SettlementWidget";
import { MerchandiseWidget } from "@/components/organiser/widgets/MerchandiseWidget";
import StatusIndicator from "@/components/ui/StatusIndicator";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

const stats = [
  {
    label: "Total Revenue",
    value: "₦18.6M",
    change: "+12.5%",
    up: true,
    iconName: "money" as const,
    bg: "bg-success-50 dark:bg-success-900/20",
    color: "text-success-600 dark:text-success-400",
  },
  {
    label: "Tickets Sold",
    value: "1,240",
    change: "+8.2%",
    up: true,
    iconName: "ticket" as const,
    bg: "bg-primary-50 dark:bg-primary-900/20",
    color: "text-primary-600 dark:text-primary-400",
  },
  {
    label: "Total Events",
    value: "6",
    change: "2 upcoming",
    up: null,
    iconName: "calendar" as const,
    bg: "bg-warning-50 dark:bg-warning-900/20",
    color: "text-warning-600 dark:text-warning-400",
  },
  {
    label: "Attendees",
    value: "4,820",
    change: "+24.1%",
    up: true,
    iconName: "users" as const,
    bg: "bg-navy-100 dark:bg-navy-900/20",
    color: "text-navy-700 dark:text-navy-300",
  },
];

// Revenue chart data
const revenueData = [
  { month: "Oct", pct: 40, val: "₦7.4M" },
  { month: "Nov", pct: 65, val: "₦12.1M" },
  { month: "Dec", pct: 90, val: "₦16.8M" },
  { month: "Jan", pct: 55, val: "₦10.2M" },
  { month: "Feb", pct: 75, val: "₦14.0M" },
  { month: "Mar", pct: 100, val: "₦18.6M" },
];

// Ticket sales sparkline data
const salesData = [45, 60, 38, 72, 85, 52, 93, 68, 77, 88, 62, 95];

// Live feed data
const liveFeed = [
  { name: "Tunde A.", ticket: "VIP", event: "Lagos Tech Fest", time: "2m ago" },
  { name: "Chioma B.", ticket: "Regular", event: "Afro Night", time: "5m ago" },
  { name: "Samuel K.", ticket: "Early Bird", event: "Lagos Tech Fest", time: "8m ago" },
  { name: "Fatima M.", ticket: "VIP", event: "Startup Summit", time: "12m ago" },
  { name: "Kemi O.", ticket: "Regular", event: "Afro Night", time: "15m ago" },
];

// Settlement data
const settlementData = {
  totalEarned: "₦18.6M",
  pending: "₦4.2M",
  settled: "₦14.4M",
  settlementPercentage: 77,
};

// Quick actions data
const quickActions = [
  {
    label: "Create Event",
    href: "/dashboard/events/new",
    iconName: "plus" as const,
    color: "bg-primary-500 text-white hover:bg-primary-600",
  },
  {
    label: "View Events",
    href: "/dashboard/events",
    iconName: "calendar" as const,
    color: "bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)]",
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    iconName: "chart" as const,
    color: "bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)]",
  },
  {
    label: "Wallet",
    href: "/dashboard/wallet",
    iconName: "wallet" as const,
    color: "bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)]",
  },
];

export default function DashboardPage() {
  const [recent, setRecent] = useState<Array<{id:number;title:string;date:string;city:string;image:string}>>([]);
  const [analytics, setAnalytics] = useState<{totalRevenue:number;totalTickets:number;total_events:number;total_orders:number}|null>(null);
  const [merchStats, setMerchStats] = useState<{
    totalProducts: number;
    unitsSold: number;
    revenue: number;
    bestSellers: Array<{ id: string; name: string; sold: number; revenue: number; image: string; eventId: string; }>;
  } | null>(null);

  useEffect(() => {
    fetch("/api/events?mine=true&pageSize=4")
      .then(r => r.json()).then(d => setRecent(d.data ?? [])).catch(() => {});
    fetch("/api/analytics/")
      .then(r => r.json()).then(d => setAnalytics(d)).catch(() => {});
    fetch("/api/merch?stats=true")
      .then(r => r.json()).then(d => setMerchStats(d)).catch(() => {});
  }, []);

  const liveStats = analytics ? [
    { label: "Total Revenue", value: `₦${(analytics.totalRevenue/1000000).toFixed(1)}M`, change: "+12.5%", up: true, iconName: "money" as const, bg: "bg-success-50 dark:bg-success-900/20", color: "text-success-600 dark:text-success-400" },
    { label: "Tickets Sold", value: analytics.totalTickets.toLocaleString(), change: "+8.2%", up: true, iconName: "ticket" as const, bg: "bg-primary-50 dark:bg-primary-900/20", color: "text-primary-600 dark:text-primary-400" },
    { label: "Total Events", value: String(analytics.total_events), change: "active", up: null, iconName: "calendar" as const, bg: "bg-warning-50 dark:bg-warning-900/20", color: "text-warning-600 dark:text-warning-400" },
    { label: "Orders", value: analytics.total_orders.toLocaleString(), change: "+24.1%", up: true, iconName: "users" as const, bg: "bg-navy-100 dark:bg-navy-900/20", color: "text-navy-700 dark:text-navy-300" },
  ] : stats;

  return (
    <ProtectedRoute allowRoles={["organiser"]}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Dashboard
            </h1>
            <p className="text-sm text-[var(--foreground-muted)]">
              Welcome back! Here&apos;s an overview of your events and performance.
            </p>
          </div>
          <Link
            href="/dashboard/events/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-600 hover:shadow-lg hover:scale-105 btn-glow-blue"
          >
            <Icon name="plus" size={16} />
            Create Event
          </Link>
        </div>

        {/* Stats Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {liveStats.map((stat) => (
            <Card 
              key={stat.label} 
              variant="elevated" 
              padding="lg" 
              hoverable 
              className="group transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon name={stat.iconName} size={20} />
                </div>
                {stat.up !== null && (
                  <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                    stat.up 
                      ? "bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-400" 
                      : "bg-danger-50 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400"
                  }`}>
                    <Icon name={stat.up ? "arrow-up" : "arrow-down"} size={12} />
                    {stat.change}
                  </div>
                )}
                {stat.up === null && (
                  <span className="text-xs font-medium text-[var(--foreground-muted)]">{stat.change}</span>
                )}
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-3xl font-bold tabular-nums tracking-tight text-[var(--foreground)]">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-[var(--foreground-muted)]">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions - Prominent placement */}
        <QuickActionCards 
          actions={quickActions}
          title="Quick Actions"
        />

        {/* Main Content Grid - Revenue & Live Feed */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueWidget 
              data={revenueData}
              total="₦18.6M"
              title="Revenue Overview"
              subtitle="Last 6 months"
            />
          </div>
          
          <div className="lg:col-span-1">
            <RealTimeFeed 
              items={liveFeed}
              title="Live Sales Feed"
            />
          </div>
        </div>

        {/* Recent Events & Ticket Sales */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Events - Takes 2 columns */}
          <Card variant="elevated" padding="lg" hoverable className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">Recent Events</h2>
                <p className="text-sm text-[var(--foreground-muted)]">Your latest events</p>
              </div>
              <Link 
                href="/dashboard/events" 
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                View all
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {recent.map((ev) => (
                <div 
                  key={ev.id} 
                  className="flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-[var(--surface-hover)] group"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--surface-bg)] ring-1 ring-[var(--surface-border)] group-hover:ring-primary-500 transition-all">
                    {ev.image && (
                      <Image 
                        src={ev.image} 
                        alt={ev.title} 
                        width={56} 
                        height={56} 
                        className="h-full w-full object-cover transition-transform group-hover:scale-110" 
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[var(--foreground)] group-hover:text-primary-600 transition-colors">
                      {ev.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                      <span className="flex items-center gap-1">
                        <Icon name="calendar" size={12} />
                        {ev.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Icon name="location" size={12} />
                        {ev.city}
                      </span>
                    </div>
                  </div>
                  <StatusIndicator status="active" />
                  <Link
                    href={`/dashboard/events/${ev.id}/manage`}
                    className="shrink-0 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition-all hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20"
                  >
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Ticket Sales Sparkline */}
          <Card variant="elevated" padding="lg" hoverable className="transition-all duration-300">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">Ticket Sales</h2>
                <p className="text-sm text-[var(--foreground-muted)]">This month</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-[var(--foreground)]">1,240</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-success-600">
                  <Icon name="arrow-up" size={14} />
                  <span>+8.2% vs last month</span>
                </div>
              </div>
              {/* Mini sparkline with hover effects */}
              <div className="flex items-end gap-1 h-20 pt-4">
                {salesData.map((v, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-md transition-all duration-300 hover:scale-110 ${
                      i === salesData.length - 1 
                        ? "bg-primary-500 shadow-lg" 
                        : "bg-primary-100 hover:bg-primary-300 dark:bg-primary-900/30 dark:hover:bg-primary-700/50"
                    }`}
                    style={{ height: `${v}%` }}
                    title={`${v}%`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Merchandise Widget */}
        {merchStats && (
          <MerchandiseWidget
            totalProducts={merchStats.totalProducts}
            unitsSold={merchStats.unitsSold}
            revenue={merchStats.revenue}
            bestSellers={merchStats.bestSellers}
          />
        )}

        {/* Settlement Widget */}
        <SettlementWidget 
          data={settlementData}
          title="Settlement Tracker"
          subtitle="Your earnings and payout status"
          walletLink="/dashboard/wallet"
        />
      </div>
    </ProtectedRoute>
  );
}
