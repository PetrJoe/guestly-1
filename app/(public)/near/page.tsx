"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventCard from "@/components/events/EventCard";
import EventMap from "@/components/near/EventMap";
import { nearestCity, CITY_COORDS, distanceKm as calculateDistance, type City } from "@/features/geo/cities";
import type { Event } from "@/lib/events";
import { useScrollAnimation, useStaggeredAnimation } from "@/lib/hooks/useScrollAnimation";

type UserLocation = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

type PermissionState = 'prompt' | 'granted' | 'denied' | 'unsupported';

type EventWithDistance = Event & {
  distanceKm: number;
};

type Result = {
  city: City | null;
  distanceKm?: number;
  events: EventWithDistance[];
  loading: boolean;
  error?: string;
};

export default function NearMePage() {
  const router = useRouter();
  const [res, setRes] = React.useState<Result>({ city: null, events: [], loading: false });
  const [manualCity, setManualCity] = React.useState<City | "">("");
  const [userLocation, setUserLocation] = React.useState<UserLocation | null>(null);
  const [permissionState, setPermissionState] = React.useState<PermissionState>('prompt');
  const [viewMode, setViewMode] = React.useState<'map' | 'grid'>('map');
  const [distanceUnit, setDistanceUnit] = React.useState<'km' | 'miles'>('km');

  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: controlsRef, isVisible: controlsVisible } = useScrollAnimation();
  const { ref: emptyStateRef, isVisible: emptyStateVisible } = useScrollAnimation();
  const { ref: eventsGridRef, visibleItems: eventsVisible } = useStaggeredAnimation(res.events.length);
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation();

  // Detect user's locale and set distance unit
  React.useEffect(() => {
    const locale = navigator.language || 'en-US';
    // US, UK (partially), Liberia, and Myanmar use miles
    const useMiles = locale.startsWith('en-US') || locale.startsWith('en-LR') || locale.startsWith('my');
    setDistanceUnit(useMiles ? 'miles' : 'km');
  }, []);

  // Check permission status on mount
  React.useEffect(() => {
    if (!("geolocation" in navigator)) {
      setPermissionState('unsupported');
      return;
    }

    // Check if Permissions API is available
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionState(result.state as PermissionState);
        
        // Listen for permission changes
        result.addEventListener('change', () => {
          setPermissionState(result.state as PermissionState);
        });
      }).catch(() => {
        // Permissions API not fully supported, stay in prompt state
        setPermissionState('prompt');
      });
    }
  }, []);

  // Load saved location on mount
  React.useEffect(() => {
    const savedLocation = localStorage.getItem("near:location");
    const savedCity = localStorage.getItem("near:city") as City | null;
    
    if (savedLocation) {
      try {
        const location: UserLocation = JSON.parse(savedLocation);
        // Check if location is less than 1 hour old
        if (Date.now() - location.timestamp < 3600000) {
          setUserLocation(location);
          if (savedCity && (savedCity in CITY_COORDS)) {
            loadCity(savedCity, undefined, location.latitude, location.longitude);
          }
        } else {
          // Clear stale location
          localStorage.removeItem("near:location");
          localStorage.removeItem("near:city");
        }
      } catch {
        // Invalid stored data
        localStorage.removeItem("near:location");
      }
    }
  }, []);

  async function loadCity(city: City, distanceKm?: number, userLat?: number, userLon?: number) {
    setRes((r) => ({ ...r, loading: true, error: undefined }));
    try {
      const r = await fetch(`/api/events?city=${encodeURIComponent(city)}&pageSize=12`);
      const d = await r.json();
      const events: Event[] = d?.data || d?.events || [];
      
      // Calculate distance for each event and sort by distance
      let eventsWithDistance: EventWithDistance[];
      
      if (userLat !== undefined && userLon !== undefined) {
        // Calculate distance from user location to each event's city
        eventsWithDistance = events.map(event => {
          const eventCityCoords = CITY_COORDS[event.city];
          const distance = calculateDistance({ lat: userLat, lon: userLon }, eventCityCoords);
          return {
            ...event,
            distanceKm: distance
          };
        });
        
        // Sort events by distance (nearest first)
        eventsWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
      } else {
        // No user location, use city center distance or set to 0
        eventsWithDistance = events.map(event => ({
          ...event,
          distanceKm: 0
        }));
      }
      
      setRes({ city, distanceKm, events: eventsWithDistance, loading: false });
    } catch {
      setRes({ city, distanceKm, events: [], loading: false, error: "Failed to load events" });
    }
  }

  function detect() {
    if (!("geolocation" in navigator)) {
      setPermissionState('unsupported');
      setRes({ city: null, events: [], loading: false, error: "Geolocation is not supported by your browser" });
      return;
    }
    
    setRes((r) => ({ ...r, loading: true, error: undefined }));
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const location: UserLocation = {
          latitude,
          longitude,
          timestamp: Date.now()
        };
        
        // Store user location in state
        setUserLocation(location);
        
        // Save to localStorage for future visits
        localStorage.setItem("near:location", JSON.stringify(location));
        
        // Find nearest city
        const near = nearestCity(latitude, longitude);
        localStorage.setItem("near:city", near.city);
        
        // Update permission state
        setPermissionState('granted');
        
        // Load events for the nearest city with user location for distance calculation
        loadCity(near.city, near.distanceKm, latitude, longitude);
      },
      (err) => {
        // Handle different error codes
        let errorMessage = "Unable to get your location";
        
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionState('denied');
          errorMessage = "Location permission denied. Please enable location access in your browser settings or select a city manually.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable. Please try again or select a city manually.";
        } else if (err.code === err.TIMEOUT) {
          errorMessage = "Location request timed out. Please try again or select a city manually.";
        }
        
        setRes({ city: null, events: [], loading: false, error: errorMessage });
      },
      { 
        enableHighAccuracy: false, 
        maximumAge: 300000, // 5 minutes
        timeout: 10000 // 10 seconds
      }
    );
  }

  function handleEventClick(eventId: string) {
    router.push(`/events/${eventId}`);
  }

  // Helper function to format distance based on unit preference
  function formatDistance(km: number): string {
    if (distanceUnit === 'miles') {
      const miles = km * 0.621371;
      return `${miles.toFixed(1)} mi`;
    }
    return `${km.toFixed(1)} km`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--surface-bg)] via-[var(--surface-bg)] to-primary-50/20">
      <div className="container py-8">
        <div 
          ref={headerRef}
          className={`mb-6 flex items-center justify-between transition-all duration-700 ease-[var(--ease-out)] ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Events Near You</h1>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">Find events based on your location.</p>
          </div>
          <div 
            ref={controlsRef}
            className={`flex items-center gap-2 transition-all duration-700 delay-200 ease-[var(--ease-out)] ${
              controlsVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <button
              onClick={detect}
              disabled={permissionState === 'unsupported'}
              className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-all duration-[var(--duration-fast)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-600"
              aria-label="Use my location"
              title={permissionState === 'unsupported' ? 'Geolocation not supported' : permissionState === 'denied' ? 'Location permission denied' : 'Use my location'}
            >
              {permissionState === 'granted' && userLocation ? '📍 Update location' : 'Use my location'}
            </button>
            <div className="flex items-center gap-2">
              <label htmlFor="city" className="text-xs text-[var(--foreground-muted)]">or choose</label>
              <select
                id="city"
                value={manualCity}
                onChange={(e) => setManualCity(e.target.value as City | "")}
                className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-card)] px-2 py-1 text-sm text-[var(--foreground)] transition-all duration-[var(--duration-fast)] hover:border-primary-200 focus:border-primary-300 focus:outline-none focus:shadow-[var(--shadow-focus)]"
                aria-label="Select a city"
              >
                <option value="">Select city</option>
                {Object.keys(CITY_COORDS).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                disabled={!manualCity}
                onClick={() => manualCity && loadCity(manualCity)}
                className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-card)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] enabled:hover:bg-[var(--surface-hover)] disabled:opacity-50 transition-all duration-[var(--duration-fast)]"
              >
                Load
              </button>
            </div>
          </div>
        </div>

        {res.error && (
          <div className={`mb-4 rounded-lg border px-4 py-3 text-sm transition-all duration-[var(--duration-normal)] animate-in fade-in slide-in-from-top-2 ${
            permissionState === 'denied' 
              ? 'border-danger-200 bg-danger-50 text-danger-800'
              : 'border-warning-200 bg-warning-50 text-warning-800'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-lg">
                {permissionState === 'denied' ? '🔒' : '⚠️'}
              </span>
              <div className="flex-1">
                <p className="font-medium">{res.error}</p>
                {permissionState === 'denied' && (
                  <p className="mt-1 text-xs opacity-90">
                    To enable location access: Click the location icon in your browser's address bar and select "Allow"
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {permissionState === 'unsupported' && !res.error && (
          <div className="mb-4 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 transition-all duration-[var(--duration-normal)] animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <span className="text-lg">ℹ️</span>
              <div className="flex-1">
                <p className="font-medium">Location services not available</p>
                <p className="mt-1 text-xs opacity-90">
                  Your browser doesn't support geolocation. Please select a city manually.
                </p>
              </div>
            </div>
          </div>
        )}

        {!res.city && !res.loading && (
          <div 
            ref={emptyStateRef}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--surface-border)] py-16 text-center bg-[var(--surface-card)] transition-all duration-700 ease-[var(--ease-out)] ${
              emptyStateVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <span className="text-5xl mb-3">
              {permissionState === 'denied' ? '🔒' : permissionState === 'unsupported' ? '🗺️' : '📍'}
            </span>
            <p className="text-sm font-medium text-[var(--foreground)]">
              {permissionState === 'denied' 
                ? 'Location access is blocked'
                : permissionState === 'unsupported'
                ? 'Location services unavailable'
                : 'Share your location to find nearby events'}
            </p>
            <p className="mt-1 text-xs text-[var(--foreground-muted)] max-w-md">
              {permissionState === 'denied'
                ? 'Enable location permissions in your browser settings to see events near you, or choose a city manually below'
                : permissionState === 'unsupported'
                ? 'Your browser doesn\'t support geolocation. Choose a city from the dropdown above'
                : 'Or choose a city from the dropdown'}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {permissionState !== 'denied' && permissionState !== 'unsupported' && (
                <button 
                  onClick={detect} 
                  className="rounded-xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-all duration-[var(--duration-fast)] hover:scale-105"
                >
                  Use my location
                </button>
              )}
              <Link 
                href="/explore" 
                className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all duration-[var(--duration-fast)]"
              >
                Browse all
              </Link>
            </div>
          </div>
        )}

        {res.city && (
          <div className="mb-4 flex items-center gap-2 text-sm text-[var(--foreground-muted)] animate-in fade-in slide-in-from-left-2 duration-500">
            {userLocation && (
              <span className="inline-flex items-center gap-1 rounded-full bg-success-100 px-2 py-0.5 text-xs font-medium text-success-700">
                <span className="h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse"></span>
                Using your location
              </span>
            )}
            <span>
              Showing events near <span className="font-semibold text-[var(--foreground)]">{res.city}</span>
              {typeof res.distanceKm === "number" && (
                <span className="text-[var(--foreground-subtle)]"> • ~{Math.round(res.distanceKm)} km away</span>
              )}
            </span>
            <div className="ml-auto flex items-center gap-1 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 text-xs font-medium rounded transition-all duration-[var(--duration-fast)] ${
                  viewMode === 'map'
                    ? 'bg-primary-600 text-white'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
                aria-label="Map view"
              >
                🗺️ Map
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-xs font-medium rounded transition-all duration-[var(--duration-fast)] ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
                aria-label="Grid view"
              >
                📋 List
              </button>
            </div>
          </div>
        )}

        {res.loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="h-56 animate-pulse rounded-xl bg-[var(--surface-card)] border border-[var(--surface-border)]"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        ) : res.city ? (
          res.events.length === 0 ? (
            <div 
              ref={emptyStateRef}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--surface-border)] py-16 text-center bg-[var(--surface-card)] transition-all duration-700 ease-[var(--ease-out)] ${
                emptyStateVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <span className="text-5xl mb-3">🗺️</span>
              <p className="text-sm font-medium text-[var(--foreground)]">No events found in this area</p>
              <p className="mt-1 text-xs text-[var(--foreground-muted)]">Try a nearby city</p>
            </div>
          ) : (
            <>
              {viewMode === 'map' && (
                <div 
                  ref={mapRef}
                  className={`mb-6 transition-all duration-700 ease-[var(--ease-out)] ${
                    mapVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <EventMap
                    events={res.events}
                    center={res.city in CITY_COORDS ? CITY_COORDS[res.city as keyof typeof CITY_COORDS] : undefined}
                    zoom={11}
                    onEventClick={handleEventClick}
                  />
                </div>
              )}
              
              <div ref={eventsGridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {res.events.map((e, index) => (
                  <div
                    key={e.id}
                    className={`transition-all duration-700 ease-[var(--ease-out)] ${
                      eventsVisible[index]
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <EventCard
                      id={e.id}
                      title={e.title}
                      description={e.description}
                      date={e.date}
                      city={e.city}
                      category={e.category}
                      image={e.image}
                      distanceKm={userLocation ? e.distanceKm : undefined}
                      distanceUnit={distanceUnit}
                    />
                  </div>
                ))}
              </div>
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
