/**
 * Evaluasi ekspresi matematika dengan presisi tinggi (Shunting-yard algorithm).
 * Mendukung operator: +, -, *, /, %, ^, unary ±, dan tanda kurung.
 *
 * @param {string} expression - Ekspresi matematika (misal: "1450000 × 12 + (350000 ÷ 2)")
 * @returns {{success: boolean, value: number|null, error: string|null}}
 */
export function evaluateExpression(expression) {
  // Normalisasi: ganti simbol Unicode dengan operator standar
  const normalized = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  try {
    const raw = evaluate(normalized);
    if (!Number.isFinite(raw)) throw new Error("Hasil tidak terdefinisi");
    // Bulatkan ke 15 digit signifikan agar sisa biner (0.1 + 0.2) hilang.
    const rounded = Number(raw.toPrecision(15));
    return {
      success: true,
      value: rounded === 0 ? 0 : rounded, // hindari -0
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      value: null,
      error: error.message,
    };
  }
}

/**
 * Tokenize ekspresi matematika menjadi array token.
 * @param {string} expression - Ekspresi yang sudah dinormalisasi
 * @returns {Array<{type: string, value: string|number}>} Array token
 * @throws {Error} Jika karakter tidak dikenali
 */
function tokenize(expression) {
  const tokens = [];
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Angka (termasuk koma desimal).
    if (/[\d.]/.test(char)) {
      let num = "";
      let hasDecimal = false;
      while (i < expression.length && /[\d.,]/.test(expression[i])) {
        const currentChar = expression[i];
        const isDecimalSeparator = currentChar === "." || currentChar === ",";

        if (!isDecimalSeparator && currentChar === ",") break;
        if (isDecimalSeparator) {
          if (hasDecimal) break;
          hasDecimal = true;
          num += ".";
        } else {
          num += currentChar;
        }
        i++;
      }
      const parsed = parseFloat(num);
      if (Number.isNaN(parsed)) throw new Error("Invalid number");
      tokens.push({ type: "number", value: parsed });
      continue;
    }

    // Operator dan tanda kurung
    if ("+-*/%()^".includes(char)) {
      if (char === "(" || char === ")") {
        tokens.push({ type: "paren", value: char });
      } else {
        tokens.push({ type: "operator", value: char });
      }
      i++;
      continue;
    }

    throw new Error(`Unexpected character: ${char}`);
  }

  return tokens;
}

/**
 * Parser Shunting-yard untuk mengubah infix ke postfix (RPN).
 * @param {Array} tokens - Array token dari tokenizer
 * @returns {Array} Token dalam notasi RPN
 */
function toRPN(tokens) {
  const output = [];
  const operators = [];
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "^": 3,
    "u+": 3,
    "u-": 3,
  };
  const rightAssociative = { "u+": true, "u-": true, "^": true };
  let expectsOperand = true;

  for (const token of tokens) {
    if (token.type === "number") {
      output.push(token);
      expectsOperand = false;
    } else if (token.type === "operator") {
      if (expectsOperand && ["+", "-"].includes(token.value)) {
        operators.push({ ...token, value: `u${token.value}` });
        continue;
      }

      while (
        operators.length > 0 &&
        operators[operators.length - 1].type === "operator" &&
        (precedence[operators[operators.length - 1].value] >
          precedence[token.value] ||
          (precedence[operators[operators.length - 1].value] ===
            precedence[token.value] &&
            !rightAssociative[token.value]))
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
      expectsOperand = true;
    } else if (token.type === "paren" && token.value === "(") {
      operators.push(token);
      expectsOperand = true;
    } else if (token.type === "paren" && token.value === ")") {
      while (
        operators.length > 0 &&
        operators[operators.length - 1].type !== "paren"
      ) {
        output.push(operators.pop());
      }
      if (operators.length === 0) throw new Error("Mismatched parentheses");
      operators.pop(); // Remove '('
      expectsOperand = false;
    }
  }

  while (operators.length > 0) {
    const op = operators.pop();
    if (op.type === "paren") throw new Error("Mismatched parentheses");
    output.push(op);
  }

  return output;
}

/**
 * Evaluasi RPN (Reverse Polish Notation).
 * @param {Array} rpn - Token dalam notasi RPN
 * @returns {number} Hasil evaluasi
 */
function evaluateRPN(rpn) {
  const stack = [];

  for (const token of rpn) {
    if (token.type === "number") {
      stack.push(token.value);
    } else if (token.type === "operator") {
      if (token.value === "u+" || token.value === "u-") {
        if (stack.length < 1) throw new Error("Insufficient operands");
        const value = stack.pop();
        stack.push(token.value === "u-" ? -value : value);
        continue;
      }

      if (stack.length < 2) throw new Error("Insufficient operands");
      const b = stack.pop();
      const a = stack.pop();
      let result;
      switch (token.value) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          if (b === 0) throw new Error("Division by zero");
          result = a / b;
          break;
        case "%":
          result = a % b;
          break;
        case "^":
          result = a ** b;
          break;
        default:
          throw new Error(`Unknown operator: ${token.value}`);
      }
      stack.push(result);
    }
  }

  if (stack.length !== 1) throw new Error("Invalid expression");
  return stack[0];
}

/**
 * Fungsi utama evaluasi ekspresi.
 */
function evaluate(expression) {
  const tokens = tokenize(expression);
  const rpn = toRPN(tokens);
  return evaluateRPN(rpn);
}

/**
 * Format angka ke format Indonesia (1.234.567).
 * @param {number} value - Nilai numerik
 * @returns {string} String terformat
 */
export function formatNumber(value) {
  if (!isFinite(value)) return "Error";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 10,
  }).format(value);
}

/**
 * Serialisasi angka ke string desimal polos (tanpa notasi eksponen dan
 * tanpa pemisah ribuan) agar aman dimasukkan kembali ke ekspresi.
 * String(1e-7) = "1e-7" tidak bisa di-parse tokenizer; fungsi ini menghasilkan "0.0000001".
 * @param {number} value
 * @returns {string}
 */
export function serializeNumber(value) {
  if (!Number.isFinite(value) || value === 0) return "0";
  return value.toLocaleString("en-US", {
    useGrouping: false,
    maximumFractionDigits: 20,
  });
}

/**
 * Format angka untuk display (notasi ilmiah di atas 1e15 atau di bawah 1e-6).
 */
export function formatDisplay(value) {
  if (!isFinite(value)) return "Error";
  // Gunakan notasi ilmiah untuk angka sangat besar/kecil
  if (
    Math.abs(value) >= 1e15 ||
    (Math.abs(value) > 0 && Math.abs(value) < 1e-6)
  ) {
    return value
      .toExponential(6)
      .replace(/\.?0+e/, "e")
      .replace(".", ",");
  }
  return formatNumber(value);
}

/**
 * Konversi angka ke terbilang Indonesia.
 * @param {number} num - Angka yang akan dikonversi
 * @returns {string} Terbilang dalam bahasa Indonesia
 */
export function numberToWords(num) {
  if (!isFinite(num)) return "Tidak terdefinisi";
  if (num === 0) return "Nol";
  if (Math.abs(num) > Number.MAX_SAFE_INTEGER) {
    return "Angka terlalu besar untuk dibaca";
  }

  const units = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
  ];
  const teens = [
    "Sepuluh",
    "Sebelas",
    "Dua Belas",
    "Tiga Belas",
    "Empat Belas",
    "Lima Belas",
    "Enam Belas",
    "Tujuh Belas",
    "Delapan Belas",
    "Sembilan Belas",
  ];
  const tens = [
    "",
    "",
    "Dua Puluh",
    "Tiga Puluh",
    "Empat Puluh",
    "Lima Puluh",
    "Enam Puluh",
    "Tujuh Puluh",
    "Delapan Puluh",
    "Sembilan Puluh",
  ];
  const scales = ["", "Ribu", "Juta", "Miliar", "Triliun", "Kuadriliun"];
  const absolute = Math.abs(num);
  const normalizedNumber = absolute.toLocaleString("en-US", {
    useGrouping: false,
    maximumFractionDigits: 15,
  });
  const [integerText, fractionalText] = normalizedNumber.split(".");
  const sign = num < 0 ? "Minus " : "";

  function convertHundreds(n) {
    let result = "";
    if (n >= 100) {
      const hundreds = Math.floor(n / 100);
      result += (hundreds === 1 ? "Seratus" : units[hundreds] + " Ratus") + " ";
      n %= 100;
    }
    if (n >= 20) {
      const ten = Math.floor(n / 10);
      result += tens[ten] + " ";
      n %= 10;
    } else if (n >= 10) {
      result += teens[n - 10] + " ";
      n = 0;
    }
    if (n > 0) {
      result += units[n] + " ";
    }
    return result.trim();
  }

  let result = "";
  let scaleIndex = 0;
  let integerPart = Number(integerText);

  while (integerPart > 0) {
    const chunk = integerPart % 1000;
    if (chunk > 0) {
      const chunkWords = convertHundreds(chunk);
      if (scaleIndex === 0) {
        result = chunkWords + " " + result;
      } else if (scaleIndex === 1 && chunk === 1) {
        result = "Seribu " + result;
      } else {
        result = chunkWords + " " + scales[scaleIndex] + " " + result;
      }
    }
    integerPart = Math.floor(integerPart / 1000);
    scaleIndex++;
  }

  const wholeWords = result.trim() || "Nol";
  if (!fractionalText) return `${sign}${wholeWords}`;

  const fractionalWords = fractionalText
    .split("")
    .map((digit) => units[Number(digit)])
    .join(" ");
  return `${sign}${wholeWords} Koma ${fractionalWords}`;
}

/**
 * Konversi pecahan ke bentuk desimal.
 * @param {number} numerator - Pembilang
 * @param {number} denominator - Penyebut (tidak boleh nol)
 * @returns {number} Hasil pembagian
 * @throws {Error} Jika penyebut nol
 */
