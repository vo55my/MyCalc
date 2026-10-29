"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BmiCalculator } from "@/components/calculators/bmi/BmiCalculator";
import { DocumentationSection } from "@/components/ui/documentation/DocumentationSection";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { PageHeader } from "@/components/ui/navigation/PageHeader";
import { RelatedCalculators } from "@/components/ui/catalog/RelatedCalculators";
import { useTheme } from "@/hooks/useTheme";

export function BmiPage() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface text-text">
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />
      <main className="pt-16">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-8 md:px-10">
          <Breadcrumbs category="Kesehatan & Kebugaran" />
          <PageHeader
            badge="Standar Kemenkes RI & WHO Asia-Pasifik"
            description="Hitung Indeks Massa Tubuh, klasifikasi berat badan, berat ideal Broca, serta kebutuhan kalori harian dasar secara presisi."
            title="Kalkulator BMI & Berat Badan Ideal"
          />
          <BmiCalculator />
          <DocumentationSection
            description="BMI membandingkan berat badan dengan kuadrat tinggi badan. Hasilnya kemudian dibaca menggunakan ambang Asia-Pasifik untuk memberikan konteks awal status nutrisi."
            id="bmi-method-title"
            items={[
              {
                number: "01",
                title: "Formula IMT / BMI",
                description:
                  "Perhitungan antropometri standar yang membandingkan massa tubuh dalam kilogram terhadap kuadrat tinggi badan dalam meter. Digunakan global untuk klasifikasi status nutrisi awal secara non-invasif.",
                formula: "BMI = Berat (kg) / [Tinggi (m)]²",
              },
              {
                number: "02",
                title: "Berat ideal Broca",
                description:
                  "Rumus Dr. Pierre Paul Broca yang telah disesuaikan untuk karakteristik antropometri masyarakat Indonesia. Berlaku bagi tinggi badan pria ≥ 160 cm dan wanita ≥ 150 cm.",
                formula:
                  "Pria: (Tinggi - 100) - 10%\nWanita: (Tinggi - 100) - 15%",
              },
              {
                number: "03",
                title: "Klasifikasi Asia-Pasifik",
                description:
                  "Batasan kategori berat badan yang digunakan oleh WHO untuk populasi Asia-Pasifik, berbeda dengan standar global:",
                formula:
                  "Kurang < 18.5\nNormal 18.5 - 22.9\nLebih 23.0 - 24.9\nObesitas >= 25",
              },
            ]}
          />
          <RelatedCalculators currentSlug="bmi" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
