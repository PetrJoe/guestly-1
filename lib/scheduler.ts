// Campaign Execution Scheduler
// Handles scheduled campaign execution and drip campaign automation

import { getCampaign, updateCampaign } from './marketing';
import type { Campaign } from './marketing';

// Store for scheduled tasks
const scheduledTasks: Map<string, NodeJS.Timeout> = new Map();

/**
 * Schedule a campaign for execution
 */
export function scheduleCampaign(campaignId: string, executeAt: number): void {
  // Cancel existing schedule if any
  cancelScheduledCampaign(campaignId);

  const delay = executeAt - Date.now();
  
  if (delay <= 0) {
    // Execute immediately if time has passed
    executeCampaign(campaignId);
    return;
  }

  const timeout = setTimeout(() => {
    executeCampaign(campaignId);
    scheduledTasks.delete(campaignId);
  }, delay);

  scheduledTasks.set(campaignId, timeout);
  
  console.log(`[Scheduler] Campaign ${campaignId} scheduled for ${new Date(executeAt).toISOString()}`);
}

/**
 * Cancel a scheduled campaign
 */
export function cancelScheduledCampaign(campaignId: string): boolean {
  const timeout = scheduledTasks.get(campaignId);
  
  if (timeout) {
    clearTimeout(timeout);
    scheduledTasks.delete(campaignId);
    console.log(`[Scheduler] Cancelled scheduled campaign ${campaignId}`);
    return true;
  }
  
  return false;
}

/**
 * Execute a campaign
 */
async function executeCampaign(campaignId: string): Promise<void> {
  console.log(`[Scheduler] Executing campaign ${campaignId}`);
  
  const campaign = getCampaign(campaignId);
  
  if (!campaign) {
    console.error(`[Scheduler] Campaign ${campaignId} not found`);
    return;
  }

  try {
    // Update campaign status
    updateCampaign(campaignId, {
      status: 'active',
      startedAt: Date.now(),
    });

    // Execute campaign based on type
    // In a real implementation, this would call the appropriate channel handlers
    console.log(`[Scheduler] Campaign ${campaignId} executed successfully`);
    
    // Mark as completed
    updateCampaign(campaignId, {
      status: 'completed',
      completedAt: Date.now(),
    });
  } catch (error) {
    console.error(`[Scheduler] Failed to execute campaign ${campaignId}:`, error);
    
    updateCampaign(campaignId, {
      status: 'failed',
    });
  }
}

/**
 * Reschedule a campaign
 */
export function rescheduleCampaign(campaignId: string, newExecuteAt: number): void {
  cancelScheduledCampaign(campaignId);
  scheduleCampaign(campaignId, newExecuteAt);
}

/**
 * Get all scheduled campaigns
 */
export function getScheduledCampaigns(): string[] {
  return Array.from(scheduledTasks.keys());
}

/**
 * Initialize scheduler on server start
 */
export function initializeScheduler(): void {
  console.log('[Scheduler] Initializing campaign scheduler');
  
  // In a real implementation, this would load all scheduled campaigns from storage
  // and reschedule them
}

/**
 * Shutdown scheduler
 */
export function shutdownScheduler(): void {
  console.log('[Scheduler] Shutting down campaign scheduler');
  
  // Cancel all scheduled tasks
  scheduledTasks.forEach((timeout, campaignId) => {
    clearTimeout(timeout);
    console.log(`[Scheduler] Cancelled campaign ${campaignId}`);
  });
  
  scheduledTasks.clear();
}

// Drip Campaign Scheduler

interface DripEnrollment {
  id: string;
  userId: string;
  dripCampaignId: string;
  currentStep: number;
  enrolledAt: number;
  nextEmailAt: number;
  completed: boolean;
}

const dripEnrollments: Map<string, DripEnrollment> = new Map();
const dripTasks: Map<string, NodeJS.Timeout> = new Map();

/**
 * Enroll user in drip campaign
 */
export function enrollInDripCampaign(
  userId: string,
  dripCampaignId: string,
  triggerEvent: string
): DripEnrollment {
  const enrollmentId = `drip_${userId}_${dripCampaignId}`;
  
  // Check if already enrolled
  if (dripEnrollments.has(enrollmentId)) {
    return dripEnrollments.get(enrollmentId)!;
  }

  const enrollment: DripEnrollment = {
    id: enrollmentId,
    userId,
    dripCampaignId,
    currentStep: 0,
    enrolledAt: Date.now(),
    nextEmailAt: Date.now() + 24 * 60 * 60 * 1000, // First email after 24 hours
    completed: false,
  };

  dripEnrollments.set(enrollmentId, enrollment);
  scheduleDripEmail(enrollment);

  console.log(`[Drip Scheduler] User ${userId} enrolled in drip campaign ${dripCampaignId}`);

  return enrollment;
}

/**
 * Schedule next drip email
 */
function scheduleDripEmail(enrollment: DripEnrollment): void {
  const delay = enrollment.nextEmailAt - Date.now();
  
  if (delay <= 0) {
    sendDripEmail(enrollment);
    return;
  }

  const timeout = setTimeout(() => {
    sendDripEmail(enrollment);
    dripTasks.delete(enrollment.id);
  }, delay);

  dripTasks.set(enrollment.id, timeout);
}

/**
 * Send drip email and schedule next
 */
function sendDripEmail(enrollment: DripEnrollment): void {
  console.log(`[Drip Scheduler] Sending drip email step ${enrollment.currentStep} to user ${enrollment.userId}`);

  // In a real implementation, this would send the actual email
  
  // Update enrollment
  enrollment.currentStep++;
  enrollment.nextEmailAt = Date.now() + 3 * 24 * 60 * 60 * 1000; // Next email after 3 days

  // Check if campaign is complete (example: 5 emails)
  if (enrollment.currentStep >= 5) {
    enrollment.completed = true;
    dripEnrollments.delete(enrollment.id);
    console.log(`[Drip Scheduler] User ${enrollment.userId} completed drip campaign`);
  } else {
    scheduleDripEmail(enrollment);
  }
}

/**
 * Unenroll user from drip campaign
 */
export function unenrollFromDripCampaign(userId: string, dripCampaignId: string): boolean {
  const enrollmentId = `drip_${userId}_${dripCampaignId}`;
  
  const timeout = dripTasks.get(enrollmentId);
  if (timeout) {
    clearTimeout(timeout);
    dripTasks.delete(enrollmentId);
  }
  
  const removed = dripEnrollments.delete(enrollmentId);
  
  if (removed) {
    console.log(`[Drip Scheduler] User ${userId} unenrolled from drip campaign ${dripCampaignId}`);
  }
  
  return removed;
}
