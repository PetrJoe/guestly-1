"use client";
import React from "react";
import Badge from "@/components/ui/Badge";
import type { FulfillmentType } from "@/types/merchandise";

interface FulfillmentBadgeProps {
  type: FulfillmentType;
  className?: string;
}

export default function FulfillmentBadge({ type, className }: FulfillmentBadgeProps) {
  const config = {
    pickup: {
      label: "Pickup at Event",
      icon: "📦",
      variant: "primary" as const,
    },
    delivery: {
      label: "Delivery",
      icon: "🚚",
      variant: "success" as const,
    },
    digital: {
      label: "Digital Download",
      icon: "⬇️",
      variant: "warning" as const,
    },
  };

  const { label, icon, variant } = config[type];

  return (
    <Badge variant={variant} className={className}>
      <span className="mr-1">{icon}</span>
      {label}
    </Badge>
  );
}
