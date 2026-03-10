# Real-Time Discussion Updates

## Overview

The discussion board now supports real-time updates using Socket.IO, allowing users to see new threads and replies instantly without refreshing the page. This implementation also includes typing indicators to show when other users are composing messages.

## Features Implemented

### 1. Live Thread Updates
- New discussion threads appear instantly for all users viewing the discussion board
- No page refresh required to see new conversations

### 2. Live Reply Updates
- Replies to threads appear in real-time for all users viewing that thread
- Reply counts update automatically in the thread list
- Nested replies are supported with real-time updates

### 3. Typing Indicators
- Shows when other users are typing a reply
- Displays user names of people currently typing
- Automatically clears after 3 seconds of inactivity
- Visual animation with bouncing dots

### 4. User Presence
- Users automatically join the discussion room when viewing the board
- Clean disconnect handling when users leave

## Technical Implementation

### Server-Side (server.js)

Added Socket.IO event handlers for discussions:

```javascript
// Join discussion room
socket.on("join-discussion", (data) => {
  const { eventId, userId, userName } = data;
  const roomId = `discussion-${eventId}`;
  socket.join(roomId);
  socket.to(roomId).emit("user-joined-discussion", { userId, userName });
});

// New thread created
socket.on("discussion-thread-created", (data) => {
  const { eventId, thread } = data;
  const roomId = `discussion-${eventId}`;
  io.to(roomId).emit("discussion-thread-created", { thread });
});

// New reply created
socket.on("discussion-reply-created", (data) => {
  const { eventId, threadId, reply } = data;
  const roomId = `discussion-${eventId}`;
  io.to(roomId).emit("discussion-reply-created", { threadId, reply });
});

// Typing indicator
socket.on("discussion-typing", (data) => {
  const { eventId, threadId, userId, userName, isTyping } = data;
  const roomId = `discussion-${eventId}`;
  socket.to(roomId).emit("discussion-typing", {
    threadId, userId, userName, isTyping
  });
});
```

### Client-Side Helper (lib/websocket.ts)

Added TypeScript types and helper functions:

```typescript
// Types
export interface DiscussionThread { ... }
export interface DiscussionReply { ... }
export interface DiscussionThreadCreatedEvent { ... }
export interface DiscussionReplyCreatedEvent { ... }
export interface DiscussionTypingEvent { ... }

// Helper functions
export function joinDiscussion(eventId, userId, userName)
export function leaveDiscussion(eventId, userId)
export function emitDiscussionThreadCreated(eventId, thread)
export function emitDiscussionReplyCreated(eventId, threadId, reply)
export function emitDiscussionTyping(eventId, threadId, userId, userName, isTyping)
```

### Component (components/events/DiscussionBoard.tsx)

Enhanced the DiscussionBoard component with:

1. **Socket.IO Connection**: Automatically connects and joins discussion room on mount
2. **Event Listeners**: Listens for thread creation, reply creation, and typing events
3. **State Management**: Updates local state when real-time events are received
4. **Typing Handler**: Emits typing events with debouncing (2-second timeout)
5. **Cleanup**: Properly disconnects and removes listeners on unmount

Key implementation details:

```typescript
// Join discussion room on mount
React.useEffect(() => {
  const socket = getSocket();
  const userInfo = getUserInfo();
  
  if (!userInfo) return;
  
  joinDiscussion(eventId, userInfo.userId, userInfo.userName);
  
  // Listen for events
  socket.on("discussion-thread-created", handleThreadCreated);
  socket.on("discussion-reply-created", handleReplyCreated);
  socket.on("discussion-typing", handleTyping);
  
  // Cleanup
  return () => {
    socket.off("discussion-thread-created", handleThreadCreated);
    socket.off("discussion-reply-created", handleReplyCreated);
    socket.off("discussion-typing", handleTyping);
    leaveDiscussion(eventId, userInfo.userId);
  };
}, [eventId, selectedThread?.id]);

// Emit events after successful API calls
const handleCreateThread = async (e) => {
  // ... API call ...
  if (data.success) {
    emitDiscussionThreadCreated(eventId, data.data);
    // ... update UI ...
  }
};

const handleAddReply = async (e) => {
  // ... API call ...
  if (data.success) {
    emitDiscussionReplyCreated(eventId, selectedThread.id, data.data);
    // ... update UI ...
  }
};

// Handle typing with debouncing
const handleTypingChange = (value) => {
  setReplyContent(value);
  
  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }
  
  emitDiscussionTyping(eventId, selectedThread?.id, userId, userName, true);
  
  typingTimeoutRef.current = setTimeout(() => {
    emitDiscussionTyping(eventId, selectedThread?.id, userId, userName, false);
  }, 2000);
};
```

## User Experience

### Typing Indicators
When a user types a reply, other users see:
```
● ● ● Alice, Bob are typing...
```

The indicator includes:
- Animated bouncing dots
- Names of users currently typing
- Automatic clearing after 3 seconds

### Real-Time Updates
- New threads appear at the top of the list instantly
- Reply counts increment in real-time
- Replies appear in the thread view without refresh
- Smooth animations for new content

## Architecture Notes

### Event Flow

1. **Thread Creation**:
   - User submits form → API creates thread → Client emits Socket.IO event → All connected clients receive event → UI updates

2. **Reply Creation**:
   - User submits reply → API creates reply → Client emits Socket.IO event → All connected clients receive event → UI updates

3. **Typing Indicator**:
   - User types → Client emits typing event → Other clients receive event → Typing indicator shows → Auto-clears after timeout

### Room Structure

Each event has its own discussion room: `discussion-${eventId}`

This ensures:
- Users only receive updates for discussions they're viewing
- Efficient message routing
- Clean separation between different events

### Performance Considerations

1. **Debouncing**: Typing events are debounced to avoid excessive Socket.IO traffic
2. **Auto-cleanup**: Typing indicators auto-clear after 3 seconds
3. **Selective Updates**: Only users in the same discussion room receive updates
4. **Efficient State**: Uses React state updates to minimize re-renders

## Testing

To test the real-time features:

1. Open the same event discussion in two browser windows
2. Create a thread in one window → Should appear instantly in the other
3. Add a reply in one window → Should appear instantly in the other
4. Start typing in one window → Typing indicator should show in the other
5. Stop typing → Indicator should disappear after 3 seconds

## Future Enhancements

Potential improvements:
- User avatars in typing indicators
- Read receipts for messages
- Online user count
- Notification sounds for new messages
- Message reactions in real-time
- Thread pinning/unpinning in real-time
- Moderation actions (delete, hide) in real-time

## Requirements Satisfied

This implementation satisfies **Requirement 13.2** from the spec:
- ✅ Use Socket.IO for live updates
- ✅ Show new messages without refresh
- ✅ Add typing indicators
