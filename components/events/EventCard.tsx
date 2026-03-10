"use client";
import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import StatusIndicator from "@/components/ui/StatusIndicator";
import Progress from "@/components/ui/Progress";
import Image from "next/image";

export type EventCardProps = {
  id: string;
  title: string;
  date: string;
  city: string;
  category: string;
  image: string;
  description?: string;
  price?: string | number;
  eventType?: "physical" | "virtual" | "hybrid";
  ticketsLeft?: number;
  totalTickets?: number;
  isLive?: boolean;
  isTrending?: boolean;
  distanceKm?: number;
  distanceUnit?: 'km' | 'miles';
  community?: string;
  communityType?: "campus" | "neighborhood" | "professional" | "cultural";
};

export default function EventCard(props: EventCardProps) {
  const formattedDate = new Date(props.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const eventType = props.eventType ?? "physical";
  const price = props.price != null ? (props.price === 0 || props.price === "0" ? "Free" : `₦${Number(props.price).toLocaleString()}`) : null;
  const ticketPct = props.ticketsLeft != null && props.totalTickets
    ? Math.round((props.ticketsLeft / props.totalTickets) * 100)
    : null;
  const soldOut = props.ticketsLeft === 0;

  // Format distance based on unit
  const formattedDistance = props.distanceKm !== undefined
    ? props.distanceUnit === 'miles'
      ? `${(props.distanceKm * 0.621371).toFixed(1)} mi`
      : `${props.distanceKm.toFixed(1)} km`
    : null;

  // Community type icons
  const communityTypeIcons: Record<string, string> = {
    campus: "🎓",
    neighborhood: "🏘️",
    professional: "💼",
    cultural: "🎭",
  };

  return (
    <Link
      href={`/events/${props.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] hover:-translate-y-1.5 hover:border-primary-200"
      style={{
        boxShadow: "var(--elevation-1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--elevation-3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--elevation-1)";
      }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-800">
        <Image
          src={props.image}
          alt={props.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {props.isTrending && (
            <Badge variant="danger" className="text-[10px] shadow-sm animate-pulse">
              🔥 Trending
            </Badge>
          )}
          <Badge variant={eventType as "physical" | "virtual" | "hybrid"} className="text-[10px] shadow-sm">
            {eventType === "physical" ? "📍 In-person" : eventType === "virtual" ? "🌐 Virtual" : "🔗 Hybrid"}
          </Badge>
          {props.isLive && (
            <Badge variant="live" className="text-[10px] shadow-sm" dot>
              Live
            </Badge>
          )}
        </div>

        {/* Price badge (top right) */}
        {price && (
          <div className="absolute right-3 top-3">
            <span className={`rounded-xl px-2.5 py-1 text-xs font-bold shadow-sm ${price === "Free"
                ? "bg-success-500 text-white"
                : "bg-navy-900/80 backdrop-blur-sm text-white"
              }`}>
              {price}
            </span>
          </div>
        )}

        {/* Category (bottom left of image) */}
        <div className="absolute bottom-2.5 left-3">
          <span className="rounded-lg bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white">
            {props.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--foreground)] group-hover:text-primary-600 transition-colors duration-150">
          {props.title}
        </h3>

        {props.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--foreground-muted)]">
            {props.description}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto pt-3 border-t border-[var(--surface-border)]">
          <div className="flex items-center gap-3 text-xs text-[var(--foreground-subtle)] mb-2.5">
            {/* Date */}
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {formattedDate}
            </span>

            {/* City */}
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 21c-4-4-8-7.5-8-11a8 8 0 1 1 16 0c0 3.5-4 7-8 11z" /><circle cx="12" cy="10" r="3" />
              </svg>
              {props.city}
            </span>

            {/* Community (if available) */}
            {props.community && (
              <span className="flex items-center gap-1 text-primary-600 font-medium">
                {props.communityType && communityTypeIcons[props.communityType]}
                {props.community}
              </span>
            )}

            {/* Distance (if available) */}
            {formattedDistance && (
              <span className="flex items-center gap-1 ml-auto font-medium text-primary-600">
                <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {formattedDistance}
              </span>
            )}
          </div>

          {/* Ticket availability with progress bar */}
          {soldOut ? (
            <StatusIndicator status="sold-out" />
          ) : ticketPct !== null ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-[var(--foreground-muted)]">
                  Tickets Available
                </span>
                <span className={`text-[10px] font-semibold ${
                  ticketPct < 25 ? "text-danger-600" : ticketPct < 50 ? "text-warning-600" : "text-success-600"
                }`}>
                  {props.ticketsLeft} / {props.totalTickets}
                </span>
              </div>
              <Progress
                variant="linear"
                value={ticketPct}
                size="sm"
                color={ticketPct < 25 ? "danger" : ticketPct < 50 ? "warning" : "success"}
              />
            </div>
          ) : (
            <span className="text-[10px] font-medium text-success-600 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
              Available
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
