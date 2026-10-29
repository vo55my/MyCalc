import { BmiPage } from "@/components/pages/BmiPage";
import Script from "next/script";

export const metadata = {
  title: "Kalkulator BMI & Berat Badan Ideal — MyCalc",
  description:
    "Hitung BMI, klasifikasi berat badan Asia-Pasifik, berat ideal Broca, BMR, dan TDEE secara cepat dan akurat.",
  openGraph: {
    title: "Kalkulator BMI & Berat Badan Ideal — MyCalc",
    description:
      "Hitung BMI, klasifikasi berat badan Asia-Pasifik, berat ideal Broca, BMR, dan TDEE secara cepat dan akurat.",
    type: "website",
    locale: "id_ID",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kalkulator BMI & Berat Badan Ideal — MyCalc",
  url: "https://mycalc.id/kalkulator/bmi",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0" },
};

export default function BmiPageRoute() {
  return (
    <>
      <Script
        id="json-ld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <BmiPage />
    </>
  );
}
