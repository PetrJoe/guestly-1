"use client";
import React from "react";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import DateRangeFilter, { RangeKey } from "@/components/charts/DateRangeFilter";
import { RevenueWidget } from "@/components/organiser/widgets/RevenueWidget";
import { AnalyticsWidget, AnalyticsShowcase } from "@/components/organiser/widgets/AnalyticsWidget";
import Card from "@/components/ui/Card";

export default function AnalyticsDemoPage() {
  const [timeRange, setTimeRange] = React.useState<RangeKey>('30d');
  const [isLoading, setIsLoading] = React.useState(false);

  // Simulate data changes when time range changes
  const generateData = (range: RangeKey) => {
    const multiplier = range === '7d' ? 0.7 : range === '14d' ? 0.85 : range === '30d' ? 1 : 1.2;
    
    return {
      barData: [
        { label: 'Jan', value: Math.round(1200 * multiplier) },
        { label: 'Feb', value: Math.round(1900 * multiplier) },
        { label: 'Mar', value: Math.round(1500 * multiplier) },
        { label: 'Apr', value: Math.round(2200 * multiplier) },
        { label: 'May', value: Math.round(1800 * multiplier) },
        { label: 'Jun', value: Math.round(2500 * multiplier) },
      ],
      lineData: [
        { label: 'Week 1', value: Math.round(450 * multiplier) },
        { label: 'Week 2', value: Math.round(680 * multiplier) },
        { label: 'Week 3', value: Math.round(520 * multiplier) },
        { label: 'Week 4', value: Math.round(890 * multiplier) },
        { label: 'Week 5', value: Math.round(750 * multiplier) },
        { label: 'Week 6', value: Math.round(920 * multiplier) },
      ],
      pieData: [
        { label: 'Online Sales', value: Math.round(65 * multiplier) },
        { label: 'Referrals', value: Math.round(25 * multiplier) },
        { label: 'Direct', value: Math.round(10 * multiplier) },
      ],
      revenueData: [
        { month: 'Jan', pct: Math.round(45 * multiplier), val: `₦${(450 * multiplier / 1000).toFixed(0)}K` },
        { month: 'Feb', pct: Math.round(65 * multiplier), val: `₦${(650 * multiplier / 1000).toFixed(0)}K` },
        { month: 'Mar', pct: Math.round(55 * multiplier), val: `₦${(550 * multiplier / 1000).toFixed(0)}K` },
        { month: 'Apr', pct: Math.round(80 * multiplier), val: `₦${(800 * multiplier / 1000).toFixed(0)}K` },
        { month: 'May', pct: Math.round(70 * multiplier), val: `₦${(700 * multiplier / 1000).toFixed(0)}K` },
        { month: 'Jun', pct: Math.round(100 * multiplier), val: `₦${(1200 * multiplier / 1000).toFixed(1)}M` },
      ]
    };
  };

  const [data, setData] = React.useState(() => generateData('30d'));

  const handleTimeRangeChange = async (newRange: RangeKey) => {
    setIsLoading(true);
    setTimeRange(newRange);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setData(generateData(newRange));
    setIsLoading(false);
  };

  const getRangeLabel = (range: RangeKey) => {
    switch (range) {
      case '7d': return '7 days';
      case '14d': return '14 days';
      case '30d': return '30 days';
      case 'all': return 'all time';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
            Enhanced Analytics with Smooth Transitions
          </h1>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Experience seamless data transitions, loading states, and optimistic UI updates
          </p>
        </div>

        {/* Interactive Time Range Demo */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6 text-center">
            Interactive Time Range Transitions
          </h2>
          
          {/* Time Range Filter */}
          <div className="flex justify-center mb-8">
            <DateRangeFilter 
              value={timeRange}
              onChange={handleTimeRangeChange}
              loading={isLoading}
            />
          </div>

          {/* Revenue Widget with Transitions */}
          <div className="mb-8">
            <RevenueWidget 
              data={data.revenueData}
              total={`₦${(4.35 * (timeRange === '7d' ? 0.7 : timeRange === '14d' ? 0.85 : timeRange === '30d' ? 1 : 1.2)).toFixed(1)}M`}
              title="Revenue Overview"
              subtitle={`Last ${getRangeLabel(timeRange)} with smooth transitions`}
              loading={isLoading}
              enableTransitions={true}
            />
          </div>

          {/* Analytics Widgets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnalyticsWidget 
              data={{
                title: 'Monthly Revenue',
                subtitle: `Last ${getRangeLabel(timeRange)}`,
                value: `₦${(2.4 * (timeRange === '7d' ? 0.7 : timeRange === '14d' ? 0.85 : timeRange === '30d' ? 1 : 1.2)).toFixed(1)}M`,
                change: 12.5,
                trend: 'up' as const,
                chartType: 'bar' as const,
                chartData: data.barData,
              }}
              loading={isLoading}
              enableTransitions={true}
            />
            <AnalyticsWidget 
              data={{
                title: 'Weekly Attendance',
                subtitle: 'Current period',
                value: Math.round(3295 * (timeRange === '7d' ? 0.7 : timeRange === '14d' ? 0.85 : timeRange === '30d' ? 1 : 1.2)),
                change: -5.2,
                trend: 'down' as const,
                chartType: 'line' as const,
                chartData: data.lineData,
              }}
              loading={isLoading}
              enableTransitions={true}
            />
            <AnalyticsWidget 
              data={{
                title: 'Traffic Sources',
                subtitle: 'Distribution',
                value: '100%',
                chartType: 'pie' as const,
                chartData: data.pieData,
              }}
              loading={isLoading}
              enableTransitions={true}
            />
          </div>
        </div>

        {/* Static Analytics Showcase */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
            Complete Analytics Widgets
          </h2>
          <AnalyticsShowcase />
        </div>

        {/* Individual Chart Components */}
        <div className="space-y-12">
          {/* Bar Chart */}
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
              Enhanced Bar Chart
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card padding="md">
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">
                  With Gradients & Animation
                </h3>
                <BarChart 
                  data={data.barData} 
                  height={250}
                  animated={true}
                  gradient={true}
                />
              </Card>
              <Card padding="md">
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">
                  Solid Colors
                </h3>
                <BarChart 
                  data={data.barData.map((d, i) => ({
                    ...d,
                    color: ['var(--color-primary-500)', 'var(--color-success-500)', 'var(--color-warning-500)', 'var(--color-danger-500)', 'var(--color-navy-500)', 'var(--color-primary-400)'][i]
                  }))} 
                  height={250}
                  animated={true}
                  gradient={false}
                />
              </Card>
            </div>
          </div>

          {/* Line Chart */}
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
              Enhanced Line Chart
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card padding="md">
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">
                  Primary Color with Area
                </h3>
                <LineChart 
                  data={data.lineData} 
                  height={250}
                  color="var(--color-primary-500)"
                  showArea={true}
                  animated={true}
                  gradient={true}
                />
              </Card>
              <Card padding="md">
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">
                  Success Color Line Only
                </h3>
                <LineChart 
                  data={data.lineData} 
                  height={250}
                  color="var(--color-success-500)"
                  showArea={false}
                  animated={true}
                  gradient={false}
                />
              </Card>
            </div>
          </div>

          {/* Pie Chart */}
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">
              Enhanced Pie Chart
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card padding="md">
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">
                  With Gradients & Animation
                </h3>
                <div className="flex justify-center">
                  <PieChart 
                    data={data.pieData} 
                    size={280}
                    animated={true}
                    gradient={true}
                  />
                </div>
              </Card>
              <Card padding="md">
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">
                  Custom Colors
                </h3>
                <div className="flex justify-center">
                  <PieChart 
                    data={data.pieData.map((d, i) => ({
                      ...d,
                      color: ['var(--color-danger-500)', 'var(--color-warning-500)', 'var(--color-navy-500)'][i]
                    }))} 
                    size={280}
                    animated={true}
                    gradient={false}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-8">
            Enhanced Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card padding="md" className="text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Brand Colors</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Uses Guestly brand color palette with proper contrast
              </p>
            </Card>
            <Card padding="md" className="text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Smooth Transitions</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Seamless data transitions with loading states and progress indicators
              </p>
            </Card>
            <Card padding="md" className="text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Interactive Tooltips</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Hover tooltips with glass morphism effects
              </p>
            </Card>
            <Card padding="md" className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Optimistic UI</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Instant feedback with optimistic updates and smooth rollbacks
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}