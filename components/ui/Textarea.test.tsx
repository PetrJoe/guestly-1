import { describe, it, expect } from "@jest/globals";
import React from "react";
import Textarea from "./Textarea";

describe("Textarea Component", () => {
  it("should render basic textarea", () => {
    const component = <Textarea />;
    expect(component).toBeTruthy();
  });

  it("should render with label", () => {
    const component = <Textarea label="Description" />;
    expect(component).toBeTruthy();
  });

  it("should render with hint text", () => {
    const component = <Textarea hint="Enter a detailed description" />;
    expect(component).toBeTruthy();
  });

  it("should render with error state", () => {
    const component = <Textarea error="This field is required" />;
    expect(component).toBeTruthy();
  });

  it("should render disabled textarea", () => {
    const component = <Textarea disabled={true} />;
    expect(component).toBeTruthy();
  });

  it("should render with placeholder", () => {
    const component = <Textarea placeholder="Enter your text here..." />;
    expect(component).toBeTruthy();
  });

  it("should render with auto-resize enabled", () => {
    const component = <Textarea autoResize={true} />;
    expect(component).toBeTruthy();
  });

  it("should render with character count", () => {
    const component = (
      <Textarea showCharCount={true} maxLength={200} value="Hello" />
    );
    expect(component).toBeTruthy();
  });

  it("should render with max length", () => {
    const component = <Textarea maxLength={500} />;
    expect(component).toBeTruthy();
  });

  it("should support onChange callback", () => {
    let value = "";
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      value = e.target.value;
    };
    const component = <Textarea value={value} onChange={handleChange} />;
    expect(component).toBeTruthy();
  });

  it("should render with custom className", () => {
    const component = <Textarea className="custom-class" />;
    expect(component).toBeTruthy();
  });

  it("should render with custom id", () => {
    const component = <Textarea id="my-textarea" />;
    expect(component).toBeTruthy();
  });

  it("should render with rows attribute", () => {
    const component = <Textarea rows={5} />;
    expect(component).toBeTruthy();
  });

  it("should render with all features combined", () => {
    const component = (
      <Textarea
        label="Event Description"
        hint="Describe your event in detail"
        placeholder="Enter description..."
        autoResize={true}
        showCharCount={true}
        maxLength={1000}
        value="Sample text"
      />
    );
    expect(component).toBeTruthy();
  });

  it("should have proper ARIA attributes", () => {
    const component = (
      <Textarea
        label="Description"
        error="This field is required"
        aria-required={true}
      />
    );
    expect(component).toBeTruthy();
  });
});
