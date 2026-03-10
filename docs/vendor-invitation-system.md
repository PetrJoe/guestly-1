# Vendor Invitation System

## Overview

The vendor invitation system allows event organizers to invite vendors to provide services for their events. Vendors receive notifications, can accept or decline invitations, and organizers can track invitation status.

## Features

### For Organizers

1. **Search and Browse Vendors**
   - Search vendors by name or description
   - Filter by category (Security, Sound, Catering, Decoration, Logistics, Photography)
   - View vendor portfolios and rate cards

2. **Invite Vendors**
   - Send invitations to vendors from the event management dashboard
   - Track invitation status (invited, accepted, declined)
   - View invited vendors list with status badges

3. **Contact Accepted Vendors**
   - Once a vendor accepts, their contact information is displayed
   - Email and phone links for easy communication
   - Organized view of all event vendors

### For Vendors

1. **Receive Invitations**
   - Get notifications when invited to events
   - View invitation badge with pending count
   - See event details (title, date, venue, city)

2. **Respond to Invitations**
   - Accept or decline invitations
   - View invitation history
   - See past responses

3. **Manage Invitations**
   - Dedicated invitations page at `/vendor/invitations`
   - Separate sections for pending and past invitations
   - Event images and details for context

## Implementation Details

### Data Models

**EventVendorLink** (in `lib/store.ts`):
```typescript
{
  vendorUserId: string;
  profileId: string;
  category: string;
  status: "invited" | "accepted" | "declined";
  invitedAt: number;
}
```

**VendorInvitation** (extended type):
```typescript
EventVendorLink & { eventId: string }
```

### API Routes

1. **POST /api/events/[id]/vendors/invite**
   - Invite a vendor to an event
   - Requires organizer role
   - Sends notification to vendor
   - Body: `{ vendorUserId: string }`

2. **GET /api/events/[id]/vendors**
   - List all vendors invited to an event
   - Returns array of EventVendorLink

3. **GET /api/vendors/invitations**
   - List all invitations for the current vendor
   - Enriched with event details
   - Requires vendor role

4. **POST /api/vendors/invitations/[id]/respond**
   - Respond to an invitation (accept/decline)
   - Requires vendor role
   - Sends notification to organizer
   - Body: `{ status: "accepted" | "declined" }`

### Store Functions

- `inviteVendorToEvent(eventId, vendorUserId)` - Create invitation
- `listEventVendors(eventId)` - Get vendors for event
- `listVendorInvitations(vendorUserId)` - Get invitations for vendor
- `updateVendorInviteStatus(eventId, vendorUserId, status)` - Update invitation status

### UI Components

1. **VendorsTab** (`components/organiser/tabs/VendorsTab.tsx`)
   - Organizer dashboard tab for vendor management
   - Search and filter vendors
   - Invite vendors with one click
   - View invited vendors with status
   - Show contact info for accepted vendors

2. **VendorInvitationsPage** (`app/vendor/invitations/page.tsx`)
   - Vendor dashboard page for managing invitations
   - Pending invitations section
   - Past responses section
   - Accept/decline actions

3. **InvitationBadge** (`components/vendors/InvitationBadge.tsx`)
   - Shows pending invitation count
   - Links to invitations page
   - Auto-refreshes every 30 seconds

### Notification System

The system uses the existing notification infrastructure:

- **vendor_invitation** - Sent when organizer invites vendor
- **vendor_response** - Sent when vendor accepts/declines

Notifications include:
- Event ID for context
- From user ID (organizer or vendor)
- Title and message
- Read/unread status

## User Flow

### Organizer Flow

1. Navigate to event management dashboard
2. Click "Vendors" tab
3. Search/filter vendors by category
4. Click "Invite" button on vendor card
5. Vendor appears in "Invited Vendors" list with "invited" status
6. When vendor accepts, status changes to "accepted" and contact info appears
7. Organizer can email or call vendor directly

### Vendor Flow

1. Receive notification of invitation
2. See invitation badge in vendor dashboard
3. Navigate to invitations page
4. View event details (image, title, date, venue)
5. Click "Accept" or "Decline"
6. Invitation moves to "Past Responses" section
7. Organizer receives notification of response

## Status Tracking

The system tracks three invitation states:

- **invited** - Initial state when organizer sends invitation
- **accepted** - Vendor has accepted the invitation
- **declined** - Vendor has declined the invitation

Status is displayed with color-coded badges:
- Invited: Yellow/warning color
- Accepted: Green/success color
- Declined: Red/danger color

## Future Enhancements

Potential improvements for the vendor invitation system:

1. **Bulk Invitations** - Invite multiple vendors at once
2. **Invitation Messages** - Add custom message when inviting
3. **Vendor Availability** - Show vendor calendar/availability
4. **Contract Management** - Attach contracts to accepted invitations
5. **Payment Integration** - Track vendor payments and deposits
6. **Review System** - Rate vendors after event completion
7. **Automatic Reminders** - Send reminders to vendors who haven't responded
8. **Invitation Expiry** - Auto-expire invitations after certain time
9. **Vendor Recommendations** - Suggest vendors based on event type
10. **Communication Thread** - In-app messaging between organizer and vendor
