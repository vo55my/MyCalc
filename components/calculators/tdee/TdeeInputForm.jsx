import { MdCalculate, MdFemale, MdMale, MdRestartAlt } from "react-icons/md";
import { CalcButton } from "@/components/ui/controls/CalcButton";
import { NumberField } from "@/components/ui/controls/NumberField";
import {
  ACTIVITY_OPTIONS,
  TDEE_FORMULAS,
  QUICK_HEIGHTS,
  WEIGHT_LIMITS,
  HEIGHT_LIMITS,
  AGE_LIMITS,
  WEIGHT_ADJUSTMENT_STEP,
} from "@/data/tdee";

export function TdeeInputForm({ values, result, update, adjustWeight, reset }) {
  // Smooth scroll ke section hasil setelah submit
  function navigateToSection(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Form submit handler: prevent default + scroll ke overview section
  function handleSubmit(event) {
    event.preventDefault();
    navigateToSection("tdee-overview");
  }

  return (
    <section
      aria-labelledby="tdee-input-title"
      className="rounded-2xl border border-border bg-canvas p-5 shadow-sm md:p-6 lg:col-span-5"
    >
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2
            className="text-base font-semibold text-text"
            id="tdee-input-title"
          >
            Parameter tubuh &amp; aktivitas
          </h2>
          <p className="mt-1 text-xs text-text-muted">
            Masukkan data untuk menghitung estimasi energi.
          </p>
        </div>
        <span className="rounded-md bg-surface-teal px-2.5 py-1 text-xs font-semibold text-accent">
          {TDEE_FORMULAS[values.formula]}
        </span>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-text">
            Jenis kelamin untuk formula
          </legend>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface p-1">
            {[
              ["male", "Pria", MdMale],
              ["female", "Wanita", MdFemale],
            ].map(([gender, label, Icon]) => (
              <button
                aria-pressed={values.gender === gender}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-lg text-sm font-medium transition ${
                  values.gender === gender
                    ? "bg-canvas text-accent shadow-xs"
                    : "text-text-muted hover:text-text"
                }`}
                key={gender}
                onClick={() => update("gender", gender)}
                type="button"
              >
                <Icon aria-hidden="true" className="text-lg" />
                {label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">
            Formula ini menggunakan jenis kelamin biologis sebagai salah satu
            parameter; hasil tetap merupakan perkiraan.
          </p>
        </fieldset>

        {/* Validation error display */}
        {result?._error && (
          <div
            className="rounded-[var(--radius-md)] bg-danger-light p-3 text-sm text-danger"
            role="alert"
          >
            {result._error}
          </div>
        )}

        <div>
          <NumberField
            id="tdee-age"
            label="Usia"
            value={values.age}
            onChange={(value) => update("age", value)}
            min={AGE_LIMITS.min}
            max={AGE_LIMITS.max}
            helper={`${AGE_LIMITS.min}–${AGE_LIMITS.max} tahun`}
            unit="tahun"
            required
          />
        </div>

        <div>
          <NumberField
            id="tdee-height"
            label="Tinggi badan"
            value={values.heightCm}
            onChange={(value) => update("heightCm", value)}
            min={HEIGHT_LIMITS.min}
            max={HEIGHT_LIMITS.max}
            helper={`${HEIGHT_LIMITS.min}–${HEIGHT_LIMITS.max} cm`}
            unit="cm"
            required
          />
          <div
            className="mt-2 flex flex-wrap gap-1.5"
            aria-label="Pilihan tinggi cepat"
          >
            {QUICK_HEIGHTS.map((height) => (
              <button
                aria-pressed={Number(values.heightCm) === height}
                className={`min-h-8 rounded-md px-2 text-xs transition-colors ${
                  Number(values.heightCm) === height
                    ? "bg-surface-teal font-medium text-accent"
                    : "bg-surface text-text-muted hover:text-text"
                }`}
                key={height}
                onClick={() => update("heightCm", String(height))}
                type="button"
              >
                {height}
              </button>
            ))}
          </div>
        </div>

        <div>
          <NumberField
            id="tdee-weight"
            label="Berat badan"
            value={values.weightKg}
            onChange={(value) => update("weightKg", value)}
            min={WEIGHT_LIMITS.min}
            max={WEIGHT_LIMITS.max}
            step={0.1}
            helper={`${WEIGHT_LIMITS.min}–${WEIGHT_LIMITS.max} kg`}
            unit="kg"
            required
            buttons={{
              decrement: {
                onClick: () => adjustWeight(-WEIGHT_ADJUSTMENT_STEP),
                ariaLabel: `Kurangi berat ${WEIGHT_ADJUSTMENT_STEP} kilogram`,
              },
              increment: {
                onClick: () => adjustWeight(WEIGHT_ADJUSTMENT_STEP),
                ariaLabel: `Tambah berat ${WEIGHT_ADJUSTMENT_STEP} kilogram`,
              },
            }}
          />
        </div>

        <div>
          <label
            className="mb-1.5 block text-sm font-medium text-text"
            htmlFor="tdee-activity"
          >
            Intensitas aktivitas (PAL)
          </label>
          <select
            className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3.5 text-sm text-text outline-none transition focus:border-accent focus:bg-canvas focus:shadow-[var(--shadow-focus)]"
            id="tdee-activity"
            onChange={(event) =>
              update("activityMultiplier", event.target.value)
            }
            value={values.activityMultiplier}
          >
            {ACTIVITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.value})
              </option>
            ))}
          </select>
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm font-medium text-text">
            Formula estimasi BMR
          </legend>
          {Object.entries(TDEE_FORMULAS).map(([key, label]) => (
            <label
              className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                values.formula === key
                  ? "border-accent bg-surface-teal"
                  : "border-border bg-canvas hover:bg-surface"
              }`}
              key={key}
            >
              <input
                checked={values.formula === key}
                className="h-4 w-4 accent-accent"
                name="tdee-formula"
                onChange={() => update("formula", key)}
                type="radio"
                value={key}
              />
              <span>
                <span className="block text-sm font-medium text-text">
                  {label}
                </span>
                <span className="text-xs text-text-muted">
                  Estimasi laju metabolisme basal
                </span>
              </span>
            </label>
          ))}
        </fieldset>

        <div className="flex flex-row gap-3 border-t border-border pt-4">
          <CalcButton
            className="flex-1 bg-accent text-white hover:bg-accent-hover"
            type="submit"
            variant="equals"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <MdCalculate aria-hidden="true" className="text-lg" />
              Lihat hasil
            </span>
          </CalcButton>
          <CalcButton
            className="px-4"
            onClick={reset}
            type="button"
            variant="action"
          >
            <span className="inline-flex items-center justify-center gap-2 text-text-muted transition hover:text-accent">
              <MdRestartAlt aria-hidden="true" className="text-lg" />
              Reset
            </span>
          </CalcButton>
        </div>
      </form>
    </section>
  );
}
