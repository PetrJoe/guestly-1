"use client";

import React, { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Image from "next/image";

type Props = {
  id?: string;
  title: string;
  date: string;
  city: string;
  category: string;
  image: string;
  description?: string;
  onAction?: () => void;
  organizer?: {
    name: string;
    verified?: boolean;
    avatar?: string;
  };
  attendeeCount?: number;
  eventType?: "Physical" | "Virtual" | "Hybrid";
};

export default function EventHero({
  id,
  title,
  date,
  city,
  category,
  image,
  description,
  onAction,
  organizer,
  attendeeCount,
  eventType = "Physical",
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-900 h-[70vh] min-h-[500px] max-h-[700px]">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[var(--duration-slower)] hover:scale-105"
          priority
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/60 to-neutral-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-transparent to-transparent" />
      </div>

      {/* Glass morphism content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div 
          className={`glass-dark rounded-t-3xl p-8 sm:p-12 transition-all duration-[var(--duration-slow)] ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl">
            {/* Event type and category badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge 
                variant="primary" 
                className="glass-light border-primary-400/30 text-primary-100 font-semibold"
              >
                {category}
              </Badge>
              <Badge 
                variant={eventType === "Virtual" ? "success" : eventType === "Hybrid" ? "warning" : "neutral"}
                className="glass-light border-white/20 text-white font-medium"
              >
                {eventType} Event
              </Badge>
            </div>

            {/* Title with enhanced typography */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white mb-6 max-w-4xl">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-lg leading-relaxed text-neutral-200 mb-8 max-w-2xl line-clamp-3">
                {description}
              </p>
            )}

            {/* Event details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">Date & Time</p>
                  <p className="text-white font-semibold">{formattedDate}</p>
                  <p className="text-neutral-300 text-sm">{formattedTime}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 21c-4-4-8-7.5-8-11a8 8 0 1 1 16 0c0 3.5-4 7-8 11z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">Location</p>
                  <p className="text-white font-semibold">{city}</p>
                  <p className="text-neutral-300 text-sm">{eventType === "Virtual" ? "Online Event" : "In Person"}</p>
                </div>
              </div>

              {/* Organizer with trust signal */}
              {organizer && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm overflow-hidden">
                    {organizer.avatar ? (
                      <Image src={organizer.avatar} alt={organizer.name} width={40} height={40} className="object-cover" />
                    ) : (
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-300">Organizer</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold">{organizer.name}</p>
                      {organizer.verified && (
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success-500">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-neutral-300 text-sm">
                      {organizer.verified ? "Verified Organizer" : "Event Organizer"}
                    </p>
                  </div>
                </div>
              )}

              {/* Social proof */}
              {attendeeCount && attendeeCount > 0 && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-300">Interest</p>
                    <p className="text-white font-semibold">{attendeeCount.toLocaleString()}</p>
                    <p className="text-neutral-300 text-sm">People interested</p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {id ? (
                <Button 
                  size="lg" 
                  href={`/events/${id}/buy`}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-[var(--duration-normal)] hover:scale-105 btn-glow-blue"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Get Tickets
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={onAction}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-[var(--duration-normal)] hover:scale-105 btn-glow-blue"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Get Tickets
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="lg"
                className="glass-light border-white/30 text-white hover:bg-white/10 font-medium px-6 py-4 rounded-xl backdrop-blur-sm transition-all duration-[var(--duration-normal)]"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
