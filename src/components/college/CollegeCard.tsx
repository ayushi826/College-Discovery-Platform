"use client";

import Image from "next/image";

import { College } from "@/types";
import { useAppStore } from "@/store/useAppStore";

interface Props {
  college: College;
}

export default function CollegeCard({ college }: Props) {

     const addToComparison = useAppStore(
  (state) => state.addToComparison
   );
  return (
    <div className="overflow-hidden rounded-3xl bg-white text-black shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 w-full">
        <Image
          src={college.imageUrl}
          alt={college.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {college.name}
            </h2>

            <p className="mt-1 text-gray-500">
              {college.location.city},{" "}
              {college.location.state}
            </p>
          </div>
       
          <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
            ⭐ {college.rating}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Fees
            </p>

            <h3 className="mt-1 text-xl font-bold">
              ₹{college.fees.min}L - ₹{college.fees.max}L
            </h3>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Avg Package
            </p>

            <h3 className="mt-1 text-xl font-bold">
              ₹{college.avgPackage} LPA
            </h3>
          </div>
        </div>
        <button
              onClick={() =>
                 addToComparison(String(college.id))
                 }
                  className="mt-4 w-full rounded-xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700"
                >  
                Compare
         </button>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold hover:bg-gray-100">
            Save
          </button>

          <button className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}