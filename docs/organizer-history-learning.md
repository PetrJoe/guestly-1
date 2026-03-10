# Organizer History Learning System

## Overview

The Organizer History Learning system tracks an organizer's past event performance and uses this data to personalize analytics insights and recommendations. This implements Requirement 11.10: "The Analytics_Engine SHALL learn from organizer's event history to improve recommendations."

## Features

### 1. Event-Organizer Tracking

When an organizer publishes an event via `publishEventFromDraft()`, the system automatically tracks the relationship between the event and the organizer:

```typescript
// Stored in eventOrganizers mapping
eventOrganizers[eventId] = organizerId;
```

### 2. Event Completion Recording

When an event finishes, call `recordEventCompletion(eventId)` to add it to the organizer's history:

```typescript
POST /api/events/[id]/complete
```

This records:
- Event ID and organizer ID
- Category and city
- Tickets sold and revenue
- Average ticket price
- Conversion rate and attendance rate
- Completion timestamp

### 3. Performance Pattern Analysis

The system automatically calculates performance patterns including:

- **Total events hosted**
- **Categories and cities breakdown** - Which categories/cities the organizer has experience in
- **Average metrics** - Attendance, revenue, ticket price across all events
- **Best performing segments** - Which category and city generate the most revenue
- **Typical price range** - 25th to 75th percentile of historical pricing
- **Growth trend** - Whether performance is improving, stable, or declining

### 4. Personalized Insights

The system generates personalized insights based on organizer history:

#### Category Performance Insight
Compares current event to organizer's past events in the same category:
- "Based on your X previous Music events, you typically attract Y attendees..."
- Highlights if this is their best-performing category

#### City Performance Insight
Analyzes organizer's track record in the event's city:
- "You've hosted X events in Lagos with an average of Y attendees..."
- Suggests expanding to better-performing cities

#### Pricing Recommendations
Compares current pricing to organizer's typical range:
- Alerts if pricing is below their typical range
- Warns if premium pricing might impact sales velocity

#### Growth Trend Insights
- **Improving**: Celebrates positive momentum and encourages consistency
- **Declining**: Suggests reviewing successful past events and refreshing strategy

#### Experience-Based Predictions
For organizers with 5+ events and 2+ similar events:
- Higher confidence predictions based on their specific track record
- "You've successfully hosted X similar events, expect Y attendees..."

## API Endpoints

### Get Organizer History
```typescript
GET /api/organizer/history

Response:
{
  success: true,
  data: {
    history: OrganizerEventHistory[],
    pattern: OrganizerPerformancePattern,
    eventIds: string[]
  }
}
```

### Complete Event
```typescript
POST /api/events/[id]/complete

Response:
{
  success: true,
  data: OrganizerEventHistory
}
```

### Get Enhanced Insights
```typescript
GET /api/events/[id]/insights

// Automatically includes personalized insights if organizer has history
Response:
{
  success: true,
  data: EventInsight[] // Includes both standard and personalized insights
}
```

## Data Models

### OrganizerEventHistory
```typescript
{
  eventId: string;
  organizerId: string;
  category: string;
  city: string;
  eventDate: string;
  ticketsSold: number;
  revenue: number;
  averageTicketPrice: number;
  conversionRate: number;
  attendanceRate?: number;
  completedAt: number;
}
```

### OrganizerPerformancePattern
```typescript
{
  organizerId: string;
  totalEvents: number;
  categoriesHosted: Record<string, number>;
  citiesHosted: Record<string, number>;
  averageAttendance: number;
  averageRevenue: number;
  averageTicketPrice: number;
  bestPerformingCategory: string;
  bestPerformingCity: string;
  typicalPriceRange: { low: number; high: number };
  growthTrend: 'improving' | 'stable' | 'declining';
  lastUpdated: number;
}
```

## Usage Flow

1. **Event Creation**: Organizer creates and publishes event → System tracks organizer-event relationship
2. **Event Runs**: Organizer promotes and sells tickets → Standard analytics track performance
3. **Event Completes**: Call `/api/events/[id]/complete` → System records to history and updates pattern
4. **Future Events**: When organizer creates new events → System provides personalized insights based on history
5. **Continuous Learning**: Each completed event improves the quality of future recommendations

## Benefits

- **Personalized Recommendations**: Insights tailored to each organizer's specific track record
- **Higher Confidence**: Predictions based on organizer's actual performance, not just market averages
- **Pattern Recognition**: Identifies what works best for each organizer (categories, cities, pricing)
- **Growth Tracking**: Monitors improvement over time and alerts to declining performance
- **Experience Leverage**: Experienced organizers get better predictions and recommendations

## Implementation Notes

- History is stored in-memory (resets on server restart)
- Minimum 2 events required for meaningful patterns
- Personalized insights have higher confidence than generic benchmarks
- System automatically merges personalized insights with standard insights
- Growth trend requires at least 3 events to calculate
