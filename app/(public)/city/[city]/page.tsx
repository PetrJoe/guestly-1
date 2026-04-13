"use client";

import React from "react";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { useScrollAnimation, useStaggeredAnimation } from "@/lib/hooks/useScrollAnimation";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

type ApiEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  city: string;
  image: string;
};

export default function CityPage({ params }: CityPageProps) {
  const [cityName, setCityName] = React.useState<string>("");
  const [items, setItems] = React.useState<ApiEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: eventsGridRef, visibleItems: eventsVisible } = useStaggeredAnimation(items.length);
  const { ref: emptyStateRef, isVisible: emptyStateVisible } = useScrollAnimation();

  React.useEffect(() => {
    async function loadData() {
      try {
        const resolvedParams = await params;
        const decodedCity = decodeURIComponent(resolvedParams.city);
        setCityName(decodedCity);

        const res = await fetch(`/api/events?city=${encodeURIComponent(decodedCity)}&pageSize=50`);
        const data = await res.json();
        
        if (res.ok) {
          setItems(data.data || []);
        }
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [params]);

  return (
    <div className="container py-8">
      <div className="mb-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-neutral-400">
          <Link href="/" className="hover:text-neutral-600">Home</Link>
          <span>/</span>
          <span className="text-neutral-600">{cityName}</span>
        </nav>

        {/* Heading */}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            Events in {cityName}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {items.length} event{items.length !== 1 ? "s" : ""} happening in {cityName}
          </p>
        </div>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <EmptyState
            title="No events yet"
            description={`There are no events listed in ${cityName} right now.`}
          />
          <div className="mt-4">
            <Button href="/explore" variant="outline">Explore all events</Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e) => (
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
      )}
    </div>
  );
}
