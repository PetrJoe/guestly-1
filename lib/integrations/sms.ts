// Mock SMS/WhatsApp Provider Integration (Twilio/Africa's Talking)
// This is a mock implementation for development. Replace with real API calls in production.

export interface SMSMessage {
  to: string;
  from: string;
  body: string;
  trackingId?: string;
}

export interface WhatsAppMessage {
  to: string;
  from: string;
  body?: string;
  mediaUrl?: string;
  caption?: string;
  templateName?: string;
  templateParams?: Record<string, string>;
}

export interface SMSSendResult {
  success: boolean;
  messageId: string;
  to: string;
  status: 'queued' | 'sent' | 'delivered' | 'failed';
  cost: number;
  error?: string;
}

/**
 * Send SMS message
 */
export async function sendSMS(message: SMSMessage): Promise<SMSSendResult> {
  console.log('[SMS Provider] Sending SMS:', {
    to: message.to,
    length: message.body.length,
    trackingId: message.trackingId,
  });

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));

  // Calculate cost (mock pricing: ₦5 per SMS)
  const segments = Math.ceil(message.body.length / 160);
  const cost = segments * 5;

  return {
    success: true,
    messageId: `sms_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    to: message.to,
    status: 'sent',
    cost,
  };
}

/**
 * Send bulk SMS messages
 */
export async function sendBulkSMS(messages: SMSMessage[]): Promise<SMSSendResult[]> {
  console.log(`[SMS Provider] Sending ${messages.length} SMS messages in bulk`);

  const results = await Promise.all(messages.map(msg => sendSMS(msg)));
  return results;
}

/**
 * Send WhatsApp message
 */
export async function sendWhatsApp(message: WhatsAppMessage): Promise<SMSSendResult> {
  console.log('[WhatsApp Provider] Sending WhatsApp message:', {
    to: message.to,
    hasMedia: !!message.mediaUrl,
    template: message.templateName,
  });

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  // Calculate cost (mock pricing: ₦10 per WhatsApp message)
  const cost = 10;

  return {
    success: true,
    messageId: `wa_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    to: message.to,
    status: 'sent',
    cost,
  };
}

/**
 * Send bulk WhatsApp messages
 */
export async function sendBulkWhatsApp(messages: WhatsAppMessage[]): Promise<SMSSendResult[]> {
  console.log(`[WhatsApp Provider] Sending ${messages.length} WhatsApp messages in bulk`);

  const results = await Promise.all(messages.map(msg => sendWhatsApp(msg)));
  return results;
}

/**
 * Track SMS delivery status
 */
export async function trackSMSDelivery(messageId: string): Promise<{
  messageId: string;
  status: 'queued' | 'sent' | 'delivered' | 'failed' | 'undelivered';
  deliveredAt?: number;
  error?: string;
}> {
  console.log('[SMS Provider] Tracking delivery:', messageId);

  // Mock delivery status (98% success rate)
  const isDelivered = Math.random() > 0.02;

  return {
    messageId,
    status: isDelivered ? 'delivered' : 'failed',
    deliveredAt: isDelivered ? Date.now() : undefined,
    error: isDelivered ? undefined : 'Invalid phone number',
  };
}

/**
 * Estimate SMS campaign cost
 */
export function estimateSMSCost(message: string, recipientCount: number): {
  segments: number;
  costPerMessage: number;
  totalCost: number;
} {
  const segments = Math.ceil(message.length / 160);
  const costPerMessage = segments * 5; // ₦5 per segment

  return {
    segments,
    costPerMessage,
    totalCost: costPerMessage * recipientCount,
  };
}

/**
 * Estimate WhatsApp campaign cost
 */
export function estimateWhatsAppCost(recipientCount: number, hasMedia: boolean = false): {
  costPerMessage: number;
  totalCost: number;
} {
  const costPerMessage = hasMedia ? 15 : 10; // ₦10 for text, ₦15 for media

  return {
    costPerMessage,
    totalCost: costPerMessage * recipientCount,
  };
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): {
  valid: boolean;
  formatted?: string;
  country?: string;
  error?: string;
} {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Check if it's a valid Nigerian number (example)
  if (digits.startsWith('234') && digits.length === 13) {
    return {
      valid: true,
      formatted: `+${digits}`,
      country: 'NG',
    };
  }

  // Check if it's a local Nigerian number
  if (digits.startsWith('0') && digits.length === 11) {
    return {
      valid: true,
      formatted: `+234${digits.slice(1)}`,
      country: 'NG',
    };
  }

  return {
    valid: false,
    error: 'Invalid phone number format',
  };
}

/**
 * Check rate limits
 */
export function checkRateLimit(recipientCount: number): {
  allowed: boolean;
  limit: number;
  error?: string;
} {
  const maxPerHour = 1000;

  if (recipientCount > maxPerHour) {
    return {
      allowed: false,
      limit: maxPerHour,
      error: `Rate limit exceeded. Maximum ${maxPerHour} messages per hour.`,
    };
  }

  return {
    allowed: true,
    limit: maxPerHour,
  };
}
