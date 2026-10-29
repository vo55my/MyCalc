/** Initial form values untuk BMI calculator */
export const INITIAL_VALUES = {
  gender: "male", // Default gender (pria)
  age: 28, // Default usia (tahun)
  heightCm: 172, // Default tinggi badan (cm)
  weightKg: 68, // Default berat badan (kg)
  activityMultiplier: 1.375, // Default aktivitas: ringan (1-3x/minggu)
};

/** Activity level options untuk perhitungan TDEE
 *  Format: [multiplier, label]
 *  Multiplier berdasarkan kompendium aktivitas fisik
 */
export const ACTIVITY_OPTIONS = [
  ["1.2", "Sedentari (jarang atau tidak berolahraga)"],
  ["1.375", "Aktivitas ringan (olahraga 1 - 3 kali/minggu)"],
  ["1.55", "Aktivitas sedang (olahraga 3 - 5 kali/minggu)"],
  ["1.725", "Aktivitas berat (olahraga 6 - 7 kali/minggu)"],
  ["1.9", "Sangat aktif (fisik berat harian / atlet)"],
];

/** Quick-select height options (cm) untuk tombol cepat di UI */
export const QUICK_HEIGHTS = [155, 160, 165, 170, 172, 175, 180];

/** Batasan input weight (kg) - digunakan untuk validasi & clamp di UI */
export const WEIGHT_LIMITS = { min: 30, max: 250 };

/** Batasan input height (cm) */
export const HEIGHT_LIMITS = { min: 100, max: 230 };

/** Batasan input age (tahun) */
export const AGE_LIMITS = { min: 15, max: 100 };
