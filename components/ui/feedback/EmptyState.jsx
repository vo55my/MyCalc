import { MdSearchOff } from "react-icons/md";

/**
 * Empty state reusable untuk daftar yang tidak memiliki hasil.
 *
 * @param {Object} props
 * @param {string} props.query - Query yang tidak menemukan hasil
 * @param {function} props.onReset - Handler untuk menghapus filter
 */

export function EmptyState({ query, onReset }) {
  // Empty state memberi konteks query dan menyediakan jalan keluar yang jelas.
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-md)] bg-canvas px-6 py-16 text-center shadow-xs">
      <MdSearchOff
        aria-hidden="true"
        className="mb-2 text-5xl text-text-disabled"
      />
      <h3 className="text-base font-medium text-text">
        Kalkulator tidak ditemukan
      </h3>
      <p className="mt-1 max-w-sm text-sm text-text-muted">
        &quot;{query}&quot; tidak ditemukan. Coba kata kunci lain atau lihat
        semua kalkulator.
      </p>
      <button
        className="mt-4 min-h-11 rounded-[var(--radius-md)] bg-surface px-4 text-sm text-accent transition-colors hover:bg-surface-teal"
        onClick={onReset}
        type="button"
      >
        Tampilkan semua kalkulator
      </button>
    </div>
  );
}
