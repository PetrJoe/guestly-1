"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type VendorProfile = {
  id: string;
  userId: string;
  businessName: string;
  category: string;
  description: string;
  services: string[];
  portfolio: string[];
  pricing: string;
  location: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  completedEvents: number;
};

export default function VendorProfilePage() {
  const [profile, setProfile] = React.useState<VendorProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  // Form state
  const [businessName, setBusinessName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [services, setServices] = React.useState("");
  const [pricing, setPricing] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");

  React.useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    try {
      const res = await fetch("/api/vendor/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setProfile(data.data);
          // Populate form
          setBusinessName(data.data.businessName);
          setCategory(data.data.category);
          setDescription(data.data.description);
          setServices(data.data.services.join(", "));
          setPricing(data.data.pricing);
          setLocation(data.data.location);
          setPhone(data.data.phone);
          setEmail(data.data.email);
          setWebsite(data.data.website || "");
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/vendor/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          category,
          description,
          services: services.split(",").map((s) => s.trim()).filter(Boolean),
          pricing,
          location,
          phone,
          email,
          website: website || undefined,
        }),
      });

      if (res.ok) {
        await loadProfile();
        setEditMode(false);
      } else {
        try {
          const data = await res.json();
          alert(data.error?.message || "Failed to save profile");
        } catch {
          alert("Failed to save profile");
        }
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!profile && !editMode) {
    return (
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 text-center">
          <div className="mb-4 text-5xl">👤</div>
          <h2 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
            No Profile Found
          </h2>
          <p className="mb-6 text-sm text-[var(--foreground-muted)]">
            Create your vendor profile to start receiving event invitations
          </p>
          <Button onClick={() => setEditMode(true)}>Create Profile</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Vendor Profile</h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            Manage your business information and portfolio
          </p>
        </div>
        {!editMode && (
          <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
        )}
      </div>

      {editMode ? (
        /* Edit Mode */
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
              Business Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.currentTarget.value)}
                placeholder="Your business name"
                required
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">Select category</option>
                  <option value="Sound & Lighting">Sound & Lighting</option>
                  <option value="Security">Security</option>
                  <option value="Decor">Decor</option>
                  <option value="Catering">Catering</option>
                  <option value="Photography">Photography</option>
                  <option value="Videography">Videography</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your services and experience"
                  rows={4}
                  className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <Input
                label="Services (comma-separated)"
                value={services}
                onChange={(e) => setServices(e.currentTarget.value)}
                placeholder="e.g., DJ Services, Sound System, Lighting"
              />
              <Input
                label="Pricing"
                value={pricing}
                onChange={(e) => setPricing(e.currentTarget.value)}
                placeholder="e.g., ₦50,000 - ₦200,000"
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
              Contact Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
                placeholder="City, State"
                required
              />
              <Input
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
                placeholder="+234 XXX XXX XXXX"
                required
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="your@email.com"
                required
              />
              <Input
                label="Website (optional)"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.currentTarget.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSave} loading={saving} disabled={saving}>
              Save Changes
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setEditMode(false);
                loadProfile();
              }}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        /* View Mode */
        <div className="space-y-6">
          <Card className="p-6">
            <div className="mb-6 flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500/20 text-3xl font-bold text-primary-600">
                {profile?.businessName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  {profile?.businessName}
                </h2>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                  {profile?.category}
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <svg className="h-5 w-5 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      {profile?.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-[var(--foreground-muted)]">
                      ({profile?.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="text-sm text-[var(--foreground-muted)]">
                    {profile?.completedEvents} events completed
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
                  About
                </h3>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {profile?.description}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
                  Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile?.services.map((service, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-600"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
                  Pricing
                </h3>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {profile?.pricing}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-[var(--foreground)]">{profile?.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-[var(--foreground)]">{profile?.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-[var(--foreground)]">{profile?.email}</span>
              </div>
              {profile?.website && (
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
