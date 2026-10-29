"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MdArrowForward,
  MdGavel,
  MdLockOpen,
  MdNoAccounts,
  MdVerifiedUser,
} from "react-icons/md";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BmiCompactCalculator } from "@/components/calculators/bmi/BmiCompactCalculator";
import { ConversionCompactCalculator } from "@/components/calculators/conversion/ConversionCompactCalculator";
import { MathCompactCalculator } from "@/components/calculators/math/MathCompactCalculator";
import { DiscountCompactCalculator } from "@/components/calculators/discount/DiscountCompactCalculator";
import { GpaCompactCalculator } from "@/components/calculators/education/GpaCompactCalculator";
import { TdeeCompactCalculator } from "@/components/calculators/tdee/TdeeCompactCalculator";
import { CalculatorCard } from "@/components/ui/catalog/CalculatorCard";
import { CategoryTabs } from "@/components/ui/catalog/CategoryTabs";
import { EmptyState } from "@/components/ui/feedback/EmptyState";
import { SearchInput } from "@/components/ui/navigation/SearchInput";
import { calculators, categories } from "@/data/calculators";
import { useTheme } from "@/hooks/useTheme";
import { useSearchShortcut } from "@/hooks/useSearchShortcut";

const COMPACT_CALCULATORS = [
  { key: "bmi", component: BmiCompactCalculator },
  { key: "gpa", component: GpaCompactCalculator },
  { key: "tdee", component: TdeeCompactCalculator },
  { key: "discount", component: DiscountCompactCalculator },
  { key: "conversion", component: ConversionCompactCalculator },
  { key: "math", component: MathCompactCalculator },
];

function getTodaysCalculatorIndex() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24),
  );
  return dayOfYear % COMPACT_CALCULATORS.length;
}

export default function Home() {
  // State pencarian dan kategori bersifat lokal karena hanya digunakan oleh katalog pada halaman beranda.
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { darkMode, toggleTheme } = useTheme();
  const searchRef = useRef(null);

  // Shortcut global Ctrl/Cmd+K → fokus ke input pencarian.
  useSearchShortcut(searchRef);

  // Sinkronkan kategori dari tautan header, termasuk navigasi Back/Forward.
  useEffect(() => {
    const syncCategoryFromUrl = () => {
      const requestedCategory = new URLSearchParams(window.location.search).get(
        "category",
      );
      const isValidCategory = categories.some(
        (category) => category.id === requestedCategory,
      );

      setActiveCategory(isValidCategory ? requestedCategory : "all");
    };

    syncCategoryFromUrl();
    window.addEventListener("popstate", syncCategoryFromUrl);
    return () => window.removeEventListener("popstate", syncCategoryFromUrl);
  }, []);

  // Tentukan calculator compact hari ini (rotasi harian deterministik).
  const todaysIndex = getTodaysCalculatorIndex();
  const TodaysCompactCalculator = COMPACT_CALCULATORS[todaysIndex].component;

  // Filter berdasarkan kategori dan seluruh teks yang dapat dicari.
  const filteredCalculators = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return calculators.filter((calculator) => {
      const matchesCategory =
        activeCategory === "all" || calculator.category === activeCategory;
      const searchableText =
        `${calculator.title} ${calculator.description} ${calculator.keywords}`.toLowerCase();
      return (
        matchesCategory &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });
  }, [activeCategory, query]);

  // Pilih kategori lalu gulir ke tab, bukan ke katalog, agar navbar fixed tidak menutupi kontrol filter.
  const selectCategory = (category) => {
    setActiveCategory(category);
    const categoriesEl = document.getElementById("categories");
    if (categoriesEl) {
      categoriesEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-surface text-text">
      {/* Header dan Footer dipakai ulang agar struktur layout konsisten antar halaman. */}
      <Header
        activeCategory={activeCategory}
        darkMode={darkMode}
        onSelectCategory={(category) => {
          setQuery("");
          selectCategory(category);
        }}
        onToggleTheme={toggleTheme}
      />

      <main className="pt-16" id="top">
        <section className="border-b border-border bg-canvas">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 pb-12 pt-12 text-center sm:pt-16 md:px-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface-teal px-3 py-1 text-xs font-medium uppercase tracking-[0.06em] text-accent-text">
              Kalkulator praktis dalam satu platform
            </div>
            <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.02em] text-text sm:text-[34px]">
              Kalkulator untuk semua kebutuhanmu.
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
              Hitung cicilan KPR, pajak, zakat, kalori, hingga konversi satuan
              secara akurat dan cepat.
            </p>
            <div className="relative mt-8 w-full max-w-2xl">
              <SearchInput
                ariaLabel="Cari kalkulator dari beranda"
                className="h-14 w-full rounded-[var(--radius-lg)] border border-border bg-canvas pl-12 pr-20 text-[15px] text-text outline-none shadow-xs transition-all placeholder:text-text-muted focus:border-accent focus:bg-surface-teal focus:shadow-sm"
                inputRef={searchRef}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari kalkulator (misal: Standar, BMI, Diskon, IPK, Konversi)"
                value={query}
              />
              <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded bg-surface px-2 py-1 text-xs text-text-muted sm:block">
                <kbd className="font-mono">Ctrl</kbd> +{" "}
                <kbd className="font-mono">K</kbd>
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1200px] px-5 pb-16 md:px-10">
          {/* CategoryTabs hanya menerima data dan callback; state tetap dimiliki halaman. */}
          <CategoryTabs
            activeCategory={activeCategory}
            categories={categories}
            onSelect={selectCategory}
          />

          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-12">
            <section className="flex min-w-0 flex-col lg:col-span-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-medium text-text">
                    Katalog Kalkulator
                  </h2>
                  <span className="rounded bg-canvas px-2 py-0.5 font-mono text-xs text-text-muted">
                    {filteredCalculators.length} alat tersedia
                  </span>
                </div>
              </div>
              {/* EmptyState ditampilkan ketika kombinasi query dan kategori tidak menghasilkan item. */}
              {filteredCalculators.length > 0 ? (
                <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
                  {filteredCalculators.map((calculator) => (
                    <CalculatorCard
                      calculator={calculator}
                      key={calculator.title}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  onReset={() => {
                    setQuery("");
                    setActiveCategory("all");
                  }}
                  query={query}
                />
              )}
            </section>

            <aside
              className="flex min-w-0 flex-col gap-5 lg:sticky lg:top-20 lg:col-span-4"
              aria-label="Alat cepat"
            >
              <TodaysCompactCalculator />
              <div className="rounded-[var(--radius-md)] bg-canvas p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <MdVerifiedUser
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-xl text-accent"
                  />
                  <div>
                    <h3 className="mb-1 text-base font-medium text-text">
                      Privasi matematika 100%
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                      Seluruh komputasi berjalan di sisi peramban tanpa
                      menyimpan data finansial atau pribadi Anda di server.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-16 border-t border-border pt-12" id="about">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.06em] text-accent">
                Standar komputasi
              </span>
              <h2 className="text-xl font-medium text-text">
                Kenapa mengandalkan MyCalc?
              </h2>
              <p className="mt-2 text-[15px] text-text-muted">
                Dibangun dengan filosofi esensial: kecepatan komputasi, akurasi
                formula lokal, dan kenyamanan tanpa gangguan.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                [
                  MdLockOpen,
                  "Tanpa registrasi akun",
                  "Gunakan langsung seluruh simulator tanpa perlu memasukkan email, nomor telepon, maupun kata sandi rumit.",
                  "Akses langsung",
                ],
                [
                  MdGavel,
                  "Formula standar",
                  "Disesuaikan dengan regulasi lokal aktif, standar BAZNAS RI, dan kurva gizi Kemenkes RI.",
                  "Regulasi terverifikasi",
                ],
                [
                  MdNoAccounts,
                  "100% bebas iklan",
                  "Tidak ada spanduk, pop-up video, atau pelacak pihak ketiga yang mengganggu pekerjaan Anda.",
                  "Performa murni",
                ],
              ].map(([Icon, title, description, label]) => (
                <article
                  className="rounded-[var(--radius-md)] bg-canvas p-6 shadow-xs"
                  key={title}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-surface-teal text-accent">
                    <Icon aria-hidden="true" className="text-xl" />
                  </div>
                  <h3 className="mb-2 text-base font-medium text-text">
                    {title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-text-muted">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent">
                    {label}
                    <MdArrowForward aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
