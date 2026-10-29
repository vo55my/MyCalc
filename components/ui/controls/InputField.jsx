export function InputField({
  id,
  label,
  value,
  onChange,
  type = "number",
  unit,
  helper,
  min,
  max,
  step,
  inputMode,
  required = false,
  disabled = false,
  className = "h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3.5 text-sm text-text outline-none transition focus:border-accent focus:bg-canvas focus:shadow-[var(--shadow-focus)]",
  labelClassName = "block text-sm text-text",
}) {
  return (
    <label className={labelClassName} htmlFor={id}>
      <span className="mb-1.5 flex items-center justify-between gap-2">
        <span>{label}</span>
        {helper && <span className="text-xs text-text-muted">{helper}</span>}
        {unit && <span className="text-xs text-text-muted">{unit}</span>}
      </span>
      <input
        className={className}
        disabled={disabled}
        id={id}
        inputMode={inputMode}
        max={max}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        step={step}
        type={type}
        value={value}
      />
    </label>
  );
}
