"use client";

import { useCallback } from "react";
import { showValue, serializeNumber } from "./useCalculatorState";

/**
 * Hook untuk mengelola riwayat kalkulator.
 * @param {Object} params
 * @param {Object} params.state - Current calculator state
 * @param {Function} params.setState - State setter
 * @returns {Object} History handler functions
 */
export function useCalculatorHistory({ state, setState }) {
  /**
   * Handler saat entri riwayat dipilih.
   * @param {Object} entry - Entri riwayat yang dipilih
   */
  const handleHistorySelect = useCallback(
    (entry) => {
      setState((prev) => ({
        ...prev,
        expression: "",
        display: showValue(entry.value),
        rawInput: serializeNumber(entry.value),
        rawValue: entry.value,
        isNewInput: true,
        lastResult: entry.value,
      }));
    },
    [setState],
  );

  /**
   * Handler hapus seluruh riwayat.
   */
  const handleClearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, history: [] }));
  }, [setState]);

  return {
    handleHistorySelect,
    handleClearHistory,
  };
}
