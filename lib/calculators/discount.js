/**
 * @typedef {Object} DiscountResult
 * @property {number} finalPrice - Harga akhir yang dibayar
 * @property {number} totalSavings - Total penghematan (harga asli - harga akhir + cashback)
 * @property {number} discountAmount - Total nominal diskon persentase (primary + secondary)
 * @property {number} voucherSavings - Nominal penghematan dari voucher
 * @property {number} cashbackSavings - Nominal cashback yang didapat
 * @property {number} effectiveDiscount - Persentase penghematan total terhadap harga asli
 * @property {number} cashback - Nilai cashback (sama dengan cashbackSavings, untuk kompatibilitas)
 * @property {number} paymentRatio - Persentase harga akhir terhadap harga asli
 * @property {number} savingsRatio - Persentase penghematan terhadap harga asli
 * @property {string} mode - Mode kalkulasi: "stacked" | "cashback" | "bogo"
 * @property {number} [paidUnits] - Unit yang dibayar (hanya mode bogo)
 * @property {number} [freeUnits] - Unit gratis (hanya mode bogo)
 */

/**
 * Menghitung hasil diskon bertingkat, voucher, dan cashback.
 *
 * @param {Object} input
 * @param {number} input.originalPrice - Harga awal
 * @param {number} input.primaryDiscount - Diskon pertama dalam persen (0-100)
 * @param {number} input.secondaryDiscount - Diskon kedua dalam persen (0-100)
 * @param {number} input.voucherCut - Potongan voucher nominal (>=0)
 * @param {number} input.cashbackPercent - Cashback dalam persen (0-100)
 * @param {number} input.cashbackCap - Batas maksimal cashback (>=0, 0 = tidak dibatasi)
 * @returns {DiscountResult} Rincian hasil kalkulasi
 */
export function calculateDiscount({
  originalPrice,
  primaryDiscount,
  secondaryDiscount,
  voucherCut,
  cashbackPercent,
  cashbackCap,
}) {
  // Diskon bertingkat diterapkan berurutan, bukan dengan menjumlahkan persen.
  const priceAfterPrimary = originalPrice * (1 - primaryDiscount / 100);
  const priceAfterSecondary = priceAfterPrimary * (1 - secondaryDiscount / 100);
  const discountAmount = originalPrice - priceAfterSecondary;
  // Voucher tidak boleh membuat harga akhir menjadi negatif.
  const priceAfterVoucher = Math.max(0, priceAfterSecondary - voucherCut);
  const voucherSavings = Math.max(0, priceAfterSecondary - priceAfterVoucher);
  // Cashback dihitung dari harga setelah voucher
  const uncappedCashback = priceAfterVoucher * (cashbackPercent / 100);
  const cashbackSavings =
    cashbackCap > 0
      ? Math.min(uncappedCashback, cashbackCap)
      : uncappedCashback;
  const finalPrice = priceAfterVoucher;
  const totalSavings = discountAmount + voucherSavings + cashbackSavings;
  const effectiveDiscount =
    originalPrice > 0 ? (totalSavings / originalPrice) * 100 : 0;
  const paymentRatio =
    originalPrice > 0 ? (finalPrice / originalPrice) * 100 : 100;

  return {
    finalPrice,
    totalSavings,
    discountAmount,
    voucherSavings,
    cashbackSavings,
    effectiveDiscount,
    cashback: cashbackSavings, // alias untuk kompatibilitas
    paymentRatio,
    savingsRatio: Math.max(0, 100 - paymentRatio),
    mode: "stacked",
  };
}

/**
 * Menghitung promosi diskon + cashback atau beli X gratis Y.
 *
 * @param {Object} input
 * @param {"stacked"|"cashback"|"bogo"} input.mode - Mode promosi
 * @param {number} input.originalPrice - Harga awal atau harga per unit
 * @param {number} [input.primaryDiscount=0] - Diskon utama dalam persen (0-100)
 * @param {number} [input.secondaryDiscount=0] - Diskon kedua dalam persen (0-100)
 * @param {number} [input.voucherCut=0] - Potongan voucher nominal (>=0)
 * @param {number} [input.cashbackPercent=0] - Cashback dalam persen (0-100)
 * @param {number} [input.cashbackCap=0] - Batas maksimal cashback (>=0, 0 = tidak dibatasi)
 * @param {number} [input.buyQuantity=1] - Jumlah unit yang dibayar pada BOGO
 * @param {number} [input.freeQuantity=1] - Jumlah unit gratis pada BOGO
 * @param {number} [input.quantity=1] - Jumlah unit yang dibeli pada BOGO
 * @returns {DiscountResult} Rincian hasil promosi
 */
export function calculatePromotion({
  mode,
  originalPrice,
  primaryDiscount = 0,
  secondaryDiscount = 0,
  voucherCut = 0,
  cashbackPercent = 0,
  cashbackCap = 0,
  buyQuantity = 1,
  freeQuantity = 1,
  quantity = 1,
}) {
  if (mode === "cashback") {
    // Mode cashback: diskon utama + diskon kedua + voucher + cashback
    const priceAfterPrimary = originalPrice * (1 - primaryDiscount / 100);
    const priceAfterSecondary =
      priceAfterPrimary * (1 - secondaryDiscount / 100);
    const discountAmount = originalPrice - priceAfterSecondary;
    const priceAfterVoucher = Math.max(0, priceAfterSecondary - voucherCut);
    const voucherSavings = Math.max(0, priceAfterSecondary - priceAfterVoucher);
    const uncappedCashback = priceAfterVoucher * (cashbackPercent / 100);
    const cashbackSavings =
      cashbackCap > 0
        ? Math.min(uncappedCashback, cashbackCap)
        : uncappedCashback;
    const finalPrice = priceAfterVoucher;
    const totalSavings = discountAmount + voucherSavings + cashbackSavings;
    const effectiveDiscount =
      originalPrice > 0 ? (totalSavings / originalPrice) * 100 : 0;
    const paymentRatio =
      originalPrice > 0 ? (finalPrice / originalPrice) * 100 : 100;

    return {
      finalPrice,
      totalSavings,
      discountAmount,
      voucherSavings,
      cashbackSavings,
      effectiveDiscount,
      cashback: cashbackSavings,
      paymentRatio,
      savingsRatio: Math.max(0, 100 - paymentRatio),
      mode,
    };
  }

  if (mode === "bogo") {
    const groupSize = buyQuantity + freeQuantity;
    const completeGroups = Math.floor(quantity / groupSize);
    const remainder = quantity % groupSize;
    const paidUnits =
      completeGroups * buyQuantity + Math.min(remainder, buyQuantity);
    const freeUnits = Math.max(0, quantity - paidUnits);
    const finalPrice = paidUnits * originalPrice;
    const totalValue = quantity * originalPrice;
    const totalSavings = freeUnits * originalPrice;
    const effectiveDiscount =
      totalValue > 0 ? (totalSavings / totalValue) * 100 : 0;
    const paymentRatio = totalValue > 0 ? (finalPrice / totalValue) * 100 : 100;

    return {
      finalPrice,
      totalSavings,
      discountAmount: totalSavings,
      voucherSavings: 0,
      cashbackSavings: 0,
      effectiveDiscount,
      cashback: 0,
      paymentRatio,
      savingsRatio: Math.max(0, 100 - paymentRatio),
      paidUnits,
      freeUnits,
      mode,
    };
  }

  // mode === "stacked"
  return {
    ...calculateDiscount({
      originalPrice,
      primaryDiscount,
      secondaryDiscount,
      voucherCut,
      cashbackPercent,
      cashbackCap,
    }),
    mode: "stacked",
  };
}

/**
 * Membatasi input persentase ke rentang 0 sampai 100.
 *
 * @param {string|number} value - Nilai mentah
 * @returns {number} Nilai persen yang aman
 */
export function clampPercentage(value) {
  // Input kosong, NaN, dan angka di luar rentang dipaksa ke nilai aman.
  return Math.min(100, Math.max(0, Number(value) || 0));
}

/**
 * Memformat angka sebagai mata uang Rupiah.
 *
 * @param {number} amount - Nilai nominal
 * @returns {string} Nominal terformat tanpa prefix mata uang
 */
export function formatRupiah(amount) {
  // Pemformatan dipusatkan agar semua output memakai locale Indonesia.
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
