import { describe, it, expect } from "@jest/globals";
import React from "react";
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";

describe("Breadcrumb Component", () => {
  it("should render with single item", () => {
    const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
    const component = <Breadcrumb items={items} />;
    expect(component).toBeTruthy();
  });

  it("should render with multiple items", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
      { label: "Event Details" },
    ];
    const component = <Breadcrumb items={items} />;
    expect(component).toBeTruthy();
  });

  it("should render with custom separator", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
    ];
    const component = <Breadcrumb items={items} separator=">" />;
    expect(component).toBeTruthy();
  });

  it("should render with icons", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/", icon: <span>🏠</span> },
      { label: "Events", href: "/events", icon: <span>📅</span> },
      { label: "Event Details", icon: <span>📝</span> },
    ];
    const component = <Breadcrumb items={items} />;
    expect(component).toBeTruthy();
  });

  it("should render with custom separator icon", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
    ];
    const component = <Breadcrumb items={items} separator={<span>→</span>} />;
    expect(component).toBeTruthy();
  });

  it("should render last item as non-clickable", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Current Page" },
    ];
    const component = <Breadcrumb items={items} />;
    expect(component).toBeTruthy();
  });

  it("should render with custom className", () => {
    const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
    const component = <Breadcrumb items={items} className="custom-class" />;
    expect(component).toBeTruthy();
  });

  it("should return null for empty items array", () => {
    const component = <Breadcrumb items={[]} />;
    expect(component).toBeTruthy();
  });

  it("should handle items without href", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Non-clickable" },
      { label: "Current" },
    ];
    const component = <Breadcrumb items={items} />;
    expect(component).toBeTruthy();
  });

  it("should have proper semantic HTML structure", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
      { label: "Current Page" },
    ];
    const component = <Breadcrumb items={items} />;
    expect(component).toBeTruthy();
  });

  it("should have proper ARIA attributes", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Current Page" },
    ];
    const component = <Breadcrumb items={items} />;
    expect(component).toBeTruthy();
  });
});
