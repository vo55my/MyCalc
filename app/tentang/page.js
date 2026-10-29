import { AboutPage } from "@/components/pages/AboutPage";
import Script from "next/script";

export const metadata = {
  title: "Tentang MyCalc — Kalkulator Praktis dan Presisi",
  description:
    "Kenali MyCalc, platform kalkulator praktis yang mengutamakan kemudahan akses, transparansi rumus, privasi, dan pengalaman responsif.",
  openGraph: {
    title: "Tentang MyCalc — Kalkulator Praktis dan Presisi",
    description:
      "Kenali prinsip produk, pendekatan, dan kalkulator yang tersedia di MyCalc.",
    type: "website",
    locale: "id_ID",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Tentang MyCalc",
  description:
    "Tentang prinsip produk MyCalc: kalkulator yang praktis, mudah dipahami, dan dapat digunakan tanpa akun.",
  url: "https://mycalc.id/tentang",
  isPartOf: {
    "@type": "WebSite",
    name: "MyCalc",
    url: "https://mycalc.id",
  },
};

export default function AboutPageRoute() {
  return (
    <>
      <Script
        id="json-ld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <AboutPage />
    </>
  );
}
