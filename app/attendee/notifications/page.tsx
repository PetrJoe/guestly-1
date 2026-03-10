"use client";

import React from "react";
import Link from "next/link";
import NotificationPreferences from "@/components/notifications/NotificationPreferences";

interface GeoNotification {
  id: string;
  eventId: string;
  title: string;
  message: string;
  distance: number;
  sent: boolean;
  sentAt?: number;
  createdAt: number;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<GeoNotification[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<"notifications" | "settings">("notifications");

  React.useEffect(() => {
    if (activeTab === "notifications") {
      fetchNotifications();
    }
  }, [activeTab]);

  async function fetchNotifications() {
    try {
      const response = await fetch("/api/notifications/geo");
      const data = await response.json();

      if (data.success) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Notifications
          </h1>
          <p className="text-[var(--foreground-muted)] mt-2">
            Stay updated on events happening near you
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-[var(--surface-border)] mb-6">
          <button
            onClick={() => setActiveTab("notifications")}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === "notifications"
                ? "text-primary-600"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Notifications
            {activeTab === "notifications" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === "settings"
                ? "text-primary-600"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Settings
            {activeTab === "settings" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === "notifications" ? (
          <div>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-[var(--surface-card)] rounded-xl p-6 border border-[var(--surface-border)]"
                  >
                    <div className="h-5 bg-[var(--surface-hover)] rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-[var(--surface-hover)] rounded w-full mb-2"></div>
                    <div className="h-4 bg-[var(--surface-hover)] rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="bg-[var(--surface-card)] rounded-xl p-12 text-center border border-[var(--surface-border)]">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                  No notifications yet
                </h3>
                <p className="text-[var(--foreground-muted)] mb-6">
                  We'll notify you when events happen near your location
                </p>
                <Link
                  href="/explore"
                  className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Explore Events
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={`/events/${notification.eventId}`}
                    className="block bg-[var(--surface-card)] rounded-xl p-6 border border-[var(--surface-border)] hover:border-primary-600 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">📍</span>
                          <h3 className="font-semibold text-[var(--foreground)]">
                            {notification.title}
                          </h3>
                        </div>
                        <p className="text-[var(--foreground-muted)] mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-primary-600 font-medium">
                            {notification.distance.toFixed(1)}km away
                          </span>
                          <span className="text-[var(--foreground-muted)]">
                            {formatDate(notification.createdAt)}
                          </span>
                          {notification.sent && (
                            <span className="text-success-600">✓ Viewed</span>
                          )}
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-[var(--foreground-muted)] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <NotificationPreferences userId="current-user" />
        )}
      </div>
    </div>
  );
}
