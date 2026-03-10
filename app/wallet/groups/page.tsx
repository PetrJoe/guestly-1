"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GroupNotificationBell from "@/components/wallet/GroupNotificationBell";
import type { GroupWallet } from "@/lib/store";

export default function GroupWalletsPage() {
  const router = useRouter();
  const [groupWallets, setGroupWallets] = useState<GroupWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchGroupWallets();
  }, []);

  const fetchGroupWallets = async () => {
    try {
      const res = await fetch("/api/wallet/groups");
      const data = await res.json();
      if (data.success) {
        setGroupWallets(data.data);
      }
    } catch (error) {
      console.error("Error fetching group wallets:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (current: number, goal: number) => {
    return goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-bg)] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-[var(--surface-card)] rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-[var(--surface-card)] rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
              Group Wallets
            </h1>
            <p className="text-[var(--foreground-muted)]">
              Save together with friends and family for events
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <GroupNotificationBell />
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors font-medium"
            >
              Create Group
            </button>
          </div>
        </div>

        {/* Group Wallets List */}
        {groupWallets.length === 0 ? (
          <div className="bg-[var(--surface-card)] rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              No group wallets yet
            </h3>
            <p className="text-[var(--foreground-muted)] mb-6">
              Create a group wallet to save together with friends and family
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors font-medium"
            >
              Create Your First Group
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {groupWallets.map((group) => {
              const progress = calculateProgress(group.currentTotal, group.totalGoal);
              const isCompleted = group.status === "completed";
              const isCancelled = group.status === "cancelled";

              return (
                <Link
                  key={group.id}
                  href={`/wallet/groups/${group.id}`}
                  className="block bg-[var(--surface-card)] rounded-xl p-6 hover:shadow-lg transition-shadow border border-[var(--surface-border)]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-[var(--foreground)]">
                          {group.name}
                        </h3>
                        {/* Group Type Badge */}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          group.groupType === 'friends' 
                            ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]'
                            : group.groupType === 'family'
                            ? 'bg-[var(--color-success-100)] text-[var(--color-success-700)]'
                            : 'bg-[var(--color-warning-100)] text-[var(--color-warning-700)]'
                        }`}>
                          {group.groupType === 'friends' && '👥'}
                          {group.groupType === 'family' && '👨‍👩‍👧‍👦'}
                          {group.groupType === 'corporate' && '🏢'}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {group.members.length} member{group.members.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <span className="px-3 py-1 bg-[var(--color-success-100)] text-[var(--color-success-700)] rounded-full text-sm font-medium">
                          ✓ Completed
                        </span>
                      )}
                      {isCancelled && (
                        <span className="px-3 py-1 bg-[var(--color-neutral-200)] text-[var(--color-neutral-700)] rounded-full text-sm font-medium">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-[var(--foreground)]">
                        ${group.currentTotal.toFixed(2)}
                      </span>
                      <span className="text-sm text-[var(--foreground-muted)]">
                        of ${group.totalGoal.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--surface-bg)] rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-[var(--foreground-muted)] mt-2">
                      {progress.toFixed(0)}% funded
                    </p>
                  </div>

                  {/* Members Preview */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--foreground-muted)]">Members:</span>
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 5).map((member, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full bg-[var(--color-primary-100)] border-2 border-[var(--surface-card)] flex items-center justify-center text-xs font-medium text-[var(--color-primary-700)]"
                          title={member.name}
                        >
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      ))}
                      {group.members.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-[var(--color-neutral-200)] border-2 border-[var(--surface-card)] flex items-center justify-center text-xs font-medium text-[var(--color-neutral-700)]">
                          +{group.members.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <CreateGroupModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
              fetchGroupWallets();
            }}
          />
        )}
      </div>
    </div>
  );
}

function CreateGroupModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [eventId, setEventId] = useState("");
  const [groupType, setGroupType] = useState<'friends' | 'family' | 'corporate'>('friends');
  const [adminUserIds, setAdminUserIds] = useState<string[]>([]);
  const [newAdminId, setNewAdminId] = useState("");
  const [permissions, setPermissions] = useState({
    allowMemberInvites: true,
    requireApproval: false,
    allowTargetChanges: true,
    allowMemberRemoval: false,
  });
  const [members, setMembers] = useState<Array<{ userId: string; name: string; targetAmount: number }>>([
    { userId: "", name: "", targetAmount: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update permissions when group type changes
  const handleGroupTypeChange = (type: 'friends' | 'family' | 'corporate') => {
    setGroupType(type);
    
    // Set default permissions based on group type
    switch (type) {
      case 'friends':
        setPermissions({
          allowMemberInvites: true,
          requireApproval: false,
          allowTargetChanges: true,
          allowMemberRemoval: false,
        });
        break;
      case 'family':
        setPermissions({
          allowMemberInvites: true,
          requireApproval: false,
          allowTargetChanges: true,
          allowMemberRemoval: true,
        });
        break;
      case 'corporate':
        setPermissions({
          allowMemberInvites: false,
          requireApproval: true,
          allowTargetChanges: false,
          allowMemberRemoval: true,
        });
        break;
    }
  };

  const addMember = () => {
    setMembers([...members, { userId: "", name: "", targetAmount: 0 }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: string, value: string | number) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const addAdmin = () => {
    if (newAdminId.trim() && !adminUserIds.includes(newAdminId.trim())) {
      setAdminUserIds([...adminUserIds, newAdminId.trim()]);
      setNewAdminId("");
    }
  };

  const removeAdmin = (adminId: string) => {
    setAdminUserIds(adminUserIds.filter(id => id !== adminId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name.trim()) {
      setError("Group name is required");
      return;
    }

    const validMembers = members.filter(
      (m) => m.userId.trim() && m.name.trim() && m.targetAmount > 0
    );

    if (validMembers.length === 0) {
      setError("At least one valid member is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/wallet/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          eventId: eventId || undefined,
          groupType,
          adminUserIds: adminUserIds.length > 0 ? adminUserIds : undefined,
          permissions,
          members: validMembers,
        }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || "Failed to create group wallet");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--surface-card)] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[var(--surface-border)]">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Create Group Wallet</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-[var(--color-danger-100)] text-[var(--color-danger-700)] rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Group Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--surface-bg)] border border-[var(--surface-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-[var(--foreground)]"
              placeholder="e.g., Tech Summit Group"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Group Type *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleGroupTypeChange('friends')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  groupType === 'friends'
                    ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                    : 'border-[var(--surface-border)] bg-[var(--surface-bg)]'
                }`}
              >
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium text-[var(--foreground)]">Friends</div>
                <div className="text-xs text-[var(--foreground-muted)] mt-1">
                  Equal targets, anyone can invite
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleGroupTypeChange('family')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  groupType === 'family'
                    ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                    : 'border-[var(--surface-border)] bg-[var(--surface-bg)]'
                }`}
              >
                <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                <div className="font-medium text-[var(--foreground)]">Family</div>
                <div className="text-xs text-[var(--foreground-muted)] mt-1">
                  Flexible targets, creator is admin
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleGroupTypeChange('corporate')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  groupType === 'corporate'
                    ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                    : 'border-[var(--surface-border)] bg-[var(--surface-bg)]'
                }`}
              >
                <div className="text-2xl mb-2">🏢</div>
                <div className="font-medium text-[var(--foreground)]">Corporate</div>
                <div className="text-xs text-[var(--foreground-muted)] mt-1">
                  Multiple admins, approval workflow
                </div>
              </button>
            </div>
          </div>

          {groupType === 'corporate' && (
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Additional Admins (Optional)
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAdminId}
                    onChange={(e) => setNewAdminId(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[var(--surface-bg)] border border-[var(--surface-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-[var(--foreground)] text-sm"
                    placeholder="User ID"
                  />
                  <button
                    type="button"
                    onClick={addAdmin}
                    className="px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
                {adminUserIds.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {adminUserIds.map((adminId) => (
                      <div
                        key={adminId}
                        className="flex items-center gap-2 px-3 py-1 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm"
                      >
                        <span>{adminId}</span>
                        <button
                          type="button"
                          onClick={() => removeAdmin(adminId)}
                          className="hover:text-[var(--color-danger-500)]"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
              Permissions
            </label>
            <div className="space-y-2 bg-[var(--surface-bg)] p-4 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.allowMemberInvites}
                  onChange={(e) => setPermissions({ ...permissions, allowMemberInvites: e.target.checked })}
                  className="w-4 h-4 text-[var(--color-primary-500)] rounded focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
                <span className="text-sm text-[var(--foreground)]">Allow members to invite others</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.requireApproval}
                  onChange={(e) => setPermissions({ ...permissions, requireApproval: e.target.checked })}
                  className="w-4 h-4 text-[var(--color-primary-500)] rounded focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
                <span className="text-sm text-[var(--foreground)]">Require admin approval for new members</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.allowTargetChanges}
                  onChange={(e) => setPermissions({ ...permissions, allowTargetChanges: e.target.checked })}
                  className="w-4 h-4 text-[var(--color-primary-500)] rounded focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
                <span className="text-sm text-[var(--foreground)]">Allow members to change their own targets</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.allowMemberRemoval}
                  onChange={(e) => setPermissions({ ...permissions, allowMemberRemoval: e.target.checked })}
                  className="w-4 h-4 text-[var(--color-primary-500)] rounded focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
                <span className="text-sm text-[var(--foreground)]">Allow admins to remove members</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Event ID (Optional)
            </label>
            <input
              type="text"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--surface-bg)] border border-[var(--surface-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-[var(--foreground)]"
              placeholder="evt-xxx"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Members * {!permissions.allowTargetChanges && <span className="text-xs text-[var(--foreground-muted)]">(Targets can be set by admins later)</span>}
              </label>
              <button
                type="button"
                onClick={addMember}
                className="text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] font-medium"
              >
                + Add Member
              </button>
            </div>

            <div className="space-y-4">
              {members.map((member, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={member.userId}
                      onChange={(e) => updateMember(index, "userId", e.target.value)}
                      className="px-3 py-2 bg-[var(--surface-bg)] border border-[var(--surface-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-[var(--foreground)] text-sm"
                      placeholder="User ID"
                    />
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(index, "name", e.target.value)}
                      className="px-3 py-2 bg-[var(--surface-bg)] border border-[var(--surface-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-[var(--foreground)] text-sm"
                      placeholder="Name"
                    />
                    <input
                      type="number"
                      value={member.targetAmount || ""}
                      onChange={(e) => updateMember(index, "targetAmount", parseFloat(e.target.value) || 0)}
                      className="px-3 py-2 bg-[var(--surface-bg)] border border-[var(--surface-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-[var(--foreground)] text-sm"
                      placeholder="Target $"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="p-2 text-[var(--color-danger-500)] hover:bg-[var(--color-danger-100)] rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
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
              {loading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
