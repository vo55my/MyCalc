import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export function Breadcrumbs({
  category,
  href = "/",
  label = "Semua kalkulator",
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center gap-2 text-sm text-text-muted"
    >
      <Link
        className="group flex items-center gap-1 text-accent hover:text-accent-hover"
        href={href}
        rel="noopener noreferrer"
      >
        <MdArrowBack
          aria-hidden="true"
          className="text-base transition-transform duration-150 group-hover:-translate-x-1"
        />
        {label}
      </Link>
      <span aria-hidden="true">&#8226;</span>
      <span>{category}</span>
    </nav>
  );
}
