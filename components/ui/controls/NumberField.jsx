"use client";

/**
 * Reusable number input field with unit label.
 *
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} [props.label] - Label text
 * @param {string|number} props.value - Current value
 * @param {function(string): void} props.onChange - Change handler
 * @param {string} [props.unit] - Unit suffix (e.g., "cm", "kg", "tahun")
 * @param {string} [props.helper] - Helper text (e.g., range)
 * @param {number} [props.min] - Minimum value
 * @param {number} [props.max] - Maximum value
 * @param {number} [props.step=1] - Step increment
 * @param {boolean} [props.required=false] - Required attribute
 * @param {Object} [props.buttons] - Increment/decrement buttons config
 * @param {Object} [props.buttons.decrement] - Decrement button config
 * @param {function} props.buttons.decrement.onClick - Decrement handler
 * @param {string} props.buttons.decrement.ariaLabel - Decrement aria-label
 * @param {Object} [props.buttons.increment] - Increment button config
 * @param {function} props.buttons.increment.onClick - Increment handler
 * @param {string} props.buttons.increment.ariaLabel - Increment aria-label
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 */
export function NumberField({
  id,
  label,
  value,
  onChange,
  unit,
  helper,
  min,
  max,
  step = 1,
  required = false,
  buttons,
  className = "",
}) {
  return (
    <label
      className={`block min-w-0 flex-1 text-sm text-text ${className}`}
      htmlFor={id}
    >
      {(label || helper) && (
        <span className="mb-1.5 flex items-center justify-between gap-2">
          {label && <span>{label}</span>}
          {helper && <span className="text-xs text-text-muted">{helper}</span>}
        </span>
      )}
      <span className="relative flex items-center gap-2">
        {buttons && buttons.decrement && (
          <button
            aria-label={buttons.decrement.ariaLabel}
            className="min-h-11 rounded-[var(--radius-sm)] px-2.5 text-xs bg-surface text-text-muted hover:bg-surface-teal hover:text-accent transition-colors"
            onClick={buttons.decrement.onClick}
            type="button"
          >
            −
          </button>
        )}
        <span className="relative flex-1 min-w-0">
          <input
            className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3.5 pr-10 text-center text-sm text-text outline-none transition focus:border-accent focus:bg-canvas focus:shadow-[var(--shadow-focus)]"
            id={id}
            max={max}
            min={min}
            onChange={(event) => onChange(event.target.value)}
            step={step}
            type="number"
            value={value}
            required={required}
          />
          {unit && (
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-text-muted">
              {unit}
            </span>
          )}
        </span>
        {buttons && buttons.increment && (
          <button
            aria-label={buttons.increment.ariaLabel}
            className="min-h-11 rounded-[var(--radius-sm)] px-2.5 text-xs bg-surface text-text-muted hover:bg-surface-teal hover:text-accent transition-colors"
            onClick={buttons.increment.onClick}
            type="button"
          >
            +
          </button>
        )}
      </span>
    </label>
  );
}
