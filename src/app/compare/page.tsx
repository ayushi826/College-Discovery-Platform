"use client";

import { MOCK_COLLEGES } from "@/data/colleges";
import { useAppStore } from "@/store/useAppStore";

export default function ComparePage() {

  const comparisonIds = useAppStore(
    (state) => state.comparisonIds
  );

  const removeFromComparison = useAppStore(
    (state) => state.removeFromComparison
  );

  const comparedColleges = MOCK_COLLEGES.filter(
    (college) =>
      comparisonIds.includes(String(college.id))
  );

  return (
    <main className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-slate-900">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black text-gray-900 dark:text-white">
          Compare Colleges
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-white">
          Compare placements, fees, ratings,
          and packages side-by-side.
        </p>

        <div className="mt-10 overflow-hidden rounded-[32px] bg-white shadow-xl">

          <div className="grid grid-cols-6 gap-6 border-b bg-gray-100 px-8 py-6 font-bold text-gray-700">

            <div>College</div>

            <div>Fees</div>

            <div>Rating</div>

            <div>Avg Package</div>

            <div>Placement Rate</div>

            <div>Action</div>

          </div>

          {comparedColleges.length === 0 ? (

            <div className="py-24 text-center text-lg text-gray-400">
              No colleges selected for comparison yet.
            </div>

          ) : (

            <div className="divide-y">

              {comparedColleges.map((college) => (

                <div
                  key={college.id}
                  className="grid grid-cols-6 items-center gap-6 px-8 py-6"
                >

                  <div>
                    <h2 className="font-bold text-gray-900">
                      {college.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {college.location.city},{" "}
                      {college.location.state}
                    </p>
                  </div>

                  <div className="font-medium text-gray-700">
                    ₹{college.fees.min}L - ₹
                    {college.fees.max}L
                  </div>

                  <div className="font-semibold text-yellow-600">
                    ⭐ {college.rating}
                  </div>

                  <div className="font-medium text-gray-700">
                    ₹{college.avgPackage} LPA
                  </div>

                  <div className="font-medium text-gray-700">
                    {college.placementRate}%
                  </div>

                  <div>

                    <button
                      onClick={() =>
                        removeFromComparison(
                          college.id
                        )
                      }
                      className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}