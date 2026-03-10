# Trending Events by City

## Overview

The trending events feature calculates and displays the hottest events in each city based on real-time engagement metrics. Events are ranked by a trending score that combines views, saves, and recent ticket sales.

## Trending Score Algorithm

The trending score is calculated in `lib/store.ts` within the `getCityStats()` function:

```typescript
const viewScore = metrics.views * 1;
const saveScore = metrics.saves * 5;
const recentSalesScore = recentOrders.length * 10;
const trendingScore = viewScore + saveScore + recentSalesScore;
```

### Weighting:
- **Views**: 1 point per view
- **Saves**: 5 points per save (indicates higher intent)
- **Recent Sales**: 10 points per ticket sale in the last 7 days (strongest signal)

This weighting prioritizes events with actual ticket sales while still considering engagement metrics.

## Real-Time Updates

### Cache Strategy
- City statistics are cached for 5 minutes to balance performance and freshness
- Cache is automatically cleared when:
  - An order is paid (ticket sale)
  - An event is saved by a user
  - Event views are tracked

### Client-Side Polling
The city page polls for updated statistics every 30 seconds:
- Displays a subtle spinner during refresh
- Shows "Updates every 30s" in the section description
- Non-blocking updates that don't interrupt user interaction

## API Endpoints

### GET `/api/cities/[city]/stats`
Returns city statistics including trending events:
```json
{
  "success": true,
  "data": {
    "city": "Lagos",
    "totalEvents": 45,
    "upcomingEvents": 23,
    "totalAttendees": 1250,
    "popularCategories": [...],
    "trendingEvents": ["event-id-1", "event-id-2", "event-id-3"]
  }
}
```

### POST `/api/events/[id]/view`
Tracks an event view and updates trending calculations:
- Increments view count for the event
- Clears city cache to trigger recalculation
- Returns success status

### POST `/api/events/save`
Tracks when a user saves an event:
- Increments save count for the event
- Clears city cache to trigger recalculation
- Returns success status

### POST `/api/orders/pay`
Processes ticket payments:
- Updates event sales metrics
- Clears city cache to trigger recalculation
- Returns payment confirmation

## UI Components

### City Page Trending Section
Located in `app/(public)/cities/[city]/page.tsx`:
- Displays top 3 trending events prominently
- Shows only when no filters are active
- Includes visual separator from other events
- Real-time refresh indicator

### EventCard Trending Badge
Located in `components/events/EventCard.tsx`:
- Adds `isTrending` prop to highlight trending events
- Displays animated "🔥 Trending" badge
- Uses danger color variant with pulse animation

## Event Metrics Tracking

Event metrics are stored in `lib/store.ts`:

```typescript
export type EventMetrics = {
  eventId: string;
  views: number;
  saves: number;
  ticketsSold: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  refundRate: number;
  attendanceRate?: number;
  satisfactionScore?: number;
};
```

### Tracking Functions:
- `incrementEventViews(eventId)` - Called when event is viewed
- `incrementEventSaves(eventId)` - Called when event is saved
- `updateEventSalesMetrics(eventId, total, count)` - Called on ticket purchase

## Performance Considerations

1. **Caching**: 5-minute cache reduces database/calculation load
2. **Selective Clearing**: Only clears cache for affected city
3. **Top N Only**: Only calculates and displays top 3-5 trending events
4. **Efficient Scoring**: Simple arithmetic operations, no complex queries
5. **Client Polling**: 30-second interval balances freshness and server load

## Future Enhancements

Potential improvements for the trending system:

1. **Time Decay**: Reduce weight of older views/saves
2. **Category-Specific Trending**: Show trending events per category
3. **Personalized Trending**: Factor in user preferences
4. **Velocity Tracking**: Detect rapidly rising events
5. **WebSocket Updates**: Push updates instead of polling
6. **A/B Testing**: Experiment with different scoring weights
7. **Trending History**: Track how long events stay trending

## Testing

To test the trending events feature:

1. **View Events**: Navigate to event cards to increment views
2. **Save Events**: Click save button to increment saves
3. **Purchase Tickets**: Complete checkout to add sales
4. **Check City Page**: Visit `/cities/Lagos` to see trending section
5. **Wait for Update**: Observe 30-second polling refresh
6. **Verify Ranking**: Events with more engagement should rank higher

## Monitoring

Key metrics to monitor:

- Cache hit rate for city stats
- Trending calculation performance
- Client polling frequency
- User engagement with trending events
- Conversion rate for trending vs non-trending events
