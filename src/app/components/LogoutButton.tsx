"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export function LogoutButton() : React.ReactNode {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        signOut({ redirect: false });
        router.push("/login");
      }}
    >
      Log out
    </button>
  );
}

export default LogoutButton;
