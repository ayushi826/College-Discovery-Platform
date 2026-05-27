"use client";

import { useAppStore } from "@/store/useAppStore";
import { MOCK_COLLEGES } from "@/data/colleges";

export default function ComparePage() {
  const comparisonIds = useAppStore(
    (state) => state.comparisonIds
  );

  const removeFromComparison = useAppStore(
    (state) => state.removeFromComparison
  );

  const comparedColleges = MOCK_COLLEGES.filter((college) =>
    comparisonIds.includes(String(college.id))
  );

  if (comparedColleges.length === 0) {
    return (
      <div className="p-10 text-center text-xl">
        No colleges selected for comparison.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6 bg-white dark:bg-slate-800">
      <h1 className="text-3xl font-bold">
        Compare Colleges
      </h1>

      {comparedColleges.map((college) => (
        <div
          key={college.id}
          className="grid grid-cols-5 gap-6 rounded-2xl border p-6 dark:border-zinc-700"
        >
          {/* College Name */}
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">
              {college.name}
            </h2>

            <button
              onClick={() =>
                removeFromComparison(
                  String(college.id)
                )
              }
              className="mt-3 text-sm text-red-500 border border-red-500 rounded-full px-3 py-1 hover:bg-red-500 hover:text-white transition"
            >
              Remove
            </button>
          </div>

          {/* Fees */}
          <div className="text-black dark:text-white">
            <p className="font-semibold">Fees</p>
            <p>
              ₹{college.fees.min}L - ₹
              {college.fees.max}L
            </p>
          </div>

          {/* Placement */}
          <div className="text-black dark:text-white">
            <p className="font-semibold">
              Avg Package
            </p>
            <p>{college.avgPackage} LPA</p>
          </div>

          {/* Rating */}
          <div className="text-black dark:text-white">
            <p className="font-semibold">
              Rating
            </p>
            <p>⭐ {college.rating}</p>
          </div>

          {/* Location */}
          <div className="text-black dark:text-white">
            <p className="font-semibold">
              Location
            </p>
            <p>{college.location.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
