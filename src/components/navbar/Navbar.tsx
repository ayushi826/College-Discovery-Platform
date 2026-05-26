"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          College Discovery Platform
        </Link>

        <div className="flex items-center gap-6">

          <Link
            href="/"
            className=" border border-gray-300 px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-pink-400"
          >
            Home
          </Link>

          <Link
            href="/colleges"
            className="border border-gray-300 px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-pink-400"
          >
            Colleges
          </Link>

          <Link
            href="/compare"
            className="border border-gray-300 px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-pink-400"
          >
            Compare
          </Link>

          <Link
            href="/auth/login"
            className="hover:text-blue-500 bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Login
          </Link>

          <Link
            href="/auth/signup"
            className=" hover:text-blue-500 bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Sign Up
          </Link>

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="border px-3 py-2 rounded-xl"
          >

            {mounted &&
              (theme === "dark"
                ? "☀️"
                : "🌙")}

          </button>

        </div>
      </div>
    </nav>
  );
}