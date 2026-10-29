"use client";

import { useEffect } from "react";

/**
 * Hook untuk keyboard shortcuts kalkulator matematika.
 * @param {Object} params
 * @param {Function} params.handleDigit - Handler digit
 * @param {Function} params.handleOperator - Handler operator
 * @param {Function} params.handleAction - Handler action
 * @returns {void}
 */
export function useKeyboardShortcuts({
  handleDigit,
  handleOperator,
  handleAction,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      )
        return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        handleDigit(key);
      } else if (key === "." || key === ",") {
        event.preventDefault();
        handleDigit(".");
      } else if (key === "+" || key === "-") {
        event.preventDefault();
        handleOperator(key);
      } else if (key === "*") {
        event.preventDefault();
        handleOperator("*");
      } else if (key === "/") {
        event.preventDefault();
        handleOperator("/");
      } else if (key === "^") {
        event.preventDefault();
        handleOperator("^");
      } else if (key === "(") {
        event.preventDefault();
        handleOperator("(");
      } else if (key === ")") {
        event.preventDefault();
        handleOperator(")");
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleAction("equals");
      } else if (key === "Backspace") {
        event.preventDefault();
        handleAction("backspace");
      } else if (key === "Escape") {
        event.preventDefault();
        handleAction("clear-all");
      } else if (key === "%") {
        event.preventDefault();
        handleAction("percent");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDigit, handleOperator, handleAction]);
}
