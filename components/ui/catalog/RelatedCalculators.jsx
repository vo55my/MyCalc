import { useMemo } from "react";
import Link from "next/link";
import { CalculatorCard } from "@/components/ui/catalog/CalculatorCard";
import { MdArrowForward } from "react-icons/md";
import { calculators } from "@/data/calculators";

/**
 * Section rekomendasi kalkulator terkait (acak).
 *
 * @param {Object} props
 * @param {string} props.currentSlug - Slug kalkulator saat ini (akan dikecualikan)
 * @param {number} [props.count=3] - Jumlah rekomendasi yang ditampilkan
 * @param {string} [props.title] - Judul section
 * @param {string} [props.description] - Deskripsi section
 */
export function RelatedCalculators({
  currentSlug,
  count = 3,
  title = "Kalkulator Lainnya",
  description = "Eksplorasi lebih lanjut dengan kalkulator pilihan lainnya",
}) {
  // Pilih kalkulator acak (kecuali currentSlug) - deterministik berdasarkan slug
  const relatedCalculators = useMemo(() => {
    const filtered = calculators.filter((c) => c.slug !== currentSlug);

    // Seeded random generator (mulberry32) - deterministik berdasarkan currentSlug
    const seed = currentSlug
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let state = seed;
    const random = () => {
      state = (state + 0x6d2b79f5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    // Fisher-Yates shuffle dengan seeded random
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }, [currentSlug, count]);

  return (
    <section className="mt-16" aria-labelledby="related-calculators-title">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2
            className="text-xl font-medium text-text"
            id="related-calculators-title"
          >
            {title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            {description}
          </p>
        </div>
        <Link
          className="group hidden items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover sm:flex"
          href="/#categories"
          rel="noopener noreferrer"
        >
          Lihat semua{" "}
          <MdArrowForward
            aria-hidden="true"
            className="text-base transition-transform duration-150 group-hover:translate-x-1"
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {relatedCalculators.map((calculator) => (
          <CalculatorCard calculator={calculator} key={calculator.slug} />
        ))}
      </div>
    </section>
  );
}
