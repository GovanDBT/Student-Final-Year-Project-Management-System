"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Attempt to sign in using the credentials provider
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      // Redirect to the dashboard after successful login
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-base-300 border-1 border-sky-100/10 p-8 rounded-lg max-h-fit">
      <h1 className="text-4xl mb-2">Login to your Project</h1>
      <p className="mb-3">
        Enter your credentials below to manage your final year project with
        ease.
      </p>
      {error && (
        <div className="alert alert-error mb-3">
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset mb-5">
          <legend className="fieldset-legend text-base">Your Email</legend>
          <label className="input validator w-full">
            <input
              type="email"
              placeholder="mail@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset className="fieldset mb-5">
          <legend className="fieldset-legend text-base">Your Password</legend>
          <label className="input validator w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </fieldset>
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
