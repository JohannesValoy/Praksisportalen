"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
/**
 * ClientThemeWrapper is a wrapper component that applies the theme to its children using the DataTheme tag.
 * @param root The root element of the application
 * @param root.children The children of the root element
 * @returns Creates a div element with the possibility to apply the theme to the application
 */
export default function ClientThemeWrapper({ children }: any) {
  const { theme } = useContext(ThemeContext);
  return <div data-theme={theme}>{children}</div>;
}
