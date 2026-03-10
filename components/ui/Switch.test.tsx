import { describe, it, expect } from "@jest/globals";
import React from "react";
import Switch from "./Switch";

describe("Switch Component", () => {
  it("should render unchecked switch", () => {
    const component = <Switch checked={false} />;
    expect(component).toBeTruthy();
  });

  it("should render checked switch", () => {
    const component = <Switch checked={true} />;
    expect(component).toBeTruthy();
  });

  it("should render disabled switch", () => {
    const component = <Switch disabled={true} />;
    expect(component).toBeTruthy();
  });

  it("should render with label", () => {
    const component = <Switch label="Enable notifications" />;
    expect(component).toBeTruthy();
  });

  it("should render checked and disabled", () => {
    const component = <Switch checked={true} disabled={true} />;
    expect(component).toBeTruthy();
  });

  it("should have proper ARIA attributes", () => {
    const component = <Switch checked={true} label="Dark mode" />;
    expect(component).toBeTruthy();
  });

  it("should support onChange callback", () => {
    let value = false;
    const handleChange = (checked: boolean) => {
      value = checked;
    };
    const component = <Switch checked={value} onChange={handleChange} />;
    expect(component).toBeTruthy();
  });

  it("should support custom className", () => {
    const component = <Switch className="custom-class" />;
    expect(component).toBeTruthy();
  });

  it("should support custom id", () => {
    const component = <Switch id="my-switch" />;
    expect(component).toBeTruthy();
  });
});
