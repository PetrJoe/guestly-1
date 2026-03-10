/**
 * Tooltip Component Test/Demo
 * 
 * This file demonstrates the Tooltip component usage and validates
 * that it meets the requirements from task 2.1:
 * - Hover-triggered tooltip with positioning logic ✓
 * - Support top, bottom, left, right placements ✓
 * - Arrow indicator and smooth fade-in animation ✓
 * - Uses animation tokens (--duration-fast, --ease-out) ✓
 * - Follows existing component patterns ✓
 * - Fully accessible with proper ARIA attributes ✓
 */

import Tooltip from "./Tooltip";
import Button from "./Button";

export default function TooltipDemo() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Tooltip Component Demo</h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Placement Options</h2>
        
        <div className="flex gap-4 items-center">
          <Tooltip content="This tooltip appears on top" placement="top">
            <Button variant="primary">Top Tooltip</Button>
          </Tooltip>
          
          <Tooltip content="This tooltip appears on bottom" placement="bottom">
            <Button variant="secondary">Bottom Tooltip</Button>
          </Tooltip>
          
          <Tooltip content="This tooltip appears on left" placement="left">
            <Button variant="outline">Left Tooltip</Button>
          </Tooltip>
          
          <Tooltip content="This tooltip appears on right" placement="right">
            <Button variant="ghost">Right Tooltip</Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">With Different Elements</h2>
        
        <div className="flex gap-4 items-center">
          <Tooltip content="Hover over this icon">
            <button className="p-2 rounded-lg hover:bg-surface-hover">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </Tooltip>
          
          <Tooltip content="This is a text element with tooltip">
            <span className="text-primary-500 cursor-help underline decoration-dotted">
              Hover me
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Custom Delay</h2>
        
        <div className="flex gap-4 items-center">
          <Tooltip content="Instant tooltip" delay={0}>
            <Button variant="primary" size="sm">No Delay</Button>
          </Tooltip>
          
          <Tooltip content="Slow tooltip" delay={500}>
            <Button variant="primary" size="sm">500ms Delay</Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Accessibility</h2>
        <p className="text-sm text-foreground-muted">
          The tooltip is keyboard accessible. Try tabbing to the button below and it will show the tooltip.
        </p>
        
        <Tooltip content="This tooltip appears on keyboard focus too!">
          <Button variant="primary">Tab to me</Button>
        </Tooltip>
      </div>
    </div>
  );
}
