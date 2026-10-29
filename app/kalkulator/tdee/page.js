import { TdeePage } from "@/components/pages/TdeePage";
import Script from 'next/script';

export const metadata = {
  title: "Kalkulator Kalori Harian (BMR & TDEE) — MyCalc",
  description:
    "Estimasi BMR dan kebutuhan kalori harian (TDEE) berdasarkan usia, jenis kelamin, tinggi, berat, dan tingkat aktivitas.",
  openGraph: {
    title: "Kalkulator Kalori Harian (BMR & TDEE) — MyCalc",
    description:
      "Estimasi BMR dan kebutuhan kalori harian (TDEE) berdasarkan usia, jenis kelamin, tinggi, berat, dan tingkat aktivitas.",
    type: "website",
    locale: "id_ID",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kalkulator Kalori Harian (BMR & TDEE) — MyCalc",
  url: "https://mycalc.id/kalkulator/tdee",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
  },
};

export default function TdeePageRoute() {
  return (
    <>
      <Script
        id="json-ld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <TdeePage />
    </>
  );
}
