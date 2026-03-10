# Instant Refund System

## Overview

The GUESTLY platform implements an instant refund system that processes refunds immediately to the user's wallet balance. This provides a seamless experience for both attendees and organizers.

## Features

### 1. Instant Processing
- Refunds are processed immediately upon request
- Funds are instantly credited to the user's GUESTLY Wallet
- No waiting period or manual approval required

### 2. Transaction History
- All refunds are automatically recorded in transaction history
- Refund transactions include the order ID and reason (if provided)
- Users can view refund details in their wallet transaction history at `/wallet/transactions`

### 3. Notifications
- Users receive an instant toast notification when refund is processed
- Notification includes the refund amount and a link to view wallet
- Success message confirms funds have been added to wallet

### 4. Ticket Availability
- Refunded tickets are automatically returned to event availability
- Other users can immediately purchase the returned tickets
- Maintains accurate ticket counts in real-time

## API Endpoints

### Process Refund
```
POST /api/orders/[orderId]/refund
```

**Request Body:**
```json
{
  "reason": "Customer requested refund" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ord_abc123",
    "refundAmount": 200.00,
    "refundedAt": 1234567890,
    "message": "Refund processed successfully. Funds have been added to your wallet."
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Order not found" // or "Order is not paid"
}
```

### Get User Orders
```
GET /api/orders/user
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": "ord_abc123",
      "eventId": "evt_xyz789",
      "userId": "user_123",
      "items": [
        {
          "type": "General",
          "quantity": 2,
          "price": 50,
          "attendanceType": "physical"
        }
      ],
      "total": 100,
      "status": "paid", // or "pending", "refunded"
      "createdAt": 1234567890
    }
  ]
}
```

## Store Functions

### `refundOrder(orderId: string, reason?: string)`

Processes a refund for a paid order.

**Parameters:**
- `orderId` - The ID of the order to refund
- `reason` - Optional reason for the refund

**Returns:**
```typescript
{
  order: Order;           // Updated order with "refunded" status
  refundAmount: number;   // Amount refunded
  refundedAt: number;     // Timestamp of refund
}
```

**Throws:**
- "Order not found" - If order doesn't exist
- "Order is not paid" - If order status is not "paid"

**Side Effects:**
1. Credits refund amount to user's wallet via `addMoney()`
2. Creates transaction record with description
3. Updates order status to "refunded"
4. Returns tickets to event availability

### `getUserOrders(userId: string)`

Retrieves all orders for a specific user, sorted by creation date (newest first).

**Parameters:**
- `userId` - The ID of the user

**Returns:**
- Array of Order objects

## User Interface

### Attendee Orders Page
Location: `/attendee/orders`

**Features:**
- Lists all user orders with status badges
- Shows order details (items, quantities, prices)
- "Request Refund" button for paid orders
- Real-time status updates after refund
- Links to view tickets or complete payment
- Refund policy information

**Status Badges:**
- **Pending** - Payment not completed (yellow)
- **Paid** - Order confirmed (green)
- **Refunded** - Refund processed (gray)

### Wallet Transaction History
Location: `/wallet/transactions`

**Refund Display:**
- Refund transactions appear as "credit" type
- Description includes order ID and reason
- Amount shown in green (positive)
- Filterable by transaction type and date range
- Exportable to CSV

## Order Status Flow

```
pending → paid → refunded
   ↓        ↓
  pay    refund
```

1. **Pending**: Order created but not paid
2. **Paid**: Payment completed, tickets issued
3. **Refunded**: Refund processed, funds returned to wallet

## Implementation Details

### Type Definitions

```typescript
export type Order = {
  id: string;
  eventId: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "refunded";
  createdAt: number;
};

export type Transaction = {
  id: string;
  userId: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  createdAt: number;
};
```

### Refund Logic

1. **Validation**
   - Verify order exists
   - Verify order status is "paid"

2. **Process Refund**
   - Calculate refund amount (order total)
   - Credit wallet using `addMoney()`
   - Create transaction record

3. **Update Order**
   - Change status to "refunded"

4. **Return Tickets**
   - Find event availability
   - Iterate through order items
   - Add quantities back to matching ticket types
   - Consider attendance type for hybrid events

5. **Return Result**
   - Return updated order
   - Include refund amount and timestamp

## Testing

To test the refund system:

1. **Create an order:**
   - Navigate to an event page
   - Select tickets and complete checkout
   - Use wallet or other payment method

2. **View orders:**
   - Go to `/attendee/orders`
   - Verify order appears with "Paid" status

3. **Request refund:**
   - Click "Request Refund" button
   - Observe toast notification
   - Verify order status changes to "Refunded"

4. **Check wallet:**
   - Navigate to `/wallet`
   - Verify balance increased
   - Go to `/wallet/transactions`
   - Verify refund transaction appears

5. **Verify ticket availability:**
   - Return to event page
   - Verify ticket count increased

## Refund Policy

As displayed to users:

> Refunds are processed instantly to your GUESTLY Wallet. You can request a refund up to 24 hours before the event starts. The refunded amount will be available immediately for future purchases.

**Note:** The 24-hour policy is informational only. The current implementation does not enforce time-based restrictions. This should be implemented in a future update.

## Future Enhancements

1. **Time-based restrictions**
   - Enforce 24-hour cutoff before event
   - Configurable refund windows per event

2. **Partial refunds**
   - Refund specific items from an order
   - Apply refund fees or penalties

3. **Refund reasons**
   - Predefined reason categories
   - Required reason selection

4. **Organizer approval**
   - Optional approval workflow
   - Automatic vs manual refunds

5. **Email notifications**
   - Send email confirmation of refund
   - Include transaction details

6. **Analytics**
   - Track refund rates per event
   - Identify refund patterns
   - Alert on unusual refund activity

## Related Files

- `lib/store.ts` - Core refund logic and data models
- `app/api/orders/[id]/refund/route.ts` - Refund API endpoint
- `app/api/orders/user/route.ts` - User orders API endpoint
- `app/attendee/orders/page.tsx` - Orders management UI
- `app/wallet/transactions/page.tsx` - Transaction history UI
- `components/ui/ToastProvider.tsx` - Notification system
- `components/wallet/TransactionItem.tsx` - Transaction display component
