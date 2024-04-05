"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export function LogoutButton({hide = true}) : React.ReactNode {
  const router = useRouter();

  return (
    <button id="logout" className={`btn m-1 ${hide ? "hidden" : ""}`}
      onClick={() => {
        signOut({ redirect: false });
        document.getElementById("logout")?.classList.add("hidden");
        router.push("/login");
      }}
    >
      Log out
    </button>
  );
}

export default LogoutButton;
