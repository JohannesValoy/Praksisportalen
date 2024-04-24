"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
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
