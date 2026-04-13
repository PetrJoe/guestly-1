"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EventCard from "@/components/events/EventCard";

type ApiEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  city: string;
  image: string;
  eventType?: string;
  community?: string;
  communityType?: string;
};

export default function CommunityPage() {
  const params = useParams();
  const community = decodeURIComponent(params.community as string);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommunityEvents() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/communities/${encodeURIComponent(community)}/events`
        );
        const json = await res.json();
        if (json.success) {
          setEvents(json.data);
        }
      } catch (error) {
        console.error("Error fetching community events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCommunityEvents();
  }, [community]);

  // Get community type icon
  const getCommunityTypeInfo = () => {
    if (events.length === 0) return { icon: "📍", type: "Community" };
    const firstEvent = events[0];
    const typeMap: Record<string, { icon: string; type: string }> = {
      campus: { icon: "🎓", type: "Campus" },
      neighborhood: { icon: "🏘️", type: "Neighborhood" },
      professional: { icon: "💼", type: "Professional Community" },
      cultural: { icon: "🎭", type: "Cultural Community" },
    };
    return firstEvent.communityType
      ? typeMap[firstEvent.communityType]
      : { icon: "📍", type: "Community" };
  };

  const communityInfo = getCommunityTypeInfo();

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{communityInfo.icon}</span>
              <div>
                <p className="text-sm opacity-90 uppercase tracking-wide">
                  {communityInfo.type}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold">{community}</h1>
              </div>
            </div>
            <p className="text-lg opacity-90 mt-4">
              Discover events happening in {community}
            </p>
            {events.length > 0 && (
              <div className="flex items-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <span>
                    <strong>{events.length}</strong> {events.length === 1 ? "Event" : "Events"}
                  </span>
                </div>
                {events[0].city && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <span>{events[0].city}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-surface-card rounded-xl h-96 animate-pulse"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Events Found
            </h2>
            <p className="text-foreground-muted">
              There are currently no events in {community}.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Upcoming Events
              </h2>
              <p className="text-foreground-muted">
                {events.length} {events.length === 1 ? "event" : "events"} in {community}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  city={event.city}
                  category={event.category}
                  image={event.image}
                  eventType={event.eventType?.toLowerCase() as "physical" | "virtual" | "hybrid"}
                  community={event.community}
                  communityType={event.communityType}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
