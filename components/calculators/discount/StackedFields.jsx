"use client";

import { CalculatorField, PresetButtons } from "./CalculatorField";

/**
 * Field components for Stacked mode (diskon bertingkat + voucher).
 *
 * @param {Object} props
 * @param {Object} props.values - Current form values
 * @param {Object} props.validationErrors - Validation error messages
 * @param {function} props.updateValue - Field update handler
 * @param {function} props.clearError - Error clear handler
 */
export function StackedFields({
  values,
  validationErrors,
  updateValue,
  clearError,
}) {
  return (
    <>
      <div className="rounded-[var(--radius-md)] bg-surface p-3.5">
        <CalculatorField
          id="secondary-discount"
          label="Diskon kedua"
          max="100"
          onChange={(value) => updateValue("secondaryDiscount", value)}
          onBlur={() => clearError("secondaryDiscount")}
          unit="%"
          value={values.secondaryDiscount}
          error={validationErrors.secondaryDiscount}
        />
        <PresetButtons
          value={values.secondaryDiscount}
          onSelect={(v) => updateValue("secondaryDiscount", v)}
          presets={[5, 10, 15, 20, 25]}
        />
        <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
          Diterapkan setelah diskon pertama, bukan dijumlahkan langsung.
        </p>
      </div>
      <CalculatorField
        id="voucher-cut"
        label="Voucher toko / kupon flat"
        onChange={(value) => updateValue("voucherCut", value)}
        onBlur={() => clearError("voucherCut")}
        unit="Rp"
        value={values.voucherCut}
        error={validationErrors.voucherCut}
      />
    </>
  );
}
