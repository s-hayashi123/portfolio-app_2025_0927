"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { githubSignIn, googleSignIn, signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4 text-black">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full rounded-md bg-neutral-100 border border-neutral-700 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md bg-neutral-100 border border-neutral-700 px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="w-full rounded-md bg-neutral-100 border border-neutral-700 px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-medium rounded-md px-4 py-2 hover:bg-gray-900"
        >
          Create Account
        </button>
      </form>
      <p className="text-center text-gray-800">or</p>
      <button
        onClick={googleSignIn}
        className="border rounded py-2 px-4 cursor-pointer w-full"
      >
        Googleでサインアップ
      </button>
      <button
        onClick={githubSignIn}
        className="border rounded py-2 px-4 cursor-pointer w-full"
      >
        GitHubでサインアップ
      </button>
    </main>
  );
}
