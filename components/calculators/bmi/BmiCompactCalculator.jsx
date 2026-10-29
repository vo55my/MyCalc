"use client";

import Link from "next/link";
import { MdArrowForward, MdFemale, MdMale, MdRestartAlt } from "react-icons/md";
import { InputField } from "@/components/ui/controls/InputField";
import { INITIAL_VALUES } from "@/data/bmi";
import {
  calculateBmiResult,
  COMPACT_NUMBER_FIELDS,
} from "@/lib/calculators/bmi";
import { useNumberCalculator } from "@/hooks/useCalculator";

export function BmiCompactCalculator() {
  // Hook kalkulasi: includeActivity=false → tidak hitung TDEE (activityMultiplier di-skip)
  const { values, result, update, reset } = useNumberCalculator({
    initialValues: INITIAL_VALUES,
    calculate: (vals) => calculateBmiResult(vals, { includeActivity: false }),
    numberFields: COMPACT_NUMBER_FIELDS,
  });

  return (
    <div className="rounded-[var(--radius-md)] bg-canvas p-6 shadow-sm">
      {/* Badge "Alat cepat hari ini" */}
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent">
          Alat cepat hari ini
        </span>
      </div>
      <h2 className="text-xl font-medium text-text">
        Kalkulator BMI & Berat Ideal
      </h2>
      <p className="mb-5 mt-1 text-sm leading-relaxed text-text-muted">
        Cek indeks massa tubuh dan kategori berat badan secara cepat.
      </p>
      <div className="mb-5 space-y-3.5">
        {/* Gender toggle buttons */}
        <div className="grid grid-cols-2 gap-2 rounded-[var(--radius-md)] bg-surface p-1">
          <button
            className={`flex min-h-10 items-center justify-center gap-1 rounded text-sm ${values.gender === "male" ? "bg-canvas text-accent shadow-xs" : "text-text-muted"}`}
            onClick={() => update("gender", "male")}
            type="button"
          >
            <MdMale aria-hidden="true" />
            Pria
          </button>
          <button
            className={`flex min-h-10 items-center justify-center gap-1 rounded text-sm ${values.gender === "female" ? "bg-canvas text-accent shadow-xs" : "text-text-muted"}`}
            onClick={() => update("gender", "female")}
            type="button"
          >
            <MdFemale aria-hidden="true" />
            Wanita
          </button>
        </div>
        {/* Height & Weight input pakai InputField (lebih compact dari NumberField) */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            id="compact-bmi-height"
            label="Tinggi"
            onChange={(value) => update("heightCm", value)}
            unit="cm"
            value={values.heightCm}
          />
          <InputField
            id="compact-bmi-weight"
            label="Berat"
            onChange={(value) => update("weightKg", value)}
            unit="kg"
            value={values.weightKg}
          />
        </div>
      </div>
      {/* Result card: BMI besar + kategori + range Asia-Pasifik */}
      <div
        aria-live="polite"
        className="rounded-[var(--radius-lg)] bg-surface-teal p-5"
        role="status"
      >
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent">
          BMI Anda
        </span>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <strong className="text-3xl font-bold text-primary">
            {result.bmi.toFixed(1)}
          </strong>
          <span className="text-sm font-medium text-text">
            {result.category.label}
          </span>
        </div>
        <p className="mt-2 text-xs text-text-muted">
          Rentang Asia-Pasifik: {result.category.range}
        </p>
      </div>
      {/* Action buttons: Reset + Link ke kalkulator lengkap */}
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
          href="/kalkulator/bmi"
          rel="noopener noreferrer"
        >
          Buka kalkulator lengkap <MdArrowForward aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
