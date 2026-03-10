"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import FollowButton from "@/components/users/FollowButton";
import FollowList from "@/components/users/FollowList";
import type { Event } from "@/lib/events";

type UserProfile = {
  userId: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  interests: string[];
  eventsAttended: string[];
  eventsOrganized: string[];
  followers: number;
  following: number;
  location?: {
    city: string;
    country: string;
  };
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt: number;
  updatedAt: number;
};

type ProfileData = {
  profile: UserProfile;
  attendedEvents: Event[];
  organizedEvents: Event[];
};

function ProfileContent() {
  const searchParams = useSearchParams();
  const viewingUserId = searchParams.get("userId"); // If viewing another user's profile
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersList, setShowFollowersList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  const isOwnProfile = !viewingUserId || viewingUserId === userId;

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    // Get user ID from cookies
    const cookies = document.cookie.split(";");
    const userIdCookie = cookies.find((c) => c.trim().startsWith("user_id="));
    if (userIdCookie) {
      const id = userIdCookie.split("=")[1];
      setUserId(id);
      // Fetch the profile of the user being viewed (or own profile)
      const targetUserId = viewingUserId || id;
      fetchProfile(targetUserId);
      
      // Check if following (only if viewing another user's profile)
      if (viewingUserId && viewingUserId !== id) {
        checkFollowStatus(viewingUserId);
      }
    } else {
      setLoading(false);
    }
  }, [viewingUserId]);

  const checkFollowStatus = async (targetUserId: string) => {
    try {
      const res = await fetch(`/api/users/${targetUserId}/follow`);
      const data = await res.json();
      if (data.success) {
        setIsFollowing(data.data.isFollowing);
      }
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const fetchProfile = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}/profile`);
      const data = await res.json();

      if (data.success) {
        setProfileData(data.data);
        // Initialize form fields
        const profile = data.data.profile;
        setDisplayName(profile.displayName || "");
        setBio(profile.bio || "");
        setInterests(profile.interests || []);
        setCity(profile.location?.city || "");
        setCountry(profile.location?.country || "");
        setTwitter(profile.socialLinks?.twitter || "");
        setInstagram(profile.socialLinks?.instagram || "");
        setLinkedin(profile.socialLinks?.linkedin || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userId) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/users/${userId}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          bio,
          interests,
          location: city || country ? { city, country } : undefined,
          socialLinks:
            twitter || instagram || linkedin
              ? { twitter, instagram, linkedin }
              : undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Refresh profile data
        await fetchProfile(userId);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
            <div className="h-48 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <p className="text-foreground-muted">Please log in to view your profile.</p>
          </Card>
        </div>
      </div>
    );
  }

  const profile = profileData?.profile;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            {isOwnProfile ? "My Profile" : `${profile?.displayName || "User"}'s Profile`}
          </h1>
          {isOwnProfile ? (
            !isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    // Reset form to current profile data
                    if (profile) {
                      setDisplayName(profile.displayName || "");
                      setBio(profile.bio || "");
                      setInterests(profile.interests || []);
                      setCity(profile.location?.city || "");
                      setCountry(profile.location?.country || "");
                      setTwitter(profile.socialLinks?.twitter || "");
                      setInstagram(profile.socialLinks?.instagram || "");
                      setLinkedin(profile.socialLinks?.linkedin || "");
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} loading={saving}>
                  Save Changes
                </Button>
              </div>
            )
          ) : (
            <FollowButton
              userId={viewingUserId!}
              initialIsFollowing={isFollowing}
              type={profile?.eventsOrganized && profile.eventsOrganized.length > 0 ? "organizer" : "user"}
              onFollowChange={(following) => {
                setIsFollowing(following);
                // Update follower count
                if (profileData?.profile) {
                  setProfileData({
                    ...profileData,
                    profile: {
                      ...profileData.profile,
                      followers: profileData.profile.followers + (following ? 1 : -1),
                    },
                  });
                }
              }}
            />
          )}
        </div>

        {/* Profile Info Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Profile Information
          </h2>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
              />

              <Textarea
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lagos"
                />
                <Input
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Nigeria"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Interests
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    placeholder="Add an interest..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                  />
                  <Button onClick={handleAddInterest} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {interest}
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="hover:text-primary-900 dark:hover:text-primary-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">
                  Social Links
                </h3>
                <Input
                  label="Twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@username"
                />
                <Input
                  label="Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@username"
                />
                <Input
                  label="LinkedIn"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/username"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground-muted mb-1">
                  Display Name
                </h3>
                <p className="text-foreground">
                  {profile?.displayName || "Not set"}
                </p>
              </div>

              {profile?.bio && (
                <div>
                  <h3 className="text-sm font-medium text-foreground-muted mb-1">
                    Bio
                  </h3>
                  <p className="text-foreground">{profile.bio}</p>
                </div>
              )}

              {profile?.location && (
                <div>
                  <h3 className="text-sm font-medium text-foreground-muted mb-1">
                    Location
                  </h3>
                  <p className="text-foreground">
                    {profile.location.city}
                    {profile.location.city && profile.location.country && ", "}
                    {profile.location.country}
                  </p>
                </div>
              )}

              {profile?.interests && profile.interests.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-foreground-muted mb-2">
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile?.socialLinks &&
                (profile.socialLinks.twitter ||
                  profile.socialLinks.instagram ||
                  profile.socialLinks.linkedin) && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground-muted mb-2">
                      Social Links
                    </h3>
                    <div className="space-y-1">
                      {profile.socialLinks.twitter && (
                        <p className="text-foreground">
                          Twitter: {profile.socialLinks.twitter}
                        </p>
                      )}
                      {profile.socialLinks.instagram && (
                        <p className="text-foreground">
                          Instagram: {profile.socialLinks.instagram}
                        </p>
                      )}
                      {profile.socialLinks.linkedin && (
                        <p className="text-foreground">
                          LinkedIn: {profile.socialLinks.linkedin}
                        </p>
                      )}
                    </div>
                  </div>
                )}

              <div className="flex gap-6 pt-4 border-t border-surface-border">
                <button
                  onClick={() => setShowFollowersList(true)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <p className="text-2xl font-bold text-foreground">
                    {profile?.followers || 0}
                  </p>
                  <p className="text-sm text-foreground-muted">Followers</p>
                </button>
                <button
                  onClick={() => setShowFollowingList(true)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <p className="text-2xl font-bold text-foreground">
                    {profile?.following || 0}
                  </p>
                  <p className="text-sm text-foreground-muted">Following</p>
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* Event Attendance History */}
        {profileData?.attendedEvents && profileData.attendedEvents.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Events Attended ({profileData.attendedEvents.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.attendedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-surface-border rounded-lg hover:border-primary-500 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-foreground-muted mb-2">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
                      {event.category}
                    </span>
                    <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-foreground rounded">
                      {event.city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Organized Events */}
        {profileData?.organizedEvents &&
          profileData.organizedEvents.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Events Organized ({profileData.organizedEvents.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.organizedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-surface-border rounded-lg hover:border-primary-500 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-foreground-muted mb-2">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300 rounded">
                        Organizer
                      </span>
                      <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-foreground rounded">
                        {event.city}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

        {/* Empty State */}
        {profileData &&
          profileData.attendedEvents.length === 0 &&
          profileData.organizedEvents.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-foreground-muted mb-4">
                {isOwnProfile 
                  ? "You haven't attended or organized any events yet."
                  : "This user hasn't attended or organized any events yet."}
              </p>
              {isOwnProfile && (
                <Button onClick={() => (window.location.href = "/explore")}>
                  Explore Events
                </Button>
              )}
            </Card>
          )}
      </div>

      {/* Follow Lists Modals */}
      {profile && (
        <>
          <FollowList
            userId={viewingUserId || userId || ""}
            type="followers"
            isOpen={showFollowersList}
            onClose={() => setShowFollowersList(false)}
          />
          <FollowList
            userId={viewingUserId || userId || ""}
            type="following"
            isOpen={showFollowingList}
            onClose={() => setShowFollowingList(false)}
          />
        </>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-8">Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
