/**
 * Reusable documentation section for calculator pages.
 * Each item may provide a string or React node as its formula.
 */
export function DocumentationSection({
  id,
  eyebrow = "Dokumentasi algoritma",
  title = "Metodologi & rumus perhitungan",
  description,
  items,
}) {
  return (
    <section
      aria-labelledby={id}
      className="mt-16 rounded-[var(--radius-lg)] bg-canvas p-6 shadow-sm md:p-8"
    >
      <div className="mb-8">
        <span className="mb-1 block text-xs font-medium uppercase tracking-[0.06em] text-accent">
          {eyebrow}
        </span>
        <h2 className="text-xl font-medium text-text" id={id}>
          {title}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-text-muted">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map(
          ({
            number,
            title: itemTitle,
            description: itemDescription,
            formula,
          }) => (
            <article
              className="rounded-[var(--radius-md)] bg-surface p-5"
              key={number}
            >
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-surface-teal font-mono font-bold text-accent">
                {number}
              </span>
              <h3 className="text-base font-medium text-text">{itemTitle}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                {itemDescription}
              </p>
              {formula !== undefined && (
                <code className="mt-5 block whitespace-pre-line rounded bg-canvas p-3 font-mono text-sm leading-relaxed text-accent">
                  {formula}
                </code>
              )}
            </article>
          ),
        )}
      </div>
    </section>
  );
}
