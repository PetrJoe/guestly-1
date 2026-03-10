"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Event } from "@/lib/events";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface HeroSectionProps {
  featured: Event[];
  stats: Array<{ value: string; label: string }>;
}

export default function HeroSection({ featured, stats }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through featured event images
  useEffect(() => {
    if (featured.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % Math.min(featured.length, 3));
    }, 6000);

    return () => clearInterval(interval);
  }, [featured.length]);

  const currentEvent = featured[currentImageIndex] || featured[0];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--surface-bg)] pt-20 sm:pt-28 lg:pt-36">
      {/* Premium background with animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.2, 0.15],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 h-[800px] w-[800px] rounded-full bg-primary-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -left-40 h-[700px] w-[700px] rounded-full bg-success-500/15 blur-[100px]"
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
                </span>
                Live in Lagos, Abuja, Accra & Nairobi
              </motion.span>
              <h1 className="text-5xl font-black tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl leading-[1.1]">
                Experiences that <span className="text-gradient-blue">define</span> your world.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[var(--foreground-muted)] lg:mx-0 mx-auto">
                Discover, host, and monetize unforgettable events. From high-energy concerts to tech summits and hybrid communities.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button href="/explore" size="xl" glow className="min-w-[180px]">
                Explore Events
              </Button>
              <Button href="/dashboard/events/new" variant="outline" size="xl" className="min-w-[180px] border-[var(--surface-border)] bg-[var(--surface-card)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] backdrop-blur-md">
                Host an Event
              </Button>
            </div>

            {/* Quick Search */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl lg:mx-0 mx-auto w-full"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-800 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-[var(--surface-card)] rounded-2xl border border-[var(--surface-border)] px-6 py-4 backdrop-blur-xl">
                  <Icon name="search" size={20} className="text-[var(--foreground-subtle)] mr-4" />
                  <input 
                    type="text" 
                    placeholder="Search for concerts, tech summits, workshops..." 
                    className="bg-transparent border-none outline-none text-[var(--foreground)] placeholder-[var(--foreground-subtle)] w-full text-sm font-medium"
                  />
                  <div className="h-8 w-px bg-[var(--surface-border)] mx-4 hidden sm:block"></div>
                  <button className="hidden sm:block text-xs font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest hover:text-primary-500 transition-colors">
                    Find Events
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:pt-8 border-t border-[var(--surface-border)] pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-2xl font-black text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual side - Featured Event Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-primary-500/20 blur-[100px]" />
              
              {/* Main Card */}
              <div className="relative h-full w-full overflow-hidden rounded-[40px] border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 shadow-2xl dark:bg-navy-800/40 dark:backdrop-blur-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEvent?.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-full w-full overflow-hidden rounded-[32px]"
                  >
                    <Image
                      src={currentEvent?.image || "/globe.svg"}
                      alt={currentEvent?.title || "Event"}
                      fill
                      className="object-cover transition-transform duration-[6s] hover:scale-110"
                    />
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-bg)] via-[var(--surface-bg)]/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <span className="inline-flex rounded-full bg-primary-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                          Featured Event
                        </span>
                        <h3 className="text-3xl font-black text-[var(--foreground)] leading-tight">
                          {currentEvent?.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm font-bold text-[var(--foreground-muted)]">
                          <span className="flex items-center gap-1.5">
                            <Icon name="location" size={14} className="text-primary-500" /> {currentEvent?.city}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Icon name="calendar" size={14} className="text-primary-500" /> {new Date(currentEvent?.date || "").toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <Link 
                          href={`/events/${currentEvent?.id}`}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
                        >
                          View Details
                          <Icon name="arrow-right" size={16} />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-1/4 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-2xl hidden sm:block dark:bg-white/5 dark:backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-success-500/20 flex items-center justify-center text-xl text-success-600 dark:text-success-400">
                    <Icon name="ticket" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--foreground-subtle)] uppercase tracking-widest">Selling Fast</p>
                    <p className="text-lg font-black text-[var(--foreground)]">95% Sold Out</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-12 bottom-1/4 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-2xl hidden sm:block dark:bg-white/5 dark:backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary-500/20 flex items-center justify-center text-xl text-primary-500">
                    <Icon name="sparkles" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--foreground-subtle)] uppercase tracking-widest">Community</p>
                    <p className="text-lg font-black text-[var(--foreground)]">12K+ Joined</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
