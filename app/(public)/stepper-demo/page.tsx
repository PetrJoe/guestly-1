"use client";
import React, { useState } from "react";
import Stepper, { Step } from "@/components/ui/Stepper";
import Button from "@/components/ui/Button";

export default function StepperDemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [verticalStep, setVerticalStep] = useState(1);

  const checkoutSteps: Step[] = [
    {
      label: "Select Tickets",
      description: "Choose your ticket type and quantity",
    },
    {
      label: "Your Details",
      description: "Enter your contact information",
    },
    {
      label: "Payment",
      description: "Complete your purchase",
    },
    {
      label: "Confirmation",
      description: "Get your tickets",
    },
  ];

  const eventCreationSteps: Step[] = [
    {
      label: "Basic Info",
      description: "Event name, date, and location",
    },
    {
      label: "Details",
      description: "Description, category, and images",
    },
    {
      label: "Tickets",
      description: "Set up ticket types and pricing",
    },
    {
      label: "Settings",
      description: "Configure additional options",
    },
    {
      label: "Review",
      description: "Review and publish your event",
    },
  ];

  const handleNext = () => {
    if (currentStep < checkoutSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVerticalNext = () => {
    if (verticalStep < eventCreationSteps.length - 1) {
      setVerticalStep(verticalStep + 1);
    }
  };

  const handleVerticalPrevious = () => {
    if (verticalStep > 0) {
      setVerticalStep(verticalStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Stepper Component Demo
          </h1>
          <p className="text-foreground-muted text-lg">
            Multi-step process indicator with completed, active, and upcoming states
          </p>
        </div>

        {/* Horizontal Stepper - Checkout Flow */}
        <section className="bg-surface-card rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Horizontal Stepper - Checkout Flow
          </h2>
          
          <div className="mb-8">
            <Stepper
              steps={checkoutSteps}
              currentStep={currentStep}
              orientation="horizontal"
              onStepClick={setCurrentStep}
              allowClickOnCompleted={true}
            />
          </div>

          {/* Step Content */}
          <div className="bg-surface-bg rounded-xl p-8 mb-6 min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {checkoutSteps[currentStep].label}
              </h3>
              <p className="text-foreground-muted">
                {checkoutSteps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <div className="text-sm text-foreground-muted">
              Step {currentStep + 1} of {checkoutSteps.length}
            </div>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentStep === checkoutSteps.length - 1}
            >
              {currentStep === checkoutSteps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </section>

        {/* Vertical Stepper - Event Creation */}
        <section className="bg-surface-card rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Vertical Stepper - Event Creation
          </h2>
          
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            {/* Stepper */}
            <div>
              <Stepper
                steps={eventCreationSteps}
                currentStep={verticalStep}
                orientation="vertical"
                onStepClick={setVerticalStep}
                allowClickOnCompleted={true}
              />
            </div>

            {/* Step Content */}
            <div className="bg-surface-bg rounded-xl p-8 flex items-center justify-center">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {eventCreationSteps[verticalStep].label}
                </h3>
                <p className="text-foreground-muted mb-6">
                  {eventCreationSteps[verticalStep].description}
                </p>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVerticalPrevious}
                    disabled={verticalStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleVerticalNext}
                    disabled={verticalStep === eventCreationSteps.length - 1}
                  >
                    {verticalStep === eventCreationSteps.length - 1 ? "Publish" : "Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Horizontal Stepper */}
        <section className="bg-surface-card rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Compact Stepper - Simple Steps
          </h2>
          
          <Stepper
            steps={[
              { label: "Cart" },
              { label: "Shipping" },
              { label: "Payment" },
              { label: "Complete" },
            ]}
            currentStep={2}
            orientation="horizontal"
          />
        </section>

        {/* Non-clickable Stepper */}
        <section className="bg-surface-card rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Non-clickable Stepper
          </h2>
          <p className="text-foreground-muted mb-6">
            Steps are not clickable (no onStepClick handler provided)
          </p>
          
          <Stepper
            steps={checkoutSteps}
            currentStep={1}
            orientation="horizontal"
            allowClickOnCompleted={false}
          />
        </section>

        {/* Features List */}
        <section className="bg-surface-card rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">✓ Visual States</h3>
              <p className="text-sm text-foreground-muted">
                Completed steps show checkmark, active step is highlighted, upcoming steps are grayed out
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">✓ Clickable Navigation</h3>
              <p className="text-sm text-foreground-muted">
                Click on completed steps to navigate back (configurable)
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">✓ Orientations</h3>
              <p className="text-sm text-foreground-muted">
                Supports both horizontal and vertical layouts
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">✓ Keyboard Accessible</h3>
              <p className="text-sm text-foreground-muted">
                Full keyboard navigation with visible focus indicators
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">✓ Smooth Animations</h3>
              <p className="text-sm text-foreground-muted">
                Transitions between states with smooth color and scale animations
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">✓ Design Tokens</h3>
              <p className="text-sm text-foreground-muted">
                Uses design system tokens for consistent styling and dark mode support
              </p>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="bg-surface-card rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">API Reference</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Props</h3>
              <div className="bg-surface-bg rounded-lg p-4 font-mono text-sm space-y-2">
                <div><span className="text-primary-500">steps</span>: Step[] - Array of step objects</div>
                <div><span className="text-primary-500">currentStep</span>: number - Current active step (0-indexed)</div>
                <div><span className="text-primary-500">orientation?</span>: &quot;horizontal&quot; | &quot;vertical&quot; - Layout direction</div>
                <div><span className="text-primary-500">onStepClick?</span>: (index: number) =&gt; void - Click handler</div>
                <div><span className="text-primary-500">allowClickOnCompleted?</span>: boolean - Enable clicking completed steps</div>
                <div><span className="text-primary-500">className?</span>: string - Additional CSS classes</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Step Interface</h3>
              <div className="bg-surface-bg rounded-lg p-4 font-mono text-sm space-y-2">
                <div><span className="text-primary-500">label</span>: string - Step label text</div>
                <div><span className="text-primary-500">description?</span>: string - Optional description</div>
                <div><span className="text-primary-500">icon?</span>: React.ReactNode - Custom icon (replaces checkmark)</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
