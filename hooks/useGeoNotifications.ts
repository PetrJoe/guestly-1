"use client";

import { useEffect, useCallback } from "react";

interface UseGeoNotificationsOptions {
  enabled?: boolean;
  updateInterval?: number; // in milliseconds
}

export function useGeoNotifications(options: UseGeoNotificationsOptions = {}) {
  const { enabled = true, updateInterval = 30 * 60 * 1000 } = options; // Default: 30 minutes

  const updateLocation = useCallback(async (latitude: number, longitude: number, city: string) => {
    try {
      const response = await fetch("/api/notifications/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, city }),
      });

      const data = await response.json();
      
      if (data.success && data.data.notificationsCreated > 0) {
        console.log(`Created ${data.data.notificationsCreated} new geo-notifications`);
      }
    } catch (error) {
      console.error("Error updating location:", error);
    }
  }, []);

  const detectLocation = useCallback(async () => {
    if (!enabled || !("geolocation" in navigator)) {
      return;
    }

    try {
      // Check notification preferences first
      const prefsResponse = await fetch("/api/notifications/preferences");
      const prefsData = await prefsResponse.json();

      if (!prefsData.success || !prefsData.data.geoNotificationsEnabled) {
        return; // User has disabled geo notifications
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode to get city (simplified - in production use a geocoding API)
          // For now, we'll use a simple city detection based on coordinates
          const city = await detectCity(latitude, longitude);

          await updateLocation(latitude, longitude, city);
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 5 * 60 * 1000, // Cache for 5 minutes
        }
      );
    } catch (error) {
      console.error("Error detecting location:", error);
    }
  }, [enabled, updateLocation]);

  useEffect(() => {
    if (!enabled) return;

    // Initial location detection
    detectLocation();

    // Set up periodic location updates
    const interval = setInterval(detectLocation, updateInterval);

    return () => clearInterval(interval);
  }, [enabled, updateInterval, detectLocation]);

  return { detectLocation };
}

// Simple city detection based on coordinates
// In production, this should use a proper geocoding API
async function detectCity(latitude: number, longitude: number): Promise<string> {
  // Simplified city detection for African cities
  const cities = [
    { name: "Lagos", lat: 6.5244, lon: 3.3792, radius: 50 },
    { name: "Abuja", lat: 9.0765, lon: 7.3986, radius: 50 },
    { name: "Accra", lat: 5.6037, lon: -0.187, radius: 50 },
    { name: "Nairobi", lat: -1.2864, lon: 36.8172, radius: 50 },
  ];

  for (const city of cities) {
    const distance = calculateDistance(latitude, longitude, city.lat, city.lon);
    if (distance <= city.radius) {
      return city.name;
    }
  }

  return "Unknown";
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
