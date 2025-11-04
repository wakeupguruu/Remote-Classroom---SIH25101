"use client";

export function ClearThemeButton() {
  const handleClear = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("remote-classroom-theme");
      localStorage.removeItem("theme");
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleClear}
      className="text-xs bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 px-3 py-1 rounded border border-red-300 dark:border-red-700"
    >
      Clear Theme & Reload
    </button>
  );
}
