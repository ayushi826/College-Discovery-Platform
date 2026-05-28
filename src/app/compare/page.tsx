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
        Please select colleges for comparison!.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6 dark:bg-slate-900">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
        Compare Colleges
      </h1>

      {comparedColleges.map((college) => (
        <div
          key={college.id}
          className="grid grid-cols-5 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
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
              className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white">
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
