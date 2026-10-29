/**
 * Tab filter kategori kalkulator.
 *
 * @param {Object} props
 * @param {Array<Object>} props.categories - Daftar kategori
 * @param {string} props.activeCategory - ID kategori aktif
 * @param {function} props.onSelect - Handler pemilihan kategori
 */

export function CategoryTabs({ categories, activeCategory, onSelect }) {
  // Komponen hanya merender tab; pemilik state menentukan kategori aktif.
  return (
    <div
      className="no-scrollbar scroll-mt-16 flex items-center gap-2 overflow-x-auto py-3"
      id="categories"
    >
      {categories.map((category) => {
        const selected = activeCategory === category.id;

        return (
          <button
            className={`flex min-h-11 shrink-0 items-center gap-2 rounded-[var(--radius-md)] px-4 text-sm transition-colors ${selected ? "bg-surface-teal font-medium text-accent" : "text-text-muted hover:bg-canvas hover:text-text"}`}
            key={category.id}
            onClick={() => onSelect(category.id)}
            type="button"
          >
            {category.label}
            <span
              className={`rounded-full px-1.5 py-0.5 font-mono text-xs ${selected ? "bg-accent/10 text-accent" : "bg-canvas text-text-muted"}`}
            >
              {category.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
