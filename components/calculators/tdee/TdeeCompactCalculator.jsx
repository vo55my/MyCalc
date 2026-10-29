"use client";

import Link from "next/link";
import { MdArrowForward, MdRestartAlt, MdMale, MdFemale } from "react-icons/md";
import { calculateTdee } from "@/lib/calculators/tdee";
import { InputField } from "@/components/ui/controls/InputField";
import {
  INITIAL_VALUES,
  ACTIVITY_OPTIONS,
  TDEE_FORMULAS,
  AGE_LIMITS,
  HEIGHT_LIMITS,
  WEIGHT_LIMITS,
  COMPACT_NUMBER_FIELDS,
} from "@/data/tdee";
import { useNumberCalculator } from "@/hooks/useCalculator";
import { formatCalories } from "@/lib/calculators/tdee";

export function TdeeCompactCalculator() {
  const { values, result, update, reset } = useNumberCalculator({
    initialValues: INITIAL_VALUES,
    calculate: (vals) =>
      calculateTdee({
        age: Number(vals.age),
        heightCm: Number(vals.heightCm),
        weightKg: Number(vals.weightKg),
        gender: vals.gender,
        activity: vals.activityMultiplier,
        formula: vals.formula,
      }),
    numberFields: COMPACT_NUMBER_FIELDS,
  });

  return (
    <div className="rounded-[var(--radius-md)] bg-canvas p-6 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent">
          Alat cepat hari ini
        </span>
      </div>
      <h2 className="text-xl font-medium text-text">
        Kalkulator Kalori (BMR & TDEE)
      </h2>
      <p className="mb-5 mt-1 text-sm leading-relaxed text-text-muted">
        Estimasi kebutuhan kalori harian berdasarkan usia, jenis kelamin,
        tinggi, berat, dan aktivitas.
      </p>

      <div className="mb-4 flex gap-2 rounded-[var(--radius-md)] bg-surface p-1">
        {[
          ["male", "Pria", MdMale],
          ["female", "Wanita", MdFemale],
        ].map(([gender, label, Icon]) => (
          <button
            className={`flex min-h-10 flex-1 items-center justify-center gap-1 rounded text-sm transition ${
              values.gender === gender
                ? "bg-canvas text-accent shadow-xs"
                : "text-text-muted"
            }`}
            key={gender}
            onClick={() => update("gender", gender)}
            type="button"
          >
            <Icon aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="mb-5 space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <InputField
            id="compact-tdee-age"
            label="Usia"
            onChange={(value) => update("age", value)}
            helper={`${AGE_LIMITS.min}–${AGE_LIMITS.max} tahun`}
            value={values.age}
            min={AGE_LIMITS.min}
            max={AGE_LIMITS.max}
          />
          <InputField
            id="compact-tdee-height"
            label="Tinggi"
            onChange={(value) => update("heightCm", value)}
            helper={`${HEIGHT_LIMITS.min}–${HEIGHT_LIMITS.max} cm`}
            value={values.heightCm}
            min={HEIGHT_LIMITS.min}
            max={HEIGHT_LIMITS.max}
          />
        </div>
        <InputField
          id="compact-tdee-weight"
          label="Berat"
          onChange={(value) => update("weightKg", value)}
          helper={`${WEIGHT_LIMITS.min}–${WEIGHT_LIMITS.max} kg`}
          value={values.weightKg}
          min={WEIGHT_LIMITS.min}
          max={WEIGHT_LIMITS.max}
          step={0.1}
        />
        <label
          className="block text-sm text-text"
          htmlFor="compact-tdee-activity"
        >
          <span className="mb-1.5 block">Intensitas aktivitas</span>
          <select
            className="h-11 w-full appearance-none rounded-[var(--radius-md)] border border-border bg-surface px-3.5 text-sm text-text outline-none transition focus:border-accent focus:bg-canvas focus:shadow-[var(--shadow-focus)]"
            id="compact-tdee-activity"
            onChange={(event) =>
              update("activityMultiplier", event.target.value)
            }
            value={values.activityMultiplier}
          >
            {ACTIVITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-text">
          <span className="mb-1.5 block">Formula</span>
          <div className="flex gap-2">
            {Object.entries(TDEE_FORMULAS).map(([key, label]) => (
              <label
                className={`flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium transition ${
                  values.formula === key
                    ? "bg-surface-teal text-accent"
                    : "bg-surface text-text-muted hover:text-text"
                }`}
                key={key}
              >
                <input
                  checked={values.formula === key}
                  className="accent-accent"
                  name="compact-tdee-formula"
                  onChange={() => update("formula", key)}
                  type="radio"
                  value={key}
                />
                {label}
              </label>
            ))}
          </div>
        </label>
      </div>

      {result && !result._error ? (
        <>
          <div
            aria-live="polite"
            className="rounded-[var(--radius-lg)] bg-surface-teal p-5"
            role="status"
          >
            <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent-text">
              Estimasi energi harian
            </span>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-text-muted">BMR</span>
                <strong className="font-mono text-2xl font-bold text-accent tabular-nums">
                  {formatCalories(result.bmr)}
                </strong>
                <span className="text-xs text-text-muted">kkal</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-text-muted">TDEE</span>
                <strong className="font-mono text-2xl font-bold text-accent tabular-nums">
                  {formatCalories(result.tdee)}
                </strong>
                <span className="text-xs text-text-muted">kkal / hari</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-text-muted">
              {TDEE_FORMULAS[values.formula]} · PAL {values.activityMultiplier}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              className="flex min-h-10 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-surface px-3 text-sm text-text-muted transition hover:bg-surface-teal hover:text-text"
              onClick={reset}
              type="button"
            >
              <MdRestartAlt aria-hidden="true" />
              Reset
            </button>
            <Link
              className="flex min-h-10 flex-1 items-center justify-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
              href="/kalkulator/tdee"
              rel="noopener noreferrer"
            >
              Buka kalkulator lengkap <MdArrowForward aria-hidden="true" />
            </Link>
          </div>
        </>
      ) : (
        <div className="rounded-[var(--radius-lg)] bg-surface-teal p-5 text-center">
          <p className="text-sm text-danger">
            {result?._error || "Masukkan data yang valid untuk melihat hasil."}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              className="flex min-h-10 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-surface px-3 text-sm text-text-muted transition hover:bg-surface-teal hover:text-text"
              onClick={reset}
              type="button"
            >
              <MdRestartAlt aria-hidden="true" />
              Reset
            </button>
            <Link
              className="flex min-h-10 flex-1 items-center justify-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
              href="/kalkulator/tdee"
              rel="noopener noreferrer"
            >
              Buka kalkulator lengkap <MdArrowForward aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
