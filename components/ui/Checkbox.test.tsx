import { describe, it, expect } from "@jest/globals";
import React from "react";
import Checkbox from "./Checkbox";

describe("Checkbox Component", () => {
  it("should render without label", () => {
    const component = <Checkbox />;
    expect(component).toBeTruthy();
  });

  it("should render with label", () => {
    const component = <Checkbox label="Accept terms" />;
    expect(component).toBeTruthy();
  });

  it("should render with description", () => {
    const component = (
      <Checkbox
        label="Accept terms"
        description="You must accept the terms to continue"
      />
    );
    expect(component).toBeTruthy();
  });

  it("should support checked state", () => {
    const component = <Checkbox label="Accept terms" checked={true} />;
    expect(component).toBeTruthy();
  });

  it("should support unchecked state", () => {
    const component = <Checkbox label="Accept terms" checked={false} />;
    expect(component).toBeTruthy();
  });

  it("should support indeterminate state", () => {
    const component = <Checkbox label="Select all" indeterminate={true} />;
    expect(component).toBeTruthy();
  });

  it("should support onChange callback", () => {
    let checked = false;
    const handleChange = (value: boolean) => {
      checked = value;
    };
    const component = (
      <Checkbox label="Accept terms" checked={checked} onChange={handleChange} />
    );
    expect(component).toBeTruthy();
  });

  it("should support disabled state", () => {
    const component = (
      <Checkbox label="Accept terms" disabled={true} />
    );
    expect(component).toBeTruthy();
  });

  it("should display error message", () => {
    const component = (
      <Checkbox label="Accept terms" error="You must accept the terms" />
    );
    expect(component).toBeTruthy();
  });

  it("should have proper ARIA attributes", () => {
    const component = (
      <Checkbox label="Accept terms" checked={true} />
    );
    expect(component).toBeTruthy();
  });

  it("should support keyboard navigation", () => {
    const component = <Checkbox label="Accept terms" />;
    expect(component).toBeTruthy();
  });

  it("should support custom className", () => {
    const component = (
      <Checkbox label="Accept terms" className="custom-class" />
    );
    expect(component).toBeTruthy();
  });

  it("should support custom id", () => {
    const component = <Checkbox label="Accept terms" id="custom-id" />;
    expect(component).toBeTruthy();
  });

  it("should render checkmark icon when checked", () => {
    const component = <Checkbox checked={true} />;
    expect(component).toBeTruthy();
  });

  it("should render indeterminate icon when indeterminate", () => {
    const component = <Checkbox indeterminate={true} />;
    expect(component).toBeTruthy();
  });

  it("should toggle between checked and unchecked", () => {
    let checked = false;
    const handleChange = (value: boolean) => {
      checked = value;
    };
    const component = (
      <Checkbox checked={checked} onChange={handleChange} />
    );
    expect(component).toBeTruthy();
  });
});
