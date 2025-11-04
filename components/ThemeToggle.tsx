"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="rounded-full p-2.5 backdrop-blur-lg bg-white/60 border border-white/30 shadow-sm dark:bg-white/10 dark:border-white/15"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Switching theme from", theme, "to", newTheme);
    setTheme(newTheme);
  };

  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <button
      onClick={handleToggle}
      className="rounded-full p-2.5 backdrop-blur-lg bg-white/60 hover:bg-white/70 transition-transform duration-200 border border-white/30 shadow-sm dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/15"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Current theme: ${theme || "system"}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-white/80" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800/70" />
      )}
    </button>
  );
}
