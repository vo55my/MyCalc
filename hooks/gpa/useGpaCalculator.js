"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import { useArrayCalculator } from "@/hooks/useCalculator";
import {
  calculateGpa,
  estimateTargetGpa,
  GRADE_SCALES,
  gradeFromScore,
  validateSks,
  validateGrade,
  validateCourse,
} from "@/lib/calculators/gpa";

/**
 * Default grade value that exists in both plusMinus (4.0) and basic (4.0) scales
 */
export const DEFAULT_GRADE = "4";

/**
 * Default initial courses for GPA calculator
 */
export const DEFAULT_INITIAL_COURSES = [
  { id: 1, name: "Algoritma & Pemrograman II", sks: "3", grade: DEFAULT_GRADE },
  { id: 2, name: "Struktur Data & Basis Data", sks: "4", grade: DEFAULT_GRADE },
  { id: 3, name: "Matematika Diskrit", sks: "3", grade: DEFAULT_GRADE },
];

/**
 * Default constants for initial values
 */
export const DEFAULT_PREVIOUS_SKS = "0";
export const DEFAULT_PREVIOUS_GPA = "0.00";
export const DEFAULT_TARGET_GPA = "3.51";
export const DEFAULT_TARGET_SKS = "144";
export const DEFAULT_SCORE = "85";

/**
 * SKS options for SelectField
 */
export const SKS_OPTIONS = [1, 2, 3, 4, 5, 6].map((sks) => ({
  value: String(sks),
  label: `${sks} SKS`,
}));

/**
 * Finds the nearest grade option for a given grade value
 * @param {Array} options - Grade scale options
 * @param {string|number} currentGrade - Current grade value
 * @returns {Object} Nearest grade option
 */
export function findNearestGrade(options, currentGrade) {
  const numericGrade = Number(currentGrade);
  return options.reduce((nearest, option) =>
    Math.abs(option.points - numericGrade) <
    Math.abs(nearest.points - numericGrade)
      ? option
      : nearest,
  );
}

/**
 * GPA Calculator return type
 * @typedef {Object} UseGpaCalculatorReturn
 * @property {string} mode - Current mode (semester|cumulative|target|scale)
 * @property {Function} setMode - Set mode function
 * @property {string} scale - Current grade scale (plusMinus|basic)
 * @property {string} previousSks - Previous cumulative SKS
 * @property {Function} setPreviousSks - Set previous SKS
 * @property {string} previousGpa - Previous cumulative GPA
 * @property {Function} setPreviousGpa - Set previous GPA
 * @property {string} targetGpa - Target GPA
 * @property {Function} setTargetGpa - Set target GPA
 * @property {string} targetSks - Target total SKS
 * @property {Function} setTargetSks - Set target SKS
 * @property {string} score - Score for conversion (0-100)
 * @property {Function} setScore - Set score
 * @property {Array} courses - Array of course objects
 * @property {Array} gradeOptions - Current grade scale options
 * @property {Object} results - GPA calculation results
 * @property {Object} targetEstimate - Target GPA estimation
 * @property {Object|null} scoreGrade - Converted grade from score
 * @property {Object} nextCourseId - Ref for next course ID
 * @property {Function} addCourse - Add new course
 * @property {Function} removeCourse - Remove course by ID
 * @property {Function} updateCourse - Update course field
 * @property {Function} changeScale - Change grade scale
 * @property {Function} resetCalculator - Reset all state
 * @property {Function} setCourses - Set courses array directly
 */

/**
 * Hook for GPA calculator shared logic
 * @param {Object} options - Configuration options
 * @param {Array} options.initialCourses - Initial courses array
 * @param {string} options.defaultPreviousSks - Default previous SKS
 * @param {string} options.defaultPreviousGpa - Default previous GPA
 * @param {string} options.defaultTargetGpa - Default target GPA
 * @param {string} options.defaultTargetSks - Default target SKS
 * @param {string} options.defaultScore - Default score for conversion
 * @returns {UseGpaCalculatorReturn} GPA calculator state and functions
 */
export function useGpaCalculator({
  initialCourses = DEFAULT_INITIAL_COURSES,
  defaultPreviousSks = DEFAULT_PREVIOUS_SKS,
  defaultPreviousGpa = DEFAULT_PREVIOUS_GPA,
  defaultTargetGpa = DEFAULT_TARGET_GPA,
  defaultTargetSks = DEFAULT_TARGET_SKS,
  defaultScore = DEFAULT_SCORE,
} = {}) {
  const [mode, setMode] = useState("semester");
  const [scale, setScale] = useState("plusMinus");
  const [previousSks, setPreviousSks] = useState(defaultPreviousSks);
  const [previousGpa, setPreviousGpa] = useState(defaultPreviousGpa);
  const [targetGpa, setTargetGpa] = useState(defaultTargetGpa);
  const [targetSks, setTargetSks] = useState(defaultTargetSks);
  const [score, setScore] = useState(defaultScore);
  const nextCourseId = useRef(initialCourses.length + 1);
  const gradeOptions = GRADE_SCALES[scale];

  const {
    items: courses,
    result: results,
    addItem,
    removeItem,
    updateItem: updateCourseRaw,
    reset: resetCourses,
    setItems: setCourses,
  } = useArrayCalculator({
    initialItems: initialCourses,
    calculate: (items) => calculateGpa(items, previousSks, previousGpa),
  });

  const targetEstimate = useMemo(
    () =>
      estimateTargetGpa({
        currentSks: results.totalSks,
        currentPoints: results.totalPoints,
        targetGpa: Number(targetGpa) || 0,
        targetSks: Number(targetSks) || 0,
      }),
    [results.totalPoints, results.totalSks, targetGpa, targetSks],
  );

  const scoreGrade = useMemo(
    () => gradeFromScore(score, scale),
    [score, scale],
  );

  const addCourse = useCallback(() => {
    const id = nextCourseId.current++;
    addItem({ id, name: "", sks: "3", grade: String(gradeOptions[0].points) });
  }, [addItem, gradeOptions]);

  const removeCourse = useCallback(
    (id) => {
      if (courses.length > 1) removeItem(id);
    },
    [courses.length, removeItem],
  );

  /**
   * Update course with validation
   * @param {string|number} id - Course ID
   * @param {string} field - Field to update (sks|grade|name)
   * @param {string|number} value - New value
   */
  const updateCourse = useCallback(
    (id, field, value) => {
      // Validate SKS and grade fields
      if (field === "sks") {
        const validation = validateSks(value);
        if (!validation.valid) {
          console.warn(`Invalid SKS: ${validation.message}`);
          return;
        }
      }
      if (field === "grade") {
        const validation = validateGrade(value);
        if (!validation.valid) {
          console.warn(`Invalid grade: ${validation.message}`);
          return;
        }
      }
      updateCourseRaw(id, field, value);
    },
    [updateCourseRaw],
  );

  const changeScale = useCallback(
    (nextScale) => {
      setScale(nextScale);
      const options = GRADE_SCALES[nextScale];
      setCourses((current) =>
        current.map((course) => {
          const nearestGrade = findNearestGrade(options, course.grade);
          return { ...course, grade: String(nearestGrade.points) };
        }),
      );
    },
    [setCourses],
  );

  const resetCalculator = useCallback(() => {
    setMode("semester");
    setScale("plusMinus");
    resetCourses();
    setPreviousSks(defaultPreviousSks);
    setPreviousGpa(defaultPreviousGpa);
    setTargetGpa(defaultTargetGpa);
    setTargetSks(defaultTargetSks);
    setScore(defaultScore);
    nextCourseId.current = initialCourses.length + 1;
  }, [
    resetCourses,
    setPreviousSks,
    setPreviousGpa,
    setTargetGpa,
    setTargetSks,
    setScore,
    defaultPreviousSks,
    defaultPreviousGpa,
    defaultTargetGpa,
    defaultTargetSks,
    defaultScore,
    initialCourses.length,
  ]);

  return {
    // State
    mode,
    setMode,
    scale,
    previousSks,
    setPreviousSks,
    previousGpa,
    setPreviousGpa,
    targetGpa,
    setTargetGpa,
    targetSks,
    setTargetSks,
    score,
    setScore,
    courses,
    gradeOptions,
    results,
    targetEstimate,
    scoreGrade,
    nextCourseId,

    // Functions
    addCourse,
    removeCourse,
    updateCourse,
    changeScale,
    resetCalculator,
    setCourses,
  };
}
