"use client";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import ThemeSwap from "./ThemeChanger";

/**
 * A component that allows the user to change the theme of the application.
 * @returns A component that allows the user to change the theme of the application.
 */
export default function Theme() {
  const { changeTheme } = useContext(ThemeContext);
  return <ThemeSwap handleOnClick={changeTheme} />;
}
