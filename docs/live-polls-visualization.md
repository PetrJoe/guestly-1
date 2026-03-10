# Live Polls with Real-Time Results

## Overview

The PollPanel component provides an interactive polling experience for virtual and hybrid events with real-time vote tallies, chart visualizations, and animated vote updates.

## Features

### 1. Real-Time Vote Updates
- WebSocket integration for instant vote synchronization
- Animated transitions when votes are cast
- Visual feedback with ring animation and pulsing vote count
- No page refresh required

### 2. Dual Visualization Modes

#### Bar View (Default)
- Horizontal progress bars showing vote percentages
- Individual vote counts displayed after voting
- Interactive voting buttons
- Smooth width transitions with spring easing

#### Chart View
- Pie chart visualization using the PieChart component
- Interactive hover states showing percentages
- Gradient fills with brand colors
- Animated segment reveals

### 3. Vote Animations
- **Ring Animation**: Poll card gets a primary-colored ring when votes update
- **Pulse Effect**: Vote count pulses when new votes come in
- **Progress Bar Animation**: Smooth width transitions with cubic-bezier easing
- **Percentage Animation**: Percentage values pulse during updates
- **Duration**: 800ms animation cycle

### 4. User Experience Features
- View mode toggle button (bars ↔ chart)
- "You voted" confirmation indicator
- Sign-in prompt for unauthenticated users
- Disabled state for closed polls
- Vote count display per option (after voting)
- Closed poll indicator

## Component API

```typescript
interface PollPanelProps {
  eventId: string;
  userId?: string;
}
```

### Props
- `eventId` (required): The event ID to fetch polls for
- `userId` (optional): Current user ID for voting functionality

## Usage

```tsx
import PollPanel from "@/components/virtual/PollPanel";

<PollPanel 
  eventId="event-123" 
  userId={currentUser?.id} 
/>
```

## Real-Time Events

The component listens to three Socket.IO events:

1. **poll-created**: New poll added to the event
2. **poll-voted**: Vote cast on a poll (triggers animation)
3. **poll-closed**: Poll closed by organizer

## State Management

### Local State
- `polls`: Array of poll objects
- `votedPolls`: Set of poll IDs the user has voted on
- `viewMode`: Record mapping poll IDs to view mode ('bars' | 'chart')
- `animatingVotes`: Set of poll IDs currently animating
- `loading`: Loading state for initial fetch

### Animation Flow
1. Vote is cast (local or remote via WebSocket)
2. Poll ID added to `animatingVotes` set
3. Visual animations triggered (ring, pulse, progress bar)
4. After 800ms, poll ID removed from `animatingVotes`
5. Animations return to normal state

## Styling

### Animations
- **Ring**: `ring-2 ring-primary-500 ring-opacity-50`
- **Pulse**: `animate-pulse text-primary-500`
- **Progress Bar**: Custom cubic-bezier easing `cubic-bezier(0.34, 1.56, 0.64, 1)`

### View Toggle Button
- Icon-based toggle with SVG icons
- Hover states for better UX
- Tooltip text on hover

### Chart Integration
- Uses existing PieChart component
- 240px size for optimal mobile/desktop display
- Gradient and animation enabled by default

## Accessibility

- Semantic button elements for voting
- Disabled states properly communicated
- Keyboard accessible view toggle
- Screen reader friendly vote counts
- Visual feedback for all interactions

## Performance Considerations

- Animations use CSS transitions (GPU accelerated)
- WebSocket listeners cleaned up on unmount
- Optimistic UI updates for instant feedback
- Efficient state updates with functional setState

## Requirements Satisfied

**Requirement 13.4**: THE Live_Event SHALL support polls with real-time vote tallies and result visualization

✅ Real-time vote tallies via WebSocket
✅ Result visualization with bar and chart views
✅ Animated vote updates
✅ Live synchronization across all connected clients

## Future Enhancements

- Multiple choice polls (select multiple options)
- Poll results export
- Anonymous vs. identified voting modes
- Poll scheduling (auto-open/close)
- Vote history and analytics
- Custom color schemes per poll
