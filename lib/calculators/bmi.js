/**
 * BMI Calculation Library
 *
 * Berisi logika bisnis untuk perhitungan BMI, klasifikasi, BMR, TDEE.
 * TIDAK bergantung pada React/framework — bisa dipakai di Node.js, test, dll.
 *
 * Standar yang digunakan:
 * - BMI Classification: WHO Asia-Pasifik (batas normal 22.9, bukan 24.9 global)
 * - Ideal Weight: Formula Broca adjusted untuk populasi Indonesia
 * - BMR: Mifflin-St Jeor equation (lebih akurat dari Harris-Benedict)
 * - TDEE: BMR × activity multiplier
 *
 * Struktur file:
 * 1. CORE FUNCTIONS - Pure functions, throw Error, strict validation
 * 2. REACT ADAPTER - Graceful degradation, string→number conversion, defaults
 * 3. FIELD CONSTANTS - Field names untuk useNumberCalculator hook
 */

// ============================================
// 1. CORE FUNCTIONS (Pure Functions)
// ============================================
// Pure functions, throw Error, strict validation, no defaults
// Bisa dipakai di Node.js, test, atau environment non-React

/**
 * Menghitung BMI dan metrik kesehatan pendukung.
 *
 * @param {Object} input - Parameter input
 * @param {number} input.age - Usia dalam tahun (min 15, max 120)
 * @param {number} input.heightCm - Tinggi badan dalam sentimeter (min 1, max 300)
 * @param {number} input.weightKg - Berat badan dalam kilogram (min 1, max 500)
 * @param {'male'|'female'} input.gender - Jenis kelamin biologis untuk formula BMR
 * @param {number} input.activityMultiplier - Pengali aktivitas TDEE (1.0 - 2.5)
 * @returns {Object} Hasil perhitungan lengkap
 * @throws {Error} Jika input tidak valid (validasi ketat di sini, bukan di UI)
 */
export function calculateBmi({
  age,
  heightCm,
  weightKg,
  gender,
  activityMultiplier,
}) {
  // ===== VALIDASI INPUT (Guard Clauses) =====
  // Validasi di sini memastikan data bersih sebelum kalkulasi,
  // mencegah NaN/Infinity di hasil, dan memberikan error message jelas.

  if (typeof heightCm !== "number" || heightCm <= 0 || heightCm > 300) {
    throw new Error("Tinggi badan harus antara 1-300 cm");
  }
  if (typeof weightKg !== "number" || weightKg <= 0 || weightKg > 500) {
    throw new Error("Berat badan harus antara 1-500 kg");
  }
  if (typeof age !== "number" || age < 15 || age > 120) {
    throw new Error("Usia harus antara 15-120 tahun");
  }
  if (gender !== "male" && gender !== "female") {
    throw new Error("Jenis kelamin harus 'male' atau 'female'");
  }
  if (
    typeof activityMultiplier !== "number" ||
    activityMultiplier < 1.0 ||
    activityMultiplier > 2.5
  ) {
    throw new Error("Pengali aktivitas harus antara 1.0-2.5");
  }

  // ===== PERHITUNGAN UTAMA =====
  const heightM = heightCm / 100; // Konversi cm → meter
  const bmi = weightKg / (heightM * heightM); // BMI = kg / m²

  // Berat Ideal Broca (adjusted untuk Indonesia):
  // Pria: (Tinggi - 100) - 10%  |  Wanita: (Tinggi - 100) - 15%
  // Min 20kg untuk mencegah hasil negatif pada tinggi pendek
  const idealWeight =
    heightCm - 100 - (heightCm - 100) * (gender === "male" ? 0.1 : 0.15);

  // Rentang berat sehat berdasarkan BMI Asia-Pasifik (18.5 - 22.9)
  const minHealthyWeight = 18.5 * heightM * heightM;
  const maxHealthyWeight = 22.9 * heightM * heightM;

  // BMR (Basal Metabolic Rate) - Mifflin-St Jeor Equation
  // Lebih akurat untuk populasi modern dibanding Harris-Benedict
  const bmr =
    gender === "male"
      ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
      : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  const roundedBmr = Math.round(bmr);

  // ===== RETURN RESULT OBJECT =====
  return {
    bmi, // BMI value (float)
    category: classifyBmi(bmi), // {key, label, range} dari fungsi klasifikasi
    idealWeight: Math.max(20, idealWeight), // Broca ideal weight (min 20kg)
    minHealthyWeight, // Batas bawah rentang sehat (BMI 18.5)
    maxHealthyWeight, // Batas atas rentang sehat (BMI 22.9)
    bmr: roundedBmr, // Basal Metabolic Rate (kkal/hari)
    tdee: Math.round(roundedBmr * activityMultiplier), // Total Daily Energy Expenditure
    differenceFromIdeal: weightKg - idealWeight, // Selisih berat aktual vs ideal
  };
}

/**
 * Mengklasifikasikan BMI menggunakan ambang Asia-Pasifik (WHO).
 *
 * Perbedaan dengan standar Global (WHO):
 * - Global: Normal 18.5-24.9, Overweight 25-29.9, Obesity ≥30
 * - Asia-Pasifik: Normal 18.5-22.9, Overweight 23-24.9, Obesity I 25-29.9, Obesity II ≥30
 *
 * Alasan: Populasi Asia memiliki risiko metabolik (diabetes, hipertensi)
 * pada BMI yang lebih rendah dibanding populasi Barat.
 *
 * @param {number} bmi - Nilai BMI yang sudah dihitung
 * @returns {{key: string, label: string, range: string}} Kategori dengan key untuk styling, label display, dan range
 */
export function classifyBmi(bmi) {
  if (bmi < 18.5) {
    return { key: "underweight", label: "Berat badan kurang", range: "< 18.5" };
  }
  // Asia-Pasifik: Normal hingga 22.9 (bukan 24.9 global)
  if (bmi < 23) {
    return { key: "normal", label: "Normal / sehat", range: "18.5 - 22.9" };
  }
  // Overweight: 23.0 - 24.9 (lebih ketat dari global)
  if (bmi < 25) {
    return {
      key: "overweight",
      label: "Kelebihan berat",
      range: "23.0 - 24.9",
    };
  }
  // Obesitas dibagi 2 tingkat (Asia-Pasifik spesifik)
  return {
    key: bmi >= 30 ? "obesity-two" : "obesity-one",
    label: bmi >= 30 ? "Obesitas tingkat II" : "Obesitas tingkat I",
    range: bmi >= 30 ? ">= 30.0" : "25.0 - 29.9",
  };
}

// ============================================
// 2. REACT ADAPTER (React-Safe Wrapper)
// ============================================
// Adapter antara Core Library dan React Components
// Menangani: default values, string→number conversion, error boundary

/**
 * Calculate BMI dengan error handling & default values untuk React.
 *
 * @param {Object} vals - Form values (biasanya string dari input)
 * @param {Object} options
 * @param {boolean} options.includeActivity - true=full calc (dengan TDEE), false=compact (tanpa TDEE)
 * @returns {Object} BMI result + _error field (null jika sukses, string jika error)
 *
 * Flow:
 * 1. Normalisasi input: string → number, fallback default (0/1)
 * 2. Optional: tambah activityMultiplier jika includeActivity=true
 * 3. Try: panggil core calculateBmi(), return result + _error: null
 * 4. Catch: return fallback object (zeros) + _error: message
 *
 * UI Components cukup cek result._error untuk tampilkan alert.
 */
export function calculateBmiResult(vals, { includeActivity = true } = {}) {
  try {
    // ===== NORMALISASI INPUT =====
    // Form values sering string kosong "", Number("") = 0, || fallback ke default
    const baseValues = {
      ...vals,
      age: Number(vals.age) || 0, // 0 → akan divalidasi di core (min 15)
      heightCm: Number(vals.heightCm) || 1, // 1 → avoid div/0, validasi core (min 1)
      weightKg: Number(vals.weightKg) || 0, // 0 → validasi core (min 1)
    };

    // Activity multiplier hanya untuk full calculator (TDEE)
    if (includeActivity) {
      baseValues.activityMultiplier = Number(vals.activityMultiplier) || 1.375;
    }

    // ===== PANGGIL CORE LIBRARY =====
    // Jika validasi gagal, core akan throw Error → tertangkap catch block
    return {
      ...calculateBmi(baseValues),
      _error: null, // Flag sukses untuk UI
    };
  } catch (err) {
    // ===== FALLBACK AMAN (Graceful Degradation) =====
    // Return object dengan zeros + _error message
    // UI tidak crash, bisa tampilkan error message di alert
    return {
      bmi: 0,
      category: { key: "normal", label: "-", range: "-" },
      idealWeight: 0,
      minHealthyWeight: 0,
      maxHealthyWeight: 0,
      bmr: 0,
      tdee: 0,
      differenceFromIdeal: 0,
      _error: err.message, // Pesan error dari validasi core
    };
  }
}

// ============================================
// 3. FIELD CONSTANTS (untuk useNumberCalculator hook)
// ============================================

/**
 * Field names yang butuh konversi string→number di useNumberCalculator hook.
 * Full calculator: include activityMultiplier untuk TDEE.
 */
export const FULL_NUMBER_FIELDS = [
  "age",
  "heightCm",
  "weightKg",
  "activityMultiplier",
];

/**
 * Field names untuk compact calculator (tanpa activityMultiplier).
 * Compact hanya butuh age, height, weight — activity pakai default.
 */
export const COMPACT_NUMBER_FIELDS = ["age", "heightCm", "weightKg"];
