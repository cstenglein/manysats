"use client";

import sunIcon from "../public/icons/sun.svg";
import Image from "next/image";
import moonIcon from "../public/icons/moon.svg";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="hover:bg-opacity-90 fixed top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
      aria-label="Toggle color theme"
    >
      <Image className="dark:hidden" src={sunIcon} alt="" />
      <Image className="hidden dark:block" src={moonIcon} alt="" />
    </button>
  );
}
