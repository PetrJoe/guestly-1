"use client";
import React, { useState, useEffect } from "react";
import Progress from "@/components/ui/Progress";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ProgressDemoPage() {
  const [linearValue, setLinearValue] = useState(0);
  const [circularValue, setCircularValue] = useState(0);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLinearValue((prev) => (prev >= 100 ? 0 : prev + 10));
      setCircularValue((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface-bg py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Progress Component Demo
          </h1>
          <p className="text-foreground-muted">
            Testing linear and circular progress indicators with various states
          </p>
        </div>

        <div className="space-y-8">
          {/* Linear Progress - Basic */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Linear Progress - Basic
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-foreground-muted mb-2">Small size</p>
                <Progress variant="linear" value={25} size="sm" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted mb-2">Medium size (default)</p>
                <Progress variant="linear" value={50} size="md" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted mb-2">Large size</p>
                <Progress variant="linear" value={75} size="lg" />
              </div>
            </div>
          </Card>

          {/* Linear Progress - With Percentage */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Linear Progress - With Percentage
            </h2>
            <div className="space-y-6">
              <Progress
                variant="linear"
                value={linearValue}
                showPercentage
                label="Upload Progress"
              />
              <Progress
                variant="linear"
                value={65}
                showPercentage
                label="Profile Completion"
                color="success"
              />
              <Progress
                variant="linear"
                value={30}
                showPercentage
                label="Storage Used"
                color="warning"
              />
              <Progress
                variant="linear"
                value={90}
                showPercentage
                label="Quota Exceeded"
                color="danger"
              />
            </div>
          </Card>

          {/* Linear Progress - Indeterminate */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Linear Progress - Indeterminate (Loading)
            </h2>
            <div className="space-y-6">
              <Progress variant="linear" label="Loading..." />
              <Progress variant="linear" color="success" label="Processing..." />
              <Progress variant="linear" color="warning" size="lg" label="Analyzing..." />
            </div>
          </Card>

          {/* Circular Progress - Basic */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Circular Progress - Basic
            </h2>
            <div className="flex flex-wrap gap-8">
              <Progress variant="circular" value={25} size="sm" />
              <Progress variant="circular" value={50} size="md" />
              <Progress variant="circular" value={75} size="lg" />
            </div>
          </Card>

          {/* Circular Progress - With Percentage */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Circular Progress - With Percentage
            </h2>
            <div className="flex flex-wrap gap-8">
              <Progress
                variant="circular"
                value={circularValue}
                showPercentage
                size="sm"
                label="Small"
              />
              <Progress
                variant="circular"
                value={circularValue}
                showPercentage
                size="md"
                label="Medium"
                color="success"
              />
              <Progress
                variant="circular"
                value={circularValue}
                showPercentage
                size="lg"
                label="Large"
                color="warning"
              />
            </div>
          </Card>

          {/* Circular Progress - Colors */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Circular Progress - Color Variants
            </h2>
            <div className="flex flex-wrap gap-8">
              <Progress
                variant="circular"
                value={60}
                showPercentage
                color="primary"
                label="Primary"
              />
              <Progress
                variant="circular"
                value={75}
                showPercentage
                color="success"
                label="Success"
              />
              <Progress
                variant="circular"
                value={45}
                showPercentage
                color="warning"
                label="Warning"
              />
              <Progress
                variant="circular"
                value={90}
                showPercentage
                color="danger"
                label="Danger"
              />
            </div>
          </Card>

          {/* Circular Progress - Indeterminate */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Circular Progress - Indeterminate (Loading)
            </h2>
            <div className="flex flex-wrap gap-8">
              <Progress variant="circular" size="sm" label="Loading" />
              <Progress variant="circular" size="md" color="success" label="Processing" />
              <Progress variant="circular" size="lg" color="warning" label="Analyzing" />
            </div>
          </Card>

          {/* Interactive Demo */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Interactive Demo
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Manual Control: {linearValue}%
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLinearValue(Math.max(0, linearValue - 10))}
                    >
                      -10%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLinearValue(Math.min(100, linearValue + 10))}
                    >
                      +10%
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setLinearValue(0)}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                <Progress variant="linear" value={linearValue} showPercentage />
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Circular: {circularValue}%
                    </span>
                  </div>
                  <Progress
                    variant="circular"
                    value={circularValue}
                    showPercentage
                    size="lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCircularValue(Math.max(0, circularValue - 10))}
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCircularValue(Math.min(100, circularValue + 10))}
                  >
                    +10%
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCircularValue(0)}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Real-world Examples */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Real-world Use Cases
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  File Upload
                </h3>
                <Progress
                  variant="linear"
                  value={45}
                  showPercentage
                  label="event-banner.jpg"
                  color="primary"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Event Setup Progress
                </h3>
                <Progress
                  variant="linear"
                  value={80}
                  showPercentage
                  label="4 of 5 steps completed"
                  color="success"
                  size="lg"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Ticket Sales
                </h3>
                <div className="flex items-center gap-6">
                  <Progress
                    variant="circular"
                    value={67}
                    showPercentage
                    size="lg"
                    color="success"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      200 of 300 tickets sold
                    </p>
                    <p className="text-xs text-foreground-muted">
                      Only 100 tickets remaining
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
