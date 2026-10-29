"use client";

import { useCallback } from "react";
import { evaluateExpression } from "@/lib/calculators/math";
import {
  expressionEndsWithOperator,
  expressionExpectsOperand,
  formatTyped,
  showValue,
  cleanNumber,
  serializeNumber,
  createHistoryEntry,
  MINUS,
  MAX_DIGITS,
} from "./useCalculatorState";

/**
 * Hook untuk handler aksi kalkulator (digit, operator, action, memory).
 * @param {Object} params
 * @param {Object} params.state - Current calculator state
 * @param {Function} params.setState - State setter
 * @param {Function} params.updateState - Partial state updater
 * @param {Function} params.clearEntry - Clear entry helper
 * @param {Function} params.recoverFromError - Error recovery helper
 * @param {Function} params.beginNegativeEntry - Begin negative entry helper
 * @returns {Object} Handler functions
 */
export function useCalculatorActions({
  setState,
  recoverFromError,
  beginNegativeEntry,
}) {
  /**
   * Handler input digit (0-9 dan titik desimal).
   * @param {string} digit - Digit yang diklik ("0"-"9" atau ".")
   */
  const handleDigit = useCallback(
    (digit) => {
      setState((prev) => {
        if (
          prev.isNewInput ||
          prev.display === "0" ||
          prev.display === "Error"
        ) {
          let expression = prev.expression;
          if (prev.display === "Error") {
            expression = "";
          } else if (
            prev.isNewInput &&
            expression.trim() &&
            !expressionExpectsOperand(expression)
          ) {
            expression = /(\)|pi|e)$/.test(expression.trimEnd())
              ? expression
              : "";
          }
          if (digit === ".") {
            return {
              ...prev,
              expression,
              display: "0,",
              rawInput: "0.",
              rawValue: 0,
              isNewInput: false,
            };
          }
          return {
            ...prev,
            expression,
            display: digit,
            rawInput: digit,
            rawValue: Number(digit),
            isNewInput: false,
          };
        }

        let base = prev.rawInput;
        if (digit === ".") {
          if (base.includes(".")) return prev;
          if (base === "-") base = "-0";
        } else if (base === "-0") {
          base = "-";
        }
        if (base.replace(/[^0-9]/g, "").length >= MAX_DIGITS) return prev;

        const rawInput = base + digit;
        return {
          ...prev,
          display: formatTyped(rawInput),
          rawInput,
          rawValue: Number(rawInput),
        };
      });
    },
    [setState],
  );

  /**
   * Handler input operator (+, -, ×, ÷, ^, (, )).
   * @param {string} op - Operator yang diklik
   */
  const handleOperator = useCallback(
    (op) => {
      setState((prev) => {
        if (prev.display === "Error") return prev;

        if (op === "(") {
          const trimmed = prev.expression.trimEnd();
          let newExpr;
          if (!prev.isNewInput && prev.rawValue !== null) {
            newExpr = trimmed
              ? `${trimmed} ${prev.rawInput} (`
              : `${prev.rawInput} (`;
          } else {
            newExpr = trimmed ? `${trimmed} (` : "(";
          }
          return {
            ...prev,
            expression: newExpr,
            isNewInput: true,
          };
        }

        if (op === ")") {
          const trimmed = prev.expression.trimEnd();
          let depth = 0;
          for (const ch of trimmed) {
            if (ch === "(") depth++;
            if (ch === ")") depth--;
          }
          if (depth <= 0) return prev;

          let newExpr;
          if (!prev.isNewInput && prev.rawValue !== null) {
            newExpr = trimmed
              ? `${trimmed} ${prev.rawInput})`
              : `${prev.rawInput})`;
          } else {
            newExpr = trimmed ? `${trimmed})` : ")";
          }
          return {
            ...prev,
            expression: newExpr,
            isNewInput: true,
          };
        }

        const startsNegativeEntry =
          op === "-" &&
          prev.isNewInput &&
          (expressionExpectsOperand(prev.expression) ||
            (!prev.expression && prev.display === "0"));
        if (startsNegativeEntry) return beginNegativeEntry(prev);

        if (!prev.isNewInput && prev.rawValue === null) return prev;

        const opSymbol = op === "*" ? "×" : op === "/" ? "÷" : op;
        const trimmedExpression = prev.expression.trimEnd();
        const hasPendingOperator =
          expressionEndsWithOperator(trimmedExpression);
        let newExpr;

        if (prev.isNewInput && hasPendingOperator) {
          newExpr = `${trimmedExpression.slice(0, -1).trimEnd()} ${opSymbol} `;
        } else if (
          prev.isNewInput &&
          expressionExpectsOperand(trimmedExpression)
        ) {
          return prev;
        } else if (prev.isNewInput && trimmedExpression) {
          newExpr = `${trimmedExpression} ${opSymbol} `;
        } else {
          newExpr = `${prev.expression}${prev.rawInput} ${opSymbol} `;
        }

        return {
          ...prev,
          expression: newExpr,
          isNewInput: true,
        };
      });
    },
    [setState, beginNegativeEntry],
  );

  /**
   * Handler aksi (clear, backspace, negate, percent, equals).
   * @param {string} action - Aksi yang dipicu
   */
  const handleAction = useCallback(
    (action) => {
      setState((prev) => {
        switch (action) {
          case "clear-all":
            return {
              ...prev,
              expression: "",
              display: "0",
              rawInput: "0",
              rawValue: 0,
              isNewInput: true,
              lastResult: null,
            };
          case "clear-entry":
            return {
              ...prev,
              display: "0",
              rawInput: "0",
              rawValue: 0,
              isNewInput: true,
            };
          case "backspace": {
            if (prev.display === "Error") return recoverFromError(prev);
            if (prev.isNewInput) return prev;
            if (prev.rawInput.length <= 1) {
              return {
                ...prev,
                display: "0",
                rawInput: "0",
                rawValue: 0,
                isNewInput: true,
              };
            }
            const rawInput = prev.rawInput.slice(0, -1);
            if (rawInput === "-") {
              return {
                ...prev,
                display: MINUS,
                rawInput,
                rawValue: null,
                isNewInput: false,
              };
            }
            return {
              ...prev,
              display: formatTyped(rawInput),
              rawInput,
              rawValue: Number(rawInput),
            };
          }
          case "negate": {
            if (prev.display === "Error") return prev;
            if (prev.rawInput === "-") {
              return {
                ...prev,
                display: "0",
                rawInput: "0",
                rawValue: 0,
              };
            }
            if (
              prev.isNewInput &&
              (expressionExpectsOperand(prev.expression) ||
                (!prev.expression && prev.display === "0"))
            ) {
              return beginNegativeEntry(prev);
            }
            if (prev.rawValue !== null) {
              const rawInput = prev.rawInput.startsWith("-")
                ? prev.rawInput.slice(1)
                : `-${prev.rawInput}`;
              const rawValue = Number(rawInput);
              const isResult = prev.isNewInput && !prev.expression.trim();
              return {
                ...prev,
                display: prev.isNewInput
                  ? showValue(rawValue)
                  : formatTyped(rawInput),
                rawInput,
                rawValue,
                ...(isResult ? { lastResult: rawValue } : {}),
              };
            }
            return prev;
          }
          case "percent": {
            if (prev.rawValue === null || prev.display === "Error") return prev;
            const trimmedExpression = prev.expression.trimEnd();
            const pendingOperator = expressionEndsWithOperator(
              trimmedExpression,
            )
              ? trimmedExpression.at(-1)
              : null;
            if (pendingOperator && prev.isNewInput) return prev;

            let rawValue = prev.rawValue / 100;
            let expression;
            if (pendingOperator) {
              if (pendingOperator === "+" || pendingOperator === "-") {
                const baseExpression = trimmedExpression.slice(0, -1).trimEnd();
                const baseResult = evaluateExpression(baseExpression);
                if (!baseResult.success) return prev;
                rawValue = (prev.rawValue / 100) * baseResult.value;
              }
              rawValue = cleanNumber(rawValue);
              expression = `${prev.expression}${serializeNumber(rawValue)}`;
            } else if (
              prev.expression &&
              expressionExpectsOperand(prev.expression)
            ) {
              if (prev.isNewInput) return prev;
              rawValue = cleanNumber(rawValue);
              expression = `${prev.expression}${prev.rawInput} / 100`;
            } else {
              rawValue = cleanNumber(rawValue);
              expression = `${prev.rawInput} / 100`;
            }
            return {
              ...prev,
              expression,
              display: showValue(rawValue),
              rawInput: serializeNumber(rawValue),
              rawValue,
              isNewInput: true,
            };
          }
          case "equals": {
            if (prev.display === "Error") return prev;
            if (!prev.isNewInput && prev.rawValue === null) return prev;

            let fullExpr = prev.isNewInput
              ? prev.expression.replace(/[\s+\-×÷*/^]+$/, "")
              : `${prev.expression.trimEnd()} ${prev.rawInput}`.trim();
            if (!fullExpr) return prev;
            const evalResult = evaluateExpression(fullExpr);
            if (!evalResult.success) {
              return {
                ...prev,
                display: "Error",
                rawInput: "0",
                rawValue: null,
                expression: "",
                isNewInput: true,
              };
            }
            const historyEntry = createHistoryEntry(fullExpr, evalResult.value);
            return {
              ...prev,
              display: historyEntry.result,
              rawInput: serializeNumber(evalResult.value),
              rawValue: evalResult.value,
              expression: "",
              lastResult: evalResult.value,
              history: [historyEntry, ...prev.history.slice(0, 49)],
              isNewInput: true,
            };
          }
        }
        return prev;
      });
    },
    [setState, recoverFromError, beginNegativeEntry],
  );

  /**
   * Handler operasi memori (MC, MR, M+, M-, MS).
   * @param {string} action - Aksi memori
   */
  const handleMemory = useCallback(
    (action) => {
      setState((prev) => {
        const currentValue = prev.rawValue ?? 0;
        let newMemory = prev.memory;

        switch (action) {
          case "MC":
            newMemory = 0;
            break;
          case "MR": {
            const recalled = {
              display: showValue(prev.memory),
              rawInput: serializeNumber(prev.memory),
              rawValue: prev.memory,
              isNewInput: true,
            };
            if (
              prev.display !== "Error" &&
              expressionExpectsOperand(prev.expression)
            ) {
              return {
                ...prev,
                ...recalled,
                expression: `${prev.expression}${recalled.rawInput}`,
              };
            }
            return {
              ...prev,
              ...recalled,
              lastResult: prev.memory,
            };
          }
          case "M+":
            newMemory = cleanNumber(prev.memory + currentValue);
            break;
          case "M-":
            newMemory = cleanNumber(prev.memory - currentValue);
            break;
          case "MS":
            newMemory = currentValue;
            break;
        }
        return { ...prev, memory: newMemory };
      });
    },
    [setState],
  );

  return {
    handleDigit,
    handleOperator,
    handleAction,
    handleMemory,
  };
}
