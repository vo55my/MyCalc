import {
  MdCalculate,
  MdLocalFireDepartment,
  MdMonitorWeight,
  MdSchool,
  MdShoppingBag,
  MdSyncAlt,
} from "react-icons/md";

export const calculators = [
  {
    slug: "matematika",
    href: "/kalkulator/matematika",
    title: "Kalkulator Standar & Matematika",
    category: "umum",
    categoryLabel: "Umum",
    description:
      "Operasi aritmatika, persentase, eksponen, fungsi saintifik, pecahan, dan riwayat perhitungan presisi tinggi (IEEE 754).",
    keywords:
      "kalkulator matematika aritmatika standar persen akar eksponen saintifik pecahan konversi",
    icon: MdCalculate,
    badge: "Presisi tinggi",
  },
  {
    slug: "bmi",
    href: "/kalkulator/bmi",
    title: "Kalkulator BMI & Berat Ideal",
    category: "kesehatan",
    categoryLabel: "Kesehatan",
    description:
      "Cek indeks massa tubuh standar Kemenkes/WHO dan rekomendasi kalori harian.",
    keywords:
      "bmi indeks massa tubuh berat badan ideal tinggi gizi kemenkes who diet",
    icon: MdMonitorWeight,
    badge: "WHO Standar",
  },
  {
    slug: "diskon",
    href: "/kalkulator/diskon",
    title: "Kalkulator Diskon & Cashback",
    category: "umum",
    categoryLabel: "Umum",
    description:
      "Hitung harga akhir diskon bertingkat beserta penghematan belanja.",
    keywords:
      "diskon cashback belanja sale potongan persen bertingkat promo hemat",
    icon: MdShoppingBag,
    badge: "Instan",
  },
  {
    slug: "konversi",
    href: "/kalkulator/konversi",
    title: "Kalkulator Konversi Satuan & Suhu Presisi",
    category: "teknik",
    categoryLabel: "Teknik & Konversi",
    description:
      "Konversi instan dan presisi antar satuan panjang, berat/massa, suhu, luas, volume, waktu, kecepatan, hingga penyimpanan digital. Standar SI & Imperial dengan presisi floating-point 64-bit.",
    keywords:
      "konversi satuan suhu panjang berat meter hektar luas celsius fahrenheit konversi volume waktu kecepatan digital",
    icon: MdSyncAlt,
  },
  {
    slug: "ipk",
    href: "/kalkulator/ipk",
    title: "Kalkulator Nilai Rata-rata & IPK",
    category: "pendidikan",
    categoryLabel: "Pendidikan",
    description:
      "Hitung IPK semester dan kumulatif mahasiswa dengan sistem bobot SKS terpadu.",
    keywords:
      "ipk nilai mutu sks semester kuliah universitas transkrip mahasiswa",
    icon: MdSchool,
    badge: "Simulasi IPS & IPK",
  },
  {
    slug: "tdee",
    href: "/kalkulator/tdee",
    title: "Kalkulator Kalori (BMR & TDEE)",
    category: "kesehatan",
    categoryLabel: "Kesehatan",
    description:
      "Estimasi BMR dan kebutuhan kalori harian (TDEE) berdasarkan usia, jenis kelamin, tinggi, berat, dan intensitas aktivitas.",
    keywords:
      "kalori bmr tdee energi harian mifflin st jeor harris benedict aktivitas",
    icon: MdLocalFireDepartment,
    badge: "Estimasi BMR & TDEE",
  },
];

export const categories = [
  { id: "all", label: "Semua" },
  { id: "umum", label: "Umum" },
  { id: "keuangan", label: "Keuangan" },
  { id: "kesehatan", label: "Kesehatan" },
  { id: "bisnis", label: "Bisnis & Pajak" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "teknik", label: "Teknik & Konversi" },
].map((category) => ({
  ...category,
  count:
    category.id === "all"
      ? calculators.length
      : calculators.filter((calculator) => calculator.category === category.id)
          .length,
}));
