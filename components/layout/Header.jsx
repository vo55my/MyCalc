import Image from "next/image";
import Link from "next/link";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IconButton } from "@/components/ui/actions/IconButton";
import { categories } from "@/data/calculators";

/**
 * Header utama beranda.
 *
 * @param {Object} props
 * @param {boolean} props.darkMode - Status tema gelap
 * @param {function} props.onToggleTheme - Handler penggantian tema
 * @param {string} [props.activeCategory] - ID kategori aktif
 * @param {function} [props.onSelectCategory] - Handler pemilihan kategori
 */

export function Header({
  darkMode,
  onToggleTheme,
  activeCategory,
  onSelectCategory,
}) {
  // Header menerima state dari halaman agar tetap presentasional dan reusable.
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 items-center gap-3 px-4 md:gap-6 md:px-10">
        <div className="shrink-0">
          <Link
            className="flex items-center gap-2 text-xl font-semibold tracking-[-0.02em] text-text"
            href="/"
            rel="noopener noreferrer"
          >
            <Image
              alt="MyCalc"
              height={60}
              src="/Logo.png"
              width={60}
              className="h-auto w-auto"
            />
          </Link>
        </div>
        <nav
          aria-label="Kategori kalkulator"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
        >
          {categories.map((category) => {
            const selected = activeCategory === category.id;

            return (
              <Link
                className="flex min-h-10 shrink-0 items-center rounded-[var(--radius-md)] px-3 text-xs font-medium transition-colors sm:text-sm hover:bg-surface hover:text-accent"
                href={`/?category=${encodeURIComponent(category.id)}#categories`}
                key={category.id}
                onClick={() => onSelectCategory?.(category.id)}
                rel="noopener noreferrer"
              >
                {category.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <IconButton label="Mode tampilan" onClick={onToggleTheme}>
            {darkMode ? (
              <MdLightMode aria-hidden="true" />
            ) : (
              <MdDarkMode aria-hidden="true" />
            )}
          </IconButton>
        </div>
      </div>
    </header>
  );
}
