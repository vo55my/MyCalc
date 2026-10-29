"use client";

import { useState, useMemo, useCallback } from "react";
import {
  formatDisplay,
  serializeNumber,
  numberToWords,
} from "@/lib/calculators/math";

// Export constants for other hooks to use
export const MINUS = "−";
export const MAX_DIGITS = 16;
export const MAX_HISTORY = 50;

// Re-export serializeNumber for useCalculatorActions
export { serializeNumber };

/** State awal kalkulator. */
export const INITIAL_STATE = {
  expression: "",
  display: "0",
  rawInput: "0",
  rawValue: 0,
  isNewInput: true,
  memory: 0,
  history: [],
  lastResult: null,
};

/** Regex operator di akhir string (tanda "-" di-escape). */
const OPERATOR_END = /[+\-×÷*/%^]$/;

/**
 * Cek apakah ekspresi diakhiri operator.
 * @param {string} expression
 * @returns {boolean}
 */
export function expressionEndsWithOperator(expression) {
  return OPERATOR_END.test(expression.trimEnd());
}

/**
 * Cek apakah ekspresi menunggu operand (setelah operator, "(", atau ";")
 * @param {string} expression
 * @returns {boolean}
 */
export function expressionExpectsOperand(expression) {
  const trimmed = expression.trimEnd();
  return (
    OPERATOR_END.test(trimmed) || trimmed.endsWith("(") || trimmed.endsWith(";")
  );
}

/**
 * Format nilai untuk tampilan hasil (pakai MINUS "−").
 * @param {number} value
 * @returns {string}
 */
export function showValue(value) {
  return formatDisplay(value).replace(/^-/, MINUS);
}

/**
 * Format angka yang sedang diketik: pemisah ribuan titik, desimal koma.
 * @param {string} raw - Input mentah (mis. "1234.5" atau "-1234.5")
 * @returns {string} String terformat (mis. "1.234,5" atau "−1.234,5")
 */
export function formatTyped(raw) {
  if (raw === "-") return MINUS;
  const negative = raw.startsWith("-");
  const body = negative ? raw.slice(1) : raw;
  const [integer, fraction] = body.split(".");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${negative ? MINUS : ""}${grouped}${fraction !== undefined ? `,${fraction}` : ""}`;
}

/**
 * Bulatkan angka ke 15 digit signifikan (hindari sisa biner 0.1+0.2).
 * @param {number} value
 * @returns {number}
 */
export function cleanNumber(value) {
  return Number(value.toPrecision(15));
}

/**
 * Buat entri riwayat komputasi.
 * @param {string} expression - Ekspresi yang dihitung
 * @param {number} value - Hasil numerik
 * @returns {Object} Entri riwayat
 */
export function createHistoryEntry(expression, value) {
  return {
    expr: expression,
    result: showValue(value),
    value,
    time: new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    mode: "standard",
  };
}

/**
 * Hook untuk mengelola state kalkulator matematika.
 * @returns {Object} State dan setter functions
 */
export function useCalculatorState() {
  const [state, setState] = useState(INITIAL_STATE);

  // Derived state: terbilang dari rawValue
  const terbilang = useMemo(() => {
    return state.rawValue === null ? "" : numberToWords(state.rawValue);
  }, [state.rawValue]);

  // Helper: update state dengan spread
  const updateState = useCallback((partial) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  // Helper: reset ke initial state
  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  // Helper: clear entry (display only)
  const clearEntry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: "0",
      rawInput: "0",
      rawValue: 0,
      isNewInput: true,
    }));
  }, []);

  // Helper: recover from error
  const recoverFromError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      expression: "",
      display: "0",
      rawInput: "0",
      rawValue: 0,
      isNewInput: true,
    }));
  }, []);

  // Helper: begin negative entry
  const beginNegativeEntry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: MINUS,
      rawInput: "-",
      rawValue: null,
      isNewInput: false,
    }));
  }, []);

  return {
    state,
    terbilang,
    setState,
    updateState,
    resetState,
    clearEntry,
    recoverFromError,
    beginNegativeEntry,
    // Expose constants for other hooks (also available as named exports above)
    MINUS,
    MAX_DIGITS,
    MAX_HISTORY,
  };
}
