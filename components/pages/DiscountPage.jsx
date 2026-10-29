"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DiscountCalculator } from "@/components/calculators/discount/DiscountCalculator";
import { DocumentationSection } from "@/components/ui/documentation/DocumentationSection";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { PageHeader } from "@/components/ui/navigation/PageHeader";
import { RelatedCalculators } from "@/components/ui/catalog/RelatedCalculators";
import { useTheme } from "@/hooks/useTheme";

export function DiscountPage() {
  // Header detail memakai state lokal sendiri; state tidak dibagi antar route.
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface text-text">
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />
      <main className="pt-16">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-8 md:px-10">
          <Breadcrumbs category="Umum" />
          <PageHeader
            badge="Kalkulator belanja & promosi"
            description="Hitung harga akhir, diskon bertingkat, voucher, cashback, dan total penghematan tanpa salah memperkirakan harga di kasir."
            title="Kalkulator Diskon Instan"
          />
          {/* Komponen client menangani input, kalkulasi, hasil, salin, dan bagikan. */}
          <DiscountCalculator />
          <DocumentationSection
            description="Kalkulator ini menghitung harga yang harus dibayar dari harga awal, diskon persentase, diskon kedua, voucher nominal, dan cashback. Setiap komponen promosi dihitung dalam urutan yang jelas agar penghematan tidak disalahartikan sebagai penjumlahan persentase biasa."
            id="discount-method-title"
            items={[
              {
                number: "01",
                title: "Diskon persentase pertama",
                description:
                  "Diskon pertama dihitung dari harga asli. Nilai potongannya adalah harga awal dikalikan persentase diskon, kemudian dikurangkan dari harga awal untuk memperoleh harga setelah diskon pertama.",
                formula:
                  "Potongan 1 = Harga awal × (D1 / 100)\nH1 = Harga awal - Potongan 1",
              },
              {
                number: "02",
                title: "Diskon bertingkat dan voucher",
                description:
                  "Diskon kedua diterapkan pada H1, bukan pada harga awal. Setelah itu voucher nominal dikurangkan dari hasil diskon. Karena setiap diskon memakai dasar yang berbeda, diskon 50% + 20% menghasilkan diskon efektif 60%, bukan 70%.",
                formula:
                  "H2 = H1 × (1 - D2 / 100)\nHarga akhir = max(0, H2 - Voucher)",
              },
              {
                number: "03",
                title: "Penghematan, cashback, dan batas maksimum",
                description:
                  "Total penghematan memisahkan potongan langsung dan cashback. Cashback dihitung dari harga akhir setelah diskon dan voucher, lalu dibatasi oleh plafon apabila batas maksimum diisi. Cashback adalah estimasi manfaat promosi, bukan pengurang harga yang dibayar di kasir.",
                formula:
                  "Diskon efektif = 1 - (H2 / Harga awal)\nCashback = min(Harga akhir × C / 100, Batas cashback)\nTotal manfaat = Penghematan langsung + Cashback",
              },
            ]}
          />
          <RelatedCalculators currentSlug="diskon" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
