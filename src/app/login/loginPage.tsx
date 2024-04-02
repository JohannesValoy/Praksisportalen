"use client";
import React, { useState } from "react";

function LoginComponent({ csrfToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFeideLogin = async () => {
    window.location.href = "api/auth/signin/feide";
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form action={"/api/auth/callback/cred"} method="POST">
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleFeideLogin}>Login with Feide</button>
    </div>
  );
}

export default LoginComponent;
