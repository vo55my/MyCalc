"use client";

import { useRef } from "react";
import {
  MdCalculate,
  MdRestartAlt,
  MdSchool,
  MdStackedBarChart,
  MdTrackChanges,
  MdSwapHoriz,
} from "react-icons/md";
import { CalcButton } from "@/components/ui/controls/CalcButton";
import { InputField } from "@/components/ui/controls/InputField";
import { useGpaCalculator } from "@/hooks/gpa/useGpaCalculator";
import { CourseRows } from "./CourseRows";
import { GradeScalePanel } from "./GradeScalePanel";
import { ResultPanel } from "./ResultPanel";

/**
 * Available calculator modes with their labels and icons
 * @type {Array<{id: string, label: string, icon: React.ComponentType}>}
 */
const MODES = [
  { id: "semester", label: "Hitung IPS Semester", icon: MdSchool },
  { id: "cumulative", label: "IPK Kumulatif", icon: MdStackedBarChart },
  { id: "target", label: "Target & Sisa SKS", icon: MdTrackChanges },
  { id: "scale", label: "Konversi Skala Nilai", icon: MdSwapHoriz },
];

/**
 * Default initial courses for the full GPA calculator (6 courses)
 * All use grade "4" (A) which exists in both plusMinus and basic scales
 * @type {Array<{id: number, name: string, sks: string, grade: string}>}
 */
const INITIAL_COURSES = [
  { id: 1, name: "Algoritma & Pemrograman II", sks: "3", grade: "4" },
  { id: 2, name: "Struktur Data & Basis Data", sks: "4", grade: "4" },
  { id: 3, name: "Matematika Diskrit", sks: "3", grade: "4" },
  { id: 4, name: "Metodologi Penelitian", sks: "2", grade: "4" },
  { id: 5, name: "Etika Profesi & Komunikasi", sks: "2", grade: "4" },
  { id: 6, name: "Sistem Operasi", sks: "3", grade: "4" },
];

export function GpaCalculator() {
  const resultRef = useRef(null);

  const {
    mode,
    setMode,
    scale,
    previousSks,
    setPreviousSks,
    previousGpa,
    setPreviousGpa,
    targetGpa,
    setTargetGpa,
    targetSks,
    setTargetSks,
    score,
    setScore,
    courses,
    gradeOptions,
    results,
    targetEstimate,
    addCourse,
    removeCourse,
    updateCourse,
    changeScale,
    resetCalculator,
  } = useGpaCalculator({
    initialCourses: INITIAL_COURSES,
  });

  function focusResults() {
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="space-y-6">
      <nav
        aria-label="Mode Kalkulator IPK"
        className="flex gap-2 overflow-x-auto rounded-xl bg-surface-container-low p-1.5"
        role="tablist"
      >
        {MODES.map(({ id, label, icon: Icon }) => (
          <button
            aria-selected={mode === id}
            className={`flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors sm:px-4 ${
              mode === id
                ? "bg-canvas text-accent shadow-xs"
                : "text-text-muted hover:bg-canvas/60 hover:text-text"
            }`}
            id={`gpa-tab-${id}`}
            key={id}
            onClick={() => setMode(id)}
            role="tab"
            type="button"
          >
            <Icon aria-hidden="true" className="text-lg" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-12">
        <section
          className="space-y-5 rounded-2xl bg-canvas p-5 shadow-sm md:p-6 lg:col-span-5"
          role="tabpanel"
          aria-labelledby={`gpa-tab-${mode} gpa-input-title`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h2 className="font-semibold text-text" id="gpa-input-title">
                {mode === "scale"
                  ? "Konversi skala nilai"
                  : mode === "target"
                    ? "Simulasi target akademik"
                    : mode === "cumulative"
                      ? "Data semester & IPK sebelumnya"
                      : "Mata kuliah semester ini"}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {mode === "scale"
                  ? "Pemetaan nilai berikut hanya contoh umum."
                  : "Perubahan input langsung memperbarui hasil simulasi."}
              </p>
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Format bobot nilai
            </legend>
            <div className="rounded-xl bg-surface p-3.5">
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  ["plusMinus", "Skala plus-minus (A, AB, B, BC, C, D, E)"],
                  ["basic", "Skala dasar (A, B, C, D, E)"],
                ].map(([value, label]) => (
                  <label
                    className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-canvas px-3 py-2 text-sm text-text transition hover:bg-surface-teal"
                    key={value}
                  >
                    <input
                      checked={scale === value}
                      className="accent-accent"
                      name="gpa-scale"
                      onChange={() => changeScale(value)}
                      type="radio"
                      value={value}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </fieldset>

          {mode === "scale" ? (
            <GradeScalePanel scale={scale} score={score} setScore={setScore} />
          ) : (
            <>
              <CourseRows
                courses={courses}
                gradeOptions={gradeOptions}
                onAdd={addCourse}
                onRemove={removeCourse}
                onUpdate={updateCourse}
              />

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-text">
                    Riwayat semester sebelumnya
                  </span>
                  <span className="text-xs text-text-muted">Opsional</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    id="previous-sks"
                    label="Total SKS lalu"
                    min={0}
                    max={180}
                    onChange={setPreviousSks}
                    value={previousSks}
                  />
                  <InputField
                    id="previous-gpa"
                    label="IPK terakhir"
                    min={0}
                    max={4}
                    onChange={setPreviousGpa}
                    step="0.01"
                    value={previousGpa}
                  />
                </div>
              </div>

              {mode === "target" && (
                <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                  <InputField
                    id="target-gpa"
                    label="Target IPK"
                    min={0}
                    max={4}
                    onChange={setTargetGpa}
                    step="0.01"
                    value={targetGpa}
                  />
                  <InputField
                    id="target-sks"
                    label="Target total SKS"
                    min={0}
                    max={240}
                    onChange={setTargetSks}
                    value={targetSks}
                  />
                </div>
              )}
            </>
          )}

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row">
            <CalcButton
              className="flex-1 bg-accent text-white hover:bg-accent-hover"
              onClick={focusResults}
              type="button"
              variant="equals"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <MdCalculate aria-hidden="true" className="text-lg" />
                Lihat hasil simulasi
              </span>
            </CalcButton>
            <CalcButton
              className="px-4"
              onClick={resetCalculator}
              type="button"
              variant="action"
            >
              <span className="inline-flex items-center justify-center gap-1.5 text-text-muted transition hover:text-accent">
                <MdRestartAlt aria-hidden="true" className="text-lg" />
                Reset
              </span>
            </CalcButton>
          </div>
        </section>

        <div className="lg:col-span-7" ref={resultRef}>
          <ResultPanel
            mode={mode}
            results={results}
            score={score}
            scale={scale}
            targetEstimate={targetEstimate}
            targetGpa={Number(targetGpa) || 0}
            targetSks={Number(targetSks) || 0}
          />
        </div>
      </div>
    </div>
  );
}
