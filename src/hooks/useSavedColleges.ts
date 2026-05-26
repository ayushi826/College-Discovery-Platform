// ============================================================
// HOOKS/USE-COLLEGES.TS
// ============================================================
// WHY custom hooks?
//   They extract async logic + loading/error state from components.
//   The component just calls useColleges() and gets back data.
//   Testable in isolation. Reusable across pages.
//
// PATTERN: Each hook manages its own loading + error state.
//   This is the "loading state co-location" pattern — the state
//   lives closest to where it's used.
//
// INTERVIEW: "Custom hooks separate the what (component renders)
//   from the how (data is fetched). The hook is the data layer."
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { College, CollegeFilters } from "@/types";
import {
  getColleges,
  getCollegeById,
  getCollegesByIds,
  getSavedColleges,
  loginUser,
  signupUser,
} from "@/services/college.service";
import { useAppStore, useFilters, usePagination, useUser } from "@/store";

// ── useColleges — for the listing page ────────────────────
export function useColleges() {
  const filters = useFilters();
  const { page, limit } = usePagination();
  const setTotal = useAppStore((s) => s.setTotal);

  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // WHY useCallback: fetch function reference is stable across
  // renders, safe to put in useEffect dependency array.
  const fetchColleges = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getColleges(filters, page, limit);
      setColleges(res.data);
      setTotal(res.total ?? 0);
    } catch (e) {
      setError("Failed to load colleges. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [filters, page, limit, setTotal]);

  // Re-fetch whenever filters or page changes
  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  return { colleges, isLoading, error, refetch: fetchColleges };
}

// ── useCollege — for the detail page ──────────────────────
export function useCollege(id: string) {
  const [college, setCollege] = useState<College | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false; // Prevents stale state on fast navigation

    (async () => {
      setIsLoading(true);
      try {
        const res = await getCollegeById(id);
        if (!cancelled) {
          setCollege(res.data);
          if (!res.success) setError("College not found.");
        }
      } catch {
        if (!cancelled) setError("Failed to load college details.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => { cancelled = true; }; // Cleanup on unmount
  }, [id]);

  return { college, isLoading, error };
}

// ── useComparison — for the compare page ──────────────────
export function useComparison() {
  const comparisonIds = useAppStore((s) => s.comparisonIds);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (comparisonIds.length === 0) {
      setColleges([]);
      return;
    }
    setIsLoading(true);
    getCollegesByIds(comparisonIds).then((res) => {
      setColleges(res.data);
      setIsLoading(false);
    });
  }, [comparisonIds]);

  return { colleges, isLoading, count: comparisonIds.length };
}

// ── useSavedColleges — for the saved page ─────────────────
export function useSavedColleges() {
  const user = useUser();
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.savedCollegeIds.length) {
      setColleges([]);
      return;
    }
    setIsLoading(true);
    getSavedColleges(user.savedCollegeIds).then((res) => {
      setColleges(res.data);
      setIsLoading(false);
    });
  }, [user?.savedCollegeIds]);

  return { colleges, isLoading };
}

// ── useCollegeSave — save/unsave toggle ───────────────────
export function useCollegeSave(collegeId: string) {
  const user = useUser();
  const { saveCollege, unsaveCollege, openAuthModal } = useAppStore();

  const isSaved = user?.savedCollegeIds.includes(collegeId) ?? false;

  const toggleSave = () => {
    if (!user) {
      // Prompt login if not authenticated
      openAuthModal("login");
      return;
    }
    if (isSaved) {
      unsaveCollege(collegeId);
    } else {
      saveCollege(collegeId);
    }
  };

  return { isSaved, toggleSave };
}

// ── useAuth — login/signup logic ──────────────────────────
export function useAuth() {
  const { login } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginUser(email, password);
      if (res.success) {
        login(res.data);
        return true;
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signupUser(name, email, password);
      if (res.success) {
        login(res.data);
        return true;
      }
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  return { handleLogin, handleSignup, isLoading, error, clearError: () => setError(null) };
}

// ── useDebounce — debounced value for search ───────────────
// WHY: Prevents search from firing on every keystroke.
// After 350ms of no typing, the debounced value updates.
export function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
