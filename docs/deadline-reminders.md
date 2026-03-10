# Deadline Reminders System

## Overview

The deadline reminders system automatically sends notifications to event organizers for:
- **Task Deadlines**: Upcoming due dates for planning tasks
- **Milestone Alerts**: Important event dates approaching
- **Budget Review Reminders**: Scheduled budget review dates

## How It Works

### Reminder Timing

The system sends reminders at strategic intervals:

**Task Deadlines:**
- 7 days before due date
- 3 days before due date
- 1 day before due date

**Milestone Alerts (Event Date):**
- 7 days before event
- 3 days before event
- 1 day before event

**Budget Review Reminders:**
- 1 day before review date

### Notification Types

Three new notification types have been added to the system:
- `task_deadline` - For planning task due dates
- `milestone_alert` - For event milestone dates
- `budget_review` - For budget review dates

### API Endpoints

#### Check Reminders for a Specific Event
```
GET /api/events/[id]/reminders/check
```

Returns all pending reminders for the specified event.

**Response:**
```json
{
  "success": true,
  "data": {
    "eventId": "evt_xxx",
    "taskReminders": 2,
    "milestoneAlerts": 1,
    "budgetReminders": 0,
    "total": 3,
    "notifications": [...]
  }
}
```

#### Check All Events
```
GET /api/reminders/check-all
POST /api/reminders/check-all
```

Checks all events in the system for pending reminders. This endpoint should be called periodically (e.g., via a cron job).

**Response:**
```json
{
  "success": true,
  "data": {
    "eventsChecked": 5,
    "totalReminders": 8,
    "breakdown": {
      "taskReminders": 4,
      "milestoneAlerts": 3,
      "budgetReminders": 1
    },
    "clearedOldReminders": 12,
    "results": [...]
  }
}
```

## Implementation Details

### Data Models

**DeadlineReminder Type:**
```typescript
type DeadlineReminder = {
  id: string;
  type: 'task_deadline' | 'milestone_alert' | 'budget_review';
  targetId: string; // taskId, eventId, or budgetItemId
  eventId: string;
  userId: string;
  dueDate: string;
  reminderDate: number;
  sent: boolean;
};
```

**Extended Notification Type:**
```typescript
type Notification = {
  // ... existing fields
  type: '...' | 'task_deadline' | 'milestone_alert' | 'budget_review';
  taskId?: string;
  budgetItemId?: string;
};
```

**Extended BudgetItem Type:**
```typescript
type BudgetItem = {
  // ... existing fields
  reviewDate?: string; // Optional review date
};
```

### Core Functions

**lib/store.ts exports:**
- `checkTaskDeadlines(eventId)` - Check task due dates
- `checkMilestoneAlerts(eventId)` - Check event milestone dates
- `checkBudgetReviewReminders(eventId)` - Check budget review dates
- `checkAllDeadlineReminders(eventId)` - Check all reminders for an event
- `checkAllEventsDeadlineReminders()` - Check all events
- `getUserDeadlineReminders(userId)` - Get user's reminders
- `clearOldReminders()` - Clean up old reminders (30+ days)

### UI Components

**DeadlineReminders Component:**
- Located at `components/organiser/DeadlineReminders.tsx`
- Displays upcoming deadlines in the Planning tab
- Auto-refreshes every 5 minutes
- Shows count badge and color-coded alerts

**Integration:**
- Added to `PlanningTab` component
- Appears at the top of the planning section
- Only visible when there are active reminders

## Usage

### For Organizers

1. **View Reminders**: Navigate to the Planning tab in your event dashboard
2. **Automatic Checks**: The system automatically checks for reminders every 5 minutes
3. **Manual Check**: Click "Check Now" to manually trigger a reminder check
4. **Notifications**: Reminders also appear in the notification bell

### For Administrators

To set up periodic reminder checks:

1. **Option 1: Manual Trigger**
   ```bash
   curl -X POST https://your-domain.com/api/reminders/check-all
   ```

2. **Option 2: Cron Job** (Recommended)
   Set up a cron job to call the endpoint every hour:
   ```
   0 * * * * curl -X POST https://your-domain.com/api/reminders/check-all
   ```

3. **Option 3: Scheduled Task**
   Use a service like Vercel Cron, AWS EventBridge, or similar to trigger the endpoint periodically.

## Reminder Logic

### Duplicate Prevention

The system tracks sent reminders to prevent duplicates:
- Each reminder is stored with a unique ID
- Before sending, the system checks if a reminder was already sent
- Uses a 1-hour tolerance window to match reminder times

### Tolerance Window

Reminders use a 1-hour tolerance window to account for:
- Periodic check intervals
- Server timing variations
- Ensures reminders are sent even if check doesn't run at exact time

### Cleanup

Old reminders (30+ days) are automatically cleaned up when running the check-all endpoint to prevent memory bloat.

## Future Enhancements

Potential improvements:
- Email notifications for reminders
- SMS notifications for critical deadlines
- Customizable reminder intervals
- Snooze functionality
- Reminder preferences per organizer
- Webhook support for external integrations
