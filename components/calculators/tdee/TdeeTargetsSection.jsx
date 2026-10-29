import { CALORIE_TARGETS } from "@/data/tdee";
import { formatCalories } from "@/lib/calculators/tdee";

export function TdeeTargetsSection({ result }) {
  return (
    <section
      aria-labelledby="tdee-targets-title"
      className="scroll-mt-24 rounded-2xl bg-canvas p-6 shadow-sm"
      id="tdee-targets"
    >
      <div className="mb-4">
        <h2
          className="text-base font-semibold text-text"
          id="tdee-targets-title"
        >
          Skenario target kalori
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Simulasi pengurangan atau penambahan energi dari estimasi TDEE.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          [
            "Defisit ringan",
            `${CALORIE_TARGETS.lightDeficit < 0 ? "−" : "+"}${Math.abs(CALORIE_TARGETS.lightDeficit)}`,
            result.targets.lightDeficit,
            "warning",
          ],
          [
            "Defisit sedang",
            `${CALORIE_TARGETS.moderateDeficit < 0 ? "−" : "+"}${Math.abs(CALORIE_TARGETS.moderateDeficit)}`,
            result.targets.moderateDeficit,
            "accent",
          ],
          [
            "Surplus",
            `${CALORIE_TARGETS.surplus < 0 ? "−" : "+"}${Math.abs(CALORIE_TARGETS.surplus)}`,
            result.targets.surplus,
            "indigo",
          ],
        ].map(([label, delta, calories, color]) => (
          <article
            className="rounded-xl border border-border bg-surface p-4"
            key={label}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                {label}
              </span>
              <span className="font-mono text-xs text-text-muted">
                {delta} kkal
              </span>
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-text tabular-nums">
              {formatCalories(calories)}
            </div>
            <div className="text-xs text-text-muted">kkal / hari</div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-text-muted">
        Target ini hanya simulasi matematika sederhana; defisit atau surplus
        yang sesuai perlu mempertimbangkan kebutuhan individu dan saran
        profesional kesehatan.
      </p>
    </section>
  );
}
