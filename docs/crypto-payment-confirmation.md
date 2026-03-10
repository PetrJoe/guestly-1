# Crypto Payment Confirmation System

## Overview

The crypto payment confirmation system provides real-time tracking of cryptocurrency deposits with blockchain confirmation monitoring, pending status display, balance updates, and completion notifications.

## Architecture

### Data Layer (`lib/store.ts`)

**Types:**
- `CryptoDeposit`: Tracks deposit status, confirmations, and metadata
- `CryptoDepositStatus`: "pending" | "confirming" | "confirmed" | "failed"

**Functions:**
- `createCryptoDeposit()`: Initialize deposit tracking
- `getCryptoDeposit()`: Retrieve deposit by ID
- `getUserCryptoDeposits()`: Get all deposits for a user
- `getPendingCryptoDeposits()`: Get active deposits for a user
- `pollCryptoDepositStatus()`: Simulate blockchain polling (updates confirmations)
- `updateCryptoDepositStatus()`: Manual status update (admin/testing)

### API Endpoints

**POST `/api/wallet/crypto-deposit`**
- Creates a new deposit tracking record
- Parameters: `cryptoType`, `address`, `amount`, `amountUSD`
- Returns: Deposit object with ID for polling

**GET `/api/wallet/crypto-deposit/[depositId]/status`**
- Polls blockchain for transaction confirmation
- Updates confirmation count and status
- Returns: Current deposit status

**GET `/api/wallet/crypto-deposit/pending`**
- Lists all pending deposits for the authenticated user
- Used to restore state on page load

### UI Component (`components/wallet/CryptoPaymentUI.tsx`)

**Features:**
1. **Deposit Tracking Form**: User enters amount after sending crypto
2. **Pending Deposits Display**: Shows all active deposits with progress
3. **Real-time Polling**: Checks status every 5 seconds
4. **Progress Indicators**: 
   - Spinner for "pending" (waiting for transaction)
   - Progress bar for "confirming" (showing confirmations)
   - Success state for "confirmed"
5. **Notifications**: Toast notification on confirmation completion

## Confirmation Flow

### 1. User Initiates Deposit
```
User sends crypto → Copies address → Enters amount → Clicks "Track Deposit"
```

### 2. System Creates Tracking Record
```
POST /api/wallet/crypto-deposit
→ Creates CryptoDeposit with status="pending"
→ Returns deposit ID
```

### 3. Blockchain Polling (Simulated)
```
Every 5 seconds:
  GET /api/wallet/crypto-deposit/[id]/status
  → pollCryptoDepositStatus() checks time elapsed
  → After 10s: status="confirming", confirmations=1
  → Every 30s: confirmations++
  → When confirmations >= required: status="confirmed"
```

### 4. Confirmation Complete
```
status="confirmed"
→ addCryptoBalance() updates crypto balance
→ addMoney() updates USD balance
→ Transaction recorded
→ Notification shown to user
```

## Confirmation Requirements

- **Bitcoin**: 3 confirmations required (~30 minutes)
- **USDT (TRC20/ERC20)**: 12 confirmations required (~6 minutes)

## Simulation Logic

The current implementation simulates blockchain polling for demo purposes:

1. **Transaction Detection** (10 seconds after creation):
   - Status changes from "pending" to "confirming"
   - Transaction hash generated
   - First confirmation recorded

2. **Confirmation Progress** (every 30 seconds):
   - Confirmation count increments
   - Progress bar updates

3. **Final Confirmation**:
   - When confirmations >= required confirmations
   - Status changes to "confirmed"
   - Wallet balance updated
   - Notification sent

## Production Implementation

To integrate with real blockchain APIs, replace `pollCryptoDepositStatus()` logic:

### Bitcoin
```typescript
// Use blockchain.info, blockchair.com, or similar
const response = await fetch(
  `https://blockchain.info/rawtx/${txHash}`
);
const data = await response.json();
const confirmations = data.confirmations;
```

### USDT TRC20 (Tron)
```typescript
// Use TronGrid API
const response = await fetch(
  `https://api.trongrid.io/v1/transactions/${txHash}`
);
const data = await response.json();
const confirmations = data.confirmations;
```

### USDT ERC20 (Ethereum)
```typescript
// Use Etherscan API or Infura
const response = await fetch(
  `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}`
);
const data = await response.json();
const confirmations = data.result.confirmations;
```

## User Experience

### Pending State
- Animated spinner
- "Waiting for transaction..." message
- "Scanning blockchain..." indicator

### Confirming State
- Progress bar showing X/Y confirmations
- Transaction hash displayed (truncated)
- Real-time updates every 5 seconds

### Confirmed State
- Success checkmark
- "Confirmed!" message
- Toast notification with amount
- Auto-removal from pending list after 3 seconds

## Error Handling

- Invalid amounts rejected at API level
- Unauthorized access prevented (user verification)
- Failed deposits can be manually updated via admin tools
- Network errors handled gracefully with retry logic

## Testing

To test the system:

1. Navigate to `/wallet/crypto` page
2. Select a cryptocurrency
3. Enter an amount (e.g., "100" for USDT or "0.001" for BTC)
4. Click "Track Deposit"
5. Watch the status progress:
   - 0-10s: "Waiting for transaction..."
   - 10s+: "X/Y confirmations" with progress bar
   - ~2 minutes: "Confirmed!" with notification

## Future Enhancements

- [ ] Webhook support for instant notifications
- [ ] Email/SMS alerts on confirmation
- [ ] Transaction history page with all deposits
- [ ] Support for more cryptocurrencies (ETH, USDC, etc.)
- [ ] QR code generation with amount embedded
- [ ] Automatic amount detection from blockchain
- [ ] Refund/cancellation support for failed deposits
