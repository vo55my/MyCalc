import { MdSearch } from "react-icons/md";

/**
 * Input pencarian reusable untuk katalog kalkulator.
 *
 * @param {Object} props
 * @param {string} props.value - Nilai pencarian
 * @param {function} props.onChange - Handler perubahan nilai
 * @param {Object} props.inputRef - Ref input opsional
 * @param {string} props.placeholder - Placeholder input
 * @param {string} props.ariaLabel - Label aksesibel input
 * @param {string} [props.className] - Class tambahan
 */

export function SearchInput({
  value,
  onChange,
  inputRef,
  placeholder,
  ariaLabel,
  className = "",
}) {
  // Wrapper menyediakan posisi ikon; value dan onChange tetap dikontrol parent.
  return (
    <div className="relative">
      <MdSearch
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted"
      />
      <input
        aria-label={ariaLabel}
        className={className}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
        type="search"
        value={value}
      />
    </div>
  );
}
