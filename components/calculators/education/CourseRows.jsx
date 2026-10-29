import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { SelectField } from "@/components/ui/controls/SelectField";
import { SKS_OPTIONS } from "@/hooks/gpa/useGpaCalculator";

/**
 * CourseRows - Component for managing list of courses in GPA calculator
 * Displays course name, SKS, and grade inputs with add/remove functionality
 *
 * @param {Object} props
 * @param {Array} props.courses - Array of course objects {id, name, sks, grade}
 * @param {Array} props.gradeOptions - Current grade scale options [{label, points}]
 * @param {Function} props.onAdd - Callback to add new course
 * @param {Function} props.onRemove - Callback to remove course by id
 * @param {Function} props.onUpdate - Callback to update course field (id, field, value)
 * @returns {JSX.Element}
 */
export function CourseRows({
  courses,
  gradeOptions,
  onUpdate,
  onRemove,
  onAdd,
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-medium text-text">Mata kuliah semester ini</h3>
          <p className="mt-0.5 text-xs text-text-muted">
            Masukkan SKS dan bobot nilai tiap mata kuliah.
          </p>
        </div>
        <button
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg bg-surface-teal px-3 text-sm font-medium text-accent transition hover:bg-accent-light"
          onClick={onAdd}
          type="button"
        >
          <MdAdd aria-hidden="true" className="text-lg" />
          <span>Tambah</span>
        </button>
      </div>
      {courses.map((course, index) => (
        <article
          className="space-y-3 rounded-xl bg-surface p-3.5"
          key={course.id}
        >
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor={`course-name-${course.id}`}>
              Nama mata kuliah {index + 1}
            </label>
            <input
              className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-canvas px-3 text-sm text-text outline-none transition focus:border-accent focus:shadow-[var(--shadow-focus)]"
              id={`course-name-${course.id}`}
              onChange={(event) =>
                onUpdate(course.id, "name", event.target.value)
              }
              placeholder={`Mata Kuliah ${index + 1}`}
              type="text"
              value={course.name}
            />
            <button
              aria-label={`Hapus ${course.name || `mata kuliah ${index + 1}`}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-text-muted transition hover:bg-danger-light hover:text-danger"
              disabled={courses.length <= 1}
              onClick={() => onRemove(course.id)}
              title="Hapus mata kuliah"
              type="button"
            >
              <MdDeleteOutline aria-hidden="true" className="text-xl" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              id={`course-sks-${course.id}`}
              label="Bobot SKS"
              labelClassName="block text-xs text-text-muted"
              className="h-10 w-full rounded-lg border border-border bg-canvas px-3 text-sm text-text outline-none transition focus:border-accent focus:shadow-[var(--shadow-focus)]"
              options={SKS_OPTIONS}
              onChange={(value) => onUpdate(course.id, "sks", value)}
              value={course.sks}
            />
            <SelectField
              id={`course-grade-${course.id}`}
              label="Nilai / bobot"
              labelClassName="block text-xs text-text-muted"
              className="h-10 w-full rounded-lg border border-border bg-canvas px-3 text-sm text-text outline-none transition focus:border-accent focus:shadow-[var(--shadow-focus)]"
              options={gradeOptions.map((grade) => ({
                value: String(grade.points),
                label: `${grade.label} (${grade.points.toFixed(2)})`,
              }))}
              onChange={(value) => onUpdate(course.id, "grade", value)}
              value={course.grade}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
