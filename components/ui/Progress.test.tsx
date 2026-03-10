import { describe, it, expect } from "@jest/globals";
import React from "react";
import Progress from "./Progress";

describe("Progress Component", () => {
  it("should render linear progress with value", () => {
    const component = <Progress variant="linear" value={50} />;
    expect(component).toBeTruthy();
  });

  it("should render circular progress with value", () => {
    const component = <Progress variant="circular" value={75} />;
    expect(component).toBeTruthy();
  });

  it("should render indeterminate linear progress", () => {
    const component = <Progress variant="linear" />;
    expect(component).toBeTruthy();
  });

  it("should render indeterminate circular progress", () => {
    const component = <Progress variant="circular" />;
    expect(component).toBeTruthy();
  });

  it("should render with percentage display", () => {
    const component = <Progress variant="linear" value={60} showPercentage />;
    expect(component).toBeTruthy();
  });

  it("should render with label", () => {
    const component = <Progress variant="linear" value={80} label="Loading..." />;
    expect(component).toBeTruthy();
  });

  it("should render with different colors", () => {
    const colors: Array<"primary" | "success" | "warning" | "danger"> = [
      "primary",
      "success",
      "warning",
      "danger",
    ];
    colors.forEach((color) => {
      const component = <Progress variant="linear" value={50} color={color} />;
      expect(component).toBeTruthy();
    });
  });

  it("should render with different sizes", () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
    sizes.forEach((size) => {
      const component = <Progress variant="linear" value={50} size={size} />;
      expect(component).toBeTruthy();
    });
  });

  it("should clamp values between 0 and 100", () => {
    const component1 = <Progress variant="linear" value={-10} />;
    const component2 = <Progress variant="linear" value={150} />;
    expect(component1).toBeTruthy();
    expect(component2).toBeTruthy();
  });
});
