"use client";

import { useState } from "react";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { evaluateExpression, formatDisplay } from "@/lib/calculators/math";

const buttons = [
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "C",
  "+",
];

/**
 * Cek apakah nilai adalah operator.
 * @param {string} value
 * @returns {boolean}
 */
function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
}

/**
 * Cek apakah ekspresi tidak lengkap (kosong atau diakhiri operator).
 * @param {string} value
 * @returns {boolean}
 */
function isIncompleteExpression(value) {
  return !value || isOperator(value.at(-1));
}

export function MathCompactCalculator() {
  // Local display state for compact version (simpler UI state)
  const [expression, setExpression] = useState("");
  const [display, setDisplay] = useState("0");

  /**
   * Handler klik tombol kalkulator ringkas.
   * @param {string} button - Label tombol yang diklik
   */
  function press(button) {
    if (button === "C") {
      setExpression("");
      setDisplay("0");
      return;
    }

    const current = expression;

    const value = button === "×" ? "*" : button === "÷" ? "/" : button;
    const isNextOperator = isOperator(value);

    if (isNextOperator) {
      if (!current) {
        if (value !== "-") return;
        setExpression("-");
        setDisplay("−");
        return;
      }

      if (isIncompleteExpression(current)) {
        const previousOperator = current.at(-1);
        const canStartNegativeOperand =
          value === "-" && previousOperator !== "-" && current.length > 1;
        if (canStartNegativeOperand) {
          setExpression(`${current}-`);
          return;
        }
        const base = current.replace(/[+\-*/]+$/, "");
        if (!base) return;
        setExpression(`${base}${value}`);
        return;
      }

      setExpression(`${current}${value}`);
      return;
    }

    const currentNumber = current.match(/[\d.]*$/)?.[0] ?? "";
    if (value === "." && currentNumber.includes(".")) return;

    let next;
    if (value === ".") {
      next = `${current}${currentNumber === "" ? "0." : "."}`;
    } else if (currentNumber === "0") {
      next = `${current.slice(0, -1)}${value}`;
    } else {
      next = `${current}${value}`;
    }
    setExpression(next);
    const result = evaluateExpression(next);
    setDisplay(result.success ? formatDisplay(result.value) : "Error");
  }

  return (
    <div className="rounded-[var(--radius-md)] bg-canvas p-6 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent">
          Alat cepat hari ini
        </span>
      </div>
      <h2 className="text-xl font-medium text-text">
        Kalkulator Standar & Matematika
      </h2>
      <p className="mb-5 mt-1 text-sm leading-relaxed text-text-muted">
        Hitung operasi aritmatika, persentase, eksponen, dan fungsi saintifik
        presisi.
      </p>
      <div className="mb-5 space-y-3.5">
        <div className="flex min-h-[100px] flex-col justify-end rounded-xl bg-surface p-4">
          <div className="mb-1 text-right font-mono text-sm text-text-muted">
            {expression || "0"}
          </div>
          <div
            className="text-right font-mono text-2xl text-text"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {display}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button) => (
            <button
              className={`h-11 rounded-lg font-mono transition hover:bg-surface ${
                ["÷", "×", "-", "+"].includes(button)
                  ? "bg-surface text-accent"
                  : button === "C"
                    ? "bg-danger-light text-danger"
                    : "bg-surface text-text"
              }`}
              key={button}
              onClick={() => press(button)}
              type="button"
            >
              {button}
            </button>
          ))}
        </div>
      </div>
      <Link
        className="mt-4 flex min-h-11 items-center justify-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        href="/kalkulator/matematika"
        rel="noopener noreferrer"
      >
        Buka kalkulator lengkap <MdArrowForward aria-hidden="true" />
      </Link>
    </div>
  );
}
