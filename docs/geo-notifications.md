# Geo-Targeted Push Notifications

## Overview

The geo-targeted notification system detects user location and sends notifications for nearby events based on user preferences. The system respects user notification settings and provides a seamless experience for discovering local events.

## Architecture

### Components

1. **useGeoNotifications Hook** (`hooks/useGeoNotifications.ts`)
   - Detects user location using browser Geolocation API
   - Updates location periodically (default: 30 minutes)
   - Checks notification preferences before requesting location
   - Triggers notification creation for nearby events

2. **GeoNotificationBell Component** (`components/notifications/GeoNotificationBell.tsx`)
   - Displays notification bell icon in TopNav
   - Shows unread notification count badge
   - Dropdown with list of nearby event notifications
   - Allows dismissing individual notifications

3. **NotificationPreferences Component** (`components/notifications/NotificationPreferences.tsx`)
   - Enable/disable geo-notifications
   - Set notification radius (1-100 km)
   - Filter by event categories
   - Filter by price range

### Data Models

```typescript
// User location
type UserLocation = {
  userId: string;
  latitude: number;
  longitude: number;
  city: string;
  lastUpdated: number;
};

// Notification preferences
type NotificationPreferences = {
  userId: string;
  geoNotificationsEnabled: boolean;
  notificationRadius: number; // in kilometers
  categories: string[]; // Event categories to receive notifications for
  minPrice?: number;
  maxPrice?: number;
  updatedAt: number;
};

// Geo notification
type GeoNotification = {
  id: string;
  userId: string;
  eventId: string;
  title: string;
  message: string;
  distance: number; // in kilometers
  sent: boolean;
  sentAt?: number;
  createdAt: number;
};
```

### API Routes

1. **POST /api/notifications/location**
   - Updates user location
   - Triggers notification check for nearby events
   - Returns number of notifications created

2. **GET /api/notifications/geo**
   - Retrieves geo-notifications for authenticated user
   - Query param: `unsentOnly=true` to get only unsent notifications

3. **PATCH /api/notifications/geo/[id]**
   - Marks a notification as sent (viewed)

4. **GET /api/notifications/preferences**
   - Retrieves notification preferences for authenticated user

5. **PUT /api/notifications/preferences**
   - Updates notification preferences

6. **GET /api/notifications/nearby-events**
   - Returns nearby events based on user location and preferences

## How It Works

### 1. Location Detection

When a user logs in, the `useGeoNotifications` hook is activated in the TopNav component:

```typescript
// In TopNav.tsx
useGeoNotifications({ enabled: !!role });
```

The hook:
- Checks if geo-notifications are enabled in user preferences
- Requests browser geolocation permission
- Detects user's city based on coordinates
- Sends location to backend via POST /api/notifications/location
- Repeats every 30 minutes (configurable)

### 2. Notification Creation

When location is updated, the backend:
- Retrieves all upcoming events with location data
- Calculates distance using Haversine formula
- Filters events based on:
  - Notification radius (default 10km)
  - Category preferences
  - Price range preferences
- Creates notifications for events within range
- Skips events already notified

### 3. Notification Display

The GeoNotificationBell component:
- Polls for new notifications every 5 minutes
- Shows badge with unread count
- Displays dropdown with notification list
- Links to event detail page
- Allows dismissing notifications

### 4. User Preferences

Users can customize notifications via `/attendee/notifications`:
- Toggle geo-notifications on/off
- Set notification radius (1-100 km)
- Select specific event categories
- Set price range filters

## Distance Calculation

The system uses the Haversine formula to calculate distances between coordinates:

```typescript
function calculateDistance(lat1, lon1, lat2, lon2) {
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
```

## Privacy & Permissions

- Location permission is requested only when user is logged in
- Users can disable geo-notifications at any time
- Location data is stored in-memory (resets on server restart)
- No location tracking - only current location is stored
- Location is cached for 5 minutes in browser

## Testing

To test the geo-notification system:

1. **Login as an attendee**
   - Navigate to `/login`
   - Login with any credentials

2. **Grant location permission**
   - Browser will prompt for location access
   - Allow location access

3. **Check notifications**
   - Click the bell icon in TopNav
   - View nearby event notifications

4. **Customize preferences**
   - Navigate to `/attendee/notifications`
   - Click "Settings" tab
   - Adjust radius, categories, and price filters

5. **Test with different locations**
   - Use browser dev tools to mock different locations
   - Chrome: Dev Tools > Sensors > Location
   - Set custom coordinates for different cities

## Future Enhancements

- Push notifications via service workers
- Email notifications for nearby events
- SMS notifications (opt-in)
- Notification scheduling (e.g., only during certain hours)
- Smart notification timing (based on user activity patterns)
- Notification grouping (daily digest)
- Location history and favorite locations
