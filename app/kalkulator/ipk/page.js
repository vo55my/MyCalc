import { GpaPage } from "@/components/pages/GpaPage";
import Script from 'next/script';

export const metadata = {
  title: "Kalkulator Nilai Rata-rata & IPK — MyCalc",
  description:
    "Hitung IPS semester, estimasi IPK kumulatif, proyeksi target, dan contoh konversi nilai berdasarkan bobot SKS.",
  openGraph: {
    title: "Kalkulator Nilai Rata-rata & IPK — MyCalc",
    description:
      "Hitung IPS semester, estimasi IPK kumulatif, proyeksi target, dan contoh konversi nilai berdasarkan bobot SKS.",
    type: "website",
    locale: "id_ID",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kalkulator Nilai Rata-rata & IPK — MyCalc",
  url: "https://mycalc.id/kalkulator/ipk",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
  },
};

export default function GpaPageRoute() {
  return (
    <>
      <Script
        id="json-ld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <GpaPage />
    </>
  );
}
