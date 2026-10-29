"use client";

import { useCalculatorState } from "./useCalculatorState";
import { useCalculatorActions } from "./useCalculatorActions";
import { useCalculatorHistory } from "./useCalculatorHistory";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

/**
 * Hook utama kalkulator matematika - compose dari hook-hook kecil.
 * @returns {Object} Semua state dan handler yang dibutuhkan komponen
 */
export function useMathCalculator() {
  // State management
  const {
    state,
    terbilang,
    setState,
    updateState,
    clearEntry,
    recoverFromError,
    beginNegativeEntry,
  } = useCalculatorState();

  // Action handlers
  const { handleDigit, handleOperator, handleAction, handleMemory } =
    useCalculatorActions({
      state,
      setState,
      updateState,
      clearEntry,
      recoverFromError,
      beginNegativeEntry,
    });

  // History handlers
  const { handleHistorySelect, handleClearHistory } = useCalculatorHistory({
    state,
    setState,
  });

  // Keyboard shortcuts
  useKeyboardShortcuts({
    handleDigit,
    handleOperator,
    handleAction,
  });

  // Return all needed by components
  return {
    state,
    terbilang,
    handleDigit,
    handleOperator,
    handleAction,
    handleMemory,
    handleHistorySelect,
    handleClearHistory,
  };
}
