"use client";

import { forwardRef } from "react";

/**
 * Reusable calculator button component with consistent styling and hover effects.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant="default"] - Button variant: "default" | "digit" | "operator" | "function" | "action" | "equals" | "danger" | "memory" | "preset"
 * @param {Function} [props.onClick] - Click handler
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.title] - Tooltip text
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} props.ref - Forwarded ref
 */
const CalcButton = forwardRef(
  (
    {
      children,
      variant = "default",
      onClick,
      disabled = false,
      title,
      className = "",
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const variantStyles = {
      default: "bg-surface hover:bg-surface-container text-on-surface",
      digit: "bg-canvas hover:bg-surface font-medium text-on-surface shadow-sm",
      operator:
        "bg-surface-container text-primary font-semibold hover:bg-surface-container-highest",
      function: "bg-surface hover:bg-surface-container text-on-surface",
      action:
        "bg-surface-container-high hover:bg-surface-container-highest text-on-surface",
      danger:
        "bg-surface-container-high hover:bg-danger-light hover:text-danger font-semibold text-danger",
      equals:
        "bg-primary hover:bg-accent-hover text-on-primary font-bold shadow transition-all active:scale-[0.98]",
      memory:
        "bg-surface-container hover:bg-surface-container-high font-medium text-on-surface",
      preset:
        "preset-chip px-3 py-1.5 rounded-full bg-canvas hover:bg-surface-teal hover:text-primary text-on-surface-variant shadow-xs",
    };

    const baseStyles =
      "calc-btn h-12 rounded-lg transition-colors font-text-result-sm min-w-0";
    const variantClass = variantStyles[variant] || variantStyles.default;

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantClass} ${className}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
        title={title}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

CalcButton.displayName = "CalcButton";

export { CalcButton };
