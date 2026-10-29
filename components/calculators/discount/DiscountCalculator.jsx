"use client";

import { MdRestartAlt } from "react-icons/md";
import {
  calculatePromotion,
  clampPercentage,
  formatRupiah,
} from "@/lib/calculators/discount";
import { useNumberCalculator } from "@/hooks/useCalculator";
import { CalculatorField } from "./CalculatorField";
import { ModeSelector } from "./ModeSelector";
import { StackedFields } from "./StackedFields";
import { CashbackFields } from "./CashbackFields";
import { BogoFields } from "./BogoFields";
import { PrimaryDiscountField } from "./PrimaryDiscountField";
import { ResultPanel } from "./ResultPanel";

/**
 * Nilai awal untuk kalkulator diskon penuh.
 * Mencakup semua field yang dibutuhkan untuk ketiga mode: stacked, cashback, bogo.
 * Mode default adalah "stacked" (diskon bertingkat).
 */
const INITIAL_VALUES = {
  originalPrice: 450000,
  primaryDiscount: 50,
  secondaryDiscount: 20,
  voucherCut: 25000,
  cashbackPercent: 5,
  cashbackCap: 20000,
  buyQuantity: 2,
  freeQuantity: 1,
  quantity: 3,
  mode: "stacked",
};

/**
 * Konfigurasi validasi per field.
 * Digunakan oleh useNumberCalculator untuk validasi real-time.
 */
const FIELD_CONFIG = {
  originalPrice: { min: 0, required: true },
  primaryDiscount: { min: 0, max: 100 },
  secondaryDiscount: { min: 0, max: 100 },
  voucherCut: { min: 0 },
  cashbackPercent: { min: 0, max: 100 },
  cashbackCap: { min: 0 },
  buyQuantity: { min: 1, max: 100, required: true },
  freeQuantity: { min: 1, max: 100, required: true },
  quantity: { min: 1, max: 1000, required: true },
};

export function DiscountCalculator() {
  const {
    values,
    result,
    update,
    reset: resetValues,
    validationErrors,
    clearError,
  } = useNumberCalculator({
    initialValues: INITIAL_VALUES,
    calculate: (vals) =>
      calculatePromotion({
        mode: vals.mode,
        originalPrice: Number(vals.originalPrice) || 0,
        primaryDiscount: clampPercentage(vals.primaryDiscount),
        secondaryDiscount: clampPercentage(vals.secondaryDiscount),
        voucherCut: Math.max(0, Number(vals.voucherCut) || 0),
        cashbackPercent: clampPercentage(vals.cashbackPercent),
        cashbackCap: Math.max(0, Number(vals.cashbackCap) || 0),
        buyQuantity: Math.max(1, Number(vals.buyQuantity) || 1),
        freeQuantity: Math.max(1, Number(vals.freeQuantity) || 1),
        quantity: Math.max(1, Number(vals.quantity) || 1),
      }),
    numberFields: [
      "originalPrice",
      "primaryDiscount",
      "secondaryDiscount",
      "voucherCut",
      "cashbackPercent",
      "cashbackCap",
      "buyQuantity",
      "freeQuantity",
      "quantity",
    ],
    fieldConfig: FIELD_CONFIG,
  });

  const mode = values.mode;

  function updateValue(field, value) {
    update(field, value);
    if (validationErrors[field]) {
      clearError(field);
    }
  }

  function handleModeChange(newMode) {
    const updates = { mode: newMode };

    if (newMode === "bogo") {
      updates.primaryDiscount = 0;
      updates.secondaryDiscount = 0;
      updates.voucherCut = 0;
      updates.cashbackPercent = 0;
      updates.cashbackCap = 0;
    } else if (newMode === "cashback") {
      updates.secondaryDiscount = 0;
      updates.voucherCut = 0;
      updates.buyQuantity = 2;
      updates.freeQuantity = 1;
      updates.quantity = 3;
    } else {
      updates.cashbackPercent = 0;
      updates.cashbackCap = 0;
      updates.buyQuantity = 2;
      updates.freeQuantity = 1;
      updates.quantity = 3;
    }

    update(updates);
  }

  function reset() {
    resetValues();
  }

  return (
    <div className="grid items-start gap-8 md:grid-cols-12">
      {/* Left Column: Input Form */}
      <section className="flex flex-col gap-6 rounded-[var(--radius-lg)] bg-canvas p-6 shadow-sm md:col-span-5">
        <ModeSelector mode={mode} onChange={handleModeChange} />

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <CalculatorField
            id="initial-price"
            label="Harga label / harga awal"
            onChange={(value) => updateValue("originalPrice", value)}
            onBlur={() => clearError("originalPrice")}
            unit="Rp"
            value={values.originalPrice}
            error={validationErrors.originalPrice}
          />

          {mode !== "bogo" && (
            <PrimaryDiscountField
              values={values}
              validationErrors={validationErrors}
              updateValue={updateValue}
              clearError={clearError}
            />
          )}

          {mode === "stacked" && (
            <StackedFields
              values={values}
              validationErrors={validationErrors}
              updateValue={updateValue}
              clearError={clearError}
            />
          )}

          {mode === "cashback" && (
            <CashbackFields
              values={values}
              validationErrors={validationErrors}
              updateValue={updateValue}
              clearError={clearError}
            />
          )}

          {mode === "bogo" && (
            <BogoFields
              values={values}
              validationErrors={validationErrors}
              updateValue={updateValue}
              clearError={clearError}
            />
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-surface px-4 text-sm font-medium text-text-muted transition-colors hover:bg-surface-teal hover:text-text"
              onClick={reset}
              type="button"
            >
              <MdRestartAlt aria-hidden="true" /> Reset
            </button>
          </div>
        </form>
      </section>

      {/* Right Column: Results */}
      <ResultPanel result={result} values={values} mode={mode} />
    </div>
  );
}
