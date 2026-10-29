import { DiscountPage } from "@/components/pages/DiscountPage";
import Script from 'next/script';

export const metadata = {
  title: "Kalkulator Diskon Instan — MyCalc",
  description:
    "Hitung harga akhir, diskon bertingkat, voucher, cashback, dan total penghematan belanja secara cepat dan akurat.",
  openGraph: {
    title: "Kalkulator Diskon Instan — MyCalc",
    description:
      "Hitung harga akhir, diskon bertingkat, voucher, cashback, dan total penghematan belanja secara cepat dan akurat.",
    type: "website",
    locale: "id_ID",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kalkulator Diskon Instan — MyCalc",
  url: "https://mycalc.id/kalkulator/diskon",
  applicationCategory: "ShoppingApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
  },
};

export default function DiscountPageRoute() {
  return (
    <>
      <Script
        id="json-ld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <DiscountPage />
    </>
  );
}
