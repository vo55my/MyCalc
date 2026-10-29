import {
  MdCalculate,
  MdCheckCircle,
  MdInfoOutline,
  MdSchool,
} from "react-icons/md";
import { ShareActions } from "@/components/ui/actions/ShareActions";
import {
  getPredicate,
  getSuggestedCredits,
  gradeFromScore,
} from "@/lib/calculators/gpa";

/**
 * ResultPanel - Component for displaying GPA calculation results
 * Shows IPS, cumulative IPK, target projection, progress bar, and summary stats
 * Includes share actions and disclaimer notices
 *
 * @param {Object} props
 * @param {"semester"|"cumulative"|"target"|"scale"} props.mode - Current calculator mode
 * @param {Object} props.results - GPA calculation results {semesterGpa, cumulativeGpa, semesterSks, semesterPoints, totalSks, totalPoints}
 * @param {Object} props.targetEstimate - Target projection {creditsRemaining, requiredGpa, achievable, alreadyMet}
 * @param {number} props.targetGpa - Target IPK value
 * @param {number} props.targetSks - Target total SKS
 * @param {string} props.score - Current score for scale conversion display
 * @param {"plusMinus"|"basic"} props.scale - Current grade scale
 * @returns {JSX.Element}
 */
export function ResultPanel({
  mode,
  results,
  targetEstimate,
  targetGpa,
  targetSks,
  score,
  scale,
}) {
  const isScaleMode = mode === "scale";
  const currentScoreGrade = isScaleMode ? gradeFromScore(score, scale) : null;
  const progress = Math.min(100, Math.max(0, (results.semesterGpa / 4) * 100));
  const predicate = getPredicate(results.semesterGpa);
  const suggestedCredits = getSuggestedCredits(results.semesterGpa);
  const projectedRemaining = Math.max(0, Number(targetSks) - results.totalSks);

  const summary = [
    `IPS semester: ${results.semesterGpa.toFixed(2)} dari 4.00`,
    `Total SKS semester ini: ${results.semesterSks}`,
    `Total bobot mutu: ${results.semesterPoints.toFixed(2)}`,
    `Estimasi IPK kumulatif: ${results.cumulativeGpa.toFixed(2)}`,
    `Total SKS terhitung: ${results.totalSks}`,
  ].join("\n");

  return (
    <section
      aria-atomic="true"
      aria-live="polite"
      className="space-y-5 lg:sticky lg:top-20"
      role="status"
    >
      <div className="space-y-6 rounded-2xl bg-surface-teal p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-accent">
            <MdCalculate aria-hidden="true" className="text-xl" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Hasil perhitungan akademik
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-text-muted">
            <MdCheckCircle aria-hidden="true" className="text-success" />
            Skala 4.00
          </span>
        </div>

        {isScaleMode && (
          <div className="rounded-xl bg-canvas p-4">
            <span className="text-xs uppercase tracking-wider text-text-muted">
              Konversi nilai angka
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-accent">
                {currentScoreGrade?.label ?? "—"}
              </span>
              <span className="font-mono text-sm text-text-muted">
                {currentScoreGrade
                  ? `Bobot ${currentScoreGrade.points.toFixed(2)}`
                  : "Nilai harus 0–100"}
              </span>
            </div>
          </div>
        )}

        {mode === "target" && (
          <div className="rounded-xl bg-canvas p-4">
            <span className="text-xs uppercase tracking-wider text-text-muted">
              Proyeksi target IPK {Number(targetGpa).toFixed(2)}
            </span>
            <div className="mt-2 font-mono text-2xl font-bold text-accent">
              {targetEstimate.requiredGpa === null
                ? targetEstimate.alreadyMet
                  ? "Target tercapai"
                  : "Tidak tercapai pada SKS target"
                : targetEstimate.alreadyMet
                  ? "Target sudah tercapai"
                  : targetEstimate.achievable
                    ? `${targetEstimate.requiredGpa.toFixed(2)} / 4.00`
                    : "Di luar rentang 0–4.00"}
            </div>
            <p className="mt-1 text-sm text-text-muted">
              {targetEstimate.creditsRemaining} SKS tersisa dari target{" "}
              {targetSks} SKS.
              {targetEstimate.requiredGpa !== null &&
                !targetEstimate.alreadyMet &&
                targetEstimate.achievable &&
                " Ini adalah rata-rata bobot yang dibutuhkan untuk sisa SKS."}
            </p>
          </div>
        )}

        <div className="py-1">
          <span className="mb-1 block text-xs uppercase tracking-wider text-text-muted">
            Indeks Prestasi Semester (IPS)
          </span>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="font-mono text-4xl font-bold tracking-tight text-accent tabular-nums sm:text-5xl">
              {results.semesterGpa.toFixed(2)}
              <span className="ml-2 text-lg font-medium text-text-muted">
                / 4.00
              </span>
            </span>
            <span className="rounded-full bg-canvas px-3 py-1.5 text-xs font-medium text-text">
              {predicate}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between gap-2 text-xs text-text-muted">
            <span>0.00</span>
            <span className="text-right">
              Ilustrasi skala IPS maksimum 4.00
            </span>
          </div>
          <div
            aria-label={`IPS ${results.semesterGpa.toFixed(2)} dari 4.00`}
            className="h-3 overflow-hidden rounded-full bg-canvas p-0.5"
            role="img"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["SKS semester ini", results.semesterSks.toString(), "SKS"],
            ["Total bobot mutu", results.semesterPoints.toFixed(2), "poin"],
            [
              "Estimasi IPK kumulatif",
              results.cumulativeGpa.toFixed(2),
              "/ 4.00",
            ],
            ["Total SKS terhitung", results.totalSks.toString(), "SKS"],
          ].map(([label, value, unit]) => (
            <div className="rounded-xl bg-canvas p-4 shadow-xs" key={label}>
              <span className="block text-xs text-text-muted">{label}</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-mono text-xl font-semibold text-text tabular-nums">
                  {value}
                </span>
                <span className="text-xs text-text-muted">{unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-canvas p-4">
          <div>
            <span className="block text-xs text-text-muted">
              Estimasi batas SKS berikutnya*
            </span>
            <span className="font-mono text-lg font-semibold text-text">
              {suggestedCredits} SKS
            </span>
          </div>
          <div className="text-right">
            <span className="block text-xs text-text-muted">
              Sisa menuju target {targetSks} SKS*
            </span>
            <span className="font-mono text-lg font-semibold text-text">
              {projectedRemaining} SKS
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-canvas/70 p-3 text-xs leading-relaxed text-text-muted">
          <MdInfoOutline
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-accent"
          />
          <p>
            *Predikat, batas SKS, dan total SKS kelulusan berbeda antarprogram
            studi. Angka ini hanya simulasi dan bukan ketentuan resmi kampus.
          </p>
        </div>

        <ShareActions text={summary} title="Simulasi IPS & IPK MyCalc" />
      </div>

      <div className="flex items-start gap-4 rounded-[var(--radius-lg)] bg-canvas p-5 shadow-sm">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-surface-teal text-accent">
          <MdSchool aria-hidden="true" className="text-2xl" />
        </span>
        <div>
          <h2 className="text-base font-medium text-text">
            Simulasi IPS & IPK
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            IPS dihitung dari bobot nilai dikalikan SKS setiap mata kuliah. IPK
            kumulatif menggabungkan poin mutu dan SKS sebelumnya yang Anda
            masukkan.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-xl bg-surface">
        <MdInfoOutline
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-xl text-accent"
        />
        <p className="text-sm leading-relaxed text-text-muted">
          Bobot nilai dan syarat predikat kelulusan mengikuti kebijakan
          masing-masing perguruan tinggi. Gunakan hasil ini sebagai simulasi,
          lalu verifikasi kembali dengan pedoman akademik kampus Anda.
        </p>
      </div>
    </section>
  );
}
