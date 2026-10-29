"use client";

import { MdInfoOutline, MdPriceCheck, MdShoppingBag } from "react-icons/md";
import { ShareActions } from "@/components/ui/actions/ShareActions";
import { formatRupiah } from "@/lib/calculators/discount";

/**
 * Right panel: Result summary + tips + info.
 *
 * @param {Object} props
 * @param {DiscountResult} props.result - Calculation result
 * @param {Object} props.values - Current input values
 * @param {string} props.mode - Active mode
 */
export function ResultPanel({ result, values, mode }) {
  const summary = `Simulasi ${mode === "bogo" ? "Beli X Gratis Y" : "Diskon MyCalc"}:\nTotal Bayar: Rp ${formatRupiah(result.finalPrice)}\nTotal Dihemat: Rp ${formatRupiah(result.totalSavings)}\n${mode === "bogo" ? `Unit gratis: ${result.freeUnits}` : `Cashback: Rp ${formatRupiah(result.cashback)}`}`;

  return (
    <section className="flex flex-col gap-6 md:sticky md:top-24 md:col-span-7">
      <div
        aria-atomic="true"
        aria-live="polite"
        className="rounded-[var(--radius-lg)] bg-surface-teal p-6 shadow-sm"
        role="status"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent-text">
            {mode === "bogo" ? "Hasil promosi BOGO" : "Hasil kalkulasi bersih"}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="result-value text-4xl">
            Rp {formatRupiah(result.finalPrice)}
          </span>
          <span className="text-sm text-text-muted line-through">
            Rp {formatRupiah(values.originalPrice)}
          </span>
        </div>
        <div className="mt-4 space-y-2 rounded-[var(--radius-md)] bg-accent/5 p-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted">
              {mode === "bogo" ? "Nilai unit gratis:" : "Total dihemat:"}
            </span>
            <span className="font-mono font-medium text-success">
              Rp {formatRupiah(result.totalSavings)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted">
              {mode === "bogo" ? "Unit gratis:" : "Manfaat efektif:"}
            </span>
            <span className="font-mono text-text">
              {mode === "bogo"
                ? result.freeUnits
                : `${result.effectiveDiscount.toFixed(1)}%`}
            </span>
          </div>
          {mode !== "bogo" && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted">Estimasi cashback:</span>
              <span className="font-mono text-text">
                Rp {formatRupiah(result.cashback)}
              </span>
            </div>
          )}
          {mode === "stacked" && result.voucherSavings > 0 && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted">Penghematan voucher:</span>
              <span className="font-mono text-text">
                Rp {formatRupiah(result.voucherSavings)}
              </span>
            </div>
          )}
        </div>
        <>
          <div className="mt-5">
            <div className="mb-1.5 flex justify-between text-xs text-text-muted">
              <span>Rasio bayar {result.paymentRatio.toFixed(1)}%</span>
              <span className="text-success">
                Hemat {result.savingsRatio.toFixed(1)}%
              </span>
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-border">
              <div
                className="bg-accent transition-all duration-500"
                style={{ width: `${result.paymentRatio}%` }}
              />
              <div
                className="bg-success transition-all duration-500"
                style={{ width: `${result.savingsRatio}%` }}
              />
            </div>
          </div>
          <div className="mt-5 space-y-2 border-t border-accent-light pt-4 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-text-muted">Harga asli label</span>
              <span className="font-mono text-text">
                Rp {formatRupiah(values.originalPrice)}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-text-muted">
                {mode === "bogo" ? "Unit yang dibayar" : "Diskon persentase"}
              </span>
              <span className="font-mono text-danger">
                {mode === "bogo"
                  ? result.paidUnits
                  : `- Rp ${formatRupiah(result.discountAmount)}`}
              </span>
            </div>
            {mode === "stacked" && result.voucherSavings > 0 && (
              <div className="flex justify-between gap-3">
                <span className="text-text-muted">Voucher</span>
                <span className="font-mono text-danger">
                  - Rp {formatRupiah(result.voucherSavings)}
                </span>
              </div>
            )}
            <div className="flex justify-between gap-3 rounded bg-success-light px-3 py-2">
              <span className="flex items-center gap-1 text-success">
                <MdPriceCheck aria-hidden="true" /> Total uang dihemat
              </span>
              <span className="font-mono font-bold text-success">
                Rp {formatRupiah(result.totalSavings)}
              </span>
            </div>
          </div>
          <ShareActions text={summary} title="Hasil Kalkulator Diskon MyCalc" />
        </>
      </div>

      {/* Tips section */}
      <div className="flex items-start gap-4 rounded-[var(--radius-lg)] bg-canvas p-5 shadow-sm">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-surface-teal text-accent">
          <MdShoppingBag aria-hidden="true" className="text-2xl" />
        </span>
        <div>
          <h2 className="text-base font-medium text-text">
            Tips belanja cerdas toko online
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            Masukkan voucher flat setelah diskon persentase agar harga akhir dan
            nilai hemat dihitung secara akurat.
          </p>
        </div>
      </div>

      {/* Info section */}
      <div className="flex items-start gap-3 rounded-[var(--radius-md)] bg-surface">
        <MdInfoOutline
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-xl text-accent"
        />
        <p className="text-sm leading-relaxed text-text-muted">
          Diskon 50% + 20% berarti diskon efektif 60%, karena diskon kedua
          diterapkan pada sisa harga setelah diskon pertama.
        </p>
      </div>
    </section>
  );
}
