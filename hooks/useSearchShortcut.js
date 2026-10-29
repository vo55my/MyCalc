"use client";

import { useEffect } from "react";

/**
 * Hook untuk menangani keyboard shortcut pencarian (Ctrl/Cmd + K).
 * Memfokuskan dan memilih input pencarian saat shortcut ditekan.
 *
 * @param {React.RefObject<HTMLInputElement>} searchRef - Ref ke elemen input pencarian
 * @returns {void}
 */
export function useSearchShortcut(searchRef) {
  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [searchRef]);
}
