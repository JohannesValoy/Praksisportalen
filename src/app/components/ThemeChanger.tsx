"use client";

import React, { useEffect, useState } from "react";

const ThemeChanger = () => {
  const [theme, setTheme] = useState(() => {
    let theme = "dark"
    if (typeof localStorage !== "undefined") {
      theme = localStorage.getItem("theme") || "dark";
    }
    document.body.setAttribute("data-theme", theme);
    return theme;
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themes = [
    "dark",
    "light",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
  return (
    <select
      className="select select-ghost"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      {themes.map((theme, index) => (
        <option className="bg-base-300" key={index} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

export default ThemeChanger;
