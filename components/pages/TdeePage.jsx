"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TdeeCalculator } from "@/components/calculators/tdee/TdeeCalculator";
import { DocumentationSection } from "@/components/ui/documentation/DocumentationSection";
import { RelatedCalculators } from "@/components/ui/catalog/RelatedCalculators";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { PageHeader } from "@/components/ui/navigation/PageHeader";
import { useTheme } from "@/hooks/useTheme";

export function TdeePage() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface text-text">
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />
      <main className="pt-16">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-8 md:px-10">
          <Breadcrumbs category="Kesehatan & Kebugaran" />
          <PageHeader
            badge="Estimasi BMR & TDEE"
            description="Perkirakan kebutuhan energi harian berdasarkan usia, jenis kelamin yang digunakan formula, berat badan, tinggi badan, dan tingkat aktivitas. Hasil merupakan estimasi umum, bukan saran medis."
            title="Kalkulator Kalori (BMR & TDEE)"
          />
          <TdeeCalculator />
          <DocumentationSection
            description="Kalkulator memperkirakan BMR dengan persamaan Mifflin–St Jeor atau Harris–Benedict revisi, lalu mengalikan hasilnya dengan faktor aktivitas yang dipilih. Persamaan populasi tidak menggantikan pengukuran klinis."
            id="tdee-methodology"
            items={[
              {
                number: "01",
                title: "Mifflin–St Jeor",
                description:
                  "Persamaan menggunakan berat, tinggi, usia, dan variabel jenis kelamin untuk memperkirakan energi basal saat istirahat.",
                formula:
                  "Pria: 10W + 6.25H − 5A + 5\nWanita: 10W + 6.25H − 5A − 161",
              },
              {
                number: "02",
                title: "Harris–Benedict revisi",
                description:
                  "Persamaan alternatif untuk estimasi BMR. Perbedaan formula dapat menghasilkan angka yang berbeda untuk data yang sama.",
                formula:
                  "Pria: 88.362 + 13.397W + 4.799H − 5.677A\nWanita: 447.593 + 9.247W + 3.098H − 4.330A",
              },
              {
                number: "03",
                title: "Faktor aktivitas",
                description:
                  "TDEE diperkirakan dengan mengalikan BMR dengan faktor aktivitas. Pilihan PAL adalah pendekatan kasar terhadap aktivitas rata-rata.",
                formula: "TDEE ≈ BMR × PAL",
              },
            ]}
          />
          <RelatedCalculators currentSlug="tdee" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
