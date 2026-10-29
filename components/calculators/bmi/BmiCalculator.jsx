"use client";

import { MdFemale, MdInfoOutline, MdMale, MdRestartAlt } from "react-icons/md";
import { ShareActions } from "@/components/ui/actions/ShareActions";
import { useNumberCalculator } from "@/hooks/useCalculator";
import { NumberField } from "@/components/ui/controls/NumberField";
import {
  INITIAL_VALUES,
  ACTIVITY_OPTIONS,
  QUICK_HEIGHTS,
  WEIGHT_LIMITS,
  HEIGHT_LIMITS,
  AGE_LIMITS,
} from "@/data/bmi";
import {
  calculateBmiResult,
  FULL_NUMBER_FIELDS,
} from "@/lib/calculators/bmi";

/**
 * Panel hasil perhitungan BMI (kanan, sticky di desktop).
 * Menerima `result` dari calculateBmiResult dan `values` form saat ini.
 */
function ResultPanel({ result, values }) {
  // Teks ringkasan untuk fitur share (copy/share ke clipboard)
  const summary = `Hasil BMI MyCalc\nBMI: ${result.bmi.toFixed(1)} kg/m2 (${result.category.label})\nBerat ideal: ${result.idealWeight.toFixed(1)} kg\nBMR: ${result.bmr} kkal/hari\nTDEE: ${result.tdee} kkal/hari`;

  // Dynamic pointer range based on Asia-Pacific BMI categories
  // Categories: <18.5, 18.5-22.9, 23-24.9, 25-29.9, >=30
  // Visual range: 15 to 40 (covers all categories with padding)
  const BMI_VISUAL_MIN = 15;
  const BMI_VISUAL_MAX = 40;
  // Clamp pointer 5-95% agar tidak keluar batas visual
  const pointer = Math.min(
    95,
    Math.max(
      5,
      ((result.bmi - BMI_VISUAL_MIN) / (BMI_VISUAL_MAX - BMI_VISUAL_MIN)) * 100,
    ),
  );

  // Warna badge & indikator per kategori BMI (Asia-Pasifik)
  const categoryColors = {
    underweight: "bg-surface text-text-muted",
    normal: "bg-success-light text-success",
    overweight: "bg-warning-light text-warning",
    "obesity-one": "bg-danger-light text-danger",
    "obesity-two": "bg-danger-light text-danger",
  };

  return (
    <section className="space-y-6 md:sticky md:top-24 md:col-span-7">
      <div className="rounded-[var(--radius-lg)] bg-surface-teal p-6 shadow-sm">
        {/* Header hasil: judul + badge kategori */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.06em] text-accent-text">
            Hasil kalkulasi IMT (BMI)
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[result.category.key]}`}
          >
            {result.category.label}
          </span>
        </div>
        {/* Nilai BMI besar + satuan */}
        <div className="mb-3 flex items-baseline gap-2">
          <span className="result-value text-4xl">{result.bmi.toFixed(1)}</span>
          <span className="text-sm text-text-muted">kg/m2</span>
        </div>
        {/* Deskripsi kategori + range Asia-Pasifik */}
        <p className="mb-5 text-sm text-text">
          Kategori:{" "}
          <strong className="font-medium text-accent">
            {result.category.label}
          </strong>{" "}
          (Asia-Pasifik: {result.category.range})
        </p>
        {/* Visual bar BMI dengan pointer */}
        <div className="mb-5">
          {/* Label kategori di atas bar */}
          <div className="mb-1.5 flex justify-between text-xs text-text-muted">
            <span>Kurang</span>
            <span>Normal</span>
            <span>Lebih</span>
            <span>Obesitas I</span>
            <span>Obesitas II</span>
          </div>
          {/* Bar warna proporsional ke range Asia-Pasifik */}
          <div className="relative flex h-3 overflow-hidden rounded-full bg-surface">
            {/* Asia-Pacific BMI ranges mapped to visual range 15-40 (25 units total) */}
            <div className="w-[14%] bg-border" /> {/* <18.5: 3.5/25 = 14% */}
            <div className="w-[17.6%] bg-success" />{" "}
            {/* 18.5-22.9: 4.4/25 = 17.6% */}
            <div className="w-[7.6%] bg-warning" />{" "}
            {/* 23-24.9: 1.9/25 = 7.6% */}
            <div className="w-[19.6%] bg-orange-500" />{" "}
            {/* 25-29.9: 4.9/25 = 19.6% */}
            <div className="w-[40%] bg-danger" /> {/* >=30: 10/25 = 40% */}
          </div>
          {/* Pointer ▲ di atas bar */}
          <div className="relative h-4">
            <span
              className="absolute top-0 -translate-x-1/2 text-accent"
              style={{ left: `${pointer}%` }}
            >
              ▲
            </span>
          </div>
        </div>
        {/* Detail metrik: Broca, healthy range, BMR, TDEE */}
        <div className="space-y-2 border-t border-accent-light pt-3 text-sm">
          <div className="flex items-center justify-between gap-3 py-1.5">
            <span className="text-text-muted">Berat badan ideal (Broca)</span>
            <strong className="font-mono text-text">
              {result.idealWeight.toFixed(1)} kg
            </strong>
          </div>
          <div className="flex items-center justify-between gap-3 py-1.5">
            <span className="text-text-muted">Rentang sehat IMT</span>
            <strong className="font-mono text-text">
              {result.minHealthyWeight.toFixed(1)} -{" "}
              {result.maxHealthyWeight.toFixed(1)} kg
            </strong>
          </div>
          <div className="flex items-center justify-between gap-3 py-1.5">
            <span className="text-text-muted">
              Kebutuhan kalori basal (BMR)
            </span>
            <strong className="font-mono text-text">
              {result.bmr.toLocaleString("id-ID")} kkal/hari
            </strong>
          </div>
          <div className="flex items-center justify-between gap-3 py-1.5">
            <span className="text-text-muted">
              Kebutuhan energi total (TDEE)
            </span>
            <strong className="font-mono text-accent">
              {result.tdee.toLocaleString("id-ID")} kkal/hari
            </strong>
          </div>
        </div>
        {/* Tombol share hasil */}
        <ShareActions text={summary} title="Hasil BMI MyCalc" />
      </div>
      {/* Info box: kenapa pakai standar Asia-Pasifik */}
      <div className="flex items-start gap-3 rounded-[var(--radius-md)] bg-surface">
        <MdInfoOutline
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-xl text-accent"
        />
        <p className="text-sm leading-relaxed text-text-muted">
          Standar Asia-Pasifik menggunakan ambang normal BMI 18,5 - 22,9 karena
          risiko metabolik dapat muncul pada BMI yang lebih rendah.
        </p>
      </div>
    </section>
  );
}

export function BmiCalculator() {
  // Hook kalkulasi: handle state, sanitasi number, auto-recalculate
  const { values, result, update, reset } = useNumberCalculator({
    initialValues: INITIAL_VALUES,
    calculate: (vals) => calculateBmiResult(vals, { includeActivity: true }),
    numberFields: FULL_NUMBER_FIELDS,
  });

  return (
    <div className="grid items-start gap-8 md:grid-cols-12">
      {/* Panel kiri: form input (5/12 col di desktop) */}
      <section className="space-y-6 rounded-[var(--radius-lg)] bg-canvas p-6 shadow-sm md:col-span-5">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-medium text-text">Parameter tubuh</h2>
        </div>

        {/* Tampilkan error validasi dari calculateBmiResult (_error field) */}
        {result._error && (
          <div
            className="rounded-[var(--radius-md)] bg-danger-light p-3 text-sm text-danger"
            role="alert"
          >
            {result._error}
          </div>
        )}

        {/* Gender selector: toggle buttons */}
        <div>
          <label className="mb-1.5 block text-sm text-text">
            Jenis kelamin
          </label>
          <div className="grid grid-cols-2 gap-2 rounded-[var(--radius-md)] bg-surface p-1">
            <button
              className={`flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] text-sm ${values.gender === "male" ? "bg-canvas text-accent shadow-xs" : "text-text-muted"}`}
              onClick={() => update("gender", "male")}
              type="button"
            >
              <MdMale aria-hidden="true" /> Pria
            </button>
            <button
              className={`flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] text-sm ${values.gender === "female" ? "bg-canvas text-accent shadow-xs" : "text-text-muted"}`}
              onClick={() => update("gender", "female")}
              type="button"
            >
              <MdFemale aria-hidden="true" /> Wanita
            </button>
          </div>
        </div>
        {/* Age input: NumberField reusable component */}
        <NumberField
          id="input-age"
          label="Usia Anda"
          max={AGE_LIMITS.max}
          min={AGE_LIMITS.min}
          onChange={(value) => update("age", value)}
          unit="tahun"
          value={values.age}
          helper={`${AGE_LIMITS.min}–${AGE_LIMITS.max} tahun`}
        />
        {/* Height input + quick-select buttons */}
        <div>
          <NumberField
            id="input-height"
            label="Tinggi badan"
            max={HEIGHT_LIMITS.max}
            min={HEIGHT_LIMITS.min}
            onChange={(value) => update("heightCm", value)}
            unit="cm"
            value={values.heightCm}
            helper={`${HEIGHT_LIMITS.min}–${HEIGHT_LIMITS.max} cm`}
          />
          {/* Quick height buttons untuk UX cepat */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {QUICK_HEIGHTS.map((height) => (
              <button
                className={`min-h-9 rounded-[var(--radius-sm)] px-2.5 text-xs ${Number(values.heightCm) === height ? "bg-surface-teal text-accent" : "bg-surface text-text-muted"}`}
                key={height}
                onClick={() => update("heightCm", height)}
                type="button"
              >
                {height}
              </button>
            ))}
          </div>
        </div>
        {/* Weight input: NumberField + +/- buttons */}
        <div>
          <NumberField
            id="input-weight"
            label="Berat badan"
            max={WEIGHT_LIMITS.max}
            min={WEIGHT_LIMITS.min}
            onChange={(value) => update("weightKg", value)}
            step={0.5}
            unit="kg"
            value={values.weightKg}
            helper={`${WEIGHT_LIMITS.min}–${WEIGHT_LIMITS.max} kg`}
            buttons={{
              decrement: {
                onClick: () =>
                  update(
                    "weightKg",
                    Math.max(WEIGHT_LIMITS.min, Number(values.weightKg) - 0.5),
                  ),
                ariaLabel: "Kurangi berat 0.5 kilogram",
              },
              increment: {
                onClick: () =>
                  update(
                    "weightKg",
                    Math.min(WEIGHT_LIMITS.max, Number(values.weightKg) + 0.5),
                  ),
                ariaLabel: "Tambah berat 0.5 kilogram",
              },
            }}
          />
        </div>
        {/* Activity level select untuk TDEE */}
        <label className="block text-sm text-text" htmlFor="input-activity">
          Tingkat aktivitas fisik (TDEE)
          <select
            className="mt-1.5 h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm text-text outline-none focus:border-accent"
            id="input-activity"
            onChange={(event) =>
              update("activityMultiplier", event.target.value)
            }
            value={values.activityMultiplier}
          >
            {ACTIVITY_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        {/* Reset button only (hitung otomatis via useMemo) */}
        <div className="flex gap-3 pt-2">
          <button
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-surface px-4 text-sm text-text-muted hover:bg-surface-teal"
            onClick={reset}
            type="button"
          >
            <MdRestartAlt aria-hidden="true" className="text-lg" /> Reset
          </button>
        </div>
      </section>
      {/* Panel kanan: hasil (7/12 col di desktop, sticky) */}
      <ResultPanel result={result} values={values} />
    </div>
  );
}
