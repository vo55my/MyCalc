import { MdArrowForward } from "react-icons/md";
import Link from "next/link";

/**
 * Kartu katalog kalkulator.
 *
 * @param {Object} props
 * @param {Object} props.calculator - Data kalkulator
 * @param {string} [props.href] - Tujuan navigasi opsional
 */

export function CalculatorCard({ calculator, href }) {
  // Icon diberikan melalui data registry agar kartu tidak terikat pada satu jenis kalkulator tertentu.
  const Icon = calculator.icon;
  // Action menjadi Link bila route tersedia, atau teks non-navigasi bila belum.
  const action = (
    <span className="mt-5 flex min-h-11 items-center justify-between border-t border-border pt-3 text-xs font-medium text-accent">
      <span>Hitung sekarang</span>
      <MdArrowForward
        aria-hidden="true"
        className="text-base transition-transform group-hover:translate-x-1"
      />
    </span>
  );

  return (
    <article className="group flex min-h-[254px] w-full min-w-0 flex-col justify-between rounded-[var(--radius-md)] border border-border bg-canvas p-5 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-border-active hover:shadow-sm">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-accent bg-surface-teal">
            <Icon aria-hidden="true" className="text-xl" />
          </div>
          {calculator.badge && (
            <span className="rounded-[var(--radius-sm)] bg-surface-teal px-2 py-1 text-xs font-medium text-accent-text">
              {calculator.badge}
            </span>
          )}
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-text-muted">
          {calculator.categoryLabel}
        </span>
        <h3 className="mt-1.5 text-base font-medium leading-[1.4] text-text transition-colors group-hover:text-accent">
          {calculator.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-muted">
          {calculator.description}
        </p>
      </div>
      {href || calculator.href ? (
        <Link href={href || calculator.href} rel="noopener noreferrer">
          {action}
        </Link>
      ) : (
        action
      )}
    </article>
  );
}
