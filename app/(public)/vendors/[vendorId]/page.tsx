"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { VendorProfile, VendorReview } from "@/lib/store";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function VendorProfilePage() {
  const params = useParams();
  const vendorId = params.vendorId as string;

  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [reviews, setReviews] = useState<VendorReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [performance, setPerformance] = useState<{
    completedEvents: number;
    averageRating: number;
    reliabilityScore: number;
    acceptanceRate: number;
  } | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  });

  useEffect(() => {
    fetchVendorData();
  }, [vendorId]);

  const fetchVendorData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/${vendorId}`);
      const data = await response.json();

      if (data.success) {
        setVendor(data.data.vendor);
        setReviews(data.data.reviews);
      }

      // Fetch performance metrics
      const perfResponse = await fetch(`/api/vendors/${vendorId}/performance`);
      const perfData = await perfResponse.json();
      if (perfData.success) {
        setPerformance(perfData.data);
      }
    } catch (error) {
      console.error("Error fetching vendor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email or create a contact request
    alert("Contact request sent! The vendor will get back to you soon.");
    setShowContactModal(false);
    setContactForm({ name: "", email: "", phone: "", eventDate: "", message: "" });
  };

  const categoryIcons: Record<VendorProfile["category"], string> = {
    Sound: "🎵",
    Security: "🛡️",
    Decoration: "🎨",
    Catering: "🍽️",
    Photography: "📸",
    Logistics: "🚚",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-foreground-muted">Loading vendor profile...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Vendor Not Found</h2>
          <p className="text-foreground-muted mb-6">
            The vendor you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const averageRating = vendor.rating || 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="text-6xl">{categoryIcons[vendor.category]}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
                  <div className="flex items-center gap-4 text-primary-100">
                    <span className="flex items-center gap-1">
                      <span>📍</span>
                      {vendor.city}
                    </span>
                    <span>•</span>
                    <span>{vendor.category}</span>
                    {vendor.completedEvents && (
                      <>
                        <span>•</span>
                        <span>{vendor.completedEvents}+ Events Completed</span>
                      </>
                    )}
                  </div>
                </div>
                {vendor.subscription && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                    ⭐ Premium Vendor
                  </span>
                )}
              </div>

              {/* Rating Summary */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl">⭐</span>
                  <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                </div>
                <div className="text-primary-100">
                  <div className="text-lg font-medium">
                    {vendor.reviewCount || 0} Reviews
                  </div>
                  <div className="text-sm">Based on past events</div>
                </div>
              </div>

              <p className="text-lg text-primary-50 max-w-3xl">{vendor.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Section */}
            {vendor.portfolio && vendor.portfolio.length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Portfolio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {vendor.portfolio.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(img)}
                    >
                      <div className="w-full h-full flex items-center justify-center text-primary-600">
                        <span className="text-4xl">{categoryIcons[vendor.category]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Services & Pricing Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Services & Pricing</h2>
              
              {vendor.services && vendor.services.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Services Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vendor.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-surface-card border border-surface-border rounded-lg"
                      >
                        <span className="text-success-500">✓</span>
                        <span className="text-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {vendor.pricing && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Pricing Information</h3>
                  <p className="text-foreground-muted">{vendor.pricing}</p>
                </div>
              )}

              {vendor.rateCard && (
                <div>
                  <Button
                    variant="secondary"
                    onClick={() => window.open(vendor.rateCard, "_blank")}
                  >
                    📄 Download Rate Card
                  </Button>
                </div>
              )}
            </Card>

            {/* Reviews Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Reviews & Ratings</h2>

              {/* Rating Distribution */}
              <div className="mb-8 p-6 bg-surface-card rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-foreground mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-2xl ${
                            star <= averageRating ? "text-yellow-400" : "text-neutral-300"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <div className="text-foreground-muted">
                      Based on {vendor.reviewCount || 0} reviews
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ratingDistribution.map(({ star, count, percentage }) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-foreground-muted w-12">
                          {star} star
                        </span>
                        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-foreground-muted w-8 text-right">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-foreground-muted">
                    No reviews yet. Be the first to review this vendor!
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 border border-surface-border rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-foreground">
                            {review.userName}
                          </div>
                          <div className="text-sm text-foreground-muted">
                            {review.eventName}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-sm ${
                                star <= review.rating
                                  ? "text-yellow-400"
                                  : "text-neutral-300"
                              }`}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground-muted">{review.comment}</p>
                      <div className="text-xs text-foreground-muted mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-bold text-foreground mb-4">Get in Touch</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <div className="flex-1">
                    <div className="text-sm text-foreground-muted mb-1">Email</div>
                    <a
                      href={`mailto:${vendor.contactEmail}`}
                      className="text-primary-600 hover:text-primary-700 break-all"
                    >
                      {vendor.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div className="flex-1">
                    <div className="text-sm text-foreground-muted mb-1">Phone</div>
                    <a
                      href={`tel:${vendor.contactPhone}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {vendor.contactPhone}
                    </a>
                  </div>
                </div>

                {vendor.city && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div className="flex-1">
                      <div className="text-sm text-foreground-muted mb-1">Location</div>
                      <div className="text-foreground">{vendor.city}</div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => setShowContactModal(true)}
              >
                Send Inquiry
              </Button>

              <div className="mt-4 pt-4 border-t border-surface-border">
                <div className="text-sm text-foreground-muted text-center">
                  Response time: Usually within 24 hours
                </div>
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted">Events Completed</span>
                  <span className="font-semibold text-foreground">
                    {vendor.completedEvents || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted">Average Rating</span>
                  <span className="font-semibold text-foreground">
                    {averageRating.toFixed(1)} / 5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted">Total Reviews</span>
                  <span className="font-semibold text-foreground">
                    {vendor.reviewCount || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted">Category</span>
                  <span className="font-semibold text-foreground">{vendor.category}</span>
                </div>
              </div>
            </Card>

            {/* Performance Metrics Card */}
            {performance && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Performance</h3>
                <div className="space-y-4">
                  {/* Reliability Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground-muted">Reliability Score</span>
                      <span className="text-lg font-bold text-foreground">
                        {performance.reliabilityScore.toFixed(0)}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-card rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          performance.reliabilityScore >= 80
                            ? "bg-success-500"
                            : performance.reliabilityScore >= 60
                            ? "bg-warning-500"
                            : "bg-danger-500"
                        }`}
                        style={{ width: `${performance.reliabilityScore}%` }}
                      />
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">
                      {performance.reliabilityScore >= 80
                        ? "Excellent"
                        : performance.reliabilityScore >= 60
                        ? "Good"
                        : "Needs Improvement"}
                    </div>
                  </div>

                  {/* Acceptance Rate */}
                  <div className="pt-3 border-t border-surface-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Acceptance Rate</span>
                      <span className="font-semibold text-foreground">
                        {performance.acceptanceRate.toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">
                      Accepts most invitations
                    </div>
                  </div>

                  {/* Completed Events */}
                  <div className="pt-3 border-t border-surface-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Completed Events</span>
                      <span className="font-semibold text-foreground">
                        {performance.completedEvents}
                      </span>
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">
                      Successfully delivered services
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        open={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Contact Vendor"
        description="Send an inquiry to this vendor about your event"
      >
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <Input
            label="Your Name"
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.currentTarget.value })}
            required
          />
          <Input
            type="email"
            label="Email Address"
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.currentTarget.value })}
            required
          />
          <Input
            type="tel"
            label="Phone Number"
            value={contactForm.phone}
            onChange={(e) => setContactForm({ ...contactForm, phone: e.currentTarget.value })}
            required
          />
          <Input
            type="date"
            label="Event Date"
            value={contactForm.eventDate}
            onChange={(e) => setContactForm({ ...contactForm, eventDate: e.currentTarget.value })}
            required
          />
          <Textarea
            label="Message"
            value={contactForm.message}
            onChange={(e) => setContactForm({ ...contactForm, message: e.currentTarget.value })}
            placeholder="Tell the vendor about your event and requirements..."
            required
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowContactModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              Send Inquiry
            </Button>
          </div>
        </form>
      </Modal>

      {/* Image Modal */}
      {selectedImage && (
        <Modal
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          size="lg"
        >
          <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
            <span className="text-6xl text-primary-600">
              {categoryIcons[vendor.category]}
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
}
