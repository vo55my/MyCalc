export function PageHeader({ badge, title, description, id }) {
  return (
    <header className="mb-10">
      <span className="mb-2 inline-flex rounded-[var(--radius-sm)] bg-surface-teal px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-accent">
        {badge}
      </span>
      <h1
        className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-text sm:text-[2rem]"
        id={id}
      >
        {title}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
        {description}
      </p>
    </header>
  );
}
