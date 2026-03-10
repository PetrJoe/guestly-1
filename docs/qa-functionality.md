# Q&A Functionality Enhancement

## Overview

The Q&A system for virtual events has been enhanced with upvoting, moderator controls, and answered/unanswered status filtering.

## Features

### 1. Upvoting Mechanism
- Users can upvote questions to prioritize them
- Questions are sorted by upvotes (highest first)
- Users cannot upvote the same question twice
- Upvote count is displayed prominently on each question
- Real-time updates via WebSocket when questions are upvoted

### 2. Moderator Controls (Organizer Only)
- **Answer Questions**: Organizers can provide answers to questions
  - Click "Answer" button to open answer form
  - Type answer and submit
  - Answered questions show the answer in a highlighted box
- **Delete Questions**: Organizers can delete inappropriate or duplicate questions
  - Click "Delete" button
  - Confirmation dialog prevents accidental deletion
  - Question is removed for all users in real-time

### 3. Answered/Unanswered Status
- **Status Badges**: Each question displays a status badge
  - ✓ Answered (green badge) - Question has been answered
  - Pending (yellow badge) - Question awaiting answer
- **Filter Tabs**: Three filter options at the top
  - All (shows all questions with count)
  - Unanswered (shows only pending questions)
  - Answered (shows only answered questions)
- Counts update in real-time as questions are answered

### 4. Real-Time Updates
All Q&A actions are broadcast via WebSocket:
- New questions appear instantly for all users
- Upvotes update in real-time
- Answers appear immediately when submitted
- Deleted questions are removed for all users

## API Endpoints

### GET /api/events/[id]/qa
Get all questions for an event (sorted by upvotes)

### POST /api/events/[id]/qa
Submit a new question
- Body: `{ question: string, userName: string }`
- Requires authentication

### POST /api/events/[id]/qa/[questionId]/upvote
Upvote a question
- Requires authentication
- Returns error if already upvoted

### POST /api/events/[id]/qa/[questionId]/answer
Answer a question (organizer only)
- Body: `{ answer: string, answeredBy: string }`
- Requires organizer role

### DELETE /api/events/[id]/qa/[questionId]/delete
Delete a question (organizer only)
- Requires organizer role
- Confirmation recommended on client side

## WebSocket Events

### Client → Server
- `qa-question`: New question submitted
- `qa-upvoted`: Question upvoted
- `qa-answered`: Question answered
- `qa-deleted`: Question deleted

### Server → Client
- `qa-question`: Broadcast new question to all users
- `qa-upvoted`: Broadcast upvote update
- `qa-answered`: Broadcast answer update
- `qa-deleted`: Broadcast question deletion

## Component Usage

```tsx
import QAPanel from "@/components/virtual/QAPanel";

<QAPanel
  eventId="event-123"
  userId="user-456"
  userName="John Doe"
  isOrganizer={true} // Set to true for organizers to enable moderator controls
/>
```

## Data Model

```typescript
type QAQuestion = {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  question: string;
  upvotes: number;
  answered: boolean;
  answer?: string;
  answeredBy?: string;
  createdAt: number;
};
```

## Dark Mode Support

The Q&A panel fully supports dark mode:
- Status badges adjust colors for dark backgrounds
- Answer boxes use appropriate dark mode colors
- All interactive elements maintain proper contrast

## Accessibility

- Upvote buttons include title attributes for screen readers
- Status badges use semantic colors (green for success, yellow for pending)
- Keyboard navigation supported for all interactive elements
- Confirmation dialogs for destructive actions (delete)
