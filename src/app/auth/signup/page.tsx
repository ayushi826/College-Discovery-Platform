"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters"
      );
      return;
    }

    setLoading(true);

    // fake signup storage
    const user = {
      name,
      email,
    };

    localStorage.setItem(
      "college-user",
      JSON.stringify(user)
    );

    setTimeout(() => {
      setLoading(false);

      alert(
        "Account created successfully 🎉"
      );

      router.push("/colleges");

    }, 1200);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-50 dark:bg-black">

      <div className="glass grid w-full max-w-5xl overflow-hidden rounded-[40px] bg-white shadow-2xl dark:bg-zinc-900 lg:grid-cols-2">

        <div className="hidden bg-gradient-to-br from-purple-600 to-blue-700 p-12 text-white lg:flex lg:flex-col lg:justify-center">

          <h1 className="text-5xl font-black leading-tight">
            Join College Discovery Platform 🚀
          </h1>

          <p className="mt-6 text-lg text-purple-100">
            Create your account and discover
            the best colleges in India.
          </p>

        </div>

        <div className="p-10">

          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            Sign Up
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Start your journey today
          </p>

          <form
            onSubmit={handleSignup}
            className="mt-10 space-y-5"
          >

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />

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
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>

        </div>

      </div>

    </main>
  );
}