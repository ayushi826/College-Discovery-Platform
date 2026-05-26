"use client";

import { useMemo, useState } from "react";

import CollegeCard from "@/components/college/CollegeCard";
import { MOCK_COLLEGES } from "@/data/colleges";

export default function CollegesPage() {
  const [search, setSearch] = useState("");

  const filteredColleges = useMemo(() => {
    return MOCK_COLLEGES.filter((college) =>
      college.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-[#0f172a]">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white">
            Top Colleges in India
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Compare rankings, fees, placements,
            and campus life.
          </p>
        </div>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search colleges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-lg text-black outline-none focus:border-blue-500 dark:placeholder:text-black"
          />
        </div>

        {filteredColleges.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No colleges found
            </h2>

            <p className="mt-2 text-gray-500">
              Try searching another college.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredColleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}