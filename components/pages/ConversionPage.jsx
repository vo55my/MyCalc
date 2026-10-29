"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ConversionCalculator } from "@/components/calculators/conversion/ConversionCalculator";
import { DocumentationSection } from "@/components/ui/documentation/DocumentationSection";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { PageHeader } from "@/components/ui/navigation/PageHeader";
import { RelatedCalculators } from "@/components/ui/catalog/RelatedCalculators";
import { useTheme } from "@/hooks/useTheme";

export function ConversionPage() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface text-text">
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />
      <main className="pt-16">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-8 md:px-10">
          <Breadcrumbs category="Konversi & Sains" />
          <PageHeader
            badge="Standar Sistem Internasional (SI) & Imperial"
            description="Konversi instan dan presisi antar satuan panjang, berat/massa, suhu, luas, volume, waktu, kecepatan, hingga penyimpanan digital secara real-time."
            title="Kalkulator Konversi Satuan"
          />
          {/* Komponen client menangani input, kalkulasi, hasil, salin, dan bagikan. */}
          <ConversionCalculator />
          <DocumentationSection
            description="Konversi satuan MyCalc mengimplementasikan standar SI (Sistem Internasional) dan Imperial dengan presisi floating-point 64-bit, mendukung satuan lokal Indonesia serta rumus suhu non-linear."
            id="conversion-method-title"
            items={[
              {
                number: "01",
                title: "Sistem Internasional (SI)",
                description:
                  "Dasar konversi berbasis meter (panjang), kilogram (massa), kelvin (suhu), detik (waktu) dengan faktor skalar ten-to-the-power. Presisi hingga 15 digit signifikan.",
                formula: "1 km = 1000 m\n1 m = 100 cm\n1 kg = 1000 g",
              },
              {
                number: "02",
                title: "Sistem Imperial & US Customary",
                description:
                  "Konversi ke satuan kaki, inci, mil, pound, ons, galon, dll dengan faktor definisi exact (e.g., 1 in = 2.54 cm exact, 1 lb = 0.45359237 kg exact).",
                formula:
                  "1 ft = 0.3048 m (exact)\n1 mi = 1609.344 m (exact)\n1 lb = 0.45359237 kg (exact)",
              },
              {
                number: "03",
                title: "Suhu Non-Linear & Floating Point",
                description:
                  "Konversi suhu menggunakan rumus aljabar (offset + skalar), bukan faktor skalar murni. Presisi IEEE 754 double mencegah akumulasi error pada rantai konversi.",
                formula:
                  "°C = (°F - 32) × 5/9\n°F = °C × 9/5 + 32\nK = °C + 273.15\n°Re = °C × 4/5",
              },
            ]}
          />
          <RelatedCalculators currentSlug="konversi" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
