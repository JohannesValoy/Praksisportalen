"use client";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import ThemeSwap from "../ThemeChanger";

export default function NavBar() {
  const { changeTheme } = useContext(ThemeContext);
  return (
    <>
      <ThemeSwap handleOnClick={changeTheme} />
    </>
  );
}
