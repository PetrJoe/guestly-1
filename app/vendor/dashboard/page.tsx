"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import VendorAnalytics from "@/components/vendors/VendorAnalytics";

type VendorInvitation = {
  eventId: string;
  vendorUserId: string;
  profileId: string;
  category: string;
  status: "invited" | "accepted" | "declined";
  invitedAt: number;
  event: {
    id: string;
    title: string;
    date: string;
    city: string;
    venue: string;
    image: string;
  } | null;
};

type VendorMetrics = {
  totalEarnings: number;
  completedEvents: number;
  averageRating: number;
  responseTime: string; // e.g., "< 2 hours"
  upcomingBookings: number;
  pendingInvitations: number;
};

type PaymentStats = {
  totalEarnings: number;
  pendingAmount: number;
  paidAmount: number;
  totalPayments: number;
  pendingPayments: number;
  paidPayments: number;
};

type UpcomingEvent = {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventCity: string;
  category: string;
  status: "confirmed" | "pending";
};

export default function VendorDashboardPage() {
  const [invitations, setInvitations] = React.useState<VendorInvitation[]>([]);
  const [metrics, setMetrics] = React.useState<VendorMetrics>({
    totalEarnings: 0,
    completedEvents: 0,
    averageRating: 0,
    responseTime: "N/A",
    upcomingBookings: 0,
    pendingInvitations: 0,
  });
  const [paymentStats, setPaymentStats] = React.useState<PaymentStats | null>(null);
  const [upcomingEvents, setUpcomingEvents] = React.useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isPremium, setIsPremium] = React.useState(false);
  const [vendorId, setVendorId] = React.useState<string | null>(null);

  async function loadDashboardData() {
    setLoading(true);
    try {
      // Check subscription status
      const subRes = await fetch("/api/vendor/subscription");
      if (subRes.ok) {
        const subData = await subRes.json();
        setIsPremium(subData.isPremium || false);
      }

      // Load payment stats
      const paymentsRes = await fetch("/api/vendor/payments");
      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        if (paymentsData.success) {
          setPaymentStats(paymentsData.data.stats);
        }
      }

      // Load invitations
      const invitesRes = await fetch("/api/vendors/invitations");
      const invitesData = await invitesRes.json();
      if (invitesData.success) {
        setInvitations(invitesData.data);
        
        // Get vendor ID from first invitation if available
        if (invitesData.data.length > 0) {
          setVendorId(invitesData.data[0].profileId);
        }
        
        // Calculate metrics from invitations
        const accepted = invitesData.data.filter((i: VendorInvitation) => i.status === "accepted");
        const pending = invitesData.data.filter((i: VendorInvitation) => i.status === "invited");
        
        // Get upcoming events (accepted invitations with future dates)
        const now = new Date();
        const upcoming = accepted
          .filter((i: VendorInvitation) => i.event && new Date(i.event.date) > now)
          .map((i: VendorInvitation) => ({
            eventId: i.eventId,
            eventTitle: i.event?.title || "Event",
            eventDate: i.event?.date || "",
            eventVenue: i.event?.venue || "",
            eventCity: i.event?.city || "",
            category: i.category,
            status: "confirmed" as const,
          }))
          .sort((a: UpcomingEvent, b: UpcomingEvent) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
        
        setUpcomingEvents(upcoming);
        
        // Calculate completed events (accepted invitations with past dates)
        const completed = accepted.filter(
          (i: VendorInvitation) => i.event && new Date(i.event.date) < now
        );
        
        // Update metrics - use payment stats for earnings if available
        setMetrics({
          totalEarnings: paymentStats?.totalEarnings || completed.length * 50000,
          completedEvents: completed.length,
          averageRating: 4.7, // Mock rating
          responseTime: "< 2 hours", // Mock response time
          upcomingBookings: upcoming.length,
          pendingInvitations: pending.length,
        });
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void loadDashboardData();
  }, []);

  async function respondToInvitation(eventId: string, status: "accepted" | "declined") {
    try {
      const res = await fetch(`/api/vendors/invitations/${eventId}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await loadDashboardData();
      } else {
        const data = await res.json();
        alert(data.error?.message || "Failed to respond to invitation");
      }
    } catch (error) {
      console.error("Error responding to invitation:", error);
      alert("Failed to respond to invitation");
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">Vendor Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Manage your bookings, track earnings, and view performance metrics
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        </div>
      </div>
    );
  }

  const pendingInvitations = invitations.filter((i) => i.status === "invited");

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Vendor Dashboard</h1>
            <p className="mt-1 text-sm text-neutral-600">
              Manage your bookings, track earnings, and view performance metrics
            </p>
          </div>
          {!isPremium && (
            <Link href="/vendor/subscription">
              <Button variant="primary">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Upgrade to Premium
              </Button>
            </Link>
          )}
        </div>
        {isPremium && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500/10 to-success-500/10 border border-primary-500/20 px-4 py-2">
            <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-[var(--foreground)]">
              Premium Member - Enjoying featured placement and advanced analytics
            </span>
          </div>
        )}
      </div>

      {/* Premium Analytics */}
      {isPremium && vendorId && (
        <div className="mb-8">
          <VendorAnalytics vendorId={vendorId} />
        </div>
      )}

      {/* Performance Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Earnings */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Earnings</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">
                ₦{metrics.totalEarnings.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-success-100 p-3">
              <svg className="h-6 w-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Completed Events */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Completed Events</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">{metrics.completedEvents}</p>
            </div>
            <div className="rounded-full bg-primary-100 p-3">
              <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Average Rating */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Average Rating</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold text-neutral-900">{metrics.averageRating.toFixed(1)}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(metrics.averageRating) ? "text-warning-500" : "text-neutral-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-full bg-warning-100 p-3">
              <svg className="h-6 w-6 text-warning-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Response Time */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Response Time</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">{metrics.responseTime}</p>
            </div>
            <div className="rounded-full bg-navy-100 p-3">
              <svg className="h-6 w-6 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content - 2 columns */}
        <div className="space-y-8 lg:col-span-2">
          {/* Pending Invitations */}
          {pendingInvitations.length > 0 && (
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Pending Invitations ({pendingInvitations.length})
                </h2>
                <Link href="/vendor/invitations">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {pendingInvitations.slice(0, 3).map((invitation) => (
                  <div
                    key={invitation.eventId}
                    className="flex items-start gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
                  >
                    {invitation.event?.image && (
                      <img
                        src={invitation.event.image}
                        alt={invitation.event.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-neutral-900">
                            {invitation.event?.title || "Event"}
                          </h3>
                          <p className="text-sm text-neutral-600">
                            {invitation.category} • {invitation.event?.city}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {invitation.event?.date && new Date(invitation.event.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="rounded-full bg-warning-100 px-2 py-1 text-xs font-semibold text-warning-700">
                          Pending
                        </span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => respondToInvitation(invitation.eventId, "accepted")}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => respondToInvitation(invitation.eventId, "declined")}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Upcoming Events Calendar */}
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">
                Upcoming Bookings ({upcomingEvents.length})
              </h2>
            </div>
            {upcomingEvents.length === 0 ? (
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center">
                <div className="mb-2 text-4xl">📅</div>
                <p className="text-sm font-medium text-neutral-900">No upcoming bookings</p>
                <p className="mt-1 text-xs text-neutral-600">
                  Accept event invitations to see them here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.eventId}
                    className="flex items-start gap-4 rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
                  >
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <span className="text-xs font-semibold">
                        {new Date(event.eventDate).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-xl font-bold">
                        {new Date(event.eventDate).getDate()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-neutral-900">{event.eventTitle}</h3>
                          <p className="text-sm text-neutral-600">
                            {event.category} • {event.eventVenue}
                          </p>
                          <p className="text-xs text-neutral-500">{event.eventCity}</p>
                        </div>
                        <span className="rounded-full bg-success-100 px-2 py-1 text-xs font-semibold text-success-700">
                          Confirmed
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-neutral-500">
                        {(() => {
                          const eventDate = new Date(event.eventDate);
                          const now = new Date();
                          const diffMs = eventDate.getTime() - now.getTime();
                          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                          
                          if (diffDays === 0) return "Today";
                          if (diffDays === 1) return "Tomorrow";
                          if (diffDays < 7) return `In ${diffDays} days`;
                          if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
                          return `In ${Math.floor(diffDays / 30)} months`;
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Upcoming Bookings</span>
                <span className="text-lg font-bold text-neutral-900">{metrics.upcomingBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Pending Invitations</span>
                <span className="text-lg font-bold text-warning-600">{metrics.pendingInvitations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Completed Events</span>
                <span className="text-lg font-bold text-neutral-900">{metrics.completedEvents}</span>
              </div>
            </div>
          </Card>

          {/* Earnings Breakdown */}
          <Card className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">Earnings Breakdown</h3>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-neutral-600">This Month</span>
                  <span className="font-semibold text-neutral-900">
                    ₦{(metrics.totalEarnings * 0.3).toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div className="h-full w-[30%] bg-success-500"></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Last Month</span>
                  <span className="font-semibold text-neutral-900">
                    ₦{(metrics.totalEarnings * 0.4).toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div className="h-full w-[40%] bg-primary-500"></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-neutral-600">All Time</span>
                  <span className="font-semibold text-neutral-900">
                    ₦{metrics.totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div className="h-full w-full bg-navy-500"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/vendor/payments">
                <Button variant="primary" size="sm" className="w-full">
                  💰 Manage Payments
                </Button>
              </Link>
              <Link href="/vendor/invitations">
                <Button variant="secondary" size="sm" className="w-full">
                  View All Invitations
                </Button>
              </Link>
              <Link href="/vendor/onboarding">
                <Button variant="secondary" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </Link>
              <Link href="/vendor/subscription">
                <Button variant="secondary" size="sm" className="w-full">
                  Manage Subscription
                </Button>
              </Link>
            </div>
          </Card>

          {/* Payment Summary */}
          {paymentStats && (
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-900">Payment Summary</h3>
                <Link href="/vendor/payments">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Paid</span>
                    <span className="font-semibold text-success-600">
                      ₦{paymentStats.paidAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {paymentStats.paidPayments} payment{paymentStats.paidPayments !== 1 ? 's' : ''}
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Pending</span>
                    <span className="font-semibold text-warning-600">
                      ₦{paymentStats.pendingAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {paymentStats.pendingPayments} pending
                  </div>
                </div>
                <div className="pt-2 border-t border-neutral-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-neutral-900">Total Earnings</span>
                    <span className="font-bold text-neutral-900">
                      ₦{paymentStats.totalEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
