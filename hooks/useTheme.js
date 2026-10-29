import { useEffect, useRef, useState } from "react";

const THEME_STORAGE_KEY = "mycalc-theme";

/**
 * Mengelola tema aplikasi tanpa menyebabkan hydration mismatch.
 *
 * @returns {{darkMode: boolean, toggleTheme: function}}
 */
export function useTheme() {
  // Nilai awal harus sama di server dan client sebelum preferensi browser dibaca.
  const [darkMode, setDarkMode] = useState(false);
  const themeInitialized = useRef(false);

  // Baca localStorage dan preferensi sistem setelah hydration selesai.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      themeInitialized.current = true;
      setDarkMode(savedTheme ? savedTheme === "dark" : prefersDark);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Sinkronkan state tema dengan DOM dan simpan perubahan untuk kunjungan berikutnya.
  useEffect(() => {
    if (!themeInitialized.current) return;

    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    window.localStorage.setItem(THEME_STORAGE_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((current) => !current);
  }

  return { darkMode, toggleTheme };
}
