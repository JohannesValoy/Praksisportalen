"use client";
import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    // Here you would typically make a logout request to your authentication server

    // Clear any saved authentication data
    localStorage.removeItem("authToken");

    // Redirect the user to the login page
    window.location.href = "/login";
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
