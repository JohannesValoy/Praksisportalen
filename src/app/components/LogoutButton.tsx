"use client";

import { signOut } from "next-auth/react";
import React from "react";

export function LogoutButton(): React.ReactNode {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Log out
    </button>
  );
}

export default LogoutButton;
