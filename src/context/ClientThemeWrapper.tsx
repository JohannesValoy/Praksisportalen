"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ClientThemeWrapper({ children }: any) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className="flex flex-col overflow-hidden h-screen bg-base-100"
      data-theme={theme}
    >
      {children}
    </div>
  );
}
