"use client";

import { CalculatorField } from "./CalculatorField";

/**
 * Field components for BOGO mode (Beli X Gratis Y).
 *
 * @param {Object} props
 * @param {Object} props.values - Current form values
 * @param {Object} props.validationErrors - Validation error messages
 * @param {function} props.updateValue - Field update handler
 * @param {function} props.clearError - Error clear handler
 */
export function BogoFields({
  values,
  validationErrors,
  updateValue,
  clearError,
}) {
  return (
    <div className="space-y-4 rounded-[var(--radius-md)] bg-surface p-3.5">
      <CalculatorField
        id="buy-quantity"
        label="Beli sejumlah"
        max="100"
        min="1"
        onChange={(value) => updateValue("buyQuantity", value)}
        onBlur={() => clearError("buyQuantity")}
        unit="unit"
        value={values.buyQuantity}
        error={validationErrors.buyQuantity}
      />
      <CalculatorField
        id="free-quantity"
        label="Gratis sejumlah"
        max="100"
        min="1"
        onChange={(value) => updateValue("freeQuantity", value)}
        onBlur={() => clearError("freeQuantity")}
        unit="unit"
        value={values.freeQuantity}
        error={validationErrors.freeQuantity}
      />
      <CalculatorField
        id="promotion-quantity"
        label="Jumlah unit dibeli"
        max="1000"
        min="1"
        onChange={(value) => updateValue("quantity", value)}
        onBlur={() => clearError("quantity")}
        unit="unit"
        value={values.quantity}
        error={validationErrors.quantity}
      />
      <p className="text-xs leading-relaxed text-text-muted">
        Contoh: beli 2 gratis 1 dengan 3 unit berarti hanya membayar 2 unit.
      </p>
    </div>
  );
}
