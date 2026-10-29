"use client";

import { useMemo } from "react";
import Link from "next/link";
import { MdArrowForward, MdSwapHoriz } from "react-icons/md";
import {
  calculateConversion,
  getFirstUnit,
  getSecondUnit,
  getUnits,
} from "@/lib/calculators/conversion";
import { useCalculator } from "@/hooks/useCalculator";
import { SelectField } from "@/components/ui/controls/SelectField";

/**
 * Initial state for the compact conversion calculator
 * @type {Object}
 * @property {string} category - Default category (length)
 * @property {string} fromValue - Default input value
 * @property {string} fromUnit - Default source unit
 * @property {string} toUnit - Default target unit
 */
const INITIAL_STATE = {
  category: "length",
  fromValue: "100",
  fromUnit: "km",
  toUnit: "mi",
};

/**
 * Available conversion categories with display labels (compact version)
 * @type {Array<[string, string]>}
 */
const CATEGORIES = [
  ["length", "Panjang & Jarak"],
  ["mass", "Berat & Massa"],
  ["temperature", "Suhu (C, F, K, R)"],
  ["area", "Luas & Area"],
  ["volume", "Volume & Kapasitas"],
  ["speed", "Kecepatan"],
  ["digital", "Penyimpanan Digital"],
  ["time", "Waktu"],
];

export function ConversionCompactCalculator() {
  const {
    values: state,
    result,
    update,
  } = useCalculator({
    initialValues: INITIAL_STATE,
    calculate: (vals) =>
      calculateConversion({
        category: vals.category,
        fromValue: vals.fromValue,
        fromUnit: vals.fromUnit,
        toUnit: vals.toUnit,
        precision: 6,
      }),
    sanitize: (vals) => vals,
  });

  const units = useMemo(() => getUnits(state.category), [state.category]);
  const { result: convertedResult, unit: targetName } = result;

  const updateCategory = (category) => {
    update({
      category,
      fromUnit: getFirstUnit(category) ?? "",
      toUnit: getSecondUnit(category) ?? "",
    });
  };

  return (
    <div className="rounded-[var(--radius-md)] bg-canvas p-6 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent">
          Alat cepat hari ini
        </span>
      </div>
      <h2 className="text-xl font-medium text-text">
        Kalkulator Konversi Satuan
      </h2>
      <p className="mb-5 mt-1 text-sm leading-relaxed text-text-muted">
        Konversi panjang, berat, suhu, volume, dan satuan lainnya secara instan.
      </p>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(([key, label]) => (
          <button
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${state.category === key ? "bg-surface-teal text-accent" : "bg-surface text-text-muted hover:text-text"}`}
            key={key}
            onClick={() => updateCategory(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <label
          className="block text-sm text-text"
          htmlFor="compact-conversion-value"
        >
          <span className="mb-1.5 block">Nilai</span>
          <input
            className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3.5 text-sm text-text outline-none transition focus:border-accent focus:bg-canvas focus:shadow-[var(--shadow-focus)]"
            id="compact-conversion-value"
            onChange={(event) => update({ fromValue: event.target.value })}
            type="number"
            value={state.fromValue}
          />
        </label>
        <SelectField
          id="compact-conversion-from"
          label="Dari"
          onChange={(fromUnit) => update({ fromUnit })}
          options={units}
          value={state.fromUnit}
        />
        <button
          aria-label="Tukar satuan"
          className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-surface text-accent transition hover:bg-surface-teal"
          onClick={() =>
            update({ fromUnit: state.toUnit, toUnit: state.fromUnit })
          }
          type="button"
        >
          <MdSwapHoriz aria-hidden="true" />
        </button>
        <SelectField
          id="compact-conversion-to"
          label="Ke"
          onChange={(toUnit) => update({ toUnit })}
          options={units}
          value={state.toUnit}
        />
      </div>
      <div
        aria-live="polite"
        className="mt-4 rounded-[var(--radius-lg)] bg-surface-teal p-4"
        role="status"
      >
        <span className="text-xs uppercase tracking-[0.06em] text-accent">
          Hasil konversi
        </span>
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <strong className="font-mono text-2xl text-primary">
            {convertedResult}
          </strong>
          <span className="text-xs text-text-muted">{targetName}</span>
        </div>
      </div>
      <Link
        className="mt-4 flex min-h-11 items-center justify-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        href="/kalkulator/konversi"
        rel="noopener noreferrer"
      >
        Buka kalkulator lengkap <MdArrowForward aria-hidden="true" />
      </Link>
    </div>
  );
}
