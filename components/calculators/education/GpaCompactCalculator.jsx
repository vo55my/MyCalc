"use client";

import Link from "next/link";
import {
  MdArrowForward,
  MdAdd,
  MdDeleteOutline,
  MdRestartAlt,
} from "react-icons/md";
import { InputField } from "@/components/ui/controls/InputField";
import { SelectField } from "@/components/ui/controls/SelectField";
import { useGpaCalculator, SKS_OPTIONS } from "@/hooks/gpa/useGpaCalculator";
import { GRADE_SCALES } from "@/lib/calculators/gpa";

/**
 * CourseRow - Compact version of a single course row for GpaCompactCalculator
 * Simplified version with smaller inputs and no label text
 *
 * @param {Object} props
 * @param {Object} props.course - Course object {id, name, sks, grade}
 * @param {Array} props.gradeOptions - Current grade scale options
 * @param {Function} props.onUpdate - Callback to update course field
 * @param {Function} props.onRemove - Callback to remove course
 * @param {number} props.index - Display index (for placeholder)
 * @returns {JSX.Element}
 */
function CourseRow({ course, gradeOptions, onUpdate, onRemove, index }) {
  return (
    <article className="space-y-2 rounded-lg bg-surface p-3">
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor={`compact-course-name-${course.id}`}>
          Nama mata kuliah {index + 1}
        </label>
        <input
          className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-canvas px-2.5 text-sm text-text outline-none transition focus:border-accent focus:shadow-[var(--shadow-focus)]"
          id={`compact-course-name-${course.id}`}
          onChange={(event) => onUpdate(course.id, "name", event.target.value)}
          placeholder={`Mata Kuliah ${index + 1}`}
          type="text"
          value={course.name}
        />
        <button
          aria-label={`Hapus ${course.name || `mata kuliah ${index + 1}`}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition hover:bg-danger-light hover:text-danger"
          disabled={course.id === 1 && index === 0}
          onClick={() => onRemove(course.id)}
          title="Hapus mata kuliah"
          type="button"
        >
          <MdDeleteOutline aria-hidden="true" className="text-lg" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <SelectField
          id={`compact-course-sk${course.id}`}
          label="SKS"
          value={course.sks}
          onChange={(value) => onUpdate(course.id, "sks", value)}
          options={SKS_OPTIONS}
        />
        <SelectField
          id={`compact-course-grade${course.id}`}
          label="Bobot"
          value={course.grade}
          onChange={(value) => onUpdate(course.id, "grade", value)}
          options={gradeOptions.map((g) => ({
            value: String(g.points),
            label: `${g.label} (${g.points.toFixed(2)})`,
          }))}
        />
      </div>
    </article>
  );
}

// Compact calculator initial courses (3 courses)
// All use grade "4" (A) which exists in both plusMinus and basic scales
/** @type {Array<{id: number, name: string, sks: string, grade: string}>} */
const COMPACT_INITIAL_COURSES = [
  { id: 1, name: "Algoritma & Pemrograman II", sks: "3", grade: "4" },
  { id: 2, name: "Struktur Data & Basis Data", sks: "4", grade: "4" },
  { id: 3, name: "Matematika Diskrit", sks: "3", grade: "4" },
];

export function GpaCompactCalculator() {
  const {
    scale,
    previousSks,
    setPreviousSks,
    previousGpa,
    setPreviousGpa,
    courses,
    gradeOptions,
    results,
    addCourse,
    removeCourse,
    updateCourse,
    changeScale,
    resetCalculator,
  } = useGpaCalculator({
    initialCourses: COMPACT_INITIAL_COURSES,
  });

  return (
    <div className="rounded-[var(--radius-md)] bg-canvas p-6 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent">
          Alat cepat hari ini
        </span>
      </div>
      <h2 className="text-xl font-medium text-text">Kalkulator IPS & IPK</h2>
      <p className="mb-5 mt-1 text-sm leading-relaxed text-text-muted">
        Hitung IPS semester dan estimasi IPK kumulatif secara cepat.
      </p>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {Object.entries(GRADE_SCALES).map(([key, value]) => (
          <button
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              scale === key
                ? "bg-surface-teal text-accent"
                : "bg-surface text-text-muted hover:text-text"
            }`}
            key={key}
            onClick={() => changeScale(key)}
            type="button"
          >
            {key === "plusMinus" ? "Skala +/−" : "Skala Dasar"}
          </button>
        ))}
      </div>

      <div className="mb-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-text">Mata kuliah semester ini</h3>
          <button
            className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg bg-surface-teal px-2.5 text-sm font-medium text-accent transition hover:bg-accent-light"
            onClick={addCourse}
            type="button"
          >
            <MdAdd aria-hidden="true" className="text-lg" />
            <span>Tambah</span>
          </button>
        </div>
        {courses.map((course, index) => (
          <CourseRow
            key={course.id}
            course={course}
            gradeOptions={gradeOptions}
            index={index}
            onRemove={removeCourse}
            onUpdate={updateCourse}
          />
        ))}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
        <InputField
          id="compact-previous-sks"
          label="Total SKS lalu"
          min={0}
          onChange={(value) => setPreviousSks(value)}
          unit="SKS"
          value={previousSks}
        />
        <InputField
          id="compact-previous-gpa"
          label="IPK terakhir"
          min={0}
          onChange={(value) => setPreviousGpa(value)}
          value={previousGpa}
        />
      </div>

      <div
        aria-live="polite"
        className="rounded-[var(--radius-lg)] bg-surface-teal p-5"
        role="status"
      >
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-accent-text">
          Hasil simulasi
        </span>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-text-muted">IPS Semester</span>
            <strong className="font-mono text-2xl font-bold text-accent tabular-nums">
              {results.semesterGpa.toFixed(2)}
            </strong>
            <span className="text-xs text-text-muted">/ 4.00</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-text-muted">Est. IPK Kumulatif</span>
            <strong className="font-mono text-2xl font-bold text-accent tabular-nums">
              {results.cumulativeGpa.toFixed(3)}
            </strong>
            <span className="text-xs text-text-muted">/ 4.00</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-text-muted">
          SKS semester ini: {results.semesterSks} • Total SKS terhitung:{" "}
          {results.totalSks}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="flex min-h-10 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-surface px-3 text-sm text-text-muted transition hover:bg-surface-teal hover:text-text"
          onClick={resetCalculator}
          type="button"
        >
          <MdRestartAlt aria-hidden="true" />
          Reset
        </button>
        <Link
          className="flex min-h-10 flex-1 items-center justify-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
          href="/kalkulator/ipk"
          rel="noopener noreferrer"
        >
          Buka kalkulator lengkap <MdArrowForward aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
