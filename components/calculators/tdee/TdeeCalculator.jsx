"use client";

import { useMemo } from "react";
import { MdInfoOutline } from "react-icons/md";
import { calculateTdee } from "@/lib/calculators/tdee";
import {
  INITIAL_VALUES,
  TDEE_FORMULAS,
  WEIGHT_LIMITS,
  FULL_NUMBER_FIELDS,
} from "@/data/tdee";
import { useNumberCalculator } from "@/hooks/useCalculator";
import { formatCalories } from "@/lib/calculators/tdee";
import { TdeeInputForm } from "./TdeeInputForm";
import { TdeeOverviewSection } from "./TdeeOverviewSection";
import { TdeeTargetsSection } from "./TdeeTargetsSection";
import { TdeeMacrosSection } from "./TdeeMacrosSection";

export function TdeeCalculator() {
  // Hook kalkulasi: handle state, sanitasi number, auto-recalculate
  const {
    values,
    result,
    update,
    reset: resetValues,
  } = useNumberCalculator({
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
    numberFields: FULL_NUMBER_FIELDS,
  });

  // Memoized summary text untuk fitur share (copy/share ke clipboard)
  // Hanya recompute saat result, formula, atau activity berubah
  const summary = useMemo(() => {
    if (!result)
      return "Input belum valid. Periksa usia, tinggi, dan berat badan.";
    if (result._error) return result._error;
    return [
      `Estimasi kebutuhan energi harian MyCalc`,
      `BMR: ${formatCalories(result.bmr)} kkal/hari`,
      `TDEE: ${formatCalories(result.tdee)} kkal/hari`,
      `Formula: ${TDEE_FORMULAS[values.formula]}`,
      `Aktivitas: ${values.activityMultiplier}×`,
    ].join("\n");
  }, [result, values.formula, values.activityMultiplier]);

  // Helper: adjust weight via +/- buttons dengan clamp ke WEIGHT_LIMITS
  function adjustWeight(delta) {
    const current = Number(values.weightKg) || 68;
    update(
      "weightKg",
      String(
        Math.min(
          WEIGHT_LIMITS.max,
          Math.max(WEIGHT_LIMITS.min, current + delta),
        ),
      ),
    );
  }

  // Reset form ke initial values
  function reset() {
    resetValues();
  }

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <TdeeInputForm
          values={values}
          result={result}
          update={update}
          adjustWeight={adjustWeight}
          reset={reset}
        />

        <div className="space-y-6 lg:col-span-7">
          {result && !result._error ? (
            <>
              <TdeeOverviewSection
                values={values}
                result={result}
                summary={summary}
              />
              <TdeeTargetsSection result={result} />
              <TdeeMacrosSection result={result} />
              <div className="flex items-start gap-3 rounded-xl bg-surface">
                <MdInfoOutline
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-xl text-accent"
                />
                <p className="text-sm leading-relaxed text-text-muted">
                  BMR dan TDEE adalah estimasi berbasis persamaan populasi,
                  bukan pengukuran metabolisme individual. Gunakan sebagai
                  informasi umum, bukan diagnosis atau arahan medis.
                </p>
              </div>
            </>
          ) : (
            <section
              aria-live="polite"
              className="rounded-2xl border border-danger-light bg-canvas p-6 shadow-sm"
              role="alert"
            >
              <h2 className="font-semibold text-danger">
                Periksa kembali input
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {result?._error ||
                  "Masukkan usia 15–100 tahun, tinggi 100–230 cm, dan berat 30–250 kg."}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
