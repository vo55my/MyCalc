/**
 * Grade scale definition
 * @typedef {Object} GradeScaleItem
 * @property {string} label - Grade label (e.g., "A", "AB")
 * @property {number} points - Grade points (0-4)
 */

/**
 * Available grade scales
 * @type {Object.<string, GradeScaleItem[]>}
 */
export const GRADE_SCALES = {
  plusMinus: [
    { label: "A", points: 4 },
    { label: "AB", points: 3.5 },
    { label: "B", points: 3 },
    { label: "BC", points: 2.5 },
    { label: "C", points: 2 },
    { label: "D", points: 1 },
    { label: "E", points: 0 },
  ],
  basic: [
    { label: "A", points: 4 },
    { label: "B", points: 3 },
    { label: "C", points: 2 },
    { label: "D", points: 1 },
    { label: "E", points: 0 },
  ],
};

/**
 * Course item for GPA calculation
 * @typedef {Object} Course
 * @property {string|number} id - Unique identifier
 * @property {string} [name] - Course name
 * @property {string|number} sks - Credit hours (SKS)
 * @property {string|number} grade - Grade points (0-4)
 */

/**
 * GPA calculation result
 * @typedef {Object} GpaResult
 * @property {number} semesterSks - Total SKS for current semester
 * @property {number} semesterPoints - Total grade points for current semester
 * @property {number} semesterGpa - Semester GPA (IPS)
 * @property {number} totalSks - Cumulative total SKS
 * @property {number} totalPoints - Cumulative total grade points
 * @property {number} cumulativeGpa - Cumulative GPA (IPK)
 */

/**
 * Calculate GPA for a semester and cumulative IPK
 * @param {Course[]} courses - Array of course objects
 * @param {number|string} [previousSks=0] - Previous cumulative SKS
 * @param {number|string} [previousGpa=0] - Previous cumulative GPA
 * @returns {GpaResult} Calculation result
 */
export function calculateGpa(courses, previousSks = 0, previousGpa = 0) {
  const validCourses = courses.filter(
    (course) => Number(course.sks) > 0 && Number.isFinite(Number(course.grade)),
  );
  const semesterSks = validCourses.reduce(
    (total, course) => total + Number(course.sks),
    0,
  );
  const semesterPoints = validCourses.reduce(
    (total, course) => total + Number(course.sks) * Number(course.grade),
    0,
  );
  const semesterGpa = semesterSks ? semesterPoints / semesterSks : 0;
  const priorCredits = Math.max(0, Number(previousSks) || 0);
  const priorGpa = Math.min(4, Math.max(0, Number(previousGpa) || 0));
  const totalSks = priorCredits + semesterSks;
  const totalPoints = priorCredits * priorGpa + semesterPoints;

  return {
    semesterSks,
    semesterPoints,
    semesterGpa,
    totalSks,
    totalPoints,
    cumulativeGpa: totalSks ? totalPoints / totalSks : 0,
  };
}

/**
 * Target GPA estimation result
 * @typedef {Object} TargetEstimate
 * @property {number} creditsRemaining - Remaining SKS to reach target
 * @property {number|null} requiredGpa - Required GPA for remaining SKS (null if no remaining)
 * @property {boolean} achievable - Whether target is achievable (0-4 range)
 * @property {boolean} alreadyMet - Whether target is already met
 */

/**
 * Estimate required GPA to reach target cumulative GPA
 * @param {Object} params
 * @param {number} params.currentSks - Current total SKS
 * @param {number} params.currentPoints - Current total grade points
 * @param {number} params.targetGpa - Target cumulative GPA
 * @param {number} params.targetSks - Target total SKS
 * @returns {TargetEstimate} Estimation result
 */
export function estimateTargetGpa({
  currentSks,
  currentPoints,
  targetGpa,
  targetSks,
}) {
  const creditsRemaining = Math.max(0, targetSks - currentSks);
  const pointsNeeded = targetGpa * targetSks - currentPoints;

  if (creditsRemaining === 0) {
    return {
      creditsRemaining,
      requiredGpa: null,
      achievable: pointsNeeded <= 0,
      alreadyMet: pointsNeeded <= 0,
    };
  }

  const requiredGpa = pointsNeeded / creditsRemaining;
  return {
    creditsRemaining,
    requiredGpa,
    achievable: requiredGpa <= 4 && requiredGpa >= 0,
    alreadyMet: requiredGpa <= 0,
  };
}

/**
 * Konversi nilai angka (0-100) ke bobot nilai berdasarkan skala.
 * @param {number|string} score - Nilai angka 0-100
 * @param {"plusMinus"|"basic"} scale - Skala nilai
 * @returns {{label: string, points: number}|null} Grade object atau null jika invalid
 */
export function gradeFromScore(score, scale = "plusMinus") {
  const numericScore = Number(score);
  if (
    !Number.isFinite(numericScore) ||
    numericScore < 0 ||
    numericScore > 100
  ) {
    return null;
  }

  const thresholds =
    scale === "basic"
      ? [
          { min: 85, label: "A", points: 4 },
          { min: 70, label: "B", points: 3 },
          { min: 60, label: "C", points: 2 },
          { min: 50, label: "D", points: 1 },
          { min: 0, label: "E", points: 0 },
        ]
      : [
          { min: 85, label: "A", points: 4 },
          { min: 80, label: "AB", points: 3.5 },
          { min: 75, label: "B", points: 3 },
          { min: 70, label: "BC", points: 2.5 },
          { min: 65, label: "C", points: 2 },
          { min: 60, label: "D", points: 1 },
          { min: 50, label: "E", points: 0 },
          { min: 0, label: "E", points: 0 },
        ];

  return thresholds.find((grade) => numericScore >= grade.min);
}

/**
 * Dapatkan predikat kelulusan berdasarkan IPK.
 * @param {number} gpa - IPK (0-4)
 * @param {Object} [options] - Opsi konfigurasi predikat
 * @param {number} [options.withHonors=3.51] - Threshold Dengan Pujian
 * @param {number} [options.verySatisfactory=3.0] - Threshold Sangat Memuaskan
 * @param {number} [options.satisfactory=2.76] - Threshold Memuaskan
 * @returns {string} Predikat kelulusan
 */
export function getPredicate(gpa, options = {}) {
  const {
    withHonors = 3.51,
    verySatisfactory = 3.0,
    satisfactory = 2.76,
  } = options;

  if (gpa >= withHonors) return "Dengan Pujian (simulasi)";
  if (gpa >= verySatisfactory) return "Sangat Memuaskan (simulasi)";
  if (gpa >= satisfactory) return "Memuaskan (simulasi)";
  return "Perlu evaluasi lebih lanjut";
}

/**
 * Dapatkan estimasi batas SKS semester berikutnya berdasarkan IPK.
 * @param {number} gpa - IPK (0-4)
 * @param {Object} [options] - Opsi konfigurasi batas SKS
 * @param {number} [options.maxCredits=24] - Maks SKS untuk IPK >= 3.0
 * @param {number} [options.highCredits=21] - SKS untuk IPK >= 2.5
 * @param {number} [options.mediumCredits=18] - SKS untuk IPK >= 2.0
 * @param {number} [options.lowCredits=15] - SKS untuk IPK < 2.0
 * @returns {number} Estimasi batas SKS
 */
export function getSuggestedCredits(gpa, options = {}) {
  const {
    maxCredits = 24,
    highCredits = 21,
    mediumCredits = 18,
    lowCredits = 15,
  } = options;

  if (gpa >= 3) return maxCredits;
  if (gpa >= 2.5) return highCredits;
  if (gpa >= 2) return mediumCredits;
  return lowCredits;
}

/**
 * Validation result
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether the value is valid
 * @property {string} [message] - Error message if invalid
 */

/**
 * Validate SKS (credit hours) value
 * @param {number|string} sks - SKS value to validate
 * @param {Object} [options] - Validation options
 * @param {number} [options.min=1] - Minimum SKS
 * @param {number} [options.max=6] - Maximum SKS
 * @returns {ValidationResult} Validation result
 */
export function validateSks(sks, options = {}) {
  const { min = 1, max = 6 } = options;
  const numericSks = Number(sks);

  if (!Number.isFinite(numericSks)) {
    return { valid: false, message: "SKS harus berupa angka" };
  }
  if (!Number.isInteger(numericSks)) {
    return { valid: false, message: "SKS harus berupa bilangan bulat" };
  }
  if (numericSks < min || numericSks > max) {
    return { valid: false, message: `SKS harus antara ${min} dan ${max}` };
  }
  return { valid: true };
}

/**
 * Validate grade points value
 * @param {number|string} grade - Grade points to validate
 * @param {Object} [options] - Validation options
 * @param {number} [options.min=0] - Minimum grade points
 * @param {number} [options.max=4] - Maximum grade points
 * @returns {ValidationResult} Validation result
 */
export function validateGrade(grade, options = {}) {
  const { min = 0, max = 4 } = options;
  const numericGrade = Number(grade);

  if (!Number.isFinite(numericGrade)) {
    return { valid: false, message: "Bobot nilai harus berupa angka" };
  }
  if (numericGrade < min || numericGrade > max) {
    return {
      valid: false,
      message: `Bobot nilai harus antara ${min} dan ${max}`,
    };
  }
  return { valid: true };
}

/**
 * Validate course object
 * @param {Object} course - Course object to validate
 * @param {Object} [options] - Validation options
 * @returns {ValidationResult} Validation result
 */
export function validateCourse(course, options = {}) {
  if (!course || typeof course !== "object") {
    return { valid: false, message: "Data mata kuliah tidak valid" };
  }

  const sksValidation = validateSks(course.sks, options);
  if (!sksValidation.valid) {
    return { valid: false, message: `SKS: ${sksValidation.message}` };
  }

  const gradeValidation = validateGrade(course.grade, options);
  if (!gradeValidation.valid) {
    return { valid: false, message: `Bobot: ${gradeValidation.message}` };
  }

  return { valid: true };
}

/**
 * Validate GPA value
 * @param {number|string} gpa - GPA value to validate
 * @returns {ValidationResult} Validation result
 */
export function validateGpa(gpa) {
  const numericGpa = Number(gpa);

  if (!Number.isFinite(numericGpa)) {
    return { valid: false, message: "IPK harus berupa angka" };
  }
  if (numericGpa < 0 || numericGpa > 4) {
    return { valid: false, message: "IPK harus antara 0 dan 4" };
  }
  return { valid: true };
}

/**
 * Validate score (0-100) value
 * @param {number|string} score - Score value to validate
 * @returns {ValidationResult} Validation result
 */
export function validateScore(score) {
  const numericScore = Number(score);

  if (!Number.isFinite(numericScore)) {
    return { valid: false, message: "Nilai harus berupa angka" };
  }
  if (numericScore < 0 || numericScore > 100) {
    return { valid: false, message: "Nilai harus antara 0 dan 100" };
  }
  return { valid: true };
}
