"use client";
import React, { useState } from "react";
import Slider from "@/components/ui/Slider";

export default function SliderDemoPage() {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 80]);
  const [temperature, setTemperature] = useState(22);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);

  return (
    <div className="min-h-screen bg-surface-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Slider Component Demo
          </h1>
          <p className="text-lg text-foreground-muted">
            Range input component with single and dual handle modes
          </p>
        </div>

        <div className="space-y-12">
          {/* Single Value Sliders */}
          <section className="bg-surface-card rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Single Value Sliders
            </h2>

            <div className="space-y-8">
              {/* Basic Slider */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Basic Slider
                </h3>
                <Slider
                  label="Volume"
                  value={volume}
                  onChange={(v) => setVolume(v as number)}
                  showValue
                />
              </div>

              {/* Slider with Step Markers */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  With Step Markers
                </h3>
                <Slider
                  label="Brightness"
                  value={brightness}
                  onChange={(v) => setBrightness(v as number)}
                  showValue
                  showStepMarkers
                  step={25}
                />
              </div>

              {/* Custom Format */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Custom Value Format
                </h3>
                <Slider
                  label="Temperature"
                  value={temperature}
                  onChange={(v) => setTemperature(v as number)}
                  min={-10}
                  max={40}
                  step={1}
                  showValue
                  formatValue={(v) => `${v}°C`}
                />
              </div>

              {/* Disabled Slider */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Disabled State
                </h3>
                <Slider
                  label="Locked Setting"
                  value={50}
                  disabled
                  showValue
                />
              </div>
            </div>
          </section>

          {/* Range Sliders */}
          <section className="bg-surface-card rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Range Sliders (Dual Handles)
            </h2>

            <div className="space-y-8">
              {/* Basic Range */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Basic Range
                </h3>
                <Slider
                  mode="range"
                  label="Price Range"
                  value={priceRange}
                  onChange={(v) => setPriceRange(v as [number, number])}
                  showValue
                  formatValue={(v) => `$${v}`}
                />
              </div>

              {/* Range with Step Markers */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Range with Step Markers
                </h3>
                <Slider
                  mode="range"
                  label="Age Range"
                  value={ageRange}
                  onChange={(v) => setAgeRange(v as [number, number])}
                  min={0}
                  max={100}
                  step={5}
                  showValue
                  showStepMarkers
                  formatValue={(v) => `${v} years`}
                />
              </div>

              {/* Disabled Range */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Disabled Range
                </h3>
                <Slider
                  mode="range"
                  label="Fixed Range"
                  value={[30, 70]}
                  disabled
                  showValue
                />
              </div>
            </div>
          </section>

          {/* Interactive Examples */}
          <section className="bg-surface-card rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Interactive Examples
            </h2>

            <div className="space-y-8">
              {/* Volume Control */}
              <div className="bg-surface-hover rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">🔊</div>
                  <div className="flex-1">
                    <Slider
                      label="Volume Control"
                      value={volume}
                      onChange={(v) => setVolume(v as number)}
                      showValue
                    />
                  </div>
                </div>
                <p className="text-sm text-foreground-muted">
                  Current volume: {volume}%
                </p>
              </div>

              {/* Price Filter */}
              <div className="bg-surface-hover rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">💰</div>
                  <div className="flex-1">
                    <Slider
                      mode="range"
                      label="Price Filter"
                      value={priceRange}
                      onChange={(v) => setPriceRange(v as [number, number])}
                      min={0}
                      max={1000}
                      step={10}
                      showValue
                      formatValue={(v) => `$${v}`}
                    />
                  </div>
                </div>
                <p className="text-sm text-foreground-muted">
                  Showing items from ${priceRange[0]} to ${priceRange[1]}
                </p>
              </div>

              {/* Temperature Control */}
              <div className="bg-surface-hover rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">🌡️</div>
                  <div className="flex-1">
                    <Slider
                      label="Thermostat"
                      value={temperature}
                      onChange={(v) => setTemperature(v as number)}
                      min={15}
                      max={30}
                      step={0.5}
                      showValue
                      showStepMarkers
                      formatValue={(v) => `${v}°C`}
                    />
                  </div>
                </div>
                <p className="text-sm text-foreground-muted">
                  Target temperature: {temperature}°C
                </p>
              </div>
            </div>
          </section>

          {/* Usage Instructions */}
          <section className="bg-surface-card rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Usage Instructions
            </h2>

            <div className="space-y-4 text-foreground-muted">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Keyboard Controls
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Arrow Left/Down: Decrease value by step</li>
                  <li>Arrow Right/Up: Increase value by step</li>
                  <li>Home: Jump to minimum value</li>
                  <li>End: Jump to maximum value</li>
                  <li>Tab: Navigate between handles (range mode)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Mouse/Touch Controls
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Click/tap on track to jump to position</li>
                  <li>Drag handles to adjust values</li>
                  <li>Hover over handles for visual feedback</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Features
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Single value or range (dual handle) modes</li>
                  <li>Customizable min, max, and step values</li>
                  <li>Optional value labels and step markers</li>
                  <li>Custom value formatting</li>
                  <li>Fully keyboard accessible</li>
                  <li>Smooth animations and transitions</li>
                  <li>Disabled state support</li>
                  <li>Controlled and uncontrolled modes</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
