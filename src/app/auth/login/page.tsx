"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!email || !password) {

      alert("Please fill all fields");

      return;
    }

    setLoading(true);

    const storedUser =
      localStorage.getItem(
        "college-user"
      );

    if (!storedUser) {

      setLoading(false);

      alert(
        "No account found. Please sign up first."
      );

      return;
    }

    const user =
      JSON.parse(storedUser);

    if (user.email !== email) {

      setLoading(false);

      alert("Invalid email");

      return;
    }

    setTimeout(() => {

      setLoading(false);

      alert(
        "Login successful 🎉"
      );

      router.push("/colleges");

    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-black">

      <div className="glass grid w-full max-w-5xl overflow-hidden rounded-[40px] bg-white shadow-2xl dark:bg-zinc-900 lg:grid-cols-2">

        <div className="hidden bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white lg:flex lg:flex-col lg:justify-center">

          <h1 className="text-5xl font-black leading-tight">
            Welcome Back 👋
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Continue exploring top colleges,
            rankings, and placements.
          </p>

        </div>

        <div className="p-10">

          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            Login
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Enter your account credentials
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-5"
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

          </form>

        </div>

      </div>

    </main>
  );
}