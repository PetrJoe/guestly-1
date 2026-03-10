"use client";

import { useState, useEffect } from "react";
import { VendorProfile } from "@/lib/store";
import { VendorCard } from "@/components/vendors/VendorCard";

type VendorCategory = VendorProfile["category"] | "All";
type VendorCity = "Lagos" | "Abuja" | "Accra" | "Nairobi" | "All";
type SortOption = "rating" | "popularity" | "name" | "default";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<VendorCategory>("All");
  const [selectedCity, setSelectedCity] = useState<VendorCity>("All");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: VendorCategory[] = [
    "All",
    "Sound",
    "Security",
    "Decoration",
    "Catering",
    "Photography",
    "Logistics",
  ];

  const cities: VendorCity[] = ["All", "Lagos", "Abuja", "Accra", "Nairobi"];

  useEffect(() => {
    fetchVendors();
  }, [selectedCategory, selectedCity, minRating, sortBy, searchQuery]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (selectedCity !== "All") {
        params.append("city", selectedCity);
      }
      if (minRating > 0) {
        params.append("minRating", minRating.toString());
      }
      if (sortBy !== "default") {
        params.append("sortBy", sortBy);
      }
      if (searchQuery) {
        params.append("q", searchQuery);
      }

      const response = await fetch(`/api/vendors?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setVendors(data.data);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupedVendors = categories.reduce((acc, category) => {
    if (category === "All") return acc;
    
    const categoryVendors = vendors.filter((v) => v.category === category);
    if (categoryVendors.length > 0) {
      acc[category] = categoryVendors;
    }
    return acc;
  }, {} as Record<string, VendorProfile[]>);

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vendor Directory
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl">
            Discover trusted event vendors across categories. From sound systems to catering,
            find the perfect partners for your event.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-surface-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search vendors by name, services, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground-muted mb-2">
              Category
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-primary-600 text-white"
                      : "bg-surface-card text-foreground-muted hover:bg-surface-hover"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Location and Rating Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground-muted mb-2">
                Location
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value as VendorCity)}
                className="w-full px-4 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === "All" ? "All Locations" : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground-muted mb-2">
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="0">All Ratings</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-foreground-muted mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="default">Default</option>
                <option value="rating">Highest Rated</option>
                <option value="popularity">Most Popular</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(selectedCategory !== "All" || selectedCity !== "All" || minRating > 0 || sortBy !== "default" || searchQuery) && (
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <span>Active filters:</span>
              {selectedCategory !== "All" && (
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                  {selectedCategory}
                </span>
              )}
              {selectedCity !== "All" && (
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                  {selectedCity}
                </span>
              )}
              {minRating > 0 && (
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                  {minRating}+ stars
                </span>
              )}
              {sortBy !== "default" && (
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                  Sort: {sortBy}
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                  &quot;{searchQuery}&quot;
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedCity("All");
                  setMinRating(0);
                  setSortBy("default");
                  setSearchQuery("");
                }}
                className="text-primary-600 hover:text-primary-700 underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Vendors List */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-foreground-muted">Loading vendors...</p>
            </div>
          </div>
        ) : vendors.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No vendors found
            </h3>
            <p className="text-foreground-muted">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : selectedCategory === "All" ? (
          // Show grouped by category when "All" is selected
          <div className="space-y-12">
            {Object.entries(groupedVendors).map(([category, categoryVendors]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="text-3xl">
                    {category === "Sound" && "🎵"}
                    {category === "Security" && "🛡️"}
                    {category === "Decoration" && "🎨"}
                    {category === "Catering" && "🍽️"}
                    {category === "Photography" && "📸"}
                    {category === "Logistics" && "🚚"}
                  </span>
                  {category}
                  <span className="text-sm font-normal text-foreground-muted">
                    ({categoryVendors.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryVendors.map((vendor) => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show flat list when specific category is selected
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {selectedCategory} Vendors ({vendors.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
