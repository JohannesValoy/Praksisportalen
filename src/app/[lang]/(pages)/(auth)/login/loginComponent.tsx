/** @format */

"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export const LoginComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const callbackUrl = "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ username: "", password: "" });

      const res = await signIn("cred", {
        redirect: false,
        username: formValues.username,
        password: formValues.password,
        callbackUrl,
      });
      setLoading(false);
      if (!res?.error) {
        document.getElementById("logout")?.classList.remove("hidden");
        router.push(callbackUrl);
      } else {
        setError("Invalid username or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const onLoading = useEffect(() => {
    if (loading) {
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "default";
    }
  }, [loading]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFeideLogin = async () => {
    signIn("feide", { callbackUrl });
  };

  const input_style = "input input-bordered w-full max-w-xs";

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <h1 className="text-3xl mb-4">Login Page</h1>
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        {error && <p className="text-xl bg-error p-4 mb-6 rounded">{error}</p>}
        <div className="mb-6">
          <input
            required
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Username"
            className={`${input_style}`}
          />
        </div>
        <div className="mb-6">
          <input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${input_style}`}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>
      <button className="btn btn-success " onClick={handleFeideLogin}>
        Login with Feide
      </button>
    </div>
  );
};

export default LoginComponent;
