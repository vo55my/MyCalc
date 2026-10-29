import { MathPage } from "@/components/pages/MathPage";
import Script from 'next/script';

export const metadata = {
  title: "Kalkulator Standar & Matematika — MyCalc",
  description:
    "Hitung operasi aritmatika, persentase, eksponen, fungsi saintifik, pecahan, dan riwayat perhitungan matematika presisi tinggi (IEEE 754).",
  openGraph: {
    title: "Kalkulator Standar & Matematika — MyCalc",
    description:
      "Hitung operasi aritmatika, persentase, eksponen, fungsi saintifik, pecahan, dan riwayat perhitungan matematika presisi tinggi (IEEE 754).",
    type: "website",
    locale: "id_ID",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kalkulator Standar & Matematika — MyCalc",
  url: "https://mycalc.id/kalkulator/matematika",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
  },
};

export default function MathPageRoute() {
  return (
    <>
      <Script
        id="json-ld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <MathPage />
    </>
  );
}
