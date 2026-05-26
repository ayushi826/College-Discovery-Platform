// ============================================================
// SERVICES/COLLEGE.SERVICE.TS — Business Logic Layer
// ============================================================
// WHY a service layer?
//   Components should be dumb — they render and handle events.
//   Business logic (filtering, sorting, pagination) belongs here.
//   When you replace mock data with a real API, ONLY this file
//   changes. Components and hooks stay exactly the same.
//
// PATTERN: Service functions return Promises even for mock data.
//   This means switching to fetch() requires no refactoring.
//
// INTERVIEW: "I used a service layer to separate concerns.
//   The UI layer doesn't know or care where data comes from."
// ============================================================

import { MOCK_COLLEGES } from "@/data/colleges";
import { College, CollegeFilters, ApiResponse } from "@/types";

// Simulates network delay for realistic UX development
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── GET COLLEGES (with filters, sort, pagination) ──────────
export async function getColleges(
  filters: CollegeFilters,
  page: number,
  limit: number
): Promise<ApiResponse<College[]>> {
  await delay(300); // Simulate API latency

  let results = [...MOCK_COLLEGES];

  // 1. Text search across name, shortName, location
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.location.city.toLowerCase().includes(q) ||
        c.location.state.toLowerCase().includes(q) ||
        c.streams.some((s) => s.toLowerCase().includes(q))
    );
  }

  // 2. Stream filter (any match = include)
  if (filters.streams.length > 0) {
    results = results.filter((c) =>
      c.streams.some((s) => filters.streams.includes(s))
    );
  }

  // 3. College type filter
  if (filters.type.length > 0) {
    results = results.filter((c) => filters.type.includes(c.type));
  }

  // 4. Location filter
  if (filters.location.length > 0) {
    results = results.filter((c) =>
      filters.location.includes(c.location.region)
    );
  }

  // 5. Fee range filter (using max fees)
  results = results.filter(
    (c) =>
      c.fees.max >= filters.feeRange[0] && c.fees.min <= filters.feeRange[1]
  );

  // 6. Minimum rating filter
  if (filters.rating > 0) {
    results = results.filter((c) => c.rating >= filters.rating);
  }

  // 7. Sorting
  results.sort((a, b) => {
    switch (filters.sortBy) {
      case "ranking":
        return a.ranking.collegedunia - b.ranking.collegedunia;
      case "rating":
        return b.rating - a.rating;
      case "fees_low":
        return a.fees.min - b.fees.min;
      case "fees_high":
        return b.fees.max - a.fees.max;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const total = results.length;

  // 8. Pagination (slice after filtering)
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return { data: paginated, total, page, success: true };
}

// ── GET SINGLE COLLEGE ─────────────────────────────────────
export async function getCollegeById(
  id: string
): Promise<ApiResponse<College | null>> {
  await delay(200);
  const college = MOCK_COLLEGES.find((c) => c.id === id) ?? null;
  return { data: college, success: !!college };
}

// ── GET MULTIPLE COLLEGES BY IDS (for compare page) ───────
export async function getCollegesByIds(
  ids: string[]
): Promise<ApiResponse<College[]>> {
  await delay(200);
  const colleges = MOCK_COLLEGES.filter((c) => ids.includes(c.id));
  // Preserve the requested order
  const ordered = ids.map((id) => colleges.find((c) => c.id === id)!).filter(Boolean);
  return { data: ordered, success: true };
}

// ── GET SAVED COLLEGES ─────────────────────────────────────
export async function getSavedColleges(
  savedIds: string[]
): Promise<ApiResponse<College[]>> {
  await delay(200);
  const colleges = MOCK_COLLEGES.filter((c) => savedIds.includes(c.id));
  return { data: colleges, success: true };
}

// ── SEARCH SUGGESTIONS (for autocomplete) ─────────────────
export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return MOCK_COLLEGES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q)
  )
    .slice(0, 5)
    .map((c) => c.name);
}

// ── MOCK AUTH ──────────────────────────────────────────────
// WHY here: auth logic also uses mock data. Real API → change this file.
export async function loginUser(email: string, _password: string) {
  await delay(500);
  // In real app: POST /api/auth/login
  // For mock: any credentials work
  const mockUser = {
    id: `user-${Date.now()}`,
    name: email.split("@")[0].replace(/[._]/g, " "),
    email,
    savedCollegeIds: [],
    savedComparisonIds: [],
    createdAt: new Date().toISOString(),
  };
  return { data: mockUser, success: true };
}

export async function signupUser(name: string, email: string, _password: string) {
  await delay(600);
  const mockUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    savedCollegeIds: [],
    savedComparisonIds: [],
    createdAt: new Date().toISOString(),
  };
  return { data: mockUser, success: true };
}
