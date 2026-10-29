"use client";

/**
 * Mode selector radio group for discount calculator.
 *
 * @param {Object} props
 * @param {string} props.mode - Current active mode
 * @param {function} props.onChange - Mode change handler
 */
export function ModeSelector({ mode, onChange }) {
  const modes = [
    ["stacked", "Diskon bertingkat"],
    ["cashback", "Diskon + cashback"],
    ["bogo", "Beli X gratis Y"],
  ];

  return (
    <div>
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.06em] text-text-muted">
        Mode promosi
      </span>
      <div
        className="grid grid-cols-3 gap-1 rounded-[var(--radius-md)] bg-surface p-1"
        role="radiogroup"
        aria-label="Mode promosi"
      >
        {modes.map(([id, label]) => (
          <button
            role="radio"
            aria-checked={mode === id}
            className={`min-h-11 rounded-[var(--radius-sm)] px-2 text-xs font-medium transition-colors ${mode === id ? "bg-canvas text-accent shadow-xs" : "text-text-muted hover:text-text"}`}
            key={id}
            onClick={() => onChange(id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
