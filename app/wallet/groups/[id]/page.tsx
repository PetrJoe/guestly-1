"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/ToastProvider";
import GroupNotificationBell from "@/components/wallet/GroupNotificationBell";
import type { GroupWallet, GroupContribution } from "@/lib/store";

type ContributionStats = {
  memberStats: Array<{
    userId: string;
    userName: string;
    totalContributed: number;
    targetAmount: number;
    contributionCount: number;
    averageContribution: number;
    progressPercentage: number;
  }>;
  mostActiveContributor: {
    userId: string;
    userName: string;
    contributionCount: number;
  };
  totalContributions: number;
  averageContributionAmount: number;
};

export default function GroupWalletDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  const { addToast } = useToast();

  const [groupWallet, setGroupWallet] = useState<GroupWallet | null>(null);
  const [contributions, setContributions] = useState<GroupContribution[]>([]);
  const [stats, setStats] = useState<ContributionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    fetchGroupWallet();
    fetchContributions();
    fetchCurrentUser();
  }, [groupId]);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.userId) {
        setUserId(data.userId);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchGroupWallet = async () => {
    try {
      const res = await fetch(`/api/wallet/groups/${groupId}`);
      const data = await res.json();
      if (data.success) {
        setGroupWallet(data.data);
      } else {
        console.error("Failed to fetch group wallet:", data.error);
      }
    } catch (error) {
      console.error("Error fetching group wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContributions = async () => {
    try {
      const res = await fetch(`/api/wallet/groups/${groupId}/contributions`);
      const data = await res.json();
      if (data.success) {
        setContributions(data.data.contributions);
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Error fetching contributions:", error);
    }
  };

  const handleSendReminders = async () => {
    try {
      const res = await fetch(`/api/wallet/groups/${groupId}/send-reminders`, {
        method: "POST",
      });
      const data = await res.json();
      
      if (data.success) {
        addToast(
          `Sent ${data.data.remindersSent} reminder${data.data.remindersSent !== 1 ? 's' : ''} to members`,
          { type: "success", duration: 5000 }
        );
      } else {
        addToast(data.error || "Failed to send reminders", { type: "error" });
      }
    } catch (error) {
      console.error("Error sending reminders:", error);
      addToast("An error occurred while sending reminders", { type: "error" });
    }
  };

  const getRelativeTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const calculateProgress = (current: number, goal: number) => {
    return goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-bg)] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[var(--surface-card)] rounded w-1/3"></div>
            <div className="h-64 bg-[var(--surface-card)] rounded"></div>
            <div className="h-96 bg-[var(--surface-card)] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!groupWallet) {
    return (
      <div className="min-h-screen bg-[var(--surface-bg)] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--surface-card)] rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Group wallet not found
            </h3>
            <Link
              href="/wallet/groups"
              className="inline-block mt-4 px-6 py-3 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors font-medium"
            >
              Back to Group Wallets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = calculateProgress(groupWallet.currentTotal, groupWallet.totalGoal);
  const isCompleted = groupWallet.status === "completed";
  const isCancelled = groupWallet.status === "cancelled";
  const isCreator = groupWallet.createdBy === userId;
  const currentMember = groupWallet.members.find((m) => m.userId === userId);

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/wallet/groups"
          className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] mb-6 transition-colors"
        >
          <span>←</span> Back to Group Wallets
        </Link>

        {/* Header */}
        <div className="bg-[var(--surface-card)] rounded-xl p-8 mb-6 border border-[var(--surface-border)]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-[var(--foreground)]">
                  {groupWallet.name}
                </h1>
                {/* Group Type Badge */}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  groupWallet.groupType === 'friends' 
                    ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]'
                    : groupWallet.groupType === 'family'
                    ? 'bg-[var(--color-success-100)] text-[var(--color-success-700)]'
                    : 'bg-[var(--color-warning-100)] text-[var(--color-warning-700)]'
                }`}>
                  {groupWallet.groupType === 'friends' && '👥 Friends'}
                  {groupWallet.groupType === 'family' && '👨‍👩‍👧‍👦 Family'}
                  {groupWallet.groupType === 'corporate' && '🏢 Corporate'}
                </span>
              </div>
              <p className="text-[var(--foreground-muted)]">
                {groupWallet.members.length} member{groupWallet.members.length !== 1 ? "s" : ""}
                {isCreator && " • You are the creator"}
                {groupWallet.adminUserIds.includes(userId) && !isCreator && " • You are an admin"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <GroupNotificationBell groupWalletId={groupId} />
              
              {isCompleted && (
                <span className="px-4 py-2 bg-[var(--color-success-100)] text-[var(--color-success-700)] rounded-full text-sm font-medium">
                  ✓ Goal Reached
                </span>
              )}
              {isCancelled && (
                <span className="px-4 py-2 bg-[var(--color-neutral-200)] text-[var(--color-neutral-700)] rounded-full text-sm font-medium">
                  Cancelled
                </span>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl font-bold text-[var(--foreground)]">
                ${groupWallet.currentTotal.toFixed(2)}
              </span>
              <span className="text-lg text-[var(--foreground-muted)]">
                of ${groupWallet.totalGoal.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-[var(--surface-bg)] rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] mt-2">
              {progress.toFixed(1)}% of goal reached
            </p>
          </div>

          {/* Action Button */}
          {currentMember && !isCancelled && (
            <button
              onClick={() => setShowContributeModal(true)}
              className="w-full px-6 py-4 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors font-medium text-lg"
            >
              Contribute to Group
            </button>
          )}
          
          {/* Send Reminders Button (Creator Only) */}
          {isCreator && !isCancelled && (
            <button
              onClick={handleSendReminders}
              className="w-full mt-3 px-6 py-3 bg-[var(--surface-bg)] text-[var(--foreground)] border border-[var(--surface-border)] rounded-lg hover:bg-[var(--surface-hover)] transition-colors font-medium"
            >
              Send Reminders to Members
            </button>
          )}
        </div>

        {/* Admin Controls (for admins only) */}
        {groupWallet.adminUserIds.includes(userId) && !isCancelled && (
          <div className="bg-[var(--surface-card)] rounded-xl p-8 border border-[var(--surface-border)] mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Admin Controls</h2>
            <p className="text-sm text-[var(--foreground-muted)] mb-6">
              As an admin, you can manage members and group settings
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {groupWallet.permissions.requireApproval && (
                <button
                  onClick={() => {/* TODO: Show pending members modal */}}
                  className="px-4 py-3 bg-[var(--color-warning-100)] text-[var(--color-warning-700)] rounded-lg hover:bg-[var(--color-warning-200)] transition-colors font-medium text-sm"
                >
                  Review Pending Members
                </button>
              )}
              
              {groupWallet.permissions.allowMemberRemoval && (
                <button
                  onClick={() => {/* TODO: Show remove member modal */}}
                  className="px-4 py-3 bg-[var(--color-danger-100)] text-[var(--color-danger-700)] rounded-lg hover:bg-[var(--color-danger-200)] transition-colors font-medium text-sm"
                >
                  Remove Member
                </button>
              )}
              
              {!groupWallet.permissions.allowTargetChanges && (
                <button
                  onClick={() => {/* TODO: Show set target modal */}}
                  className="px-4 py-3 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-lg hover:bg-[var(--color-primary-200)] transition-colors font-medium text-sm"
                >
                  Set Member Targets
                </button>
              )}
              
              <button
                onClick={async () => {
                  if (confirm('Are you sure you want to mark this group as completed?')) {
                    try {
                      const res = await fetch(`/api/wallet/groups/${groupId}/admin`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'complete_early' }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        addToast('Group marked as completed', { type: 'success' });
                        fetchGroupWallet();
                      } else {
                        addToast(data.error || 'Failed to complete group', { type: 'error' });
                      }
                    } catch (error) {
                      addToast('An error occurred', { type: 'error' });
                    }
                  }
                }}
                className="px-4 py-3 bg-[var(--color-success-100)] text-[var(--color-success-700)] rounded-lg hover:bg-[var(--color-success-200)] transition-colors font-medium text-sm"
              >
                Complete Group Early
              </button>
            </div>

            {/* Group Permissions Display */}
            <div className="mt-6 p-4 bg-[var(--surface-bg)] rounded-lg">
              <h3 className="font-semibold text-[var(--foreground)] mb-3 text-sm">Group Permissions</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className={groupWallet.permissions.allowMemberInvites ? 'text-[var(--color-success-600)]' : 'text-[var(--color-neutral-500)]'}>
                    {groupWallet.permissions.allowMemberInvites ? '✓' : '✗'}
                  </span>
                  <span className="text-[var(--foreground-muted)]">Member invites</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={groupWallet.permissions.requireApproval ? 'text-[var(--color-success-600)]' : 'text-[var(--color-neutral-500)]'}>
                    {groupWallet.permissions.requireApproval ? '✓' : '✗'}
                  </span>
                  <span className="text-[var(--foreground-muted)]">Require approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={groupWallet.permissions.allowTargetChanges ? 'text-[var(--color-success-600)]' : 'text-[var(--color-neutral-500)]'}>
                    {groupWallet.permissions.allowTargetChanges ? '✓' : '✗'}
                  </span>
                  <span className="text-[var(--foreground-muted)]">Self-set targets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={groupWallet.permissions.allowMemberRemoval ? 'text-[var(--color-success-600)]' : 'text-[var(--color-neutral-500)]'}>
                    {groupWallet.permissions.allowMemberRemoval ? '✓' : '✗'}
                  </span>
                  <span className="text-[var(--foreground-muted)]">Member removal</span>
                </div>
              </div>
            </div>

            {/* Admins List */}
            {groupWallet.adminUserIds.length > 1 && (
              <div className="mt-4 p-4 bg-[var(--surface-bg)] rounded-lg">
                <h3 className="font-semibold text-[var(--foreground)] mb-2 text-sm">Group Admins</h3>
                <div className="flex flex-wrap gap-2">
                  {groupWallet.adminUserIds.map((adminId) => {
                    const adminMember = groupWallet.members.find(m => m.userId === adminId);
                    return (
                      <span
                        key={adminId}
                        className="px-3 py-1 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-xs font-medium"
                      >
                        {adminMember?.name || adminId}
                        {adminId === groupWallet.createdBy && ' (Creator)'}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Members List */}
        <div className="bg-[var(--surface-card)] rounded-xl p-8 border border-[var(--surface-border)] mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Members</h2>
          <div className="space-y-4">
            {groupWallet.members.map((member, index) => {
              const memberProgress = calculateProgress(member.currentAmount, member.targetAmount);
              const isCurrentUser = member.userId === userId;
              const percentOfTotal = groupWallet.totalGoal > 0 
                ? (member.targetAmount / groupWallet.totalGoal) * 100 
                : 0;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    member.status === 'pending'
                      ? 'bg-[var(--color-warning-50)] border-[var(--color-warning-200)]'
                      : 'bg-[var(--surface-bg)] border-[var(--surface-border)]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-lg font-bold text-[var(--color-primary-700)]">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[var(--foreground)]">
                            {member.name}
                            {isCurrentUser && (
                              <span className="ml-2 text-sm text-[var(--color-primary-500)]">(You)</span>
                            )}
                          </h3>
                          {member.status === 'pending' && (
                            <span className="px-2 py-0.5 bg-[var(--color-warning-100)] text-[var(--color-warning-700)] rounded text-xs font-medium">
                              Pending Approval
                            </span>
                          )}
                          {groupWallet.adminUserIds.includes(member.userId) && (
                            <span className="px-2 py-0.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded text-xs font-medium">
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--foreground-muted)]">
                          Target: ${member.targetAmount.toFixed(2)} ({percentOfTotal.toFixed(1)}% of total)
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[var(--foreground)]">
                        ${member.currentAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {memberProgress.toFixed(0)}% of personal target
                      </p>
                    </div>
                  </div>

                  {/* Member Progress Bar */}
                  <div className="w-full bg-[var(--surface-card)] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-primary-500)] transition-all duration-500 rounded-full"
                      style={{ width: `${memberProgress}%` }}
                    ></div>
                  </div>

                  {/* Admin Actions for this member */}
                  {groupWallet.adminUserIds.includes(userId) && member.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch(`/api/wallet/groups/${groupId}/admin`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ 
                                action: 'approve_member',
                                targetUserId: member.userId 
                              }),
                            });
                            const data = await res.json();
                            if (data.success) {
                              addToast(`${member.name} approved`, { type: 'success' });
                              fetchGroupWallet();
                            } else {
                              addToast(data.error || 'Failed to approve member', { type: 'error' });
                            }
                          } catch (error) {
                            addToast('An error occurred', { type: 'error' });
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-[var(--color-success-500)] text-white rounded-lg hover:bg-[var(--color-success-600)] transition-colors text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Reject ${member.name}'s membership?`)) {
                            try {
                              const res = await fetch(`/api/wallet/groups/${groupId}/admin`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ 
                                  action: 'reject_member',
                                  targetUserId: member.userId 
                                }),
                              });
                              const data = await res.json();
                              if (data.success) {
                                addToast(`${member.name} rejected`, { type: 'success' });
                                fetchGroupWallet();
                              } else {
                                addToast(data.error || 'Failed to reject member', { type: 'error' });
                              }
                            } catch (error) {
                              addToast('An error occurred', { type: 'error' });
                            }
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-[var(--color-danger-500)] text-white rounded-lg hover:bg-[var(--color-danger-600)] transition-colors text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contribution Analytics */}
        {stats && (
          <div className="bg-[var(--surface-card)] rounded-xl p-8 border border-[var(--surface-border)] mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Contribution Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-[var(--surface-bg)] rounded-lg">
                <p className="text-sm text-[var(--foreground-muted)] mb-1">Total Contributions</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">{stats.totalContributions}</p>
              </div>
              <div className="p-4 bg-[var(--surface-bg)] rounded-lg">
                <p className="text-sm text-[var(--foreground-muted)] mb-1">Average Amount</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  ${stats.averageContributionAmount.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-[var(--surface-bg)] rounded-lg">
                <p className="text-sm text-[var(--foreground-muted)] mb-1">Most Active</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {stats.mostActiveContributor.userName}
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  {stats.mostActiveContributor.contributionCount} contribution{stats.mostActiveContributor.contributionCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Member Contribution Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[var(--foreground)] mb-3">Member Breakdown</h3>
              {stats.memberStats.map((memberStat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[var(--surface-bg)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-sm font-bold text-[var(--color-primary-700)]">
                      {memberStat.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{memberStat.userName}</p>
                      <p className="text-xs text-[var(--foreground-muted)]">
                        {memberStat.contributionCount} contribution{memberStat.contributionCount !== 1 ? 's' : ''} • 
                        Avg: ${memberStat.averageContribution.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--foreground)]">
                      ${memberStat.totalContributed.toFixed(2)}
                    </p>
                    <p className="text-xs text-[var(--foreground-muted)]">
                      {memberStat.progressPercentage.toFixed(0)}% of target
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Feed */}
        <div className="bg-[var(--surface-card)] rounded-xl p-8 border border-[var(--surface-border)] mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Activity Feed</h2>
          {contributions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-[var(--foreground-muted)]">No contributions yet</p>
              <p className="text-sm text-[var(--foreground-muted)] mt-2">
                Be the first to contribute to this group wallet!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {contributions.slice(0, 10).map((contribution) => {
                const isMilestone = 
                  (groupWallet.currentTotal >= groupWallet.totalGoal * 0.25 && 
                   groupWallet.currentTotal - contribution.amount < groupWallet.totalGoal * 0.25) ||
                  (groupWallet.currentTotal >= groupWallet.totalGoal * 0.5 && 
                   groupWallet.currentTotal - contribution.amount < groupWallet.totalGoal * 0.5) ||
                  (groupWallet.currentTotal >= groupWallet.totalGoal * 0.75 && 
                   groupWallet.currentTotal - contribution.amount < groupWallet.totalGoal * 0.75) ||
                  (groupWallet.currentTotal >= groupWallet.totalGoal && 
                   groupWallet.currentTotal - contribution.amount < groupWallet.totalGoal);

                return (
                  <div
                    key={contribution.id}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                      isMilestone 
                        ? 'bg-[var(--color-success-50)] border-2 border-[var(--color-success-200)]' 
                        : 'bg-[var(--surface-bg)] border border-[var(--surface-border)]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-lg font-bold text-[var(--color-primary-700)] flex-shrink-0">
                      {contribution.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-[var(--foreground)]">
                            <span className="font-semibold">{contribution.userName}</span> contributed{" "}
                            <span className="font-bold text-[var(--color-success-600)]">
                              ${contribution.amount.toFixed(2)}
                            </span>
                          </p>
                          {isMilestone && (
                            <p className="text-sm text-[var(--color-success-700)] mt-1 flex items-center gap-1">
                              🎉 Milestone reached!
                            </p>
                          )}
                        </div>
                        <span className="text-sm text-[var(--foreground-muted)] whitespace-nowrap">
                          {getRelativeTime(contribution.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {contributions.length > 10 && (
                <p className="text-center text-sm text-[var(--foreground-muted)] pt-4">
                  Showing 10 most recent contributions of {contributions.length} total
                </p>
              )}
            </div>
          )}
        </div>

        {/* Group Info */}
        <div className="mt-6 bg-[var(--surface-card)] rounded-xl p-6 border border-[var(--surface-border)]">
          <h3 className="font-semibold text-[var(--foreground)] mb-4">Group Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--foreground-muted)]">Created:</span>
              <span className="text-[var(--foreground)]">
                {new Date(groupWallet.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--foreground-muted)]">Last Updated:</span>
              <span className="text-[var(--foreground)]">
                {new Date(groupWallet.updatedAt).toLocaleDateString()}
              </span>
            </div>
            {groupWallet.eventId && (
              <div className="flex justify-between">
                <span className="text-[var(--foreground-muted)]">Event ID:</span>
                <span className="text-[var(--foreground)] font-mono text-xs">
                  {groupWallet.eventId}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[var(--foreground-muted)]">Status:</span>
              <span className="text-[var(--foreground)] capitalize">{groupWallet.status}</span>
            </div>
          </div>
        </div>

        {/* Contribute Modal */}
        {showContributeModal && currentMember && (
          <ContributeModal
            groupId={groupId}
            memberName={currentMember.name}
            currentAmount={currentMember.currentAmount}
            targetAmount={currentMember.targetAmount}
            onClose={() => setShowContributeModal(false)}
            onSuccess={(amount: number) => {
              setShowContributeModal(false);
              fetchGroupWallet();
              fetchContributions();
              addToast(`Successfully contributed $${amount.toFixed(2)} to ${groupWallet.name}`, {
                type: "success",
                duration: 5000,
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

function ContributeModal({
  groupId,
  memberName,
  currentAmount,
  targetAmount,
  onClose,
  onSuccess,
}: {
  groupId: string;
  memberName: string;
  currentAmount: number;
  targetAmount: number;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const remaining = Math.max(0, targetAmount - currentAmount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const contributionAmount = parseFloat(amount);

    if (isNaN(contributionAmount) || contributionAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/wallet/groups/${groupId}/contribute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: contributionAmount }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess(contributionAmount);
      } else {
        setError(data.error || "Failed to contribute");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--surface-card)] rounded-xl max-w-md w-full">
        <div className="p-6 border-b border-[var(--surface-border)]">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Contribute</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-[var(--color-danger-100)] text-[var(--color-danger-700)] rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-[var(--surface-bg)] rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[var(--foreground-muted)]">Your Progress</span>
              <span className="text-sm font-medium text-[var(--foreground)]">
                ${currentAmount.toFixed(2)} / ${targetAmount.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-[var(--surface-card)] rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary-500)] rounded-full"
                style={{ width: `${Math.min((currentAmount / targetAmount) * 100, 100)}%` }}
              ></div>
            </div>
            {remaining > 0 && (
              <p className="text-sm text-[var(--foreground-muted)] mt-2">
                ${remaining.toFixed(2)} remaining to reach your target
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Contribution Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--surface-bg)] border border-[var(--surface-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-[var(--foreground)] text-lg"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
            />
            {remaining > 0 && (
              <button
                type="button"
                onClick={() => setAmount(remaining.toFixed(2))}
                className="mt-2 text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] font-medium"
              >
                Contribute remaining ${remaining.toFixed(2)}
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[var(--surface-bg)] text-[var(--foreground)] rounded-lg hover:bg-[var(--surface-hover)] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Contributing..." : "Contribute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
