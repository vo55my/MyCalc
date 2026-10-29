"use client";

import { MdBackspace } from "react-icons/md";
import { CalcButton } from "@/components/ui/controls/CalcButton";

/**
 * Baris 1: Clear utilities (C, CE, Backspace, Divide)
 * @param {Object} props
 * @param {Function} props.onActionClick - Handler aksi (clear, backspace)
 * @param {Function} props.onOperatorClick - Handler operator
 */
export function KeypadRowClear({ onActionClick, onOperatorClick }) {
  return (
    <>
      <CalcButton
        variant="danger"
        aria-label="Hapus semua"
        onClick={() => onActionClick("clear-all")}
        type="button"
      >
        C
      </CalcButton>
      <CalcButton
        variant="action"
        aria-label="Hapus entri"
        onClick={() => onActionClick("clear-entry")}
        type="button"
      >
        CE
      </CalcButton>
      <CalcButton
        variant="action"
        aria-label="Hapus satu karakter"
        title="Backspace"
        onClick={() => onActionClick("backspace")}
        type="button"
      >
        <MdBackspace className="w-5 h-5 mx-auto" aria-hidden="true" />
      </CalcButton>
      <CalcButton
        variant="operator"
        onClick={() => onOperatorClick("/")}
        type="button"
      >
        ÷
      </CalcButton>
    </>
  );
}

/**
 * Baris 2: Secondary functions (Parentheses, Percent, Multiply)
 * @param {Object} props
 * @param {Function} props.onActionClick - Handler aksi (percent)
 * @param {Function} props.onOperatorClick - Handler operator (kurung, kali)
 */
export function KeypadRowSecondary({ onActionClick, onOperatorClick }) {
  return (
    <>
      <CalcButton
        variant="function"
        onClick={() => onOperatorClick("(")}
        type="button"
      >
        (
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => onOperatorClick(")")}
        type="button"
      >
        )
      </CalcButton>
      <CalcButton
        variant="action"
        aria-label="Persentase"
        onClick={() => onActionClick("percent")}
        type="button"
      >
        %
      </CalcButton>
      <CalcButton
        variant="operator"
        onClick={() => onOperatorClick("*")}
        type="button"
      >
        ×
      </CalcButton>
    </>
  );
}

/**
 * Baris 3: Digits 7, 8, 9 & Subtract
 * @param {Object} props
 * @param {Function} props.onDigitClick - Handler input digit
 * @param {Function} props.onOperatorClick - Handler operator
 */
export function KeypadRow789({ onDigitClick, onOperatorClick }) {
  return (
    <>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("7")}
        type="button"
      >
        7
      </CalcButton>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("8")}
        type="button"
      >
        8
      </CalcButton>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("9")}
        type="button"
      >
        9
      </CalcButton>
      <CalcButton
        variant="operator"
        onClick={() => onOperatorClick("-")}
        type="button"
      >
        −
      </CalcButton>
    </>
  );
}

/**
 * Baris 4: Digits 4, 5, 6 & Add
 * @param {Object} props
 * @param {Function} props.onDigitClick - Handler input digit
 * @param {Function} props.onOperatorClick - Handler operator
 */
export function KeypadRow456({ onDigitClick, onOperatorClick }) {
  return (
    <>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("4")}
        type="button"
      >
        4
      </CalcButton>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("5")}
        type="button"
      >
        5
      </CalcButton>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("6")}
        type="button"
      >
        6
      </CalcButton>
      <CalcButton
        variant="operator"
        onClick={() => onOperatorClick("+")}
        type="button"
      >
        +
      </CalcButton>
    </>
  );
}

/**
 * Baris 5: Digits 1, 2, 3 & Power
 * @param {Object} props
 * @param {Function} props.onDigitClick - Handler input digit
 * @param {Function} props.onOperatorClick - Handler operator
 */
export function KeypadRow123({ onDigitClick, onOperatorClick }) {
  return (
    <>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("1")}
        type="button"
      >
        1
      </CalcButton>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("2")}
        type="button"
      >
        2
      </CalcButton>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("3")}
        type="button"
      >
        3
      </CalcButton>
      <CalcButton
        variant="operator"
        onClick={() => onOperatorClick("^")}
        type="button"
      >
        ^
      </CalcButton>
    </>
  );
}

/**
 * Baris 6: Sign, 0, Decimal & Equal
 * @param {Object} props
 * @param {Function} props.onActionClick - Handler aksi (negate, equals)
 * @param {Function} props.onDigitClick - Handler input digit
 */
export function KeypadRowSignZeroDecimalEqual({ onActionClick, onDigitClick }) {
  return (
    <>
      <CalcButton
        variant="action"
        aria-label="Ubah tanda"
        onClick={() => onActionClick("negate")}
        type="button"
      >
        ±
      </CalcButton>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick("0")}
        type="button"
      >
        0
      </CalcButton>
      <CalcButton
        variant="digit"
        onClick={() => onDigitClick(".")}
        type="button"
      >
        ,
      </CalcButton>
      <CalcButton
        id="btn-equals"
        variant="equals"
        aria-label="Hitung"
        onClick={() => onActionClick("equals")}
        type="button"
      >
        =
      </CalcButton>
    </>
  );
}
