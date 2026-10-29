"use client";

import { MdMonetizationOn } from "react-icons/md";
import { CalculatorField, PresetButtons } from "./CalculatorField";

/**
 * Field components for Cashback mode (diskon utama + cashback).
 *
 * @param {Object} props
 * @param {Object} props.values - Current form values
 * @param {Object} props.validationErrors - Validation error messages
 * @param {function} props.updateValue - Field update handler
 * @param {function} props.clearError - Error clear handler
 */
export function CashbackFields({
  values,
  validationErrors,
  updateValue,
  clearError,
}) {
  return (
    <div className="rounded-[var(--radius-md)] bg-surface p-3.5">
      <div className="mb-2 flex items-center gap-1.5 text-sm text-text">
        <MdMonetizationOn aria-hidden="true" className="text-warning" />
        Cashback ekstra
      </div>
      <div className="grid grid-cols-1 gap-3">
        <CalculatorField
          id="cashback-percent"
          label="Persen"
          max="100"
          onChange={(value) => updateValue("cashbackPercent", value)}
          onBlur={() => clearError("cashbackPercent")}
          unit="%"
          value={values.cashbackPercent}
          error={validationErrors.cashbackPercent}
        />
        <PresetButtons
          value={values.cashbackPercent}
          onSelect={(v) => updateValue("cashbackPercent", v)}
          presets={[1, 2, 3, 5, 10]}
        />
        <CalculatorField
          id="cashback-cap"
          label="Maksimal"
          onChange={(value) => updateValue("cashbackCap", value)}
          onBlur={() => clearError("cashbackCap")}
          unit="Rp"
          value={values.cashbackCap}
          error={validationErrors.cashbackCap}
        />
      </div>
    </div>
  );
}
