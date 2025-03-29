"use client";

import { useTheme } from "@/context/ThemeContext";
import sunIcon from "../public/icons/sun.svg";
import Image from "next/image";
import moonIcon from "../public/icons/moon.svg";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-opacity-90"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Image src={sunIcon} alt="Icon of a Sun" /> : <Image src={moonIcon} alt="Icon of a Moon" />}
    </button>
  );
}