/** Initial form values untuk TDEE calculator */
export const INITIAL_VALUES = {
  gender: "male", // Default gender (pria)
  age: "27", // Default usia (tahun) - string untuk input
  heightCm: "172", // Default tinggi badan (cm) - string untuk input
  weightKg: "68", // Default berat badan (kg) - string untuk input
  activityMultiplier: "1.55", // Default aktivitas: sedang (3-5x/minggu)
  formula: "mifflin", // Default formula: Mifflin-St Jeor
};

/** Activity level options untuk perhitungan TDEE
 *  Format: { value: string, label: string }
 *  Multiplier berdasarkan kompendium aktivitas fisik
 */
export const ACTIVITY_OPTIONS = [
  { value: "1.2", label: "Sedentari — aktivitas harian sangat ringan" },
  { value: "1.375", label: "Ringan — olahraga ringan 1–3 kali per minggu" },
  { value: "1.55", label: "Sedang — olahraga 3–5 kali per minggu" },
  { value: "1.725", label: "Tinggi — olahraga intens 6–7 kali per minggu" },
  { value: "1.9", label: "Sangat tinggi — latihan/aktivitas fisik berat" },
];

/** Formula options untuk estimasi BMR */
export const TDEE_FORMULAS = {
  mifflin: "Mifflin–St Jeor",
  harris: "Harris–Benedict revisi",
};

/** Quick-select height options (cm) untuk tombol cepat di UI */
export const QUICK_HEIGHTS = [155, 160, 165, 170, 172, 175, 180];

/** Batasan input weight (kg) - digunakan untuk validasi & clamp di UI */
export const WEIGHT_LIMITS = { min: 30, max: 250 };

/** Batasan input height (cm) */
export const HEIGHT_LIMITS = { min: 100, max: 230 };

/** Batasan input age (tahun) */
export const AGE_LIMITS = { min: 15, max: 100 };

/** Step untuk tombol +/- berat badan (kg) */
export const WEIGHT_ADJUSTMENT_STEP = 1;

/** Rasio makronutrisi untuk simulasi (protein, lemak, karbohidrat) */
export const MACRO_RATIOS = {
  protein: 0.25,
  fat: 0.3,
  carbohydrates: 0.45,
};

/** Estimasi hidrasi per kg berat badan (ml) */
export const HYDRATION_ML_PER_KG = 35;

/** Field numerik untuk kalkulator lengkap (perlu konversi string -> number) */
export const FULL_NUMBER_FIELDS = [
  "age",
  "heightCm",
  "weightKg",
  "activityMultiplier",
];

/** Field numerik untuk kalkulator compact (sama dengan full untuk sekarang) */
export const COMPACT_NUMBER_FIELDS = [
  "age",
  "heightCm",
  "weightKg",
  "activityMultiplier",
];

/** Target kalori offset dari TDEE */
export const CALORIE_TARGETS = {
  lightDeficit: -300,
  moderateDeficit: -500,
  surplus: 350,
};
