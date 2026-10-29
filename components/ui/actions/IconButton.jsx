/**
 * Tombol ikon reusable untuk kontrol ringkas.
 *
 * @param {Object} props
 * @param {string} props.label - Label aksesibel tombol
 * @param {React.ReactNode} props.children - Ikon tombol
 * @param {function} props.onClick - Handler klik tombol
 */

export function IconButton({ label, children, onClick }) {
  // Struktur dan aksesibilitas tombol ditangani di sini; ikon dikirim via children.
  return (
    <button
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border bg-canvas text-text-muted transition-colors hover:bg-surface hover:text-text"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
