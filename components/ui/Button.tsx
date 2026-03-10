"use client";

import React, { useRef } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  glow?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

function variantClasses(variant: Variant, glow?: boolean) {
  const base = {
    primary: `bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 font-semibold shadow-sm ${glow ? "dark:shadow-[var(--shadow-glow-primary)]" : ""}`,
    secondary: `bg-navy-800 text-white hover:bg-navy-700 active:bg-navy-900 font-semibold`,
    outline: `border-2 border-primary-500 text-primary-600 bg-transparent hover:bg-primary-50 active:bg-primary-100 font-semibold dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-950`,
    ghost: `text-foreground-muted hover:bg-surface-hover hover:text-foreground bg-transparent font-medium`,
    danger: `bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 font-semibold shadow-sm`,
    success: `bg-success-500 text-white hover:bg-success-600 active:bg-success-700 font-semibold shadow-sm`,
  };
  return base[variant] ?? base.primary;
}

function sizeClasses(size: Size) {
  const sizes = {
    xs: "h-7 px-2.5 text-xs rounded-lg gap-1",
    sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
    md: "h-9 px-4 text-sm rounded-xl gap-2",
    lg: "h-11 px-6 text-sm rounded-xl gap-2",
    xl: "h-13 px-8 text-base rounded-2xl gap-2.5",
  };
  return sizes[size] ?? sizes.md;
}

function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  glow,
  loading,
  leftIcon,
  rightIcon,
  disabled,
  onClick,
  fullWidth,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    if (buttonRef.current) {
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add("button-ripple");

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const base =
    "inline-flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 relative overflow-hidden select-none";
  
  // Use design tokens for transition duration
  const transitionStyle = {
    transitionDuration: "var(--duration-fast)",
    transitionTimingFunction: "var(--ease-spring)",
  };

  const classes = `${base} ${variantClasses(variant, glow)} ${sizeClasses(size)} ${fullWidth ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {loading ? (
        <svg 
          className="animate-spin h-4 w-4 shrink-0" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{ animationDuration: "var(--duration-slower)" }}
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0 flex items-center">{leftIcon}</span>
      ) : null}
      {children && <span className="flex-1">{children}</span>}
      {!loading && rightIcon && (
        <span className="shrink-0 flex items-center">{rightIcon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} style={transitionStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      ref={buttonRef}
      className={classes} 
      style={transitionStyle}
      disabled={disabled || loading} 
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
}

// Named export for compatibility
export { Button };
// Default export
export default Button;
