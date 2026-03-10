# Time-Based Filtering Implementation

## Overview

This document describes the implementation of time-based filtering for events on the Guestly platform, allowing users to filter events by predefined time periods (today, this weekend, this month) or custom date ranges.

## Components

### TimeFilter Component

**Location:** `components/events/TimeFilter.tsx`

A reusable filter component that provides:
- Quick filter buttons for common time periods
- Custom date range picker using the existing DatePicker component
- Smooth animations for showing/hiding the custom range section

**Props:**
```typescript
interface TimeFilterProps {
  value?: TimeFilterValue; // "all" | "today" | "this-weekend" | "this-month" | "custom"
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (value: TimeFilterValue, startDate?: Date | null, endDate?: Date | null) => void;
  className?: string;
}
```

**Features:**
- Calculates date ranges automatically for quick filters
- Weekend calculation: finds next Saturday and Sunday
- Month calculation: first day to last day of current month
- Visual feedback with active state styling
- Expandable custom date range section

## API Updates

### filterEvents Function

**Location:** `lib/events.ts`

Updated to support date filtering:
```typescript
export function filterEvents(params: {
  // ... existing params
  startDate?: string;
  endDate?: string;
  // ...
})
```

**Behavior:**
- Filters events where event date falls within the specified range
- Sorts results chronologically (earliest first) when date filters are applied
- Handles both start and end dates independently

### API Routes

**Updated Routes:**
1. `GET /api/events` - Main events listing
2. `GET /api/cities/[city]/events` - City-specific events

Both routes now accept `startDate` and `endDate` query parameters in ISO format.

## Page Integration

### Explore Page

**Location:** `app/(public)/explore/page.tsx`

Added time filtering alongside existing filters:
- State management for time filter value and date range
- Integrated TimeFilter component in the filters section
- Updates URL params and refetches events on filter change
- Shows active time filter in the filter chips

### City Page

**Location:** `app/(public)/cities/[city]/page.tsx`

Similar integration with city-specific context:
- Time filter displayed in a card below community filters
- Automatically refetches city events when dates change
- Works seamlessly with category and community filters

## User Experience

### Quick Filters

1. **All Dates** - Shows all upcoming events (default)
2. **Today** - Events happening today only
3. **This Weekend** - Events on the upcoming Saturday and Sunday
4. **This Month** - Events in the current calendar month
5. **Custom Range** - User-defined start and end dates

### Visual Design

- Quick filter buttons with emoji icons for visual appeal
- Active filter highlighted with primary color and elevation
- Smooth slide-down animation for custom date range section
- Clear button to reset custom dates
- Active filter chips show selected time period

## Technical Details

### Date Calculations

**Today:**
```typescript
start: new Date(today)
end: new Date(today at 23:59:59)
```

**This Weekend:**
```typescript
// Find next Saturday
const daysUntilSaturday = dayOfWeek === 6 ? 0 : dayOfWeek === 0 ? 6 : 6 - dayOfWeek;
start: Saturday at 00:00:00
end: Sunday at 23:59:59
```

**This Month:**
```typescript
start: First day of current month
end: Last day of current month at 23:59:59
```

### Chronological Sorting

When date filters are active, events are automatically sorted chronologically (earliest first) to provide a natural browsing experience for time-based queries.

## Future Enhancements

Potential improvements for future iterations:

1. **Relative Time Filters**
   - Next 7 days
   - Next 30 days
   - This quarter

2. **Time of Day Filtering**
   - Morning events
   - Evening events
   - Late night events

3. **Recurring Events**
   - Filter by day of week
   - Monthly recurring events

4. **Calendar View**
   - Visual calendar with event markers
   - Click dates to filter

5. **Saved Filters**
   - Save favorite filter combinations
   - Quick access to saved searches

## Testing

To test the implementation:

1. Navigate to `/explore` or `/cities/Lagos`
2. Click on different time filter buttons
3. Select "Custom Range" and choose dates
4. Verify events are filtered correctly
5. Check that filters work with other filters (category, community)
6. Verify active filter chips display correctly

## Requirements Satisfied

This implementation satisfies **Requirement 12.10**:
- ✅ Filters for today, this weekend, this month
- ✅ Shows upcoming events chronologically
- ✅ Date range picker for custom ranges
- ✅ Integrated into discovery system
