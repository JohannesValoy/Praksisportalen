"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
/**
 * Sets up a button that logs the user out of the application.
 * @param root The root element of the application
 * @param root.hide A boolean that determines whether the button is hidden or not. Defaults to true.
 * @returns A button that logs the user out of the application
 */
export function LogoutButton({ hide = true }): React.ReactNode {
  const router = useRouter();

  return (
    <button
      id="logout"
      className={`btn btn-error ${hide ? "hidden" : ""}`}
      onClick={async () => {
        await signOut({ redirect: false });
        document.getElementById("logout")?.classList.add("hidden");
        router.push("/login");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}

export default LogoutButton;
