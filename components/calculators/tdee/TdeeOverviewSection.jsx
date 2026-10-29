import {
  MdCalculate,
  MdInfoOutline,
  MdShowChart,
  MdWaterDrop,
} from "react-icons/md";
import { ShareActions } from "@/components/ui/actions/ShareActions";
import { TDEE_FORMULAS, HYDRATION_ML_PER_KG } from "@/data/tdee";
import { formatCalories } from "@/lib/calculators/tdee";

export function TdeeOverviewSection({ values, result, summary }) {
  return (
    <section
      aria-atomic="true"
      aria-live="polite"
      className="scroll-mt-24 rounded-2xl border border-border bg-surface-teal p-6 shadow-sm sm:p-8"
      id="tdee-overview"
      role="status"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Estimasi metabolisme &amp; energi
          </span>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-success"
            />
            Perkiraan untuk pemeliharaan berat
          </div>
        </div>
        <span className="text-xs text-text-muted">
          {TDEE_FORMULAS[values.formula]} · PAL {values.activityMultiplier}
        </span>
      </div>

      <div className="border-b border-border/70 py-6">
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
          Total pengeluaran energi harian (TDEE)
        </span>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <output className="font-mono text-4xl font-bold tracking-tight text-accent tabular-nums sm:text-5xl">
            {formatCalories(result.tdee)}
          </output>
          <span className="text-lg font-semibold text-text">
            kkal{" "}
            <span className="text-sm font-normal text-text-muted">/ hari</span>
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
          Perkiraan energi harian berdasarkan data yang dimasukkan dan tingkat
          aktivitas pilihan. Kebutuhan aktual dapat berbeda.
        </p>
        <ShareActions text={summary} title="Estimasi BMR & TDEE MyCalc" />
      </div>

      <div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-4">
        {[
          ["BMR", result.bmr, "kkal saat istirahat", MdShowChart],
          [
            "Energi aktivitas",
            result.activityCalories,
            "kkal perkiraan",
            MdCalculate,
          ],
          [
            "Hidrasi referensi",
            result.hydrationEstimateMl,
            "ml, patokan kasar",
            MdWaterDrop,
          ],
          [
            "TDEE per kg",
            result.caloriesPerKg.toLocaleString("id-ID", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }),
            "kkal / kg",
            MdInfoOutline,
          ],
        ].map(([label, value, note, Icon]) => (
          <div className="min-w-0" key={label}>
            <div className="mb-1 flex items-center gap-1 text-xs text-text-muted">
              <Icon aria-hidden="true" className="shrink-0 text-accent" />
              <span>{label}</span>
            </div>
            <div className="font-mono text-lg font-semibold text-text tabular-nums">
              {typeof value === "number" ? formatCalories(value) : value}
            </div>
            <div className="text-xs leading-relaxed text-text-muted">
              {note}
            </div>
          </div>
        ))}
      </div>

      <p className="flex items-start gap-2 rounded-xl bg-canvas/70 p-3 text-xs leading-relaxed text-text-muted">
        <MdInfoOutline
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-accent"
        />
        Estimasi hidrasi memakai pendekatan sederhana {HYDRATION_ML_PER_KG}{" "}
        ml/kg, bukan rekomendasi medis. Kebutuhan cairan dipengaruhi kondisi dan
        aktivitas masing-masing.
      </p>
    </section>
  );
}
