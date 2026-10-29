import {
  ACTIVITY_OPTIONS,
  TDEE_FORMULAS,
  AGE_LIMITS,
  HEIGHT_LIMITS,
  WEIGHT_LIMITS,
  MACRO_RATIOS,
  CALORIE_TARGETS,
  HYDRATION_ML_PER_KG,
} from "@/data/tdee";

const ACTIVITY_FACTORS = Object.fromEntries(
  ACTIVITY_OPTIONS.map((opt) => [opt.value, opt.label]),
);

export { ACTIVITY_OPTIONS, TDEE_FORMULAS };

/**
 * Menghitung BMR dan TDEE berdasarkan parameter tubuh dan aktivitas.
 * @param {Object} params
 * @param {number} params.age - Usia (tahun)
 * @param {number} params.heightCm - Tinggi badan (cm)
 * @param {number} params.weightKg - Berat badan (kg)
 * @param {"male"|"female"} params.gender - Jenis kelamin
 * @param {string} params.activity - Faktor aktivitas (PAL)
 * @param {"mifflin"|"harris"} params.formula - Formula BMR
 * @returns {Object|null} Hasil kalkulasi atau { _error: string } jika input tidak valid
 */
export function calculateTdee({
  age,
  heightCm,
  weightKg,
  gender,
  activity,
  formula,
}) {
  const validInput =
    Number.isFinite(age) &&
    age >= AGE_LIMITS.min &&
    age <= AGE_LIMITS.max &&
    Number.isFinite(heightCm) &&
    heightCm >= HEIGHT_LIMITS.min &&
    heightCm <= HEIGHT_LIMITS.max &&
    Number.isFinite(weightKg) &&
    weightKg >= WEIGHT_LIMITS.min &&
    weightKg <= WEIGHT_LIMITS.max &&
    (gender === "male" || gender === "female") &&
    Object.hasOwn(ACTIVITY_FACTORS, String(activity)) &&
    (formula === "mifflin" || formula === "harris");

  if (!validInput) {
    return {
      _error:
        "Periksa kembali input: usia 15–100 tahun, tinggi 100–230 cm, berat 30–250 kg.",
    };
  }

  let bmr;
  if (formula === "mifflin") {
    bmr =
      10 * weightKg +
      6.25 * heightCm -
      5 * age +
      (gender === "male" ? 5 : -161);
  } else if (gender === "male") {
    bmr = 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 88.362;
  } else {
    bmr = 9.247 * weightKg + 3.098 * heightCm - 4.33 * age + 447.593;
  }

  const roundedBmr = Math.round(bmr);
  const tdee = Math.round(roundedBmr * Number(activity));

  return {
    bmr: roundedBmr,
    tdee,
    activityCalories: Math.max(0, tdee - roundedBmr),
    hydrationEstimateMl: Math.round(weightKg * HYDRATION_ML_PER_KG),
    caloriesPerKg: weightKg > 0 ? tdee / weightKg : 0,
    targets: {
      lightDeficit: Math.max(0, tdee + CALORIE_TARGETS.lightDeficit),
      moderateDeficit: Math.max(0, tdee + CALORIE_TARGETS.moderateDeficit),
      surplus: tdee + CALORIE_TARGETS.surplus,
    },
    macros: {
      protein: Math.round((tdee * MACRO_RATIOS.protein) / 4),
      fat: Math.round((tdee * MACRO_RATIOS.fat) / 9),
      carbohydrates: Math.round((tdee * MACRO_RATIOS.carbohydrates) / 4),
      proteinCalories: Math.round(tdee * MACRO_RATIOS.protein),
      fatCalories: Math.round(tdee * MACRO_RATIOS.fat),
      carbohydrateCalories: Math.round(tdee * MACRO_RATIOS.carbohydrates),
    },
  };
}

// ============================================
// FORMAT UTILITIES (untuk display di UI)
// ============================================

/**
 * Format calories value with Indonesian locale.
 * @param {number} value - Calories value
 * @returns {string} Formatted string (e.g., "1,234")
 */
export function formatCalories(value) {
  return Math.round(value).toLocaleString("id-ID");
}

/**
 * Format number with Indonesian locale.
 * @param {number} value - Number value
 * @param {Object} options - Intl.NumberFormat options
 * @returns {string} Formatted string
 */
export function formatNumber(value, options = {}) {
  return value.toLocaleString("id-ID", options);
}

/**
 * Format weight value (kg) with 1 decimal place.
 * @param {number} value - Weight in kg
 * @returns {string} Formatted string (e.g., "68.5")
 */
export function formatWeight(value) {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

/**
 * Format height value (cm) as integer.
 * @param {number} value - Height in cm
 * @returns {string} Formatted string (e.g., "172")
 */
export function formatHeight(value) {
  return Math.round(value).toLocaleString("id-ID");
}
