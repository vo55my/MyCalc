"use client";

import { MdErrorOutline } from "react-icons/md";

/**
 * Shared number input field for discount calculators.
 * Supports Rp prefix, % suffix, validation errors, and helper text.
 *
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} props.label - Label text
 * @param {string|number} props.value - Current value
 * @param {function(string): void} props.onChange - Change handler
 * @param {function(): void} [props.onBlur] - Blur handler
 * @param {"Rp"|"%"|"unit"|""} props.unit - Unit type
 * @param {number} [props.max] - Maximum value
 * @param {number} [props.min] - Minimum value
 * @param {string} [props.helper] - Helper text below label
 * @param {string} [props.error] - Validation error message
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 */
export function CalculatorField({
  id,
  label,
  value,
  onChange,
  onBlur,
  unit,
  max,
  min = 0,
  helper,
  error,
  className = "",
}) {
  const hasError = Boolean(error);
  const showRpPrefix = unit === "Rp";
  const showPercentSuffix = unit === "%";

  return (
    <label className={`block text-sm text-text ${className}`} htmlFor={id}>
      <span className="mb-1.5 flex items-center justify-between gap-2">
        {label}
        {helper && (
          <span className="text-xs font-medium text-text-muted">{helper}</span>
        )}
      </span>
      <span className="relative block">
        {showRpPrefix && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-text-muted">
            Rp
          </span>
        )}
        <input
          className={`h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface text-sm text-text outline-none transition focus:border-accent focus:bg-canvas focus:shadow-[var(--shadow-focus)] ${showRpPrefix ? "pl-10" : "px-3.5"} ${showPercentSuffix ? "pr-8" : ""} ${hasError ? "border-danger focus:border-danger" : ""}`}
          id={id}
          inputMode="decimal"
          max={max}
          min={min}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          type="number"
          value={value}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
        {showPercentSuffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-text-muted">
            %
          </span>
        )}
        {hasError && (
          <span
            id={`${id}-error`}
            className="absolute -bottom-5 left-0 text-xs text-danger"
            role="alert"
          >
            <MdErrorOutline className="inline mr-0.5" aria-hidden="true" />{" "}
            {error}
          </span>
        )}
      </span>
    </label>
  );
}

/**
 * Preset buttons for quick value selection.
 *
 * @param {Object} props
 * @param {string|number} props.value - Current value
 * @param {function(number): void} props.onSelect - Selection handler
 * @param {number[]} [props.presets=[10,20,30,50,70]] - Preset values
 * @param {string} [props.unit="%"] - Unit suffix for display
 * @returns {JSX.Element}
 */
export function PresetButtons({
  value,
  onSelect,
  presets = [10, 20, 30, 50, 70],
  unit = "%",
}) {
  return (
    <div
      className="mt-2.5 flex flex-wrap gap-1.5"
      role="group"
      aria-label="Preset nilai cepat"
    >
      {presets.map((preset) => (
        <button
          className={`min-h-9 rounded-[var(--radius-sm)] px-2.5 text-xs transition-colors ${Number(value) === preset ? "bg-surface-teal font-medium text-accent" : "bg-surface text-text-muted hover:bg-surface-teal hover:text-accent"}`}
          key={preset}
          onClick={() => onSelect(preset)}
          type="button"
        >
          {preset}
          {unit}
        </button>
      ))}
    </div>
  );
}
