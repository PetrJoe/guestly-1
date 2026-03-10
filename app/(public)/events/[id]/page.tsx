import React from "react";
import type { Metadata } from "next";
import { getEventById } from "@/lib/events";
import Button from "@/components/ui/Button";
import EventDetailClient from "./EventDetailClient";

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ev = getEventById(id);

  if (!ev) {
    return (
      <div className="container flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="text-4xl">😕</div>
        <h1 className="text-lg font-bold text-neutral-900">Event not found</h1>
        <p className="text-sm text-neutral-500">
          The event you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button variant="outline" href="/explore">Browse Events</Button>
      </div>
    );
  }

  return <EventDetailClient event={ev} />;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const ev = getEventById(id);
  const title = ev ? `${ev.title} — ${ev.city}` : "Event";
  const description = ev?.description || "Event details and tickets";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
