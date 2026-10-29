"use client";

import Link from "next/link";
import { MdArrowForward, MdRestartAlt } from "react-icons/md";
import {
  calculatePromotion,
  clampPercentage,
  formatRupiah,
} from "@/lib/calculators/discount";
import { useNumberCalculator } from "@/hooks/useCalculator";
import { CalculatorField } from "./CalculatorField";

/**
 * Nilai awal untuk kalkulator diskon kompak.
 * Hanya mendukung mode "stacked" (diskon bertingkat) dengan 3 field:
 * - originalPrice: Harga awal
 * - primaryDiscount: Diskon utama (%)
 * - secondaryDiscount: Diskon kedua (%)
 */
const INITIAL_VALUES = {
  originalPrice: 450000,
  primaryDiscount: 50,
  secondaryDiscount: 20,
};

export function DiscountCompactCalculator() {
  const { values, result, update, reset } = useNumberCalculator({
    initialValues: INITIAL_VALUES,
    calculate: (vals) =>
      calculatePromotion({
        originalPrice: Number(vals.originalPrice) || 0,
        primaryDiscount: clampPercentage(vals.primaryDiscount),
        secondaryDiscount: clampPercentage(vals.secondaryDiscount),
      }),
    numberFields: ["originalPrice", "primaryDiscount", "secondaryDiscount"],
  });

  return (
    <div className="rounded-[var(--radius-md)] bg-canvas p-6 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent">
          Alat cepat hari ini
        </span>
      </div>
      <h2 className="text-xl font-medium text-text">
        Kalkulator Diskon & Cashback
      </h2>
      <p className="mb-5 mt-1 text-sm leading-relaxed text-text-muted">
        Hitung harga akhir dan penghematan diskon bertingkat secara cepat.
      </p>
      <div className="mb-5 space-y-3.5">
        <CalculatorField
          id="compact-discount-price"
          label="Harga normal (Rp)"
          onChange={(value) => update("originalPrice", value)}
          unit="Rp"
          value={values.originalPrice}
        />
        <div className="grid grid-cols-2 gap-3">
          <CalculatorField
            id="compact-primary-discount"
            label="Diskon utama"
            onChange={(value) => update("primaryDiscount", value)}
            unit="%"
            value={values.primaryDiscount}
          />
          <CalculatorField
            id="compact-secondary-discount"
            label="Diskon tambahan"
            onChange={(value) => update("secondaryDiscount", value)}
            unit="%"
            value={values.secondaryDiscount}
          />
        </div>
      </div>
      <div
        aria-live="polite"
        className="rounded-[var(--radius-lg)] bg-surface-teal p-5"
        role="status"
      >
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent">
          Harga akhir yang dibayar
        </span>
        <div className="mt-3 text-3xl font-bold text-primary">
          Rp {formatRupiah(result.finalPrice)}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-accent/5 p-3 text-sm">
          <span className="text-text-muted">Total dihemat:</span>
          <span className="font-mono font-medium text-success">
            Rp {formatRupiah(result.totalSavings)}
          </span>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="flex min-h-10 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-surface px-3 text-sm text-text-muted transition hover:bg-surface-teal hover:text-text"
          onClick={reset}
          type="button"
        >
          <MdRestartAlt aria-hidden="true" />
          Reset
        </button>
        <Link
          className="flex min-h-10 flex-1 items-center justify-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
          href="/kalkulator/diskon"
          rel="noopener noreferrer"
        >
          Buka kalkulator lengkap <MdArrowForward aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
