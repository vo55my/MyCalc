"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GpaCalculator } from "@/components/calculators/education/GpaCalculator";
import { DocumentationSection } from "@/components/ui/documentation/DocumentationSection";
import { RelatedCalculators } from "@/components/ui/catalog/RelatedCalculators";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { PageHeader } from "@/components/ui/navigation/PageHeader";
import { useTheme } from "@/hooks/useTheme";

export function GpaPage() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface text-text">
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />
      <main className="pt-16">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-8 md:px-10">
          <Breadcrumbs category="Pendidikan & Akademik" />
          <PageHeader
            badge="Simulasi IPS & IPK dengan skala 4.00"
            description="Hitung IPS semester dan estimasi IPK kumulatif berdasarkan bobot nilai dan SKS. Tambahkan riwayat semester, uji target akademik, atau lihat contoh konversi nilai."
            title="Kalkulator Nilai Rata-rata & IPK"
          />
          <GpaCalculator />
          <DocumentationSection
            description="Kalkulator mengalikan bobot nilai dengan SKS untuk memperoleh poin mutu. IPS dihitung untuk semester berjalan, sedangkan IPK menggabungkan poin dan SKS sebelumnya yang dimasukkan pengguna."
            id="gpa-method-title"
            items={[
              {
                number: "01",
                title: "IPS semester",
                description:
                  "Jumlah poin mutu semester dibagi jumlah SKS pada mata kuliah yang dimasukkan.",
                formula: "IPS = Σ (SKS × bobot nilai) / Σ SKS",
              },
              {
                number: "02",
                title: "IPK kumulatif",
                description:
                  "Perhitungan menggabungkan poin mutu sebelumnya dan semester berjalan, lalu membaginya dengan total SKS.",
                formula: "IPK = (poin lalu + poin semester) / total SKS",
              },
              {
                number: "03",
                title: "Proyeksi target",
                description:
                  "Bobot rata-rata yang dibutuhkan dihitung dari target poin mutu dikurangi poin yang sudah diperoleh, dibagi SKS tersisa.",
                formula:
                  "Bobot perlu = (target IPK × target SKS − poin saat ini) / SKS tersisa",
              },
            ]}
          />
          <RelatedCalculators currentSlug="ipk" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
