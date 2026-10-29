"use client";

import { CalculatorField, PresetButtons } from "./CalculatorField";

/**
 * Primary discount field with preset buttons.
 * Used in both Stacked and Cashback modes.
 *
 * @param {Object} props
 * @param {Object} props.values - Current form values
 * @param {Object} props.validationErrors - Validation error messages
 * @param {function} props.updateValue - Field update handler
 * @param {function} props.clearError - Error clear handler
 */
export function PrimaryDiscountField({
  values,
  validationErrors,
  updateValue,
  clearError,
}) {
  return (
    <div>
      <CalculatorField
        id="primary-discount"
        label="Diskon utama"
        max="100"
        onChange={(value) => updateValue("primaryDiscount", value)}
        onBlur={() => clearError("primaryDiscount")}
        unit="%"
        value={values.primaryDiscount}
        error={validationErrors.primaryDiscount}
      />
      <PresetButtons
        value={values.primaryDiscount}
        onSelect={(v) => updateValue("primaryDiscount", v)}
      />
    </div>
  );
}
