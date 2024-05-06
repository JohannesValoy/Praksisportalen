"use client";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

/**
 * The ThemeSwap component is a dropdown menu that allows the user to select a theme.
 * @returns A dropdown menu that allows the user to select a theme.
 */
export default function ThemeSwap() {
  const { changeTheme, theme } = useContext(ThemeContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (changeTheme) {
      changeTheme(e.target.value);
    }
  };
  const themes = [
    "HMR",
    "aqua",
    "autumn",
    "business",
    "coffee",
    "corporate",
    "cmyk",
    "cupcake",
    "cyberpunk",
    "dark",
    "dracula",
    "fantasy",
    "forest",
    "garden",
    "halloween",
    "lemonade",
    "luxury",
    "night",
    "retro",
    "synthwave",
    "valentine",
    "wireframe",
  ];

  return (
    <select
      className="select bg-base-200"
      onChange={handleChange}
      defaultValue={theme}
      aria-label="theme selection"
    >
      {themes.map((theme, index) => (
        <option className="bg-base-300" key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}
