"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/lib/events";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  featured: Event[];
  stats: Array<{ value: string; label: string }>;
}

export default function HeroSection({ featured, stats }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Intersection observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Cycle through featured event images with smooth transitions
  useEffect(() => {
    if (featured.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % Math.min(featured.length, 3));
        setIsTransitioning(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [featured.length]);

  const currentEvent = featured[currentImageIndex] || featured[0];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-[var(--surface-card)] via-[var(--surface-bg)] to-primary-50/30 pb-0 pt-20 sm:pt-28 lg:pt-36"
    >
      {/* Dynamic background with animated gradients - enhanced for more energy */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary blue glow - larger and more prominent */}
        <div
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary-500/15 blur-3xl transition-all duration-[var(--duration-slower)]"
          style={{
            animation: "pulseGlow 6s ease-in-out infinite",
            animationDelay: "0s",
          }}
        />
        {/* Success green glow */}
        <div
          className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-success-500/12 blur-3xl transition-all duration-[var(--duration-slower)]"
          style={{
            animation: "pulseGlow 7s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        {/* Accent red glow - adding brand red */}
        <div
          className="absolute top-1/3 right-1/4 h-[350px] w-[350px] rounded-full bg-danger-500/8 blur-3xl transition-all duration-[var(--duration-slower)]"
          style={{
            animation: "pulseGlow 8s ease-in-out infinite",
            animationDelay: "4s",
          }}
        />
        {/* Additional moving gradient orbs for energy */}
        <div
          className="absolute top-1/4 left-1/3 h-[250px] w-[250px] rounded-full bg-warning-500/10 blur-3xl transition-all duration-[var(--duration-slower)]"
          style={{
            animation: "pulseGlow 9s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Content with fade-in animation */}
          <div
            className={`flex flex-col gap-7 transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {/* Badge with pulse animation */}
            <span
              className={`inline-flex w-fit items-center gap-2.5 rounded-full border border-primary-200 bg-primary-50 px-4 py-2.5 text-xs font-semibold text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300 transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)] ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{
                transitionDelay: "150ms",
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-500"></span>
              </span>
              Africa&apos;s Event Infrastructure Platform
            </span>

            {/* Large typography hierarchy - enhanced sizing and contrast */}
            <h1
              className={`text-5xl font-extrabold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl xl:text-8xl transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: "250ms",
              }}
            >
              Find the moments{" "}
              <span className="relative inline-block">
                <span className="text-gradient-brand">that shape</span>
                {/* Subtle underline accent */}
                <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full opacity-40"></span>
              </span>{" "}
              the culture
            </h1>

            {/* Description - larger and more prominent */}
            <p
              className={`max-w-xl text-xl leading-relaxed text-[var(--foreground-muted)] transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: "350ms",
              }}
            >
              From Lagos tech meetups to Nairobi food carnivals — discover
              live, virtual, and hybrid events. Buy tickets in seconds, save
              your favourites, and build communities that last.
            </p>

            {/* CTA Buttons with enhanced glow effects */}
            <div
              className={`flex flex-wrap items-center gap-4 pt-3 transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: "450ms",
              }}
            >
              <Button
                href="/explore"
                variant="primary"
                size="lg"
                glow
                className="h-14 px-10 text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]"
              >
                Explore events
              </Button>
              <Button
                href="/register"
                variant="outline"
                size="lg"
                className="h-14 px-10 text-base font-semibold hover:bg-[var(--interactive-hover)] hover:scale-105 transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]"
              >
                Start organising
              </Button>
            </div>

            {/* Trust badges with icons */}
            <div
              className={`flex flex-wrap items-center gap-6 pt-3 transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: "550ms",
              }}
            >
              {[
                { icon: "✓", text: "Free to browse" },
                { icon: "✓", text: "Secure checkout" },
                { icon: "✓", text: "Virtual & hybrid events" },
              ].map((badge, index) => (
                <span
                  key={badge.text}
                  className="flex items-center gap-2.5 text-sm font-medium text-[var(--foreground-subtle)]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-500 text-xs font-bold text-white shadow-sm">
                    {badge.icon}
                  </span>
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Dynamic event visual with enhanced transitions */}
          <div
            className={`relative lg:pl-8 transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] ${
              isVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-12 scale-95"
            }`}
            style={{
              transitionDelay: "350ms",
            }}
          >
            {/* Main featured event card with enhanced styling */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-[var(--surface-border)] bg-navy-800 shadow-2xl transition-all duration-[var(--duration-normal)] hover:shadow-[var(--shadow-glow-primary)] hover:scale-[1.02] hover:border-primary-500/50">
              <div className="relative h-[420px] sm:h-[480px] lg:h-[540px]">
                {/* Event image with smooth transition */}
                {currentEvent?.image && (
                  <div className="relative h-full w-full">
                    <Image
                      key={currentImageIndex}
                      src={currentEvent.image}
                      alt={currentEvent.title || "Featured event"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] ${
                        isTransitioning ? "opacity-0 scale-105" : "opacity-80 scale-100"
                      }`}
                      priority
                    />
                  </div>
                )}

                {/* Enhanced gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/98 via-navy-900/60 to-transparent" />

                {/* Animated accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-success-500 to-danger-500 opacity-80"></div>

                {/* Content overlay with enhanced glass morphism */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="glass-dark rounded-2xl p-6 sm:p-7 backdrop-blur-xl border-2 border-white/10 transition-all duration-[var(--duration-normal)] hover:border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg animate-pulse-glow">
                        <span className="text-sm">✦</span>
                        Featured
                      </span>
                      <span className="text-sm font-medium text-navy-200">
                        {currentEvent?.date &&
                          new Date(currentEvent.date).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        {currentEvent?.city && ` · ${currentEvent.city}`}
                      </span>
                    </div>

                    <h3 className="mb-5 line-clamp-2 text-2xl sm:text-3xl font-bold leading-tight text-white">
                      {currentEvent?.title}
                    </h3>

                    {currentEvent?.id && (
                      <Button
                        href={`/events/${currentEvent.id}`}
                        variant="primary"
                        size="md"
                        className="bg-white text-navy-900 hover:bg-white/90 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]"
                        rightIcon={
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        }
                      >
                        View event
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced floating stat card with animation */}
            <div
              className="absolute -bottom-8 -left-8 rounded-2xl border-2 border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-2xl transition-all duration-[var(--duration-normal)] hover:-translate-y-2 hover:shadow-[var(--shadow-glow-primary)] hover:border-primary-500/50"
              style={{
                animation: isVisible
                  ? "fadeInUp 0.7s ease-out 0.9s both"
                  : "none",
              }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-success-50 to-success-100 dark:from-success-950 dark:to-success-900 shadow-sm">
                  <span className="text-3xl">🎟️</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground-muted)]">
                    Tickets sold today
                  </p>
                  <p className="text-3xl font-extrabold text-[var(--foreground)] tabular-nums bg-gradient-to-r from-[var(--foreground)] to-primary-600 bg-clip-text">
                    1,247
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced image indicator dots */}
            {featured.length > 1 && (
              <div className="absolute -bottom-14 left-1/2 flex -translate-x-1/2 gap-2.5">
                {featured.slice(0, 3).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentImageIndex(index);
                        setIsTransitioning(false);
                      }, 300);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)] ${
                      index === currentImageIndex
                        ? "w-10 bg-primary-500 shadow-[var(--shadow-glow-primary)]"
                        : "w-2.5 bg-[var(--surface-border)] hover:bg-primary-300 hover:w-6"
                    }`}
                    aria-label={`View event ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats bar with enhanced staggered animation and styling */}
      <div className="mt-24 border-t-2 border-[var(--surface-border)] bg-gradient-to-b from-[var(--surface-bg)] to-[var(--surface-card)]">
        <div className="container">
          <div className="grid grid-cols-2 gap-0 sm:grid-cols-4 divide-x-2 divide-[var(--surface-border)]">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group flex flex-col items-center justify-center py-10 px-4 transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] hover:bg-[var(--interactive-hover)] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${650 + index * 120}ms`,
                }}
              >
                <p className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground)] tabular-nums bg-gradient-to-br from-[var(--foreground)] to-primary-600 bg-clip-text transition-all duration-[var(--duration-normal)] group-hover:scale-110">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground-muted)] transition-colors duration-[var(--duration-normal)] group-hover:text-[var(--foreground)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
