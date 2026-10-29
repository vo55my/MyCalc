import { InputField } from "@/components/ui/controls/InputField";
import { gradeFromScore, GRADE_SCALES } from "@/lib/calculators/gpa";

/**
 * GradeScalePanel - Component for grade scale conversion UI
 * Allows user to input a numeric score (0-100) and see the corresponding letter grade
 * Displays conversion table for the selected scale (plusMinus or basic)
 *
 * @param {Object} props
 * @param {"plusMinus"|"basic"} props.scale - Current grade scale
 * @param {string} props.score - Current numeric score input (0-100)
 * @param {Function} props.setScore - Callback to update score value
 * @returns {JSX.Element}
 */
export function GradeScalePanel({ scale, score, setScore }) {
  const convertedGrade = gradeFromScore(score, scale);
  const gradeOptions = GRADE_SCALES[scale];

  return (
    <div className="space-y-5 rounded-xl bg-surface p-4">
      <div>
        <h3 className="font-medium text-text">Konversi nilai angka ke bobot</h3>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">
          Masukkan nilai 0–100 untuk melihat contoh konversi. Rentang nilai
          dapat berbeda di setiap kampus.
        </p>
      </div>
      <InputField
        id="gpa-score-input"
        label="Nilai angka"
        max={100}
        min={0}
        inputMode="decimal"
        onChange={setScore}
        step="0.01"
        value={score}
      />
      <div className="rounded-xl bg-canvas p-4" aria-live="polite">
        <span className="text-xs uppercase tracking-wider text-text-muted">
          Hasil konversi contoh
        </span>
        {convertedGrade ? (
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-accent">
              {convertedGrade.label}
            </span>
            <span className="font-mono text-sm text-text-muted">
              bobot {convertedGrade.points.toFixed(2)}
            </span>
          </div>
        ) : (
          <p className="mt-2 text-sm text-danger">
            Masukkan nilai antara 0 dan 100.
          </p>
        )}
      </div>
      <div className="space-y-2">
        {gradeOptions.map((grade, index) => (
          <div
            className="flex items-center justify-between border-b border-border/60 py-2 text-sm last:border-0"
            key={`${grade.label}-${grade.points}`}
          >
            <span className="text-text-muted">{grade.label}</span>
            <span className="font-mono font-medium text-text">
              {grade.points.toFixed(2)}
            </span>
            {scale === "basic" ? (
              <span className="text-xs text-text-muted">
                {index === 0
                  ? "85–100"
                  : index === 1
                    ? "70–84"
                    : index === 2
                      ? "60–69"
                      : index === 3
                        ? "50–59"
                        : "0–49"}
              </span>
            ) : (
              <span className="text-xs text-text-muted">
                {index === 0
                  ? "85–100"
                  : index === 1
                    ? "80–84"
                    : index === 2
                      ? "75–79"
                      : index === 3
                        ? "70–74"
                        : index === 4
                          ? "65–69"
                          : index === 5
                            ? "60–64"
                            : index === 6
                              ? "50–59"
                              : "0–49"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
