import { MACRO_RATIOS } from "@/data/tdee";
import { formatCalories } from "@/lib/calculators/tdee";

export function TdeeMacrosSection({ result }) {
  return (
    <section
      aria-labelledby="tdee-macros-title"
      className="scroll-mt-24 rounded-2xl border border-border bg-canvas p-6 shadow-sm"
      id="tdee-macros"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            className="text-base font-semibold text-text"
            id="tdee-macros-title"
          >
            Simulasi pembagian makronutrisi
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Contoh pembagian energi pemeliharaan dengan rasio{" "}
            {Math.round(MACRO_RATIOS.protein * 100)} /{" "}
            {Math.round(MACRO_RATIOS.fat * 100)} /{" "}
            {Math.round(MACRO_RATIOS.carbohydrates * 100)}.
          </p>
        </div>
        <span className="rounded-md bg-surface px-2.5 py-1 text-xs text-text-muted">
          Bukan target personal
        </span>
      </div>
      <div
        aria-label={`Rasio contoh protein ${Math.round(MACRO_RATIOS.protein * 100)} persen, lemak ${Math.round(MACRO_RATIOS.fat * 100)} persen, karbohidrat ${Math.round(MACRO_RATIOS.carbohydrates * 100)} persen`}
        className="mb-4 flex h-3 overflow-hidden rounded-full bg-surface"
        role="img"
      >
        <span
          className={`w-[${Math.round(MACRO_RATIOS.protein * 100)}%] bg-accent`}
        />
        <span
          className={`w-[${Math.round(MACRO_RATIOS.fat * 100)}%] bg-indigo-500`}
        />
        <span
          className={`w-[${Math.round(MACRO_RATIOS.carbohydrates * 100)}%] bg-amber-500`}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          [
            "Protein",
            Math.round(MACRO_RATIOS.protein * 100),
            result.macros.protein,
            result.macros.proteinCalories,
            "bg-accent",
          ],
          [
            "Lemak",
            Math.round(MACRO_RATIOS.fat * 100),
            result.macros.fat,
            result.macros.fatCalories,
            "bg-indigo-500",
          ],
          [
            "Karbohidrat",
            Math.round(MACRO_RATIOS.carbohydrates * 100),
            result.macros.carbohydrates,
            result.macros.carbohydrateCalories,
            "bg-amber-500",
          ],
        ].map(([label, ratio, grams, calories, dot]) => (
          <div
            className="rounded-xl border border-border bg-surface p-3.5"
            key={label}
          >
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-text">
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rounded-full ${dot}`}
              />
              {label} ({ratio}%)
            </div>
            <div className="font-mono text-xl font-bold text-text tabular-nums">
              {formatCalories(grams)} g
            </div>
            <div className="text-xs text-text-muted">
              {formatCalories(calories)} kkal
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-text-muted">
        Rasio ini merupakan ilustrasi tetap, bukan rekomendasi diet atau
        pengganti perencanaan gizi individual.
      </p>
    </section>
  );
}
