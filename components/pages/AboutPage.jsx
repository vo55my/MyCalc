"use client";

import Link from "next/link";
import {
  MdArrowForward,
  MdGavel,
  MdLockOpen,
  MdMenuBook,
  MdVerifiedUser,
} from "react-icons/md";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CalculatorCard } from "@/components/ui/catalog/CalculatorCard";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { PageHeader } from "@/components/ui/navigation/PageHeader";
import { calculators } from "@/data/calculators";
import { useTheme } from "@/hooks/useTheme";

const activeCalculators = calculators.filter((calculator) => calculator.href);

const principles = [
  {
    icon: MdLockOpen,
    title: "Langsung digunakan",
    description:
      "Gunakan kalkulator tanpa membuat akun atau memasang aplikasi. Buka halaman yang dibutuhkan dan mulai menghitung.",
    takeaway: "Tanpa registrasi",
  },
  {
    icon: MdGavel,
    title: "Rumus transparan",
    description:
      "Setiap alat dirancang agar input, hasil, dan metodologi perhitungan mudah dipahami serta dapat ditinjau.",
    takeaway: "Hasil lebih mudah dipahami",
  },
  {
    icon: MdVerifiedUser,
    title: "Privasi sebagai prinsip",
    description:
      "Perhitungan berjalan di browser tanpa backend kalkulasi. Riwayat tidak disinkronkan antarperangkat.",
    takeaway: "Kalkulasi di sisi pengguna",
  },
];

export function AboutPage() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface text-text">
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />

      <main className="pt-16">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 py-8 md:px-10 md:py-10">
          <section aria-labelledby="about-title" className="space-y-6">
            <Breadcrumbs category="Tentang MyCalc" label="Beranda" />
            <PageHeader
              badge="Tentang platform & prinsip produk"
              description="MyCalc menyediakan kalkulator praktis untuk membantu perhitungan sehari-hari, dari matematika hingga kesehatan."
              id="about-title"
              title="Satu tempat untuk perhitungan sehari-hari."
            />
          </section>

          <section aria-labelledby="principles-title" className="space-y-6">
            <div className="space-y-2">
              <h2
                className="text-xl font-semibold text-text"
                id="principles-title"
              >
                Prinsip yang membentuk MyCalc
              </h2>
              <p className="text-sm leading-relaxed text-text-muted">
                Tujuan produk mengikuti kebutuhan pengguna: memperoleh hasil
                dengan cepat, memahami maknanya, dan mengakses alat dengan
                nyaman tanpa hambatan yang tidak perlu.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {principles.map(
                ({ icon: Icon, title, description, takeaway }) => (
                  <article
                    className="flex h-full flex-col justify-between gap-6 rounded-xl bg-canvas p-6 shadow-xs"
                    key={title}
                  >
                    <div>
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-surface-teal text-accent">
                        <Icon aria-hidden="true" className="text-2xl" />
                      </div>
                      <h3 className="text-base font-semibold text-text">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 border-t border-border pt-4 text-xs font-medium text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {takeaway}
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>

          <section aria-labelledby="catalog-title" className="space-y-6">
            <div className="space-y-2">
              <h2
                className="text-xl font-semibold text-text"
                id="catalog-title"
              >
                Katalog kalkulator
              </h2>
              <p className="text-sm leading-relaxed text-text-muted">
                Mulai dari operasi matematika hingga konversi satuan, pilih alat
                yang sesuai dengan kebutuhan Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activeCalculators.map((calculator) => (
                <CalculatorCard calculator={calculator} key={calculator.slug} />
              ))}
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              href="/#categories"
              rel="noopener noreferrer"
            >
              Lihat semua alat di beranda
              <MdArrowForward aria-hidden="true" />
            </Link>
          </section>

          <section
            aria-labelledby="contact-title"
            className="grid gap-6 rounded-2xl bg-surface-teal p-6 shadow-xs sm:p-8 lg:grid-cols-12 lg:items-center"
          >
            <div className="space-y-3 lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 rounded bg-canvas px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-accent">
                <MdMenuBook aria-hidden="true" />
                Masukan &amp; kolaborasi
              </span>
              <h2
                className="text-xl font-semibold tracking-tight text-text"
                id="contact-title"
              >
                Punya ide alat baru atau menemukan kesalahan?
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
                Masukan tentang kebutuhan kalkulator, kemudahan penggunaan, atau
                ketepatan rumus membantu kami menentukan pengembangan
                berikutnya. Kirimkan detailnya melalui email.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <a
                className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent-hover px-5 text-sm font-medium transition-colors hover:brightness-110 focus-visible:shadow-[var(--shadow-focus)] sm:w-auto ${darkMode ? "text-slate-950" : "text-white"}`}
                href="mailto:halo@mycalc.id?subject=Masukan%20untuk%20MyCalc"
              >
                <span>Kirim masukan</span>
                <MdArrowForward aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
