/** @format */

import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
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
      {
        myTheme: {
          primary: "#034584",
          "primary-focus": "#034584",
          "primary-content": "#034584",
          secondary: "#6c757d",
          "secondary-focus": "#6c757d",
          "secondary-content": "#6c757d",
          success: "#198754",
          "success-focus": "#198754",
          "success-content": "#198754",
          info: "#0dcaf0",
          "info-focus": "#0dcaf0",
          "info-content": "#0dcaf0",
          warning: "#fdfad3",
          "warning-focus": "#fdfad3",
          "warning-content": "#fdfad3",
          error: "#dc3545",
          "error-focus": "#dc3545",
          "error-content": "#dc3545",
          base: "#4d4d4d",
          "base-focus": "#4d4d4d",
          "base-content": "#4d4d4d",
        },
      },
    ],
  },
  plugins: [daisyui],
};

export default config;
