
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
      {
        HMR: {
          
          "primary": "#003283",
                   
          "secondary": "#81a9e1",
                   
          "accent": "#1cbcb8",
                   
          "neutral": "#e0ebe5",
                   
          "base-100": "#ffffff",
                   
          "info": "#38bdf8",
                   
          "success": "#a7cd3a",
                   
          "warning": "#fbba11",
                   
          "error": "#e51834",
      },
    },
    ],
  },
  plugins: [daisyui],
};

export default config;
