"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";

/**
 * Hook generik untuk mengelola state dan kalkulasi calculator.
 *
 * @template TValues, TResult
 * @param {Object} options
 * @param {TValues} options.initialValues - Nilai awal form
 * @param {function(TValues): TResult} options.calculate - Fungsi kalkulasi (receive values, return result)
 * @param {function(TValues, string, any): TValues} [options.transform] - Optional transform sebelum setValues
 * @param {function(TValues): TValues} [options.sanitize] - Optional sanitasi values sebelum kalkulasi
 * @param {function(string, any, string): void} [options.onValidationError] - Callback saat validasi gagal (field, value, message)
 * @returns {{values: TValues, result: TResult, update: function, reset: function, setValues: function, validationErrors: Record<string, string>, clearError: function}}
 */
export function useCalculator({
  initialValues,
  calculate,
  transform,
  sanitize,
  onValidationError,
}) {
  const [values, setValues] = useState(initialValues);
  const [validationErrors, setValidationErrors] = useState({});
  const onValidationErrorRef = useRef(onValidationError);

  // Update ref via effect to avoid render-time mutation
  useEffect(() => {
    onValidationErrorRef.current = onValidationError;
  }, [onValidationError]);

  // Sanitasi values sebelum kalkulasi (default: identity)
  const sanitizedValues = useMemo(
    () => (sanitize ? sanitize(values) : values),
    [values, sanitize],
  );

  // Hitung hasil dengan useMemo untuk performa
  const result = useMemo(
    () => calculate(sanitizedValues),
    [sanitizedValues, calculate],
  );

  // Support both update("field", value) and update({ field: value }) forms.
  const update = useCallback(
    (fieldOrPatch, value) => {
      setValues((current) => {
        if (
          fieldOrPatch !== null &&
          typeof fieldOrPatch === "object" &&
          !Array.isArray(fieldOrPatch)
        ) {
          return { ...current, ...fieldOrPatch };
        }

        const field = fieldOrPatch;
        const newValue = value;

        // Validasi field numerik
        if (typeof newValue === "string" || typeof newValue === "number") {
          const num = Number(newValue);
          if (Number.isNaN(num)) {
            const msg = "Harus berupa angka";
            setValidationErrors((prev) => ({ ...prev, [field]: msg }));
            onValidationErrorRef.current?.(field, newValue, msg);
          } else if (num < 0) {
            const msg = "Tidak boleh negatif";
            setValidationErrors((prev) => ({ ...prev, [field]: msg }));
            onValidationErrorRef.current?.(field, newValue, msg);
          } else {
            // Clear error jika valid
            setValidationErrors((prev) => {
              const next = { ...prev };
              delete next[field];
              return next;
            });
          }
        }

        return transform
          ? transform(current, field, newValue)
          : { ...current, [field]: newValue };
      });
    },
    [transform],
  );

  // Reset ke initial values
  const reset = useCallback(() => {
    setValues(initialValues);
    setValidationErrors({});
  }, [initialValues]);

  // Set values manual (untuk bulk update)
  const setValuesDirect = useCallback((newValues) => {
    setValues(newValues);
    setValidationErrors({});
  }, []);

  // Clear error untuk field tertentu
  const clearError = useCallback((field) => {
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  return {
    values,
    result,
    update,
    reset,
    setValues: setValuesDirect,
    validationErrors,
    clearError,
  };
}

/**
 * Hook khusus untuk calculator dengan multiple fields yang butuh konversi tipe.
 * Otomatis konversi string ke number untuk field numerik.
 *
 * @template TValues
 * @param {Object} options
 * @param {TValues} options.initialValues
 * @param {function(TValues): any} options.calculate
 * @param {string[]} options.numberFields - Daftar field yang harus dikonversi ke number (caller should memoize with useMemo)
 * @param {Object} [options.fieldConfig] - Konfigurasi validasi per field: { [field]: { min, max, required } }
 * @returns {ReturnType<useCalculator>}
 */
export function useNumberCalculator({
  initialValues,
  calculate,
  numberFields = [],
  fieldConfig = {},
}) {
  // Gunakan ref untuk melacak numberFields sebelumnya dan hindari re-create sanitize function
  const numberFieldsRef = useRef(numberFields);
  const fieldConfigRef = useRef(fieldConfig);

  // Update refs when props change
  useEffect(() => {
    numberFieldsRef.current = numberFields;
  }, [numberFields]);

  useEffect(() => {
    fieldConfigRef.current = fieldConfig;
  }, [fieldConfig]);

  const sanitize = useCallback(
    (vals) => {
      const sanitized = { ...vals };
      for (const field of numberFieldsRef.current) {
        if (field in sanitized) {
          const num = Number(sanitized[field]);
          sanitized[field] = Number.isNaN(num) ? 0 : num;
        }
      }
      return sanitized;
    },
    [], // Empty deps - uses refs
  );

  // Validasi tambahan berdasarkan fieldConfig
  const validate = useCallback(
    (field, value) => {
      const config = fieldConfigRef.current[field];
      if (!config) return null;

      const num = Number(value);
      if (Number.isNaN(num)) return "Harus berupa angka";
      if (
        config.required &&
        (value === "" || value === null || value === undefined)
      )
        return "Wajib diisi";
      if (config.min !== undefined && num < config.min)
        return `Minimal ${config.min}`;
      if (config.max !== undefined && num > config.max)
        return `Maksimal ${config.max}`;
      return null;
    },
    [], // Empty deps - uses refs
  );

  return useCalculator({
    initialValues,
    calculate,
    sanitize,
    onValidationError: validate,
  });
}

/**
 * Hook untuk calculator dengan state array (seperti GPA courses).
 *
 * @template TItem
 * @param {Object} options
 * @param {TItem[]} options.initialItems
 * @param {function(TItem[]): any} options.calculate
 * @returns {{items: TItem[], result: any, addItem: function, removeItem: function, updateItem: function, reset: function}}
 */
export function useArrayCalculator({ initialItems, calculate }) {
  const [items, setItems] = useState(initialItems);

  const result = useMemo(() => calculate(items), [items, calculate]);

  const addItem = useCallback((newItem) => {
    setItems((current) => [...current, newItem]);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateItem = useCallback((id, field, value) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }, []);

  const reset = useCallback(() => {
    setItems(initialItems);
  }, [initialItems]);

  return { items, result, addItem, removeItem, updateItem, reset, setItems };
}
