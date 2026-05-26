import {
  College,
  CollegeFilters,
} from '@/types'

export function filterColleges(
  colleges: College[],
  filters: CollegeFilters
) {
  let results = [...colleges]

  if (filters.search.trim()) {
    const query = filters.search.toLowerCase()

    results = results.filter(
      (college) =>
        college.name
          .toLowerCase()
          .includes(query) ||
        college.location.city
          .toLowerCase()
          .includes(query)
    )
  }

  if (filters.rating > 0) {
    results = results.filter(
      (college) =>
        college.rating >= filters.rating
    )
  }

  return results
}