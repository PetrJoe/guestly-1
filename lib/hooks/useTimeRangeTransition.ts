"use client";
import React, { useState, useCallback } from "react";

export type TimeRange = "7d" | "14d" | "30d" | "90d" | "all";

interface UseTimeRangeTransitionReturn {
  currentRange: TimeRange;
  isTransitioning: boolean;
  changeRange: (newRange: TimeRange) => void;
  transitionClass: string;
}

/**
 * Hook for managing smooth transitions between time range selections
 */
export function useTimeRangeTransition(initialRange: TimeRange = "30d"): UseTimeRangeTransitionReturn {
  const [currentRange, setCurrentRange] = React.useState<TimeRange>(initialRange);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const changeRange = useCallback((newRange: TimeRange) => {
    if (newRange === currentRange) return;

    setIsTransitioning(true);
    
    // Simulate data loading time for smooth transition
    setTimeout(() => {
      setCurrentRange(newRange);
      
      // End transition after a brief moment
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 100);
  }, [currentRange]);

  const transitionClass = isTransitioning 
    ? "opacity-50 scale-95 transition-all duration-300 ease-out" 
    : "opacity-100 scale-100 transition-all duration-300 ease-out";

  return {
    currentRange,
    isTransitioning,
    changeRange,
    transitionClass,
  };
}

/**
 * Hook for managing loading skeleton transitions
 */
export function useLoadingTransition(loading: boolean) {
  const [showSkeleton, setShowSkeleton] = React.useState(loading);

  // Delay hiding skeleton to ensure smooth transition
  React.useEffect(() => {
    if (loading) {
      setShowSkeleton(true);
    } else {
      const timer = setTimeout(() => setShowSkeleton(false), 200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return {
    showSkeleton,
    transitionClass: loading 
      ? "animate-pulse" 
      : "animate-fade-in",
  };
}