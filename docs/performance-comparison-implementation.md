# Event Performance Comparison Implementation

## Overview

Implemented task 12.8: Event performance comparison functionality that compares event metrics against benchmark data for similar events in the same city and category.

## Implementation Details

### 1. Data Type (`lib/store.ts`)

Added `PerformanceComparison` type that includes:
- Event metrics (tickets sold, revenue, conversion rate, AOV, sales velocity)
- Benchmark averages from similar events
- Percentile rankings (0-100 for each metric)
- Overall ranking (top_10, top_25, above_average, average, below_average)
- Areas for improvement with severity levels and recommendations
- Event strengths

### 2. Core Function (`lib/store.ts`)

**Function**: `generatePerformanceComparison(eventId: string): PerformanceComparison | null`

**Features**:
- Compares event against similar events in same city/category
- Calculates percentile rankings for 5 key metrics
- Identifies areas for improvement in:
  - Pricing (average order value)
  - Conversion rate
  - Sales velocity (promotion effectiveness)
  - Event timing
- Provides actionable recommendations with impact estimates
- Highlights event strengths

**Algorithm**:
1. Retrieves event metrics and benchmark data
2. Finds similar events (same category + city)
3. Calculates sales velocity (tickets/day)
4. Computes percentiles by comparing against similar events
5. Determines overall ranking based on average percentile
6. Analyzes performance gaps and generates recommendations
7. Identifies strengths (metrics in top 25%)

### 3. API Route

**Endpoint**: `GET /api/events/[id]/performance-comparison`

**Response Format**:
```json
{
  "success": true,
  "data": {
    "eventId": "evt-1",
    "eventName": "Tech Summit 2026",
    "category": "Tech",
    "city": "Lagos",
    "metrics": {
      "ticketsSold": 150,
      "revenue": 450000,
      "conversionRate": 3.2,
      "averageOrderValue": 3000,
      "salesVelocity": 5.0
    },
    "benchmarks": {
      "averageTicketsSold": 140,
      "averageRevenue": 600000,
      "averageConversionRate": 2.5,
      "averageOrderValue": 3000,
      "averageSalesVelocity": 4.67
    },
    "percentiles": {
      "ticketsSold": 65,
      "revenue": 45,
      "conversionRate": 78,
      "averageOrderValue": 50,
      "salesVelocity": 72
    },
    "ranking": "above_average",
    "areasForImprovement": [
      {
        "area": "pricing",
        "severity": "medium",
        "recommendation": "Consider offering ticket bundles...",
        "impact": "Increasing AOV by 20% could generate..."
      }
    ],
    "strengths": [
      "Excellent conversion rate - converting visitors to buyers better than 78% of similar events",
      "Fast sales velocity - selling tickets faster than 72% of similar events"
    ]
  }
}
```

## Key Features

### Percentile Calculation
- Compares event against all similar events in same city/category
- Calculates percentile rank (0-100) for each metric
- Uses sorted array approach for accurate percentile positioning

### Ranking System
- **Top 10%**: Average percentile ≥ 90
- **Top 25%**: Average percentile ≥ 75
- **Above Average**: Average percentile ≥ 55
- **Average**: Average percentile 45-54
- **Below Average**: Average percentile < 45

### Improvement Areas

1. **Pricing** (High/Medium severity)
   - Triggered when AOV < 80% of benchmark
   - Recommends bundles and premium tiers
   - Calculates potential revenue impact

2. **Conversion** (High/Medium severity)
   - Triggered when conversion < 70% or 90% of benchmark
   - Suggests page improvements and social proof
   - Estimates additional ticket sales

3. **Promotion** (High/Medium severity)
   - Triggered when sales velocity < 70% or 90% of benchmark
   - Recommends marketing campaigns
   - Projects additional sales potential

4. **Timing** (Low severity)
   - Compares event day/time to benchmark optimal timing
   - Suggests consideration for future events
   - Notes 15-25% attendance impact

### Strengths Identification
- Automatically identifies metrics in top 25%
- Provides positive reinforcement
- Helps organizers understand what's working well

## Integration Points

### Existing Systems
- Uses existing `EventMetrics` from metrics tracking
- Leverages `BenchmarkData` seeded in store
- Integrates with event data from `lib/events.ts`

### Potential UI Integration
- Can be displayed in organizer dashboard analytics tab
- Could be shown as insight cards
- Useful for event performance reports

## Technical Notes

- No database required (uses in-memory store)
- Follows existing patterns in `lib/store.ts`
- Type-safe with TypeScript strict mode
- Returns null if event, metrics, or benchmark data unavailable
- Handles edge cases (no similar events, division by zero)

## Usage Example

```typescript
import { generatePerformanceComparison } from '@/lib/store';

const comparison = generatePerformanceComparison('evt-1');
if (comparison) {
  console.log(`Ranking: ${comparison.ranking}`);
  console.log(`Areas to improve: ${comparison.areasForImprovement.length}`);
  console.log(`Strengths: ${comparison.strengths.length}`);
}
```

## Requirements Satisfied

✅ Requirement 11.7: Compare event performance against similar events
✅ Show percentile ranking for key metrics
✅ Identify specific areas for improvement (pricing, promotion, timing, conversion)
✅ Provide actionable recommendations with impact estimates
✅ Accessible via API route for integration into analytics dashboard
