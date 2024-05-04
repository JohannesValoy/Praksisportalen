"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
/**
 * Sets up a button that logs the user out of the application.
 * @returns A button that logs the user out of the application
 */
export function LogoutButton(): React.ReactNode {
  const router = useRouter();

  return (
    <button
      id="logout"
      className={`btn btn-error text-error-content`}
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
