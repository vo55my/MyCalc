import { ConversionPage } from "@/components/pages/ConversionPage";
import Script from 'next/script';

export const metadata = {
  title: "Kalkulator Konversi Satuan & Suhu Presisi | MyCalc",
  description:
    "Konversi instan dan presisi antar satuan panjang, berat/massa, suhu, luas, volume, waktu, kecepatan, hingga penyimpanan digital. Standar SI & Imperial dengan presisi floating-point 64-bit.",
  openGraph: {
    title: "Kalkulator Konversi Satuan & Suhu Presisi | MyCalc",
    description:
      "Konversi instan dan presisi antar satuan panjang, berat/massa, suhu, luas, volume, waktu, kecepatan, hingga penyimpanan digital. Standar SI & Imperial dengan presisi floating-point 64-bit.",
    type: "website",
    locale: "id_ID",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kalkulator Konversi Satuan & Suhu Presisi | MyCalc",
  url: "https://mycalc.id/kalkulator/konversi",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
  },
};

export default function ConversionPageRoute() {
  return (
    <>
      <Script
        id="json-ld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ConversionPage />
    </>
  );
}
