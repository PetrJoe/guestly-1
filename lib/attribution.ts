// Client-side Attribution Tracking
// Handles UTM parameter parsing and attribution data persistence

export interface AttributionData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landingPage?: string;
  timestamp: number;
}

const ATTRIBUTION_KEY = 'guestly_attribution';
const ATTRIBUTION_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Parse UTM parameters from URL
 */
export function parseUTMParameters(url: string = window.location.href): AttributionData | null {
  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;

    const hasUTM = params.has('utm_source') || params.has('utm_medium') || params.has('utm_campaign');

    if (!hasUTM && !document.referrer) {
      return null;
    }

    return {
      source: params.get('utm_source') || undefined,
      medium: params.get('utm_medium') || undefined,
      campaign: params.get('utm_campaign') || undefined,
      term: params.get('utm_term') || undefined,
      content: params.get('utm_content') || undefined,
      referrer: document.referrer || undefined,
      landingPage: urlObj.pathname,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('[Attribution] Failed to parse UTM parameters:', error);
    return null;
  }
}

/**
 * Save attribution data to localStorage
 */
export function saveAttributionData(data: AttributionData): void {
  try {
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
    console.log('[Attribution] Saved attribution data:', data);
  } catch (error) {
    console.error('[Attribution] Failed to save attribution data:', error);
  }
}

/**
 * Get attribution data from localStorage
 */
export function getAttributionData(): AttributionData | null {
  try {
    const stored = localStorage.getItem(ATTRIBUTION_KEY);
    
    if (!stored) {
      return null;
    }

    const data: AttributionData = JSON.parse(stored);

    // Check if expired
    if (Date.now() - data.timestamp > ATTRIBUTION_EXPIRY) {
      clearAttributionData();
      return null;
    }

    return data;
  } catch (error) {
    console.error('[Attribution] Failed to get attribution data:', error);
    return null;
  }
}

/**
 * Clear attribution data from localStorage
 */
export function clearAttributionData(): void {
  try {
    localStorage.removeItem(ATTRIBUTION_KEY);
    console.log('[Attribution] Cleared attribution data');
  } catch (error) {
    console.error('[Attribution] Failed to clear attribution data:', error);
  }
}

/**
 * Track page view with attribution
 */
export function trackPageView(): void {
  const attribution = parseUTMParameters();
  
  if (attribution) {
    // Only save if we have new attribution data
    saveAttributionData(attribution);
  }
}

/**
 * Get attribution data for order
 */
export function getAttributionForOrder(): AttributionData | null {
  return getAttributionData();
}

/**
 * Initialize attribution tracking
 */
export function initializeAttribution(): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Track initial page view
  trackPageView();

  console.log('[Attribution] Attribution tracking initialized');
}
