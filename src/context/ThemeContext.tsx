"use client";
import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme?: string;
  changeTheme?: (nextTheme?: string) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string | null>(null);
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme("HMR");
    }
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (theme !== null) {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const changeTheme = (theme: string) => {
    setTheme(theme);
  };

  if (!themeLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
