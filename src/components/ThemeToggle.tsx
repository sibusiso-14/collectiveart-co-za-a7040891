import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable (private mode etc.): toggle still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark === true}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`text-[0.7rem] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground ${
        dark === null ? "invisible" : ""
      }`}
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
