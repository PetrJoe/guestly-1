"use client";
import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
// Utility function to format relative time
function formatDistanceToNow(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
}

type Invitation = {
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

export default function VendorInvitationsPage() {
  const [invitations, setInvitations] = React.useState<Invitation[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [responding, setResponding] = React.useState<string | null>(null);

  async function loadInvitations() {
    setLoading(true);
    try {
      const res = await fetch("/api/vendors/invitations");
      const data = await res.json();
      if (res.ok) {
        setInvitations(data.data);
      }
    } catch (error) {
      console.error("Error loading invitations:", error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void loadInvitations();
  }, []);

  async function respond(eventId: string, status: "accepted" | "declined") {
    setResponding(eventId);
    try {
      const res = await fetch(`/api/vendors/invitations/${eventId}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await loadInvitations();
      } else {
        const data = await res.json();
        alert(data.error?.message || "Failed to respond to invitation");
      }
    } catch (error) {
      console.error("Error responding to invitation:", error);
      alert("Failed to respond to invitation");
    } finally {
      setResponding(null);
    }
  }

  const pendingInvitations = invitations.filter((i) => i.status === "invited");
  const respondedInvitations = invitations.filter((i) => i.status !== "invited");

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">Event Invitations</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Manage your event invitations from organizers
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Event Invitations</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Manage your event invitations from organizers
        </p>
      </div>

      {/* Pending Invitations */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Pending Invitations ({pendingInvitations.length})
        </h2>
        {pendingInvitations.length === 0 ? (
          <Card>
            <EmptyState
              emoji="📬"
              title="No pending invitations"
              description="You don't have any pending event invitations at the moment."
              tips={[
                "Organizers can invite you to provide services for their events",
                "You'll receive notifications when you're invited to an event",
                "Review event details before accepting invitations",
              ]}
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingInvitations.map((invitation) => (
              <Card key={invitation.eventId} className="flex flex-col">
                {invitation.event?.image && (
                  <div className="relative -mx-4 -mt-4 mb-4 h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={invitation.event.image}
                      alt={invitation.event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-base font-semibold text-neutral-900">
                      {invitation.event?.title || "Event"}
                    </h3>
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700">
                      {invitation.category}
                    </span>
                  </div>
                  {invitation.event && (
                    <div className="mb-3 space-y-1 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>{new Date(invitation.event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{invitation.event.venue}, {invitation.event.city}</span>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-neutral-500">
                    Invited {formatDistanceToNow(invitation.invitedAt)}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    disabled={responding === invitation.eventId}
                    onClick={() => respond(invitation.eventId, "accepted")}
                  >
                    {responding === invitation.eventId ? "..." : "Accept"}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    disabled={responding === invitation.eventId}
                    onClick={() => respond(invitation.eventId, "declined")}
                  >
                    Decline
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Responded Invitations */}
      {respondedInvitations.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Past Responses ({respondedInvitations.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {respondedInvitations.map((invitation) => (
              <Card key={invitation.eventId} className="opacity-75">
                {invitation.event?.image && (
                  <div className="relative -mx-4 -mt-4 mb-4 h-32 overflow-hidden rounded-t-lg">
                    <img
                      src={invitation.event.image}
                      alt={invitation.event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {invitation.event?.title || "Event"}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      invitation.status === "accepted"
                        ? "bg-success-50 text-success-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {invitation.status}
                  </span>
                </div>
                {invitation.event && (
                  <div className="space-y-1 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{new Date(invitation.event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{invitation.event.city}</span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
