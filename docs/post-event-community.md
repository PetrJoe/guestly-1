# Post-Event Community Access

## Overview

The post-event community access feature ensures that event discussions and community engagement remain active after an event has concluded. This allows attendees to share memories, photos, reflections, and continue connecting with fellow participants.

## Implementation

### Event Type Extension

Added `postEventCommunityAccess` field to the `Event` type in `lib/events.ts`:

```typescript
export type Event = {
  // ... other fields
  postEventCommunityAccess?: boolean; // Keep discussion board active after event (default: true)
};
```

By default, all events maintain community access after they end. Organizers can disable this if needed.

### DiscussionBoard Component Updates

The `DiscussionBoard` component (`components/events/DiscussionBoard.tsx`) now accepts additional props:

```typescript
interface DiscussionBoardProps {
  eventId: string;
  eventDate?: string; // Event date to determine if it's post-event
  eventTitle?: string; // Event title for context
}
```

#### Post-Event Features

1. **Event Status Detection**
   - Automatically detects if an event has passed by comparing `eventDate` with current date
   - Adjusts UI and messaging based on event status

2. **Post-Event Banner**
   - Displays a prominent banner when viewing discussions for past events
   - Shows "Event Memories & Reflections" heading with post-event badge
   - Provides quick-start reflection prompts as clickable buttons
   - Uses gradient background (primary to success) for visual distinction

3. **Reflection Prompts**
   - Pre-defined prompts to encourage post-event engagement:
     - "What was your favorite moment from the event?"
     - "Share your photos and memories from the event"
     - "What did you learn or take away from this event?"
     - "Would you attend this event again? Why or why not?"
     - "Shoutout to someone you met at the event"
   - Clicking a prompt pre-fills the thread title in the creation modal

4. **Contextual UI Changes**
   - Header changes from "Discussions" to "Event Memories & Discussions"
   - Empty state shows camera emoji (📸) instead of chat emoji (💬)
   - Button text changes from "New Thread" to "Share Memory"
   - Modal title changes to "Share Your Experience"
   - Placeholder text adjusted for post-event context

5. **Reflection Ideas Panel**
   - Modal includes helpful suggestions for post-event threads:
     - Share favorite moments and photos
     - Discuss learnings and discoveries
     - Connect with people met at the event
     - Provide feedback for future events

### Event Detail Page Integration

The `EventDetailClient` component passes event context to the discussion board:

```typescript
<DiscussionBoard 
  eventId={event.id} 
  eventDate={event.date}
  eventTitle={event.title}
/>
```

The discussion tab button shows:
- "Memories" label instead of "Discussion" for past events
- Green "Active" badge to indicate community remains accessible

## User Experience

### Before Event
- Standard discussion board with "Discussions" heading
- "New Thread" button for starting conversations
- Focus on pre-event questions and anticipation

### After Event
- "Event Memories & Reflections" banner with gradient background
- Quick-start reflection prompts as clickable buttons
- "Share Memory" button instead of "New Thread"
- Camera emoji in empty state
- Contextual messaging encouraging memory sharing

### Benefits

1. **Continued Engagement**: Attendees can stay connected after the event
2. **Memory Preservation**: Platform becomes a repository of event experiences
3. **Community Building**: Strengthens relationships formed during the event
4. **Feedback Collection**: Organizers receive valuable post-event feedback
5. **Social Proof**: Future attendees can see authentic experiences from past events

## Technical Details

### Real-Time Support

Post-event discussions maintain full real-time functionality:
- Live message updates via Socket.IO
- Typing indicators
- Instant thread and reply creation
- User presence tracking

### Accessibility

- Post-event banner uses proper color contrast
- Status badges are clearly labeled
- All interactive elements remain keyboard accessible
- Screen readers announce post-event status

### Performance

- No additional API calls required
- Event status calculated client-side from event date
- Reflection prompts are static (no network requests)
- Same efficient discussion loading as pre-event

## Future Enhancements

Potential improvements for post-event community features:

1. **Photo Gallery**: Dedicated section for event photos
2. **Highlight Reel**: Curated best moments from discussions
3. **Attendee Directory**: Browse and connect with other attendees
4. **Event Rating**: Collect structured feedback and ratings
5. **Organizer Response**: Special badge for organizer replies in post-event threads
6. **Memory Timeline**: Chronological view of shared memories
7. **Export Memories**: Download all discussions and photos as PDF
8. **Anniversary Reminders**: Notify attendees on event anniversary

## Configuration

Organizers can control post-event community access through the event creation/edit form by setting the `postEventCommunityAccess` field. When set to `false`, discussions are hidden after the event concludes.

## API Compatibility

The feature works seamlessly with existing discussion API endpoints:
- `GET /api/events/[id]/discussions` - List threads
- `POST /api/events/[id]/discussions` - Create thread
- `GET /api/events/[id]/discussions/[threadId]` - Get thread details
- `POST /api/events/[id]/discussions/[threadId]/replies` - Add reply

No API changes required; all logic is client-side based on event date.
