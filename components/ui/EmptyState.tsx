import React from "react";
import Icon from "@/components/ui/Icon";
import Button from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  emoji?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  tips?: string[];
  className?: string;
}

export default function EmptyState({
  icon,
  emoji,
  title,
  description,
  action,
  secondaryAction,
  tips,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--surface-border)] bg-[var(--surface-bg)] px-6 py-12 text-center transition-colors ${className}`}
    >
      {/* Icon or Emoji */}
      {emoji && (
        <div className="mb-4 text-5xl animate-bounce-subtle">
          {emoji}
        </div>
      )}
      {icon && !emoji && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-card)] text-[var(--foreground-muted)] transition-transform hover:scale-110">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--foreground)]">{title}</h3>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-[var(--foreground-muted)]">
        {description}
      </p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action && (
            action.href ? (
              <a href={action.href}>
                <Button variant="primary" size="md">
                  {action.label}
                </Button>
              </a>
            ) : (
              <Button variant="primary" size="md" onClick={action.onClick}>
                {action.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <a href={secondaryAction.href}>
                <Button variant="secondary" size="md">
                  {secondaryAction.label}
                </Button>
              </a>
            ) : (
              <Button variant="secondary" size="md" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}

      {/* Tips */}
      {tips && tips.length > 0 && (
        <div className="mt-8 w-full max-w-md rounded-xl bg-[var(--surface-card)] p-4 text-left">
          <p className="mb-2 text-xs font-semibold text-[var(--foreground)] flex items-center gap-1">
            <Icon name="lightbulb" size={14} /> Quick Tips
          </p>
          <ul className="space-y-1.5 text-xs text-[var(--foreground-muted)]">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-500">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
