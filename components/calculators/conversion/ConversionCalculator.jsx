"use client";

import { useMemo } from "react";
import {
  MdAccessTime,
  MdFunctions,
  MdInfoOutline,
  MdMemory,
  MdMonitorWeight,
  MdRestartAlt,
  MdSpeed,
  MdSquare,
  MdSwapVert,
  MdThermostat,
  MdStraighten,
  MdScience,
} from "react-icons/md";
import { ShareActions } from "@/components/ui/actions/ShareActions";
import {
  calculateConversion,
  getFirstUnit,
  getSecondUnit,
  getUnits,
} from "@/lib/calculators/conversion";
import { useCalculator } from "@/hooks/useCalculator";
import { SelectField } from "@/components/ui/controls/SelectField";

/**
 * Initial state for the conversion calculator
 * @type {Object}
 * @property {string} category - Default category (length)
 * @property {string} fromValue - Default input value
 * @property {string} fromUnit - Default source unit
 * @property {string} toUnit - Default target unit
 * @property {number} precision - Default decimal precision
 */
const initialState = {
  category: "length",
  fromValue: "100",
  fromUnit: "km",
  toUnit: "mi",
  precision: 6,
};

/**
 * Available conversion categories with display labels and icons
 * @type {Array<{key: string, label: string, icon: React.ComponentType}>}
 */
const categories = [
  { key: "length", label: "Panjang & Jarak", icon: MdStraighten },
  { key: "mass", label: "Berat & Massa", icon: MdMonitorWeight },
  { key: "temperature", label: "Suhu (C, F, K, R)", icon: MdThermostat },
  { key: "area", label: "Luas & Area", icon: MdSquare },
  { key: "volume", label: "Volume & Kapasitas", icon: MdScience },
  { key: "speed", label: "Kecepatan", icon: MdSpeed },
  { key: "digital", label: "Penyimpanan Digital", icon: MdMemory },
  { key: "time", label: "Waktu", icon: MdAccessTime },
];

/**
 * Available precision options for result formatting
 * @type {Array<[number|string, string]>}
 */
const precisions = [
  [2, "2 Des"],
  [4, "4 Des"],
  [6, "6 Des"],
  ["exp", "Ilmiah"],
];

/**
 * Results display component for conversion output
 * @param {Object} props - Component props
 * @param {string} props.result - Formatted conversion result
 * @param {string} props.unit - Target unit name
 * @param {string} props.formula - Conversion formula text
 * @param {Array} props.breakdown - Comparison conversions to other units
 * @returns {JSX.Element}
 */
function Results({ result, unit, formula, breakdown }) {
  return (
    <div>
      <section
        aria-live="polite"
        className="relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-surface-teal p-6 shadow-sm md:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Hasil konversi
          </span>
        </div>
        <div className="relative py-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <output className="font-mono text-3xl font-bold tracking-tight text-primary tabular-nums sm:text-[2.25rem]">
              {result}
            </output>
            <span className="text-xl font-medium text-text">{unit}</span>
          </div>
          <p className="mt-2 flex items-start gap-2 text-sm text-text-muted">
            <MdFunctions
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-primary"
            />
            <code className="font-mono">{formula}</code>
          </p>
        </div>
        <div className="relative h-px bg-primary/15" />
        <div className="relative">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text">
              Konversi ke satuan populer lainnya
            </h3>
            <span className="text-xs text-text-muted">Komparasi relatif</span>
          </div>
          <div className="grid gap-1.5">
            {breakdown.map((item) => (
              <div
                className="flex items-center justify-between gap-4 rounded-xl bg-canvas/70 px-3 py-2.5"
                key={item.unit}
              >
                <span className="text-sm text-text-muted">{item.name}</span>
                <span className="font-mono text-sm font-semibold text-text tabular-nums">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <ShareActions
          text={`${result} ${unit}\n${formula}`}
          title="Hasil Konversi Satuan MyCalc"
        />
      </section>
      <div className="flex items-start gap-3 rounded-xl bg-surface pt-4">
        <MdInfoOutline
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-xl text-accent"
        />
        <p className="text-sm leading-relaxed text-text-muted">
          Faktor konversi menggunakan definisi SI dan Imperial yang dibakukan,
          dengan pembulatan yang dapat Anda atur.
        </p>
      </div>
    </div>
  );
}

export function ConversionCalculator() {
  const {
    values: state,
    result: calcResult,
    update,
    reset,
  } = useCalculator({
    initialValues: initialState,
    calculate: (vals) =>
      calculateConversion({
        category: vals.category,
        fromValue: vals.fromValue,
        fromUnit: vals.fromUnit,
        toUnit: vals.toUnit,
        precision: vals.precision,
      }),
    sanitize: (vals) => vals,
  });

  const { result, unit, formula, breakdown } = calcResult;
  const units = useMemo(() => getUnits(state.category), [state.category]);

  const selectCategory = (category) => {
    update({
      category,
      fromUnit: getFirstUnit(category) ?? "",
      toUnit: getSecondUnit(category) ?? "",
    });
  };
  return (
    <>
      <div className="mb-6 w-full overflow-x-auto pb-4">
        <div className="flex min-w-max gap-2 rounded-2xl bg-surface-container-low p-1 shadow-xs">
          {categories.map(({ key, label, icon: Icon }) => (
            <button
              className={`min-h-11 flex items-center rounded-lg px-3 text-sm font-medium transition-colors sm:px-4 ${state.category === key ? "bg-canvas text-accent shadow-xs" : "text-text-muted hover:bg-canvas/60 hover:text-text"}`}
              key={key}
              onClick={() => selectCategory(key)}
              type="button"
            >
              <Icon aria-hidden="true" className="mr-2 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid items-start gap-8 md:grid-cols-12">
        <section
          aria-labelledby="parameter-title"
          className="flex flex-col gap-6 rounded-2xl bg-canvas p-6 shadow-sm md:col-span-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              className="text-base font-semibold text-text"
              id="parameter-title"
            >
              Parameter konversi
            </h2>
            <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-primary">
              Presisi{" "}
              {state.precision === "exp"
                ? "ilmiah"
                : `${state.precision} desimal`}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="flex items-center justify-between gap-3 text-sm font-medium text-text"
              htmlFor="from-value"
            >
              Dari satuan
              <span className="text-xs font-normal text-text-muted">
                Kuantitas input
              </span>
            </label>
            <input
              className="w-full rounded-xl bg-surface px-4 py-3 font-mono text-xl font-medium text-text outline-none transition focus:bg-canvas focus:ring-2 focus:ring-primary/20"
              id="from-value"
              inputMode="decimal"
              onChange={(event) => update({ fromValue: event.target.value })}
              placeholder="0"
              type="number"
              value={state.fromValue}
            />
            <SelectField
              id="from-unit"
              className="w-full cursor-pointer appearance-none rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text outline-none transition focus:bg-canvas focus:ring-2 focus:ring-primary/20"
              labelClassName="flex flex-col gap-2"
              labelContentClassName="text-sm font-medium text-text"
              onChange={(fromUnit) => update({ fromUnit })}
              options={units}
              value={state.fromUnit}
            />
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="mr-1 text-xs text-text-muted">Preset:</span>
              {[1, 10, 100, 1000, 5000].map((preset) => (
                <button
                  className="rounded-md bg-surface px-2.5 py-1 text-xs text-text-muted transition hover:bg-surface-teal hover:text-primary"
                  key={preset}
                  onClick={() => update({ fromValue: String(preset) })}
                  type="button"
                >
                  {preset.toLocaleString("id-ID")}
                </button>
              ))}
            </div>
          </div>
          <div className="relative my-[-8px] flex justify-center">
            <button
              aria-label="Tukar satuan asal dan tujuan"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas text-primary shadow-md transition hover:scale-110 hover:bg-surface-teal"
              onClick={() =>
                update({ fromUnit: state.toUnit, toUnit: state.fromUnit })
              }
              type="button"
            >
              <MdSwapVert aria-hidden="true" className="text-xl" />
            </button>
          </div>
          <SelectField
            id="to-unit"
            className="w-full cursor-pointer appearance-none rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text outline-none transition focus:bg-canvas focus:ring-2 focus:ring-primary/20"
            labelClassName="flex flex-col gap-2"
            labelContentClassName="text-sm font-medium text-text"
            label="Ke satuan target"
            onChange={(toUnit) => update({ toUnit })}
            options={units}
            value={state.toUnit}
          />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Format pembulatan desimal
            </p>
            <div className="grid grid-cols-4 gap-1 rounded-xl bg-surface p-1">
              {precisions.map(([key, label]) => (
                <button
                  className={`rounded-lg px-2 py-1.5 text-xs font-medium transition ${state.precision === key ? "bg-primary text-on-primary shadow-sm" : "text-text-muted hover:text-text"}`}
                  key={key}
                  onClick={() => update({ precision: key })}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-3">
            <button
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-surface px-4 text-sm font-medium text-text-muted transition hover:bg-surface-container hover:text-text"
              onClick={reset}
              type="button"
            >
              <MdRestartAlt aria-hidden="true" />
              Reset
            </button>
          </div>
        </section>
        <div className="md:col-span-7">
          <Results
            breakdown={breakdown}
            formula={formula}
            result={result}
            unit={unit}
          />
        </div>
      </div>
    </>
  );
}
