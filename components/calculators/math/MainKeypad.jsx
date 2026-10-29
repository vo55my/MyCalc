"use client";

import {
  KeypadRowClear,
  KeypadRowSecondary,
  KeypadRow789,
  KeypadRow456,
  KeypadRow123,
  KeypadRowSignZeroDecimalEqual,
} from "./KeypadRows";

/**
 * Keypad utama kalkulator dengan semua baris tombol.
 * @param {Object} props
 * @param {Function} props.onDigitClick - Handler input digit
 * @param {Function} props.onOperatorClick - Handler input operator
 * @param {Function} props.onActionClick - Handler aksi (clear, equals, dll.)
 */
export function MainKeypad({ onDigitClick, onOperatorClick, onActionClick }) {
  return (
    <div className="grid grid-cols-4 gap-2.5 pt-1">
      <KeypadRowClear
        onActionClick={onActionClick}
        onOperatorClick={onOperatorClick}
      />
      <KeypadRowSecondary
        onActionClick={onActionClick}
        onOperatorClick={onOperatorClick}
      />
      <KeypadRow789
        onDigitClick={onDigitClick}
        onOperatorClick={onOperatorClick}
      />
      <KeypadRow456
        onDigitClick={onDigitClick}
        onOperatorClick={onOperatorClick}
      />
      <KeypadRow123
        onDigitClick={onDigitClick}
        onOperatorClick={onOperatorClick}
      />
      <KeypadRowSignZeroDecimalEqual
        onActionClick={onActionClick}
        onDigitClick={onDigitClick}
      />
    </div>
  );
}
