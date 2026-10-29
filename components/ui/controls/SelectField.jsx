const DEFAULT_CLASS_NAME =
  "h-11 w-full appearance-none rounded-[var(--radius-md)] border border-border bg-surface px-3.5 text-sm text-text outline-none transition focus:border-accent focus:bg-canvas focus:shadow-[var(--shadow-focus)]";

/**
 * Select reusable; options dapat berbentuk { value, label } atau { key, name }.
 */
export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  className = DEFAULT_CLASS_NAME,
  labelClassName = "block text-sm text-text",
  labelContentClassName = "mb-1.5 block",
  required = false,
  disabled = false,
}) {
  return (
    <label className={labelClassName} htmlFor={id}>
      {label && <span className={labelContentClassName}>{label}</span>}
      <select
        className={className}
        disabled={disabled}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        value={value}
      >
        {options.map((option) => {
          const optionValue = option.value ?? option.key;
          const optionLabel = option.label ?? option.name;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </label>
  );
}
