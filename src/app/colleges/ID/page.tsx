import Image from 'next/image'

import { getCollegeById } from '@/services/college.service'

interface Props {
  params: {
    id: string
  }
}

const CollegeDetailPage = async ({
  params,
}: Props) => {
  const response = await getCollegeById(
    params.id
  )

  const college = response.data

  if (!college) {
    return (
      <div className="p-10">
        College not found.
      </div>
    )
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="relative h-96 w-full">
            <Image
              src={college.imageUrl}
              alt={college.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-8 p-8">
            <div>
              <h1 className="text-4xl font-bold">
                {college.name}
              </h1>

              <p className="mt-2 text-gray-500">
                {college.location.city},{' '}
                {college.location.state}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Rating
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  ⭐ {college.rating}
                </h3>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Avg Package
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-600">
                  ₹{college.avgPackage} LPA
                </h3>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Placement Rate
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {college.placementRate}%
                </h3>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold">
                Overview
              </h2>

              <p className="leading-7 text-gray-600">
                {college.overview}
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold">
                Courses
              </h2>

              <div className="space-y-4">
                {college.courses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl border p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {course.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {course.duration}{' '}
                          Years
                        </p>
                      </div>

                      <div className="text-right">
                        <h3 className="font-bold text-green-600">
                          ₹{course.fees}L
                        </h3>

                        <p className="text-sm text-gray-500">
                          Total Fees
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold">
                Top Recruiters
              </h2>

              <div className="flex flex-wrap gap-3">
                {college.topRecruiters.map(
                  (recruiter) => (
                    <span
                      key={recruiter}
                      className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                    >
                      {recruiter}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CollegeDetailPage