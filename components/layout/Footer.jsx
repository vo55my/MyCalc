import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  [
    "Kategori utama",
    [
      ["Umum", "/#categories"],
      ["Kesehatan", "/#categories"],
      ["Pendidikan", "/#categories"],
      ["Teknik & Konversi", "/#categories"],
    ],
  ],
  [
    "Kalkulator populer",
    [
      ["Kalkulator Standar & Matematika", "/kalkulator/matematika"],
      ["Kalkulator Diskon & Cashback", "/kalkulator/diskon"],
      ["Kalkulator Konversi Satuan", "/kalkulator/konversi"],
      ["Kalkulator BMI & Berat Ideal", "/kalkulator/bmi"],
    ],
  ],
  ["Pusat bantuan", [["Tentang MyCalc", "/tentang"]]],
];

export function Footer() {
  // Tahun dihitung saat render sehingga copyright tidak perlu diperbarui manual.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-canvas">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 md:grid-cols-4 md:px-10">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xl font-semibold text-text">
            <Image
              alt="MyCalc"
              height={60}
              src="/Logo.png"
              width={70}
              className="h-auto w-auto"
            />
          </div>
          <p className="text-sm leading-relaxed text-text-muted">
            Platform kalkulator digital yang cepat dan presisi untuk kebutuhan
            finansial, sains, kesehatan, dan harian.
          </p>
        </div>
        {footerGroups.map(([title, links]) => (
          <div key={title}>
            <h3 className="mb-3 text-base font-medium text-text">{title}</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              {links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 border-t border-border px-5 py-5 text-center text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between sm:text-left md:px-10">
        <span>© {currentYear} MyCalc.</span>
        <span>Privasi · Ketentuan</span>
      </div>
    </footer>
  );
}
