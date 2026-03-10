import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Slider from "./Slider";

describe("Slider Component", () => {
  describe("Single Mode", () => {
    it("renders with default props", () => {
      render(<Slider label="Volume" />);
      expect(screen.getByText("Volume")).toBeInTheDocument();
      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("displays value when showValue is true", () => {
      render(<Slider label="Volume" value={50} showValue />);
      expect(screen.getByText("50")).toBeInTheDocument();
    });

    it("uses custom formatValue function", () => {
      render(
        <Slider
          label="Price"
          value={100}
          showValue
          formatValue={(v) => `$${v}`}
        />
      );
      expect(screen.getByText("$100")).toBeInTheDocument();
    });

    it("handles keyboard navigation", () => {
      const handleChange = jest.fn();
      render(<Slider value={50} onChange={handleChange} step={10} />);

      const slider = screen.getByRole("slider");
      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(handleChange).toHaveBeenCalledWith(60);

      fireEvent.keyDown(slider, { key: "ArrowLeft" });
      expect(handleChange).toHaveBeenCalledWith(40);
    });

    it("respects min and max bounds", () => {
      const handleChange = jest.fn();
      render(<Slider value={100} min={0} max={100} onChange={handleChange} />);

      const slider = screen.getByRole("slider");
      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(handleChange).toHaveBeenCalledWith(100); // Should stay at max

      render(<Slider value={0} min={0} max={100} onChange={handleChange} />);
      const slider2 = screen.getByRole("slider");
      fireEvent.keyDown(slider2, { key: "ArrowLeft" });
      expect(handleChange).toHaveBeenCalledWith(0); // Should stay at min
    });

    it("handles Home and End keys", () => {
      const handleChange = jest.fn();
      render(<Slider value={50} min={0} max={100} onChange={handleChange} />);

      const slider = screen.getByRole("slider");
      fireEvent.keyDown(slider, { key: "Home" });
      expect(handleChange).toHaveBeenCalledWith(0);

      fireEvent.keyDown(slider, { key: "End" });
      expect(handleChange).toHaveBeenCalledWith(100);
    });

    it("disables interaction when disabled prop is true", () => {
      const handleChange = jest.fn();
      render(<Slider value={50} onChange={handleChange} disabled />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("tabIndex", "-1");

      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("works as uncontrolled component with defaultValue", () => {
      render(<Slider defaultValue={30} showValue />);
      expect(screen.getByText("30")).toBeInTheDocument();
    });
  });

  describe("Range Mode", () => {
    it("renders with two handles in range mode", () => {
      render(<Slider mode="range" label="Price Range" />);
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });

    it("displays range values when showValue is true", () => {
      render(<Slider mode="range" value={[20, 80]} showValue />);
      expect(screen.getByText("20 - 80")).toBeInTheDocument();
    });

    it("handles keyboard navigation for start handle", () => {
      const handleChange = jest.fn();
      render(
        <Slider
          mode="range"
          value={[20, 80]}
          onChange={handleChange}
          step={10}
        />
      );

      const [startSlider] = screen.getAllByRole("slider");
      fireEvent.keyDown(startSlider, { key: "ArrowRight" });
      expect(handleChange).toHaveBeenCalledWith([30, 80]);
    });

    it("handles keyboard navigation for end handle", () => {
      const handleChange = jest.fn();
      render(
        <Slider
          mode="range"
          value={[20, 80]}
          onChange={handleChange}
          step={10}
        />
      );

      const [, endSlider] = screen.getAllByRole("slider");
      fireEvent.keyDown(endSlider, { key: "ArrowLeft" });
      expect(handleChange).toHaveBeenCalledWith([20, 70]);
    });

    it("prevents start handle from exceeding end handle", () => {
      const handleChange = jest.fn();
      render(
        <Slider
          mode="range"
          value={[70, 80]}
          onChange={handleChange}
          step={10}
        />
      );

      const [startSlider] = screen.getAllByRole("slider");
      fireEvent.keyDown(startSlider, { key: "ArrowRight" });
      expect(handleChange).toHaveBeenCalledWith([80, 80]); // Start can equal end
    });

    it("prevents end handle from going below start handle", () => {
      const handleChange = jest.fn();
      render(
        <Slider
          mode="range"
          value={[20, 30]}
          onChange={handleChange}
          step={10}
        />
      );

      const [, endSlider] = screen.getAllByRole("slider");
      fireEvent.keyDown(endSlider, { key: "ArrowLeft" });
      expect(handleChange).toHaveBeenCalledWith([20, 20]); // End can equal start
    });

    it("works as uncontrolled component with defaultValue", () => {
      render(<Slider mode="range" defaultValue={[25, 75]} showValue />);
      expect(screen.getByText("25 - 75")).toBeInTheDocument();
    });
  });

  describe("Step Markers", () => {
    it("renders step markers when showStepMarkers is true", () => {
      const { container } = render(
        <Slider min={0} max={100} step={25} showStepMarkers />
      );
      // Should have markers at 0, 25, 50, 75, 100 (5 markers)
      const markers = container.querySelectorAll(".w-1.h-1.bg-surface-border");
      expect(markers.length).toBe(5);
    });

    it("displays min and max labels when showStepMarkers is true", () => {
      render(<Slider min={0} max={100} showStepMarkers />);
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes for single mode", () => {
      render(<Slider label="Volume" value={50} min={0} max={100} />);
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuemin", "0");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
      expect(slider).toHaveAttribute("aria-valuenow", "50");
      expect(slider).toHaveAttribute("aria-label", "Volume");
    });

    it("has proper ARIA attributes for range mode", () => {
      render(
        <Slider
          mode="range"
          label="Price Range"
          value={[20, 80]}
          min={0}
          max={100}
        />
      );
      const [startSlider, endSlider] = screen.getAllByRole("slider");

      expect(startSlider).toHaveAttribute("aria-valuenow", "20");
      expect(startSlider).toHaveAttribute("aria-label", "Price Range start");

      expect(endSlider).toHaveAttribute("aria-valuenow", "80");
      expect(endSlider).toHaveAttribute("aria-label", "Price Range end");
    });

    it("is keyboard accessible", () => {
      render(<Slider value={50} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("tabIndex", "0");
    });

    it("is not keyboard accessible when disabled", () => {
      render(<Slider value={50} disabled />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Edge Cases", () => {
    it("handles step values correctly", () => {
      const handleChange = jest.fn();
      render(<Slider value={0} min={0} max={100} step={15} onChange={handleChange} />);

      const slider = screen.getByRole("slider");
      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(handleChange).toHaveBeenCalledWith(15);
    });

    it("handles negative ranges", () => {
      render(<Slider value={-50} min={-100} max={0} showValue />);
      expect(screen.getByText("-50")).toBeInTheDocument();
    });

    it("handles decimal steps", () => {
      const handleChange = jest.fn();
      render(
        <Slider value={0} min={0} max={1} step={0.1} onChange={handleChange} />
      );

      const slider = screen.getByRole("slider");
      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(handleChange).toHaveBeenCalledWith(0.1);
    });
  });
});
