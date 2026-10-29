"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MathCalculator } from "@/components/calculators/math/MathCalculator";
import { DocumentationSection } from "@/components/ui/documentation/DocumentationSection";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { PageHeader } from "@/components/ui/navigation/PageHeader";
import { RelatedCalculators } from "@/components/ui/catalog/RelatedCalculators";
import { useTheme } from "@/hooks/useTheme";

export function MathPage() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface text-text">
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />
      <main className="pt-16">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-8 md:px-10">
          <Breadcrumbs category="Matematika & Geometri" />
          <PageHeader
            badge="Standar Aritmatika Presisi Tinggi (IEEE 754)"
            description="Hitung operasi aritmatika harian, persentase, pangkat, akar, kurung, serta riwayat perhitungan presisi tinggi tanpa latensi."
            title="Kalkulator Standar & Matematika"
          />
          <MathCalculator />
          <DocumentationSection
            description="Kalkulator standar MyCalc mengimplementasikan evaluasi ekspresi berbasis Shunting-yard algorithm dengan presisi IEEE 754, mendukung urutan operasi standar (PEMDAS), pangkat, akar, persentase, dan kurung."
            id="math-method-title"
            items={[
              {
                number: "01",
                title: "Hierarki Operasi (PEMDAS / BODMAS)",
                description:
                  "Ekspresi dievaluasi secara bertingkat: Parentheses (Kurung), Exponents (Pangkat/Akar), Multiplication/Division (Kiri ke Kanan), dan diakhiri dengan Addition/Subtraction.",
                formula: "a + b × c = a + (b × c)",
              },
              {
                number: "02",
                title: "Pangkat, Akar & Persentase",
                description:
                  "Mendukung pangkat (^), akar kuadrat melalui pangkat 0.5, persentase (%), serta tanda kurung untuk pengelompokan ekspresi.",
                formula: "x^y, √x = x^0.5, a + b%",
              },
              {
                number: "03",
                title: "Memori & Riwayat",
                description:
                  "Register memori (MC, MR, M+, M-, MS) dan riwayat komputasi hingga 50 entri terakhir yang dapat dipilih untuk melanjutkan perhitungan.",
                formula: "MC, MR, M+, M-, MS",
              },
            ]}
          />
          <RelatedCalculators currentSlug="matematika" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
