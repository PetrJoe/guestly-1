"use client";
import React from "react";
import EventCard from "@/components/events/EventCard";
import CategoryFilter from "@/components/events/CategoryFilter";
import CommunityFilter from "@/components/events/CommunityFilter";
import SearchBar from "@/components/events/SearchBar";
import TimeFilter, { TimeFilterValue } from "@/components/events/TimeFilter";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import { useScrollAnimation, useStaggeredAnimation } from "@/lib/hooks/useScrollAnimation";

type ApiEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  city: string;
  image: string;
};

type SortOption = "date" | "popularity" | "price" | "name";

export default function ExplorePage() {
  const [items, setItems] = React.useState<ApiEvent[]>([]);
  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [community, setCommunity] = React.useState<string | undefined>(undefined);
  const [communityType, setCommunityType] = React.useState<string | undefined>(undefined);
  const [timeFilter, setTimeFilter] = React.useState<TimeFilterValue>("all");
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [sortBy, setSortBy] = React.useState<SortOption>("date");
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: filtersRef, isVisible: filtersVisible } = useScrollAnimation();
  const { ref: gridRef, visibleItems } = useStaggeredAnimation(items.length);

  async function load(p = page, cat = category, sort = sortBy, query = q, comm = community, commType = communityType, timeF = timeFilter, start = startDate, end = endDate) {
    setIsTransitioning(true);
    setLoading(true);
    
    // Add a small delay for smooth transition effect
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (cat) params.set("category", cat);
    if (comm) params.set("community", comm);
    if (commType) params.set("communityType", commType);
    if (start) params.set("startDate", start.toISOString());
    if (end) params.set("endDate", end.toISOString());
    if (sort !== "date") params.set("sort", sort);
    params.set("page", String(p));
    params.set("pageSize", "9"); // Increased for better grid layout
    
    try {
      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setItems(data.data as ApiEvent[]);
        setPageCount(data.pageCount as number);
        setPage(p);
      }
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
      setIsTransitioning(false);
    }
  }

  React.useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSearch() {
    load(1, category, sortBy, q, community, communityType, timeFilter, startDate, endDate);
  }

  function onCategoryChange(cat: string) {
    setCategory(cat);
    load(1, cat, sortBy, q, community, communityType, timeFilter, startDate, endDate);
  }

  function onCommunityChange(comm: string | undefined) {
    setCommunity(comm);
    load(1, category, sortBy, q, comm, communityType, timeFilter, startDate, endDate);
  }

  function onCommunityTypeChange(commType: string | undefined) {
    setCommunityType(commType);
    load(1, category, sortBy, q, community, commType, timeFilter, startDate, endDate);
  }

  function onTimeFilterChange(value: TimeFilterValue, start?: Date | null, end?: Date | null) {
    setTimeFilter(value);
    setStartDate(start || null);
    setEndDate(end || null);
    load(1, category, sortBy, q, community, communityType, value, start || null, end || null);
  }

  function onSortChange(sort: SortOption) {
    setSortBy(sort);
    load(page, category, sort, q, community, communityType, timeFilter, startDate, endDate);
  }

  function onClearFilters() {
    setQ("");
    setCategory("");
    setCommunity(undefined);
    setCommunityType(undefined);
    setTimeFilter("all");
    setStartDate(null);
    setEndDate(null);
    setSortBy("date");
    load(1, "", "date", "", undefined, undefined, "all", null, null);
  }

  const hasActiveFilters = q || category || community || communityType || timeFilter !== "all" || sortBy !== "date";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--surface-bg)] via-[var(--surface-bg)] to-primary-50/20">
      <div className="container py-8 space-y-8">
        {/* Page heading with animation */}
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-[var(--ease-out)] ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)] bg-gradient-to-r from-[var(--foreground)] to-primary-600 bg-clip-text">
              Discover Amazing Events
            </h1>
            <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto leading-relaxed">
              Find your next unforgettable experience — from intimate gatherings to grand celebrations
            </p>
          </div>
        </div>

        {/* Filters section with animation */}
        <div
          ref={filtersRef}
          className={`transition-all duration-700 delay-200 ease-[var(--ease-out)] ${
            filtersVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar filters */}
            <div className="space-y-4">
              {/* Search card */}
              <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--surface-border)] p-4 shadow-[var(--elevation-1)]">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <span>🔍</span>
                  <span>Search</span>
                </h3>
                <SearchBar value={q} onChange={setQ} onSearch={onSearch} />
              </div>

              {/* Category card */}
              <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--surface-border)] p-4 shadow-[var(--elevation-1)]">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  <span>Category</span>
                  {category && (
                    <span className="ml-auto h-5 w-5 flex items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                      1
                    </span>
                  )}
                </h3>
                <CategoryFilter value={category} onChange={onCategoryChange} />
              </div>

              {/* Time filter card */}
              <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--surface-border)] p-4 shadow-[var(--elevation-1)]">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <span>📅</span>
                  <span>When</span>
                  {timeFilter !== "all" && (
                    <span className="ml-auto h-5 w-5 flex items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                      1
                    </span>
                  )}
                </h3>
                <TimeFilter
                  value={timeFilter}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={onTimeFilterChange}
                />
              </div>

              {/* Community filter card */}
              <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--surface-border)] p-4 shadow-[var(--elevation-1)]">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <span>👥</span>
                  <span>Community</span>
                  {(community || communityType) && (
                    <span className="ml-auto h-5 w-5 flex items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                      {[community, communityType].filter(Boolean).length}
                    </span>
                  )}
                </h3>
                <CommunityFilter
                  selectedCommunity={community}
                  selectedCommunityType={communityType}
                  onCommunityChange={onCommunityChange}
                  onCommunityTypeChange={onCommunityTypeChange}
                />
              </div>

              {/* Clear filters button */}
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="w-full h-11 px-4 rounded-xl text-sm font-semibold text-danger-600 hover:text-white hover:bg-danger-600 border border-danger-200 hover:border-danger-600 transition-all duration-[var(--duration-fast)] flex items-center justify-center gap-2"
                >
                  <span>✕</span>
                  <span>Clear all filters</span>
                </button>
              )}
            </div>

            {/* Main content area */}
            <div className="space-y-6">
              {/* Sort and results bar */}
              <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--surface-border)] px-6 py-4 shadow-[var(--elevation-1)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Results count */}
                  <div className={`transition-all duration-[var(--duration-normal)] ${
                    isTransitioning ? "opacity-50" : "opacity-100"
                  }`}>
                    {!loading && (
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-medium text-[var(--foreground)]">
                          {items.length === 0 
                            ? "No events found" 
                            : `${items.length} event${items.length === 1 ? "" : "s"}`
                          }
                        </p>
                        {hasActiveFilters && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {q && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                                <span>🔍</span>
                                <span>"{q.length > 20 ? q.slice(0, 20) + "..." : q}"</span>
                              </span>
                            )}
                            {category && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                                <span>🎯</span>
                                <span>{category}</span>
                              </span>
                            )}
                            {timeFilter !== "all" && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                                <span>📅</span>
                                <span>
                                  {timeFilter === "custom" 
                                    ? "Custom dates"
                                    : timeFilter.replace("-", " ")
                                  }
                                </span>
                              </span>
                            )}
                            {(community || communityType) && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                                <span>👥</span>
                                <span>{community || communityType}</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Sort dropdown and loading */}
                  <div className="flex items-center gap-3">
                    {(loading || isTransitioning) && (
                      <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
                        <span className="hidden sm:inline">Loading...</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <label htmlFor="sort" className="text-sm text-[var(--foreground-muted)] hidden sm:inline">
                        Sort by:
                      </label>
                      <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                        className="h-10 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3 text-sm font-medium text-[var(--foreground)] transition-all duration-[var(--duration-fast)] hover:border-primary-300 focus:border-primary-400 focus:outline-none focus:shadow-[var(--shadow-focus)] cursor-pointer"
                      >
                        <option value="date">📅 Date</option>
                        <option value="popularity">🔥 Popularity</option>
                        <option value="price">💰 Price</option>
                        <option value="name">🔤 Name</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Events grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse rounded-3xl bg-[var(--surface-card)] border border-[var(--surface-border)] shadow-[var(--elevation-1)]"
                      style={{
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="flex justify-center py-12">
                  <EmptyState
                    emoji="🔍"
                    title={
                      q 
                        ? `No events found for "${q}"` 
                        : category 
                        ? `No ${category.toLowerCase()} events found`
                        : "No events available"
                    }
                    description="Try adjusting your search or filters to find events."
                    action={hasActiveFilters ? {
                      label: "Clear filters",
                      onClick: onClearFilters
                    } : {
                      label: "Browse all events",
                      href: "/"
                    }}
                  />
                </div>
              ) : (
                <div
                  ref={gridRef}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {items.map((event, index) => (
                    <div
                      key={event.id}
                      className={`transition-all duration-700 ease-[var(--ease-out)] ${
                        visibleItems[index]
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-8 scale-95"
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <EventCard
                        id={event.id}
                        title={event.title}
                        description={event.description}
                        date={event.date}
                        city={event.city}
                        category={event.category}
                        image={event.image}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pageCount > 1 && !loading && (
                <div className="flex justify-center pt-4">
                  <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--surface-border)] p-2 shadow-[var(--elevation-1)]">
                    <Pagination
                      page={page}
                      pageCount={pageCount}
                      onPageChange={(p) => load(p, category, sortBy, q, community, communityType, timeFilter, startDate, endDate)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}