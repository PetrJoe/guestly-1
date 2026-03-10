# Reaction System

## Overview

The reaction system allows users to express emotions and feedback using emoji reactions (👏, ❤️, 🔥, 🎉, 👍) on live events and discussion threads. The system features animated feedback, real-time updates via Socket.IO, and reaction count displays.

## Features

### 1. Animated Reaction Feedback

- **Floating Animations**: When a user clicks a reaction, the emoji floats upward with rotation and scaling effects
- **Bounce Effect**: The clicked reaction button bounces to provide immediate tactile feedback
- **Ripple Effect**: A ripple animation emanates from the clicked button
- **Pulse Animation**: The emoji itself pulses when clicked

### 2. Reaction Counts Display

- Counts are displayed below each reaction emoji
- Counts update in real-time when other users react
- The count animates and changes color when incremented
- Only shows counts greater than 0 to keep the UI clean

### 3. Real-Time Updates

- Uses Socket.IO for instant reaction propagation
- All users viewing the same event/discussion see reactions in real-time
- Optimistic UI updates for immediate feedback
- Automatic rollback on API errors

### 4. Integration Points

#### Live Events
- Virtual event pages (`/events/[id]/stream`)
- Event lobby pages
- Used in `StreamEmbed` and virtual event components

#### Discussions
- Discussion threads in event pages
- Each thread has its own reaction bar
- Reactions are scoped to `discussion-{threadId}`

## Component API

### ReactionBar

```tsx
<ReactionBar 
  eventId={string}           // Event or discussion ID
  userId={string}            // Current user ID (optional)
  variant="default|compact"  // Visual variant (default: 'default')
  showLabel={boolean}        // Show "Sign in to react" label (default: true)
/>
```

**Variants:**
- `default`: Full-size reactions (text-2xl) with standard padding
- `compact`: Smaller reactions (text-xl) with reduced padding, ideal for inline use

## Technical Implementation

### Data Flow

1. User clicks reaction button
2. Optimistic UI update (count increments immediately)
3. POST request to `/api/events/[id]/reactions`
4. Socket.IO event emitted to all connected clients
5. All clients receive real-time update and show floating animation

### API Endpoints

**GET** `/api/events/[id]/reactions?type=counts`
- Returns reaction counts for an event
- Response: `{ success: true, data: { '👏': 5, '❤️': 3, ... } }`

**POST** `/api/events/[id]/reactions`
- Adds a reaction to an event
- Body: `{ type: '👏' | '❤️' | '🔥' | '🎉' | '👍' }`
- Response: `{ success: true, data: Reaction }`

### Socket.IO Events

**Emit:** `reaction`
```typescript
socket.emit("reaction", {
  eventId: string,
  reaction: Reaction
});
```

**Listen:** `reaction`
```typescript
socket.on("reaction", (data: ReactionEvent) => {
  // Update UI with new reaction
});
```

## Styling

The component uses CSS-in-JS for animations to ensure they work consistently:

- `float-up`: 2s animation with translateY, scale, and rotation
- `bounce-scale`: 0.3s bounce effect on click
- `ripple`: 0.6s expanding circle effect

All animations use `ease-out` timing for natural feel.

## Usage Examples

### Live Event Stream
```tsx
<ReactionBar 
  eventId={event.id}
  userId={currentUser?.id}
/>
```

### Discussion Thread (Compact)
```tsx
<ReactionBar 
  eventId={`discussion-${thread.id}`}
  userId={currentUser?.id}
  variant="compact"
  showLabel={false}
/>
```

### Anonymous Users
When `userId` is not provided:
- Buttons are disabled
- Shows "Sign in to react" message
- Alert shown on click attempt

## Future Enhancements

- Custom reaction types per event
- Reaction history/timeline
- User-specific reaction tracking (who reacted with what)
- Reaction leaderboards
- Animated reaction bursts for milestones (100th reaction, etc.)
