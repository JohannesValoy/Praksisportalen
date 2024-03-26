import React, { useState } from "react";

const ThemeChanger = () => {
  const [theme, setTheme] = useState("Dark");

  const themes = [
    "light",
    "dark",
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

  const changeTheme = (theme) => {
    setTheme(theme);
    document.body.setAttribute("data-theme", theme);
  };

  return (
    <div>
      <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
        {themes.map((theme, index) => (
          <option key={index} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeChanger;
