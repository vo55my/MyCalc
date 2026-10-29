/**
 * @module lib/calculators/conversion
 */

/**
 * @typedef {Object} UnitData
 * @property {string} name - Display name of the unit
 * @property {number} [factor] - Conversion factor to base unit (not present for temperature)
 */

/**
 * @typedef {Object} CategoryData
 * @property {string} name - Display name of the category
 * @property {string} [baseUnit] - Base unit key (not present for temperature)
 * @property {Object.<string, UnitData>} units - Map of unit key to unit data
 * @property {string[]} comparisons - List of unit keys for comparison breakdown
 * @property {boolean} [custom] - True for special categories like temperature
 */

// Conversion data with base units (SI)
/** @type {Object.<string, CategoryData>} */
const CONVERSION_DATA = {
  length: {
    name: "Panjang & Jarak",
    baseUnit: "m",
    units: {
      m: { name: "Meter (m)", factor: 1 },
      km: { name: "Kilometer (km)", factor: 1000 },
      cm: { name: "Sentimeter (cm)", factor: 0.01 },
      mm: { name: "Milimeter (mm)", factor: 0.001 },
      µm: { name: "Mikrometer (µm)", factor: 0.000001 },
      nm: { name: "Nanometer (nm)", factor: 0.000000001 },
      mi: { name: "Mil (Mile - mi)", factor: 1609.344 },
      yd: { name: "Yard (yd)", factor: 0.9144 },
      ft: { name: "Kaki (ft)", factor: 0.3048 },
      in: { name: "Inci (in)", factor: 0.0254 },
      NM: { name: "Mil Laut (Nautical Mile - NM)", factor: 1852 },
    },
    comparisons: ["m", "cm", "ft", "yd", "NM"],
  },
  mass: {
    name: "Berat & Massa",
    baseUnit: "kg",
    units: {
      kg: { name: "Kilogram (kg)", factor: 1 },
      g: { name: "Gram (g)", factor: 0.001 },
      mg: { name: "Miligram (mg)", factor: 0.000001 },
      µg: { name: "Mikrogram (µg)", factor: 0.000000001 },
      t: { name: "Ton Metrik (t)", factor: 1000 },
      lb: { name: "Pound (lb)", factor: 0.45359237 },
      oz: { name: "Ons (Ounce - oz)", factor: 0.028349523125 },
      st: { name: "Stone (st)", factor: 6.35029318 },
    },
    comparisons: ["kg", "g", "lb", "oz", "t"],
  },
  temperature: {
    name: "Suhu & Temperatur",
    custom: true,
    units: {
      c: { name: "Celsius (°C)" },
      f: { name: "Fahrenheit (°F)" },
      k: { name: "Kelvin (K)" },
      r: { name: "Reamur (°Re)" },
    },
    comparisons: ["c", "f", "k", "r"],
  },
  area: {
    name: "Luas & Area",
    baseUnit: "m2",
    units: {
      m2: { name: "Meter Persegi (m²)", factor: 1 },
      km2: { name: "Kilometer Persegi (km²)", factor: 1000000 },
      cm2: { name: "Sentimeter Persegi (cm²)", factor: 0.0001 },
      mm2: { name: "Milimeter Persegi (mm²)", factor: 0.000001 },
      ha: { name: "Hektar (ha)", factor: 10000 },
      acre: { name: "Acre (acre)", factor: 4046.8564224 },
      ft2: { name: "Kaki Persegi (ft²)", factor: 0.09290304 },
      in2: { name: "Inci Persegi (in²)", factor: 0.00064516 },
    },
    comparisons: ["m2", "ha", "acre", "ft2", "km2"],
  },
  volume: {
    name: "Volume & Kapasitas",
    baseUnit: "l",
    units: {
      l: { name: "Liter (L)", factor: 1 },
      ml: { name: "Mililiter (mL)", factor: 0.001 },
      m3: { name: "Meter Kubik (m³)", factor: 1000 },
      cm3: { name: "Sentimeter Kubik (cm³)", factor: 0.001 },
      gal: { name: "Galon US (gal)", factor: 3.785411784 },
      gal_uk: { name: "Galon UK (gal UK)", factor: 4.54609 },
      qt: { name: "Kuart US (qt)", factor: 0.946352946 },
      pt: { name: "Pint US (pt)", factor: 0.473176473 },
      fl_oz: { name: "Fluid Ounce (fl oz)", factor: 0.0295735295625 },
      tbsp: { name: "Sendok Makan (tbsp)", factor: 0.01478676478125 },
      tsp: { name: "Sendok Teh (tsp)", factor: 0.00492892159375 },
    },
    comparisons: ["l", "ml", "m3", "gal", "fl_oz"],
  },
  speed: {
    name: "Kecepatan",
    baseUnit: "mps",
    units: {
      mps: { name: "Meter per Detik (m/s)", factor: 1 },
      kmh: { name: "Kilometer per Jam (km/h)", factor: 1 / 3.6 },
      mph: { name: "Mil per Jam (mph)", factor: 0.44704 },
      knot: { name: "Knot (kn)", factor: 1852 / 3600 },
      fps: { name: "Kaki per Detik (ft/s)", factor: 0.3048 },
    },
    comparisons: ["kmh", "mps", "mph", "knot"],
  },
  digital: {
    name: "Penyimpanan Digital",
    baseUnit: "b",
    units: {
      b: { name: "Bit (b)", factor: 1 },
      kb: { name: "Kilobit (kb)", factor: 1000 },
      Kib: { name: "Kibibit (Kib)", factor: 1024 },
      Mb: { name: "Megabit (Mb)", factor: 1000000 },
      Mib: { name: "Mebibit (Mib)", factor: 1048576 },
      Gb: { name: "Gigabit (Gb)", factor: 1000000000 },
      Gib: { name: "Gibibit (Gib)", factor: 1073741824 },
      Tb: { name: "Terabit (Tb)", factor: 1000000000000 },
      Tib: { name: "Tebibit (Tib)", factor: 1099511627776 },
      B: { name: "Byte (B)", factor: 8 },
      KB: { name: "Kilobyte (KB)", factor: 8000 },
      KiB: { name: "Kibibyte (KiB)", factor: 8192 },
      MB: { name: "Megabyte (MB)", factor: 8000000 },
      MiB: { name: "Mebibyte (MiB)", factor: 8388608 },
      GB: { name: "Gigabyte (GB)", factor: 8000000000 },
      GiB: { name: "Gibibyte (GiB)", factor: 8589934592 },
      TB: { name: "Terabyte (TB)", factor: 8000000000000 },
      TiB: { name: "Tebibyte (TiB)", factor: 8796093022208 },
    },
    comparisons: ["b", "KB", "MB", "GB", "TB"],
  },
  time: {
    name: "Waktu",
    baseUnit: "s",
    units: {
      s: { name: "Detik (s)", factor: 1 },
      ms: { name: "Milidetik (ms)", factor: 0.001 },
      µs: { name: "Mikrodetik (µs)", factor: 0.000001 },
      min: { name: "Menit (min)", factor: 60 },
      h: { name: "Jam (h)", factor: 3600 },
      d: { name: "Hari (d)", factor: 86400 },
      w: { name: "Minggu (wk)", factor: 604800 },
      mo: { name: "Bulan (30 hari)", factor: 2592000 }, // aproksimasi
      y: { name: "Tahun (365 hari)", factor: 31536000 }, // aproksimasi
    },
    comparisons: ["s", "min", "h", "d", "w"],
  },
};

const TEMP_SYMBOLS = { c: "°C", f: "°F", k: "K", r: "°Re" };

/**
 * Hilangkan noise floating point (mis. 100.00000000000001 -> 100)
 * dengan membulatkan ke 12 digit signifikan.
 */
function cleanFloat(num) {
  if (!Number.isFinite(num) || num === 0) return num;
  return Number(num.toPrecision(12));
}

/**
 * Convert temperature between units.
 * Returns null jika unit asal/tujuan tidak valid.
 */
export function convertTemperature(value, from, to) {
  let tempC;

  // Convert from source to Celsius
  switch (from) {
    case "c":
      tempC = value;
      break;
    case "f":
      tempC = ((value - 32) * 5) / 9;
      break;
    case "k":
      tempC = value - 273.15;
      break;
    case "r":
      tempC = (value * 5) / 4;
      break;
    default:
      return null;
  }

  // Convert from Celsius to target
  switch (to) {
    case "c":
      return cleanFloat(tempC);
    case "f":
      return cleanFloat((tempC * 9) / 5 + 32);
    case "k":
      return cleanFloat(tempC + 273.15);
    case "r":
      return cleanFloat((tempC * 4) / 5);
    default:
      return null;
  }
}

/**
 * Convert between units using base unit factor.
 * Returns null jika kategori/unit tidak valid atau kategori khusus (suhu).
 */
export function convertUnit(value, from, to, category) {
  const catData = CONVERSION_DATA[category];
  if (!catData || catData.custom) {
    return null;
  }

  const fromFactor = catData.units[from]?.factor;
  const toFactor = catData.units[to]?.factor;

  if (fromFactor === undefined || toFactor === undefined || toFactor === 0) {
    return null;
  }

  const baseValue = value * fromFactor;
  return cleanFloat(baseValue / toFactor);
}

/**
 * Satu pintu konversi untuk semua kategori (termasuk suhu).
 * Returns null jika input tidak valid.
 */
export function convert(value, from, to, category) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;

  return category === "temperature"
    ? convertTemperature(value, from, to)
    : convertUnit(value, from, to, category);
}

/**
 * Get conversion formula text - menampilkan kalkulasi penuh dengan nilai input
 * @param {number} value - Nilai input
 * @param {string} from - Unit asal
 * @param {string} to - Unit target
 * @param {string} category - Kategori konversi
 * @param {number|string} [precision] - Presisi untuk hasil (opsional)
 * @returns {string} Formula text
 */
export function getConversionFormula(value, from, to, category, precision) {
  const result = convert(value, from, to, category);
  if (result === null) return "";

  if (category === "temperature") {
    const formattedResult =
      precision !== undefined
        ? formatPrecision(result, precision)
        : Number(result.toFixed(2));
    return `${value} ${TEMP_SYMBOLS[from]} = ${formattedResult} ${TEMP_SYMBOLS[to]}`;
  }

  const units = CONVERSION_DATA[category].units;
  const fromFactor = units[from]?.factor;
  const toFactor = units[to]?.factor;

  if (fromFactor === undefined || toFactor === undefined || toFactor === 0) {
    return "";
  }

  const ratio = fromFactor / toFactor;
  const formattedResult =
    precision !== undefined ? formatPrecision(result, precision) : result;

  // Tampilkan kalkulasi penuh: value from × ratio = result to
  return `${value} ${from} × ${Number(ratio.toPrecision(6))} = ${formattedResult} ${to}`;
}

/**
 * Get all conversion results for breakdown display
 */
export function getBreakdown(value, from, category) {
  const catData = CONVERSION_DATA[category];
  if (!catData) return [];

  const results = [];

  catData.comparisons.forEach((unitKey) => {
    if (unitKey === from) return; // Skip same unit

    const converted = convert(value, from, unitKey, category);

    if (converted !== null) {
      results.push({
        unit: unitKey,
        name: catData.units[unitKey].name,
        value: converted,
      });
    }
  });

  return results;
}

/**
 * Get category data
 */
export function getCategoryData(category) {
  return CONVERSION_DATA[category] || null;
}

/**
 * Get all categories
 */
export function getAllCategories() {
  return Object.keys(CONVERSION_DATA);
}

/**
 * Get available units for a category
 */
export function getUnits(category) {
  const catData = CONVERSION_DATA[category];
  if (!catData) return [];

  return Object.entries(catData.units).map(([key, data]) => ({
    key,
    ...data,
  }));
}

/**
 * Format number with precision
 */
export function formatPrecision(num, precision) {
  if (typeof num !== "number" || !Number.isFinite(num)) return "-";
  if (precision === "exp") return num.toExponential(5);

  const p = Number.isInteger(precision) ? precision : 6;
  const abs = Math.abs(num);

  // Notasi eksponensial hanya untuk angka yang benar-benar ekstrem
  if (abs >= 1e12 || (abs < 1e-6 && num !== 0)) {
    return num.toExponential(5);
  }

  return num.toLocaleString("id-ID", { maximumFractionDigits: p });
}

/**
 * Validasi apakah unit valid untuk kategori tertentu
 * @param {string} category - Kategori konversi
 * @param {string} unit - Unit yang divalidasi
 * @returns {boolean}
 */
export function isValidUnit(category, unit) {
  const catData = CONVERSION_DATA[category];
  if (!catData) return false;
  return unit in catData.units;
}

/**
 * Dapatkan unit default pertama untuk kategori
 * @param {string} category - Kategori konversi
 * @returns {string|null} Key unit pertama atau null
 */
export function getFirstUnit(category) {
  const units = getUnits(category);
  return units[0]?.key ?? null;
}

/**
 * Dapatkan unit default kedua untuk kategori (untuk target)
 * @param {string} category - Kategori konversi
 * @returns {string|null} Key unit kedua atau unit pertama atau null
 */
export function getSecondUnit(category) {
  const units = getUnits(category);
  return units[1]?.key ?? units[0]?.key ?? null;
}

/**
 * Validasi dan normalisasi input nilai
 * @param {string|number} value - Nilai input
 * @returns {number} Nilai numerik valid (0 jika invalid)
 */
export function normalizeValue(value) {
  const input = Number.parseFloat(value);
  return Number.isFinite(input) ? input : 0;
}

/**
 * Validasi domain suhu (Kelvin tidak boleh negatif, dll)
 * @param {number} value - Nilai suhu
 * @param {string} unit - Unit suhu
 * @returns {boolean} True jika valid
 */
export function isValidTemperature(value, unit) {
  switch (unit) {
    case "k":
      return value >= 0; // Kelvin absolute zero
    case "r":
      return value >= -218.52; // Reamur absolute zero
    case "c":
      return value >= -273.15; // Celsius absolute zero
    case "f":
      return value >= -459.67; // Fahrenheit absolute zero
    default:
      return true;
  }
}

/**
 * @typedef {Object} ConversionResult
 * @property {string} result - Formatted conversion result
 * @property {string} unit - Target unit display name
 * @property {string} formula - Human-readable conversion formula
 * @property {Array<{unit: string, name: string, value: string}>} breakdown - Comparison conversions
 * @property {string} [error] - Error message if conversion failed
 */

/**
 * Kalkulasi konversi lengkap - single source of truth untuk semua kalkulator
 * @param {Object} params - Parameter konversi
 * @param {string} params.category - Kategori konversi
 * @param {string|number} params.fromValue - Nilai asal
 * @param {string} params.fromUnit - Unit asal
 * @param {string} params.toUnit - Unit target
 * @param {number|string} params.precision - Presisi output (default: 6)
 * @returns {ConversionResult} Hasil konversi lengkap
 */
export function calculateConversion({
  category,
  fromValue,
  fromUnit,
  toUnit,
  precision = 6,
}) {
  const units = getUnits(category);
  const value = normalizeValue(fromValue);

  // Validasi unit
  if (!isValidUnit(category, fromUnit) || !isValidUnit(category, toUnit)) {
    return {
      result: "Error",
      unit: toUnit,
      formula: "",
      breakdown: [],
      error: "Unit tidak valid untuk kategori ini",
    };
  }

  // Validasi domain suhu
  if (category === "temperature" && !isValidTemperature(value, fromUnit)) {
    return {
      result: "Error",
      unit: toUnit,
      formula: "",
      breakdown: [],
      error: "Nilai suhu di luar domain valid",
    };
  }

  // Hitung konversi
  const resultValue =
    category === "temperature"
      ? convertTemperature(value, fromUnit, toUnit)
      : convertUnit(value, fromUnit, toUnit, category);

  const result =
    resultValue === null || resultValue === undefined
      ? "Error"
      : formatPrecision(resultValue, precision);

  const unit = units.find((item) => item.key === toUnit)?.name ?? toUnit;

  // Gunakan fungsi formula yang sudah ada di library
  const formula = getConversionFormula(
    value,
    fromUnit,
    toUnit,
    category,
    precision,
  );

  // Breakdown dengan presisi yang konsisten
  const breakdown = getBreakdown(value, fromUnit, category).map((item) => ({
    ...item,
    value: formatPrecision(item.value, precision),
  }));

  return { result, unit, formula, breakdown };
}
